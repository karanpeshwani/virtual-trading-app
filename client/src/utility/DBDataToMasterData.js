function roundToX(num, X) {
  return +(Math.round(num + "e+" + X) + "e-" + X);
}

async function DBDataTomasterOBJ(obj) {
  var dataa = {};
  var PandL = 0;
  var initialAmount = 1000000;
  var totalNow = obj["cash_remaining"];
  for (var x in obj["portfolio"]) {
    var dt = {};
    totalNow += obj["invested_val"][x];
    dt[x] = {
      symbol: x,
      QTY: roundToX(obj["portfolio"][x], 2),
      avg_price: roundToX(obj["invested_val"][x] / obj["portfolio"][x], 2),
    };
    dataa = { ...dataa, ...dt };
  }
  console.log(dataa);
  PandL = totalNow - initialAmount;
  return [dataa, PandL];
}

export default DBDataTomasterOBJ;
