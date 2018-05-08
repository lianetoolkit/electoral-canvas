import React from "react";

import "skeleton-css/css/normalize.css";
import "skeleton-css/css/skeleton.css";

import { Switch, Route } from "react-router-dom";

import NotFound from "components/NotFound.jsx";
import Header from "components/Header.jsx";
import Footer from "components/Footer.jsx";

import Canvas from "containers/Canvas.jsx";

import "styles/main.less";
import "styles/font-awesome.scss";

export default class Application extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
        <div className="app-container">
          <Switch>
            <Route exact path="/" component={Canvas} />
            <Route
              exact
              path="/:id"
              strict
              render={({ match }) => {
                if (!/\b[0-9a-f]{5,40}\b$/.test(match.params.id)) {
                  return <NotFound />;
                }
                return <Canvas id={match.params.id} />;
              }}
            />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}
