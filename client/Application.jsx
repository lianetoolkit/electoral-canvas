import React from "react";

import "skeleton-css/css/normalize.css";
import "skeleton-css/css/skeleton.css";

import { Switch, Route, useLocation } from "react-router-dom";

import NotFound from "components/NotFound.jsx";
import Header from "components/Header.jsx";
import Footer from "components/Footer.jsx";

import Canvas from "containers/Canvas.jsx";
import Download from "components/Download.jsx";

import "styles/main.less";
import "styles/font-awesome.scss";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function () {
  let query = useQuery();
  let appStyle = {};
  if (query.get("download")) {
    appStyle = { overflow: "hidden" };
  }
  return (
    <div className="container">
      <Header />
      <div className="app-container" style={appStyle}>
        <Switch>
          <Route exact path="/" component={Canvas} />
          <Route
            exact
            path="/example"
            render={() => {
              return <Canvas id="example" />;
            }}
          />
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
        {query.get("download") ? <Download /> : null}
      </div>
      <Footer />
    </div>
  );
}

// export default class Application extends React.Component {
//   render() {}
// }
