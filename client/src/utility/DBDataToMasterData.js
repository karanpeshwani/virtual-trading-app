function roundToX(num, X) {
  return +(Math.round(num + "e+" + X) + "e-" + X);
}

async function DBDataTomasterOBJ(obj) {
  var dataa = {};
  for (var x in obj["portfolio"]) {
    var dt = {};
    dt[x] = {
      symbol: x,
      QTY: roundToX(obj["portfolio"][x], 2),
      avg_price: roundToX(obj["invested_val"][x] / obj["portfolio"][x], 2),
    };
    dataa = { ...dataa, ...dt };
  }
  console.log(dataa);

  return dataa;
}

export default DBDataTomasterOBJ;
