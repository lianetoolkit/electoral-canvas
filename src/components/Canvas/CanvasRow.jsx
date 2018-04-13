import React from "react";

export default class CanvasRow extends React.Component {
  render() {
    const { grow, widths, children } = this.props;
    return (
      <div
        className={`canvas-row ${widths || ""}`}
        style={{ flexGrow: grow || 1 }}
      >
        {children}
      </div>
    );
  }
}
