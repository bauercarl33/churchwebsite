import React, { useState } from "react";
import "./itemmodalcontent.css";

const ItemModalContent = ({ item, onSubmit }) => {
  const [formData, setFormData] = useState({
    amount: "",
    message: "",
    anonymous: false,
    email: "",
    paymentMethod: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePaymentChange = (method) => {
    const updatedFormData = { ...formData, paymentMethod: method };
    setFormData(updatedFormData);
    onSubmit(updatedFormData);
  };

  const paymentOptions = ["Cashapp", "Venmo", "Paypal", "Gofundme", "Zelle"];

  return (
    <div className="modal-content">
      <h2 className="modal-title">{item.itemName}</h2>
      <img className="item-image" src={item.imgUrl} alt={item.itemName} />
      <p>{`${
        item.description
          ? item.description
          : "here is the item description. very nice item. very cheap."
      }`}</p>

      <form className="donation-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="number"
          name="amount"
          placeholder="Amount you would like to donate"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Personal message"
          value={formData.message}
          onChange={handleChange}
        />

        <div className="inline-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="anonymous"
              checked={formData.anonymous}
              onChange={handleChange}
            />
            Remain anonymous?
          </label>

          {!formData.anonymous && (
            <input
              name="email"
              type="email"
              placeholder="Benefactor email"
              value={formData.email}
              onChange={handleChange}
              required
              className="email-inline"
            />
          )}
        </div>

        <p className="payment-label">
          Click an option below to complete your donation
        </p>
        <div className="payment-switch">
          {paymentOptions.map((option) => (
            <button
              type="button"
              key={option}
              className={`switch-button ${
                formData.paymentMethod === option ? "active" : ""
              }`}
              onClick={() => handlePaymentChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};

export default ItemModalContent;
