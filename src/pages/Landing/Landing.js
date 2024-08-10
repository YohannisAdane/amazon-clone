import React from "react";
import LayOut from "../../Components/LayOut/LeyOut";
import Carouse from "../../Components/Carousel/Carouse";
import Category from "../../Components/Catagory/Category";
import Product from "../../Components/Product/Product";
function Landing() {
  return (
    <LayOut>
      <Carouse />
      <Category />
      <Product />
    </LayOut>
  );
}

export default Landing;
