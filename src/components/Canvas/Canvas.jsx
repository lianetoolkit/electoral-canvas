import React from "react";

import "styles/canvas/canvas.less";

import CanvasItem from "./CanvasItem.jsx";
import CanvasRow from "./CanvasRow.jsx";
import CanvasList from "./CanvasList.jsx";
import CanvasGroup from "./CanvasGroup.jsx";
import CanvasField from "./CanvasField.jsx";
import CanvasTable from "./CanvasTable.jsx";

class Canvas extends React.Component {
  render() {
    return (
      <section className="canvas-container">{this.props.children}</section>
    );
  }
}

Canvas.Item = CanvasItem;
Canvas.Row = CanvasRow;
Canvas.Group = CanvasGroup;
Canvas.List = CanvasList;
Canvas.Field = CanvasField;
Canvas.Table = CanvasTable;

export default Canvas;
