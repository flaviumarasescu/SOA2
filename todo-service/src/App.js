import React, { useEffect, useState } from "react";
import CreateList from "./components/CreateList";
import ListLists from "./components/ListLists";

function App() {
  const [data, setData] = useState({});

  const onChange = (newData) => {
    setData(newData);
  };



  useEffect(() => {
    const getData = async () => {
      const res = await fetch("api/query");
      const data = await res.json();
      setData(JSON.parse(JSON.stringify(data)));
    };
    getData();
  }, []);

  console.log("data", data);

  return (
    <div className="App">
      <CreateList myData={data} refreshData={onChange} />
      <ListLists myData={data} refreshData={onChange} />
    </div>
  );
}

export default App;
