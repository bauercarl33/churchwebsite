import React, { useState, useEffect } from "react";
import "./itemsgrid.css";
import ItemModalContent from "../ModalItem/ItemModalContent";

const ItemsGrid = ({ items, category }) => {
  const [localItems, setLocalItems] = useState([]);
  const [localCategory, setLocalCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);

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
  useEffect(() => {
    if (selectedItem) {
      // Save scroll position
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        // Restore scroll position
        const savedY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, parseInt(savedY || "0") * -1);
      };
    }
  }, [selectedItem]);

  const openModal = (item) => setSelectedItem(item);
  const closeModal = () => setSelectedItem(null);

  const updateItems = async (item) => {
    const url = `https://2wtfo19jwf.execute-api.us-east-1.amazonaws.com/prod/putDonationItem`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error(`STATUS: ${response.status}`);
    }
    const data = await response.json();
    console.log("Items DATA: ", data);
    return data;
  };

  const handleSubmit = async (formData) => {
    console.log("User submitted:", formData, "for item:", selectedItem);
    const newProgress = selectedItem.progress + parseFloat(formData.amount);
    const item = {
      itemName: selectedItem.itemName,
      attributes: {
        progress: parseFloat(newProgress),
      },
    };
    try {
      const result = await updateItems(item);
      console.log("Update successful:", result);
    } catch (err) {
      console.error("Update failed:", err.message);
    }
  };
  return (
    <>
      <div className="items-container">
        {localCategory == "All"
          ? localItems.map((item) => (
              <div
                className="item-card"
                key={item.itemName}
                onClick={() => openModal(item)}
              >
                <div className="image-wrapper">
                  <img
                    className="item-img"
                    src={item.imgUrl}
                    alt={item.itemName}
                  />

                  {item.quantity > 1 && (
                    <div className="item-quantity">{`${item.quantity}x`}</div>
                  )}
                </div>
                <div className="title">{`${item.displayName}`}</div>
                <div className="progress-row">
                  <div className="item-remaining">
                    {item.cost - item.progress > 0
                      ? `$${item.cost - item.progress} left!`
                      : `Item Purchased!`}
                  </div>
                </div>
                <div
                  className={`progress-bar ${
                    item.cost - item.progress <= 0 ? "zero-progress" : ""
                  }`}
                  style={{
                    "--progress": `${(item.progress / item.cost) * 100}%`,
                  }}
                />
              </div>
            ))
          : localItems
              .filter((item) => item.category === localCategory)
              .map((item) => (
                <div
                  className="item-card"
                  key={item.itemName}
                  onClick={() => openModal(item)}
                >
                  <div className="image-wrapper">
                    <img
                      className="item-img"
                      src={item.imgUrl}
                      alt={item.itemName}
                    />
                    {item.quantity > 1 && (
                      <div className="item-quantity">{`${item.quantity}`}</div>
                    )}
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
              ))}
      </div>
      {selectedItem && (
        <div className="custom-modal-backdrop" onClick={closeModal}>
          <div
            className="custom-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
            <ItemModalContent item={selectedItem} onSubmit={handleSubmit} />
          </div>
        </div>
      )}
    </>
  );
};
export default ItemsGrid;
