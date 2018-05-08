import React from "react";

export default class Footer extends React.Component {
  render() {
    return (
      <footer id="app-footer">
        <p>
          <span className="fa fa-globe" />
          <a href="https://canvas.liane.cc">https://canvas.liane.cc</a>
        </p>
        <p>
          <span className="fa fa-github" />
          <a href="https://github.com/lianetoolkit/electoral-canvas">https://github.com/lianetoolkit/electoral-canvas</a>
        </p>
        <p>
          <span className="fa fa-picture-o" />
          Ícones:{" "}
          <a href="https://fontawesome.com/">FontAwesome</a>,{" "}
          <a href="https://thenounproject.com/ekkebus/">Swen-Peter Ekkebus</a>
        </p>
      </footer>
    );
  }
}
