import React, { useState, useEffect } from "react";

const Hud = ({
  resolution, setResolution,
  center, setCenter,
  zoom, setZoom
}) => {
  const [tempResolution, setTempResolution] = useState(resolution);
  const [tempX, setTempX] = useState(center.x);
  const [tempY, setTempY] = useState(center.y);
  const [tempZoom, setTempZoom] = useState(zoom);

  useEffect(() => {
    setTempX(center.x);
    setTempY(center.y);
    setTempZoom(zoom);
  }, [center.x, center.y, zoom])

  const changeResolution = (e) => {
    setTempResolution(parseInt(e.target.value));
  }
  const changeX = (e) => {
    const number = parseInt(e.target.value);
    setTempX(number);
  }
  const changeY = (e) => {
    setTempY((parseInt(e.target.value)));
  }
  const changeZoom = (e) => {
    setTempZoom(parseInt(e.target.value));
  }
  const apply = () => {
    setResolution(tempResolution);
    // setCenter({ x: tempX, y: tempY });
    // setZoom(tempZoom);
  }
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        padding: 10,
        boxSizing: "border-box",
        height: "100%",
        backgroundColor: "rgba(100, 100, 100, 0.5)",
        color: "white"
      }}
    >
      <div
        style={{
          margin: 5,
          fontSize: 12
        }}
      >
        Resolution
      </div>
      <input
        type="number"
        value={tempResolution}
        onChange={changeResolution}
        style={{
          borderRadius: 10,
          border: "2px solid #ddd",
          color: "ivory",
          backgroundColor: "#333",
          padding: 5
        }}
      ></input>

      <div
        style={{
          margin: 5,
          fontSize: 12
        }}
      >
        X: {center.x}
      </div>
      {/* <input
        type="text"
        value={tempX}
        onChange={changeX}
        style={{
          borderRadius: 10,
          border: "2px solid #ddd",
          color: "ivory",
          backgroundColor: "#333",
          padding: 5
        }}
      ></input> */}


      <div
        style={{
          margin: 5,
          fontSize: 12
        }}
      >
        Y: {center.y}
      </div>
      {/* <input
        type="text"
        value={tempY}
        onChange={changeY}
        style={{
          borderRadius: 10,
          border: "2px solid #ddd",
          color: "ivory",
          backgroundColor: "#333",
          padding: 5
        }}
        step="any"
      ></input> */}

      <div
        style={{
          margin: 5,
          fontSize: 12
        }}
      >
        Zoom: {zoom}
      </div>
      {/* <input
        type="number"
        value={tempZoom}
        onChange={changeZoom}
        style={{
          borderRadius: 10,
          border: "2px solid #ddd",
          color: "ivory",
          backgroundColor: "#333",
          padding: 5
        }}
      ></input> */}
      <div>
        <button
          onClick={apply}
          style={{
            fontSize: 16,
            color: "ivory",
            backgroundColor: "#333",
            border: "2px solid #ddd",
            borderRadius: 10,
            padding: 10
          }}
        >
          Apply
        </button>
      </div>
    </div>
  )
}

export default Hud