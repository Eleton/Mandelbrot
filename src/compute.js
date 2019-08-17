const add = (z1, z2) => {
  return { r: z1.r + z2.r, i: z1.i + z2.i};
}

const multiply = (z1, z2) => {
  return { r: z1.r*z2.r - z1.i * z2.i, i: 2*z1.r*z2.i };
}

const compute = (c, z, n, limit) => {
  if (n === limit) {
    return 0;
  } else if (Math.abs(z.r) >= 2 || Math.abs(z.i) >= 2) {
    return n;
  } else {
    return compute(c, add(multiply(z, z), c), n+1, limit);
  }
}

const convertMatrix = (matrix, resolution) => {
  console.log(resolution)
  return matrix.map(row => {
    return row.map(c => {
      return compute(c, {r: 0, i: 0}, 0, resolution);
    })
  })
}

export default convertMatrix;