import React from "react";
import { Link } from "react-router-dom";

export default class NotFound extends React.Component {
  render() {
    return (
      <div className="app-container not-found">
        <h1>404 - Não encontrado</h1>
        <p><Link to="/">Voltar para a página inicial</Link></p>
      </div>
    );
  }
}
