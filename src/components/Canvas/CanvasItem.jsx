import React from "react";

import CanvasTable from "./CanvasTable.jsx";

export default class CanvasItem extends React.Component {
  render() {
    const { grow, title, children } = this.props;
    let classes = "";
    let contentClasses = "";
    if (children && !Array.isArray(children) && children.type === CanvasTable) {
      contentClasses += " attached";
    }
    if (!children) {
      classes += " empty";
    }
    return (
      <article
        className={`canvas-item ${classes}`}
        style={{
          flexGrow: grow || 1
        }}
      >
        {title ? (
          <h3 className="canvas-header">
            <span>{title}</span>
          </h3>
        ) : null}
        <div className={`canvas-content ${contentClasses}`}>
          {this.props.children}
        </div>
      </article>
    );
  }
}
