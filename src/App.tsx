import React from "react";
import GridLayout, { Layout } from "react-grid-layout";
import logo from "./logo.svg";

import "./App.css";
import { Hash } from "crypto";

const RandomBackgroundDiv: React.FunctionComponent = (props) => {
  const color = Math.floor(Math.random() * 16777215).toString(16);
  return <div style={{ backgroundColor: `#${color}` }}>{props.children};</div>;
};

const randomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const NestableLayout: React.FunctionComponent<{
  layout: Layout[];
}> = (props) => {
  return (
    <GridLayout
      className="layout"
      layout={props.layout}
      cols={12}
      rowHeight={30}
      width={1200}
    >
      {props.layout.map((item) => {
        return (
          <div key={item.i} style={{ backgroundColor: randomColor() }}>
            {item.static ? `STATIC ${item.i}` : item.i}
            {props.children}
          </div>
        );
      })}
    </GridLayout>
  );
};

function App(): JSX.Element {
  const outerLayout = [
    { i: "1", x: 0, y: 0, w: 3, h: 6, static: true },
    { i: "2", x: 1, y: 0, w: 3, h: 6, minW: 2, maxW: 4 },
    { i: "3", x: 4, y: 0, w: 1, h: 2 },
  ];

  const innerLayout = [
    { i: "1", x: 0, y: 0, w: 1, h: 1 },
    { i: "2", x: 1, y: 0, w: 1, h: 2 },
    { i: "3", x: 1, y: 1, w: 1, h: 2 },
    { i: "4", x: 0, y: 1, w: 1, h: 2 },
  ];

  return (
    <div className="App">
      <NestableLayout layout={outerLayout} />
    </div>
  );
}

export default App;
