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
  cols: number;
}> = (props) => {
  return (
    <GridLayout
      className="layout"
      layout={props.layout}
      cols={props.cols}
      rowHeight={20}
      width={600}
      onDragStart={(layout, oldItem, newItem, placeholder, e, element) => {
        e.stopPropagation();
      }}
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

const generateItems = ({
  columns,
  itemCount,
  itemDimensions,
}: {
  columns: number;
  itemCount: number;
  itemDimensions: { x: number; y: number };
}): Layout[] => {
  return Array.from(Array(itemCount).keys()).map((index) => {
    return {
      i: index.toString(),
      x: index * itemDimensions.x,
      y: (index * itemDimensions.y) % columns,
      w: itemDimensions.x,
      h: itemDimensions.y * 2,
    };
  });
};

function App(): JSX.Element {
  const outerLayout = generateItems({
    columns: 3,
    itemCount: 3,
    itemDimensions: { x: 3, y: 3 },
  });

  const innerLayout = [
    { i: "1", x: 0, y: 0, w: 1, h: 2 },
    { i: "2", x: 1, y: 0, w: 1, h: 2 },
    { i: "3", x: 1, y: 1, w: 1, h: 2 },
    { i: "4", x: 0, y: 1, w: 1, h: 2 },
  ];

  return (
    <div className="App">
      <NestableLayout
        layout={outerLayout}
        cols={outerLayout[0].w * outerLayout.length}
      >
        <NestableLayout layout={innerLayout} cols={9} />
      </NestableLayout>
    </div>
  );
}

export default App;
