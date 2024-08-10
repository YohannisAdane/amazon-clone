import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./product.module.css";
import Loder from "../../Components/Loader/Loder";
function Product() {
  const [isLoading, setisLoading] = useState(false);

  const [products, setProducts] = useState(); // Initialize with an empty array
  useEffect(() => {
    setisLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  }, []);
  return (
    <>
      {isLoading ? (
        <Loder />
      ) : (
        <section className={classes.product_container}>
          {products?.map((singleProduct) => (
            <ProductCard
              renderAdd={true}
              product={singleProduct}
              key={singleProduct.id}
            />
          ))}
        </section>
      )}
    </>
  );
}

export default Product;
