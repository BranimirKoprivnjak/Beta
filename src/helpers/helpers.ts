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

// convert hex to rgb
export const hexToRgb = (hex: any) => {
  const rgb = hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m: any, r: any, g: any, b: any) => '#' + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    .map((x: any) => parseInt(x, 16));

  return [
    'rgba(' + rgb.join(', ') + ', 1)',
    'rgba(' + rgb.join(', ') + ', 0.2)',
    'rgba(' + rgb.join(', ') + ', 0.7)',
  ];
};
