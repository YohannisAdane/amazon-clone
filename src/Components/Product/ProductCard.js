import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../../Components/currencyFormat/CurrencyFormat";
import classes from "./product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action";

function ProductCard({ product, flex, renderDesc, renderAdd }) {
  const { image, title, id, rating, price, description } = product;

  const [, dispatch] = useContext(DataContext); // Remove state variable

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,
        title,
        id,
        rating,
        price,
        description,
      },
    });
  };

  // Add a check to ensure rating is defined and has a rate property
  const ratingValue = rating && rating.rate ? rating.rate : 0;

  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="" className={classes.img_container} />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "650px" }}>{description}</div>}
        <div className={classes.rating}>
          <Rating value={ratingValue} precision={0.1} />
          {rating && <small>{rating.count}</small>}
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className={classes.button} onClick={addToCart}>
            add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
