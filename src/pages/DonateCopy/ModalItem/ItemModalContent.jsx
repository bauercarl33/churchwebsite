// components/ItemModalContent.jsx
import React, { useState } from "react";

const ItemModalContent = ({ item, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
      <h2>{item.itemName}</h2>
      <img src={item.imgUrl} alt={item.itemName} style={{ width: "100%" }} />
      <p>{`$${item.cost - item.progress} left to purchase.`}</p>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit Interest</button>
      </form>
    </div>
  );
};

export default ItemModalContent;
