import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import colorTransformation from "./colorTransformation.js";
import convertMatrix from "./compute.js";

function App() {
  const [pressed, setPressed] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [coord, setCoord] = useState({ x: 0, y: 0 });

  const [zoomerWidth, setZoomerWidth] = useState(0)
  const [zoomerHeight, setZoomerHeight] = useState(0)

  const width = window.innerWidth, height = window.innerHeight;
  const [center, setCenter] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(2)
  const resolution = 100;
  const mandelbrot = useRef(null);

  const drawMatrix = (c, z) => {
    const mat = convertMatrix(createMatrix(c, z, width, height), resolution);
    const ctx = mandelbrot.current.getContext("2d");
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        ctx.fillStyle = colorTransformation(mat[y][x], resolution);
        ctx.fillRect(x, y, 1, 1);
      }
    }
    const {x, y} = mandelbrot.current.getBoundingClientRect();
    setOffset({x, y});
  }

  useEffect(() => {
    drawMatrix(center, zoom);
  }, []);

  const createMatrix = (c, zoom, w, h) => {
    const delta = (2*zoom)/h;
    const leftBound = c.x - (w/2)*delta;
    const topBound = c.y - zoom;

    const matrix = [];
    for (let y = 0; y < h; y++) {
      const row = [];
      for (let x = 0; x < w; x++) {
        const xVal = leftBound + x*delta;
        const yVal = topBound + y*delta;
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
            const delta = (2*zoom)/height;
            const leftBound = center.x - (width/2)*delta;

            const dimensionalX = coord.x + zoomerWidth/2;
            const dimensionalY = coord.y + zoomerHeight/2;
            const realX = leftBound + delta*dimensionalX;
            const realY = center.y - zoom + delta*dimensionalY;

            setCenter({x: realX, y: realY});

            const newZoom = Math.abs(delta*zoomerHeight/2);

            setZoom(newZoom);

            setPressed(false);
            setCoord({ x: 0, y: 0 });
            setZoomerHeight(0)
            setZoomerWidth(0)

            drawMatrix({x: realX, y: realY}, newZoom);
          }}
          onMouseMove={e => {
            if (pressed) {
              const newWidth = e.pageX - offset.x - coord.x;
              const newHeight = e.pageY - offset.y - coord.y;
              setZoomerWidth(newWidth < 0 ? 0 : newWidth)
              setZoomerHeight(newHeight < 0 ? 0 : newHeight)
            }
          }}
        >
          {pressed && <rect
            x={coord.x}
            width={zoomerWidth}
            y={coord.y}
            height={zoomerHeight}
            stroke={pressed ? "white" : "transparent"}
            strokeWidth="2px"
            strokeDasharray="4"
            fill="transparent"
          />}
        </svg>
      </div>
    </div>
  );
}

export default App;
