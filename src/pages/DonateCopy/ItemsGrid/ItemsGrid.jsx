import React, { useState, useEffect } from "react";
import GridItem from "../GridItem/GridItem";

const ItemsGrid = ({ items, category }) => {
  const [localItems, setLocalItems] = useState([]);
  const [localCategory, setLocalCategory] = useState("All");

  useEffect(() => {
    if (items && items.length > 0) {
      setLocalItems(items);
    }
    if (category) {
      setLocalCategory(category);
    }
  }, [items, category]);
  useEffect(() => {
    if (category) {
      setLocalCategory(category);
    }
  }, [category]);
  return (
    <div>
      {localCategory == "All"
        ? localItems.map((item) => <GridItem item={item} />)
        : localItems
            .filter((item) => item.category === localCategory)
            .map((item) => <GridItem item={item} />)}
      <p>---------------</p>
    </div>
  );
};
export default ItemsGrid;
