import axios from "axios";
// import React from "react";
import Showprice from "./webs_cli";
import url from "../url";

function Get_Price_Obj(setprices_obj) {

  axios
    .post(url + `/getData/price/query/abc`)
    .then((res) => {
      console.log(res);
      Showprice(setprices_obj);
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = Get_Price_Obj;
// module.exports = Get_Price_Obj;
// export default Get_Price_Obj;

