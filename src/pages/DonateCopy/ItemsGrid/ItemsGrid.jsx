import React, { useState, useEffect } from "react";
import "./itemsgrid.css";
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
    <div className="items-container">
      {localCategory == "All"
        ? localItems.map((item) => (
            <div className="item-card" key={item.itemName}>
              <img className="item-img" src={item.imgUrl} />
              <div className="title">{item.itemName} </div>
              <div
                className="progress-bar"
                style={{
                  "--progress": `${(item.progress / item.cost) * 100}%`,
                }}
              />
            </div>
          ))
        : localItems
            .filter((item) => item.category === localCategory)
            .map((item) => (
              <div className="item-card" key={item.itemName}>
                <img className="item-img" src={item.imgUrl} />
                <div className="title">{item.itemName} </div>
                <div
                  className="progress-bar"
                  style={{
                    "--progress": `${(item.progress / item.cost) * 100}%`,
                  }}
                />
              </div>
            ))}
    </div>
  );
};
export default ItemsGrid;
