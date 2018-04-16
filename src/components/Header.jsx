import React from "react";

export default class Header extends React.Component {
  render() {
    return (
      <header id="app-header">
        <h1>LIANE</h1>
        <h2>Canvas Eleitoral</h2>
        <a className="divider "/>
        <a
          className="button print"
          href="LIANE - Canvas Eleitoral A4.pdf"
        >
          Baixar em formato A4
        </a>
        <a
          className="button print"
          href="LIANE - Canvas Eleitoral A3.pdf"
        >
          Baixar em formato A3
        </a>
      </header>
    );
  }
}
