function DBDataTomasterOBJ(obj, setmasterOBJ, masterOBJ) {

  var dataa = {};
  for (var x in obj["portfolio"]) {
    var dt = {};
    dt[x] = {
      symbol: x,
      QTY: obj["portfolio"][x],
      LTP: masterOBJ[x]["LTP"],
      avg_price: obj["invested_val"][x] / obj["portfolio"][x],
      p_L: masterOBJ[x]["LTP"] * obj["portfolio"][x] - obj["invested_val"][x],
      percent_change:
        (masterOBJ[x]["LTP"] -
          obj["invested_val"][x] / obj["invested_val"][x]) *
        100,
    };
    dataa = { ...dataa, ...dt };
  }

  setmasterOBJ((old) => {
    return {
      ...old,
      ...dataa,
    };
  });
  console.log(masterOBJ);
}

export default DBDataTomasterOBJ;
