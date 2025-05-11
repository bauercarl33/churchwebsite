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

  const onCardClick = (item) => {
    console.log("item clicked!");
    console.log(item);
  };
  return (
    <div className="items-container">
      {localCategory == "All"
        ? localItems.map((item) => (
            <div
              className="item-card"
              key={item.itemName}
              onClick={() => onCardClick(item)}
            >
              <div className="image-wrapper">
                <img
                  className="item-img"
                  src={item.imgUrl}
                  alt={item.itemName}
                />
                {5 > 1 && <div className="item-quantity">{`x30`}</div>}
              </div>
              <div className="title">Hand Engraved Chair </div>
              <div className="progress-row">
                <div className="item-remaining">{`$${
                  item.cost - item.progress
                } left!`}</div>
              </div>
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
