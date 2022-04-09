import axios from "axios";
import React, { useState } from "react";
import url from "../url";
// import sell_form from "./sell_form";
// var bool = false;

const Sell_button = (props) => {
  const {setportfolio,sell_form, setsell_form, Selected_stock, prices_obj } = props;
  const [quantity, setquantity] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    //   console.log(quantity);
    const qty = parseInt(quantity, 10);
    setquantity(0);
    setsell_form(!sell_form);
    // console.log(qty);
    // console.log(prices_obj[Selected_stock]);
    const margin_released = prices_obj[Selected_stock] * qty;

    const data = {
      email : "karanpeshwani7@gmail.com",
      quantity: qty,
      margin_released: margin_released,
    //   sell_price : prices_obj[Selected_stock],
      Selected_stock: Selected_stock,
    };

    axios.post(url + `/getData/price/query/hello_sell`, data)
    .then((res)=>{
        console.log(res.data);
        setportfolio(res.data)

    })

    console.log(margin_released);
  };

  const handleChange = (e) => {
    setquantity(e.target.value);
  };

  return (
    <div>
      <div onClick={() => setsell_form(!sell_form)}>SELL</div>
      {sell_form ? (
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
        <div>hello_sell</div>
      )}
    </div>
  );
};

export default Sell_button;