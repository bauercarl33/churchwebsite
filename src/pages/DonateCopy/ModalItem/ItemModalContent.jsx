import React, { useState } from "react";
import { TbBrandCashapp, TbBrandPaypal } from "react-icons/tb";
import { SiGofundme, SiZelle } from "react-icons/si";
import { BiLogoVenmo } from "react-icons/bi";

import "./itemmodalcontent.css";

const paymentOptions = {
  Cashapp: {
    icon: <TbBrandCashapp />,
    qr: "https://saintmarychurch.s3.us-east-1.amazonaws.com/images/1T1EgRBGJ5SBLLcNR3DLIHusUkkKoYigh",
    link: "https://cash.app/$saintmaryaustin?qr=1",
  },
  Venmo: {
    icon: <BiLogoVenmo />,
    qr: "https://saintmarychurch.s3.us-east-1.amazonaws.com/images/1a15SPoeT62u9xoY6-D7xxqcxCkggTUow",
    link: "https://venmo.com/code?user_id=3093467274149888897&created=1645489089",
  },
  Paypal: {
    icon: <TbBrandPaypal />,
    qr: "https://saintmarychurch.s3.us-east-1.amazonaws.com/images/16ayX3AeW9dFMMmopqE4SqNxraGqhi5Rh",
    link: "https://www.paypal.com/qrcodes/managed/106342a1-8b31-43e1-830f-e8cdbe334363?utm_source=hawk_quick_link",
  },
  Gofundme: {
    icon: <SiGofundme />,
    qr: "https://saintmarychurch.s3.us-east-1.amazonaws.com/images/1BgtiL3oU34seQLd8tFM_0rgBSQhheibE",
    link: "https://gofund.me/a683342f",
  },
  Zelle: {
    icon: <SiZelle />,
    qr: "https://saintmarychurch.s3.us-east-1.amazonaws.com/images/1cjCe9XhuzTk_UocT9Nu73t-E8nbzcLCf",
    link: "https://enroll.zellepay.com/qr-codes?data=eyJuYW1lIjoiU0FJTlQgTUFSWSBST01BTklBTiBPUlRIT0RPWCBDSFVSQ0giLCJ0b2tlbiI6InNhaW50bWFyeWF1c3RpbkBnbWFpbC5jb20iLCJhY3Rpb24iOiJwYXltZW50In0=",
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
    console.log(formData);
    console.log(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
    onSubmit(formData, method);
    setShowQR(true);
  };

  const goBack = () => setShowQR(false);

  const selectedOption = paymentOptions[formData.paymentMethod];

  return (
    <div className={`modal-content ${showQR ? "slide-left" : ""}`}>
      {!showQR ? (
        <>
          <h2 className="modal-title">{item.displayName}</h2>
          <img className="item-image" src={item.imgUrl} alt={item.itemName} />
          <p className="description">
            {item.description ||
              "Here is the item description. Very nice item. Very cheap."}
          </p>

          <form className="donation-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="number"
              name="amount"
              placeholder="Amount you would like to donate"
              value={formData.amount}
              onChange={handleChange}
              required
              className={errors.amount ? "error" : ""}
            />
            {errors.amount && <p className="error-text">{errors.amount}</p>}

            <textarea
              name="message"
              placeholder="Personal message"
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
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`email-inline ${errors.email ? "error" : ""}`}
                  />
                  {errors.email && <p className="error-text">{errors.email}</p>}
                  <input
                    name="phone"
                    type="phone"
                    placeholder="Benefactor Phone #"
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
              onClick={() => closeModal()}
            />
          </a>
          <a
            href={selectedOption.link}
            target="_blank"
            rel="noopener noreferrer"
            className="qr-button"
            onClick={() => closeModal()}
          >
            Go to {formData.paymentMethod}
          </a>
        </>
      )}
    </div>
  );
};

export default ItemModalContent;
