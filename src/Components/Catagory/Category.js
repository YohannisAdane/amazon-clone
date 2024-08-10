import React from "react";
import classes from "./catagory.module.css";
import { catagoryInfos } from "./CatagoryFullInfos";
import CategoryCard from "./CategoryCard";
function Category() {
  return (
    <section className={classes.category_container}>
      {catagoryInfos.map((catagory) => (
        <CategoryCard data={catagory} />
      ))}
    </section>
  );
}

export default Category;
