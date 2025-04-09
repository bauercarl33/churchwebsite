import React, { useState, useEffect } from "react";

const GridItem = ({ item }) => {
  return (
    <div>
      <p>{JSON.stringify(item)}</p>
    </div>
  );
};
export default GridItem;
