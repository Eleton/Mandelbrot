const colorTransformation = (number, max) => {
  const delta = 360/max;
  return number === 0 ? "black" : `hsl(${number*delta}, 50%, 50%)`;
}

export default colorTransformation;