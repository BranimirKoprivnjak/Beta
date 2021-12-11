export const getNumber = (num: number) => {
  var units = ['M', 'B', 'T', 'Q'];
  var unit = Math.floor((num / 1.0e1).toFixed(0).toString().length);
  var r = unit % 3;
  var x = Math.abs(Number(num)) / Number('1.0e+' + (unit - r));
  return x.toFixed(2) + units[Math.floor(unit / 3) - 2];
};

// add comma as thousand seperator
export const numberWithCommas = (num: number) => {
  return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
