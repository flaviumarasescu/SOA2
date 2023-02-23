import React from "react";
import { useState } from "react";
import axios from "axios";

const CreateItem = ({ listId, refreshData, myData }) => {
  const [item, setItem] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("item", item);
    axios
      .post(`api/items/${listId}`, { item })
      .then((res) => {
        const newData = Object.assign([], myData);
        newData.forEach((list) => {
          if (list.listId === listId) {
            list.items.push(res.data);
          }
        });

        console.log("Create item newdata", newData);
        refreshData(newData);
      })
      .catch((err) => console.log(err));
    setItem("");
  };

  const onChange = (event) => {
    setItem(event.target.value);
  };

  return (
    <div className="">
      <h1>Create an item</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="item"
          placeholder="Item"
          value={item}
          onChange={onChange}
        />
        <input type="submit" value="Create item" />
      </form>
    </div>
  );
};

export default CreateItem;
