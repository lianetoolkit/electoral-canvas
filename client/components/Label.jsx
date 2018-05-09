import React from "react";

export default class Label extends React.Component {
  render() {
    return (
      <span
        style={{
          // fontWeight: 800
          // fontSize: ".8em",
          // background: "#f0f0f0",
          // borderRadius: "4px",
          // padding: ".5rem 1rem",
          // margin: "0 .3rem"
        }}
      >
        {this.props.children}
      </span>
    );
  }
}
