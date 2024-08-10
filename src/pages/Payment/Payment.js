import React, { useContext, useState } from "react";
import LayOut from "../../Components/LayOut/LeyOut";
import classes from "./payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import CurrencyFormat from "../../Components/currencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { RotateLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  // Calculate total items
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  // Calculate total price
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlepayment = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      // Create a payment intent on the server
      const response = await axiosInstance({
        method: "POST",
        url: `/payments/create?total=${total * 100}`,
      });
      const clientSecret = response.data?.clientSecret;

      // Confirm the payment on the client side
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      //after the conforimation set database
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      //empty the basket
      dispatch({ type: Type.EMPTY_BASKET });
      setProcessing(false);
      navigate("/orders", { state: { msg: "you have placed new Order" } });
    } catch (error) {
      // Handle any errors that occur during the payment process
      console.error(error);
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      {/* Header part */}
      <div className={classes.payment_header}>Checkout ({totalItem}) items</div>

      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Addis Abeba, IL</div>
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Review Items and Delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* Card form */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlepayment}>
                {/* Error message */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* Card element */}
                <CardElement onChange={handleChange} />
                {/* Price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex" }}>
                      <p>Total Order :</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <RotateLoader color="gray" size={12} />
                        <p>Please wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
