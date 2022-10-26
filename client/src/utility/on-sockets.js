/*
Function to get the gata stored in database and on the client-server-socket.
This function runs every time a new token-key is provided (when new user logs-in).
*/

import axios from "axios";
import url from "../constants/url";
import clientServerSocket from "./client-server-socket";
import DBDataToMasterData from "./DBDataToMasterData";

function On_the_sockets(BackmasterOBJ, perm_data, email) {
  console.log("ON Sockets");
  axios
    .get(url + `/${email}/get_BD_data`, {headers : {"email" : email}})
    .then((res) => {
      console.log(res.data);
      DBDataToMasterData(res.data)
      .then((res)=>{
          perm_data = {...perm_data,...res}
          console.log(perm_data);
      })
    })
    .then(() => {
      clientServerSocket(BackmasterOBJ,perm_data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export default On_the_sockets;
