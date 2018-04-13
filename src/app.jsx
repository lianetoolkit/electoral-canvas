import React from "react";

import "skeleton-css/css/normalize.css";
import "skeleton-css/css/skeleton.css";

import "styles/main.less";

import Header from "components/Header.jsx";

export default class Application extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
      </div>
    );
  }
}
