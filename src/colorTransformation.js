const colorTransformation = (number, max) => {
  const deltaH = 360/max;
  const deltaS = 100/max;
  return number === 0 ? "black" : `hsl(${number*deltaH}, 100%, ${number*deltaS}%)`;
}

export default colorTransformation;