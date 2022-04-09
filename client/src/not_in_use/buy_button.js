
// ********************************** not in use*************************

import axios from "axios";
import React, { useState } from "react";
import url from "../url";
// var bool = false;

const Buy_button = (props) => {
  const { setportfolio, buy_form, setbuy_form, Selected_stock, prices_obj } =
    props;
  const [quantity, setquantity] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    //   console.log(quantity);
    const qty = parseInt(quantity, 10);
    setquantity(0);
    setbuy_form(!buy_form);

    const margin_req = prices_obj[Selected_stock] * qty;

    const data = {
      email: "karanpeshwani7@gmail.com",
      quantity: qty,
      margin_req: margin_req,
      // buy_price : prices_obj[Selected_stock],
      Selected_stock: Selected_stock,
    };

    axios.post(url + `/getData/price/query/hello`, data).then((res) => {
      console.log(res.data);
      setportfolio(res.data);
    });

    console.log(margin_req);
  };

  const handleChange = (e) => {
    setquantity(e.target.value);
  };

  return (
    <div>
      <div
        onClick={() => {
          setbuy_form(!buy_form);
          setsell_form(false)
        }}
      >
        BUY
      </div>
      {buy_form ? (
        <div>
          quantity
          <form onSubmit={handleSubmit}>
            <input
              type="Number"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={quantity}
              placeholder="Quantity"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="btn btn-primary"
              //   onClick={(e) => Handleclick(e)}
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div>hello</div>
      )}
    </div>
  );
};

export default Buy_button;
