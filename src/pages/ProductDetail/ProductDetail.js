import React, { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LeyOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import Loder from "../../Components/Loader/Loder";
import ProductCard from "../../Components/Product/ProductCard";

function ProductDetail() {
  const [isLoading, setisLoading] = useState(false);
  const { productId } = useParams();
  const [product, setproduct] = useState({}); // camelCase variable name
  useEffect(() => {
    setisLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setproduct(res.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  }, [productId]); // Add productId to the dependency array
  return (
    <LayOut>
      {isLoading ? (
        <Loder />
      ) : (
        <ProductCard
          product={product}
          flex={true}
          renderDesc={true}
          renderAdd={true}
        />
      )}
    </LayOut>
  );
}

export default ProductDetail;
