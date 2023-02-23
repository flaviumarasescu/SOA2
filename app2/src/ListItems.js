import React from "react";

const ListItems = ({ items = {} }) => {
  const renderItems = Object.values(items).map((item) => {
    return (
      <div className="" key={item.itemId}>
        <h1>Item din module federation</h1>
        <p>{item.item}</p>
      </div>
    );
  });

  return <div>{renderItems}</div>;
};

export default ListItems;
