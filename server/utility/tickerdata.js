// Not in use

// require csvtojson module
const CSVToJSON = require("csvtojson");
let ticker_list = [];

// convert users.csv file to JSON array
CSVToJSON()
  .fromFile(
    "C:/D/Projects/virtual-trading-app/virtual-trading-app/server/data/nasdaq-listed.csv"
  )
  .then((users) => {
    // console.log(typeof users);
    // users is a JSON array
    // log the JSON array
    handle_data(users);
    // export default ticker_list;
  })
  .catch((err) => {
    // log error if any
    console.log(err);
  });

const handle_data = (response) => {
  for (var i = 0; i < response.length; i++) {
    var obj = response[i];
    ticker_list.push(obj);
  }

  // console.log(typeof ticker_list);
  // console.log(ticker_list);
};

// export default ticker_list;
exports.ticker_list = ticker_list;
