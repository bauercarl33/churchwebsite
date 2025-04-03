import React, { useState, useEffect } from "react";

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
        ? localItems.map((item) => (
            <div key={item.itemName}>
              <p>---------------</p>
              <p>{item.itemName}</p>
              <p>{item.progress}</p>
              <p>{item.category}</p>
            </div>
          ))
        : localItems
            .filter((item) => item.category === localCategory)
            .map((item) => (
              <div key={item.itemName}>
                <p>---------------</p>
                <p>{item.itemName}</p>
                <p>{item.progress}</p>
                <p>{item.category}</p>
              </div>
            ))}
      <p>---------------</p>
    </div>
  );
};
export default ItemsGrid;
