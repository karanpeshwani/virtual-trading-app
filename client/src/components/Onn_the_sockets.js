import axios from "axios";
import url from "../url";
import "./styles.css";
import ONN_client_socket from "../utility/webs_cli";
import DBDataToMasterData from "../utility/DBDataToMasterData";

function Onn_the_sockets(setmasterOBJ, perm_data) {
  console.log("ON Sockets");
  axios
    .post(url + "/get_BD_data")
    .then((res) => {
      console.log(res.data);
      DBDataToMasterData(res.data)
      .then((res)=>{
          perm_data = {...perm_data,...res}
          console.log(perm_data);
      })
    })
    .then(() => {
      ONN_client_socket(setmasterOBJ,perm_data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export default Onn_the_sockets;
