import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import colorTransformation from "./colorTransformation.js";
import convertMatrix from "./compute.js";

function App() {
  const [pressed, setPressed] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [coord, setCoord] = useState({ x: 0, y: 0 });
  const [coord2, setCoord2] = useState({ x: 0, y: 0 });
  const [heightDavid, setHeight] = useState(0)
  const [widthDavid, setWidth] = useState(0)
  const width = window.innerHeight, height = window.innerHeight;
  const [edges, setEdges] = useState({
    top: 2,
    right: 2,
    bottom: -2,
    left: -2
  });
  const resolution = 100;
  const mandelbrot = useRef(null);

  useEffect(() => {
    const mat = convertMatrix(createMatrix(edges, width, height), resolution);
    const ctx = mandelbrot.current.getContext("2d");
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        ctx.fillStyle = colorTransformation(mat[y][x], resolution);
        ctx.fillRect(x, y, 1, 1);
      }
    }
    console.log(mandelbrot.current.getBoundingClientRect());
    const {x, y} = mandelbrot.current.getBoundingClientRect();
    setOffset({x, y});
  }, []);


  const createMatrix = ({top, right, bottom, left}, w, h) => {
    const deltaX = (right - left)/w;
    const deltaY = (bottom - top)/h;
    const matrix = [];
    for (let y = 0; y < h; y++) {
      const row = [];
      for (let x = 0; x < w; x++) {
        const xVal = left + x*deltaX;
        const yVal = top + y*deltaY;
        row.push({r: xVal, i: yVal});
      }
      matrix.push(row);
    }
    return matrix;
  }

  return (
    <div>
      <div
        className="App"
        style={{ position: "relative", display: "flex", justifyContent: "center" }}
      >
        <canvas
          ref={mandelbrot}
          width={width}
          height={height}
          style={{ border: "1px solid black", position: "absolute" }}
        ></canvas>
        <svg
          width={width}
          height={height}
          style={{ position: "absolute" }}
          onMouseDown={e => {
            const { x, y } = e.target.getBoundingClientRect();
            setPressed(true);
            setCoord({ x: e.pageX - x, y: e.pageY - y})
          }}
          onMouseUp={() => {
            setPressed(false);
            setCoord({ x: 0, y: 0 });
            setCoord2({ x: 0, y: 0 });
            setHeight(0)
            setWidth(0)
            setEdges()
            
          }}
          onMouseMove={e => {
            if (pressed) {
              const newWidth = e.pageX - offset.x - coord.x;
              const newHeight = e.pageY - offset.y - coord.y;
              setHeight(newHeight < 0 ? 0 : newHeight)
              setWidth(newWidth < 0 ? 0 : newWidth)
            }
          }}
        >
          {pressed && <rect
            x={coord.x}
            y={coord.y}
            width={widthDavid}
            height={heightDavid}
            stroke={pressed ? "black" : "transparent"}
            strokeWidth="4px"
            fill="transparent"
          />}
        </svg>
      </div>
    </div>
  );
}

export default App;
