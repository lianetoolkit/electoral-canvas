import React from "react";

export default class Header extends React.Component {
  _handleClick() {
    window.print();
  }
  render() {
    return (
      <header id="app-header">
        <h1>LIANE</h1>
        <h2>Canvas Eleitoral</h2>
        <a
          className="button print"
          href="LIANE - Canvas Eleitoral.pdf"
          // onClick={this._handleClick}
        >
          Imprimir
        </a>
      </header>
    );
  }
}
