import { useCallback, useEffect, useState } from "react";

import "./itemsgrid.css";
import ItemModalContent from "../ModalItem/ItemModalContent";
import { endpoints, fetchJson } from "../../../lib/api";

// Where donation notifications are emailed.
// NOTE: this is a personal address that was hard-coded in the original code.
const DONATION_NOTIFY_EMAIL = "bauercarliii@gmail.com";

/** Filter items by category; "All" returns everything. */
export const filterByCategory = (items, category) =>
  category === "All" ? items : items.filter((item) => item.category === category);

/** Remaining amount and progress for an item. */
export const itemProgress = (item) => {
  const total = item.cost * item.quantity;
  const remaining = total - item.progress;
  return {
    remaining,
    isFunded: remaining <= 0,
    percent: (item.progress / total) * 100,
  };
};

export const buildDonationEmail = (formData, method, item, date = new Date()) =>
  `Benefactor Email: ${formData.email === "" ? "anonymous" : formData.email}\n` +
  `Benefactor Phone: ${formData.phone}\n` +
  `Payment Type: ${method}\n` +
  `Donation Item: ${item.displayName}\n` +
  `Donation Amount: ${formData.amount}\n` +
  `Personal Message: ${formData.message}\n\n\n` +
  `${date.toLocaleString()}`;

const ItemCard = ({ item, onSelect }) => {
  const { remaining, isFunded, percent } = itemProgress(item);
  return (
    <div
      className="item-card"
      role="button"
      tabIndex={0}
      onClick={() => onSelect(item)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(item);
        }
      }}
    >
      <div className="image-wrapper">
        <img className="item-img" src={item.imgUrl} alt={item.itemName} loading="lazy" />
        {item.quantity > 1 && (
          <div className="item-quantity">{`${item.progress / item.cost}/${item.quantity}x`}</div>
        )}
      </div>
      <div className="title">{item.displayName}</div>
      <div className="progress-row">
        <div className="item-remaining">
          {isFunded
            ? "Item Purchased!"
            : `$${remaining} left! ${item.quantity > 1 ? `(${item.cost} each)` : ""}`}
        </div>
      </div>
      <div
        className={`progress-bar ${isFunded ? "zero-progress" : ""}`}
        style={{ "--progress": `${percent}%` }}
      />
    </div>
  );
};

const ItemsGrid = ({ items, category, onItemsChanged }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  // Lock background scrolling while the modal is open, restoring the
  // scroll position afterwards.
  useEffect(() => {
    if (!selectedItem) return undefined;
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [selectedItem]);

  const closeModal = useCallback(() => {
    onItemsChanged?.();
    setSelectedItem(null);
  }, [onItemsChanged]);

  // Close the modal with the Escape key.
  useEffect(() => {
    if (!selectedItem) return undefined;
    const onKeyDown = (e) => e.key === "Escape" && closeModal();
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [selectedItem, closeModal]);

  const handleSubmit = async (formData, method) => {
    const newProgress = selectedItem.progress + parseFloat(formData.amount);
    try {
      await fetchJson(endpoints.putDonationItem, {
        method: "PUT",
        body: { itemName: selectedItem.itemName, attributes: { progress: newProgress } },
      });
      await fetchJson(endpoints.sendEmail, {
        method: "POST",
        body: {
          to: DONATION_NOTIFY_EMAIL,
          from: DONATION_NOTIFY_EMAIL,
          subject: "Church Donation Reciept",
          message: buildDonationEmail(formData, method, selectedItem),
        },
      });
    } catch (err) {
      console.error("Donation update failed:", err.message);
    }
  };

  return (
    <>
      <div className="items-container">
        {filterByCategory(items ?? [], category).map((item) => (
          <ItemCard key={item.itemName} item={item} onSelect={setSelectedItem} />
        ))}
      </div>
      {selectedItem && (
        // Clicking the backdrop (but not the dialog) closes the modal; the
        // keyboard equivalent is the Escape handler above.
        <div
          className="custom-modal-backdrop"
          role="presentation"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div
            className="custom-modal-content"
            role="dialog"
            aria-modal="true"
            aria-label={selectedItem.displayName}
          >
            <button className="modal-close" onClick={closeModal} aria-label="Close">
              &times;
            </button>
            <ItemModalContent item={selectedItem} onSubmit={handleSubmit} closeModal={closeModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default ItemsGrid;
