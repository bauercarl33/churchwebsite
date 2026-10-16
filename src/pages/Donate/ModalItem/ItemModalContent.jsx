import React, { useState } from "react";
import { paymentOptions as sharedOptions } from "../../../data/donationOptions";

import "./itemmodalcontent.css";

// Keyed by the label shown on the button (also sent as "Payment Type" in the
// notification email).
const paymentOptions = {
  ...Object.fromEntries(Object.values(sharedOptions).map((option) => [option.label, option])),
  "Check/Cash/Wire": {
    label: "Check/Cash/Wire",
    qr: "https://saintmarychurch.s3.us-east-1.amazonaws.com/images/checkoptionimg.png",
  },
};

const ItemModalContent = ({ item, onSubmit, closeModal }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    amount: "",
    message: "",
    anonymous: false,
    email: "",
    phone: "",
    paymentMethod: "",
  });

  const [showQR, setShowQR] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePaymentChange = (method) => {
    const newErrors = {};
    if (
      !formData.amount ||
      parseFloat(formData.amount) <= 0 ||
      /[^0-9.]/.test(formData.amount)
    ) {
      newErrors.amount = "Please enter a valid donation amount";
    }
    if (
      !formData.anonymous &&
      (!formData.email.trim() ||
        !formData.email.includes("@") ||
        !formData.email.includes("."))
    ) {
      newErrors.email = "Please enter a valid email address";
    }
    if (
      !formData.anonymous &&
      (!formData.phone.trim() || !(formData.phone.length === 10))
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }
    setErrors(newErrors);
    // Don't proceed if there are any validation errors
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
    onSubmit(formData, method);
    setShowQR(true);
  };

  const selectedOption = paymentOptions[formData.paymentMethod];

  return (
    <div className={`modal-content ${showQR ? "slide-left" : ""}`}>
      {!showQR ? (
        <>
          <h2 className="modal-title">{item.displayName}</h2>
          <img className="item-image" src={item.imgUrl} alt={item.itemName} />
          {item.description && <p className="description">{item.description}</p>}

          <form className="donation-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="number"
              name="amount"
              placeholder="Amount you would like to donate"
              aria-label="Donation amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className={errors.amount ? "error" : ""}
            />
            {errors.amount && <p className="error-text">{errors.amount}</p>}

            <textarea
              name="message"
              placeholder="Personal message"
              aria-label="Personal message"
              value={formData.message}
              onChange={handleChange}
            />

            <div className="inline-group">
              {!formData.anonymous && (
                <>
                  <input
                    name="email"
                    type="email"
                    placeholder="Benefactor email"
                    aria-label="Benefactor email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`email-inline ${errors.email ? "error" : ""}`}
                  />
                  {errors.email && <p className="error-text">{errors.email}</p>}
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Benefactor Phone #"
                    aria-label="Benefactor phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className={`email-inline ${errors.phone ? "error" : ""}`}
                  />
                  {errors.phone && <p className="error-text">{errors.phone}</p>}
                </>
              )}
            </div>

            <p className="payment-label">
              Click an option below to complete your donation
            </p>
            <div className="payment-switch">
              {Object.keys(paymentOptions).map((option) => (
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
        </>
      ) : (
        <>
          <h1 className="modal-title">{item.displayName}</h1>
          <a
            href={selectedOption.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => closeModal()}
          >
            <img
              src={selectedOption.qr}
              alt={`${formData.paymentMethod} QR`}
              className="qr-img"
            />
          </a>
          {selectedOption.link ? (
            <a
              href={selectedOption.link}
              target="_blank"
              rel="noopener noreferrer"
              className="qr-button"
              onClick={() => closeModal()}
            >
              Go to {formData.paymentMethod}
            </a>
          ) : (
            <div></div>
          )}
        </>
      )}
    </div>
  );
};

export default ItemModalContent;
