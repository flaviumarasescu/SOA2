import React, {useState} from "react";
import CreateItem from "./CreateItem";
import axios from "axios";
const ListItems = React.lazy(() => import("Remote/ListItems"));

const ListLists = ({ myData = {}, refreshData }) => {
    const [emailMsg, setEmailMsg] = useState(null)

    const sendEmail= (data)=>{
        event.preventDefault();
        console.log("list", data);
        axios
            .post("api/query/mail", { data })
            .then((res) => {
                console.log('res', res)
                setEmailMsg(res.data.response)
            })
            .catch((err) => console.log(err));
    }

  const renderLists = Object.values(myData).map((list) => {
    return (
      <div className="" key={list.listId}>
        <h1>{list.name}</h1>
          <h3>{emailMsg}</h3>
        <p>{list.listId}</p>
        <ListItems items={list.items} />
        <CreateItem
          listId={list.listId}
          refreshData={refreshData}
          myData={myData}
        /><button onClick={()=>sendEmail(list.items)}>Send email</button>
      </div>
    );
  });

  return <div>{renderLists}</div>;
};

export default ListLists;
