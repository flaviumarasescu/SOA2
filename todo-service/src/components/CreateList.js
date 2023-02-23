import React from "react";
import { useState } from "react";
import axios from "axios";

const CreateList = ({ myData, refreshData }) => {
  const [list, setList] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("list", list);
    axios
      .post("api/list", { listName: list })
      .then((res) => {
        res.data["items"] = [];
        const newData = Object.assign([], myData);
        newData.push(res.data);
        refreshData(newData);
      })
      .catch((err) => console.log(err));

    setList("");
  };

  const onChange = (event) => {
    setList(event.target.value);
  };

  return (
    <div className="">
      <h1>Create a list</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="list"
          placeholder="List"
          value={list}
          onChange={onChange}
        />
        <input type="submit" value="Create list" />
      </form>
    </div>
  );
};

export default CreateList;
