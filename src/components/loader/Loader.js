import React from "react";
import ReactDOM from "react-dom";
import "./loader.css";
// Separated SVG component for better organization
const LoaderSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <circle
      fill="#27FF48"
      stroke="#27FF48"
      strokeWidth="15"
      r="15"
      cx="40"
      cy="65"
    >
      <animate
        attributeName="cy"
        calcMode="spline"
        dur="2"
        values="65;135;65;"
        keySplines=".5 0 .5 1;.5 0 .5 1"
        repeatCount="indefinite"
        begin="-.4"
      />
    </circle>
    <circle
      fill="#27FF48"
      stroke="#27FF48"
      strokeWidth="15"
      r="15"
      cx="100"
      cy="65"
    >
      <animate
        attributeName="cy"
        calcMode="spline"
        dur="2"
        values="65;135;65;"
        keySplines=".5 0 .5 1;.5 0 .5 1"
        repeatCount="indefinite"
        begin="-.2"
      />
    </circle>
    <circle
      fill="#27FF48"
      stroke="#27FF48"
      strokeWidth="15"
      r="15"
      cx="160"
      cy="65"
    >
      <animate
        attributeName="cy"
        calcMode="spline"
        dur="2"
        values="65;135;65;"
        keySplines=".5 0 .5 1;.5 0 .5 1"
        repeatCount="indefinite"
        begin="0"
      />
    </circle>
  </svg>
);

// Styles for the loader
const styles = {
  wrapper: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  loader: {
    width: "100px",
    height: "100px",
  },
};

const Loader = () => {
  // Check if the loader element exists
  const loaderRoot = document.getElementById("loader");
  return ReactDOM.createPortal(
    <div style={styles.wrapper}>
      <div style={styles.loader}>
        hello
        <LoaderSVG />
      </div>
    </div>,
    loaderRoot
  );
};

// Simple spinner component with centered alignment
export const SpinnerImg = ({ size = "100px" }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div style={{ width: size, height: size }}>
        <LoaderSVG />
      </div>
    </div>
  );
};

export default Loader;
