import React from "react";

export default class Header extends React.Component {
  render() {
    return (
      <header id="app-header">
        <img src={require("images/logo-white.svg")} />
        <div className="title">
          <h1>LIANE</h1>
          <h2>Canvas Eleitoral</h2>
        </div>
        <div className="divider" />
        <nav className="download">
          <span className="fa fa-download" />
          <a href="LIANE - Canvas Eleitoral A4.pdf">
            <span className="fa fa-file-pdf-o" /> A4
          </a>
          <a href="LIANE - Canvas Eleitoral A3.pdf">
            <span className="fa fa-file-pdf-o" /> A3
            <span className="label">Recomendado</span>
          </a>
          <a href="LIANE - Canvas Eleitoral A2.pdf">
            <span className="fa fa-file-pdf-o" /> A2
          </a>
        </nav>
      </header>
    );
  }
}
