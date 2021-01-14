import React from "react";
import GridLayout from "react-grid-layout";
import logo from "./logo.svg";

import "./App.css";

const RandomBackgroundDiv: React.FunctionComponent = (props) => {
  const color = Math.floor(Math.random() * 16777215).toString(16);
  return <div style={{ backgroundColor: `#${color}` }}>{props.children};</div>;
};

const randomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function App(): JSX.Element {
  const layout = [
    { i: "1", x: 0, y: 0, w: 1, h: 2, static: true },
    { i: "2", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: "3", x: 4, y: 0, w: 1, h: 2 },
  ];

  return (
    <div className="App">
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
      >
        {layout.map((item) => {
          return (
            <div key={item.i} style={{ backgroundColor: randomColor() }}>
              {item.static ? `STATIC ${item.i}` : item.i}
            </div>
          );
        })}
      </GridLayout>
    </div>
  );
}

export default App;
