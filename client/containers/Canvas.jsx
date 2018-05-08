import React from "react";
import Canvas from "components/Canvas.jsx";
import NotFound from "components/NotFound.jsx";
import axios from "axios";
import { debounce } from "lodash";

export default class CanvasContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errored: false,
      loading: false,
      scale: 1
    };
    this.containerRef = React.createRef();
    this.canvasRef = React.createRef();
    this._scale = this._scale.bind(this);
  }
  _update(id) {
    this.setState({ loading: true });
    axios
      .get(`/api/${id}`)
      .then(res => {
        this.setState({
          loading: false,
          data: res.data
        });
      })
      .catch(err => {
        this.setState({
          errored: true,
          loading: false,
          data: null
        });
      });
  }
  _scale = debounce(
    () => {
      const container = this.containerRef.current;
      const canvas = this.canvasRef.current;
      const width = container.offsetWidth;
      this.setState({
        scale: Math.floor(width / 1587 * 100) / 100
      });
    },
    100,
    {
      leading: true,
      trailing: true
    }
  );
  componentDidMount() {
    const { id } = this.props;
    if (id) {
      this._update(id);
      this._scale();
      window.addEventListener("resize", this._scale);
    }
  }
  componentWillUnmount() {
    const { id } = this.props;
    if (id) {
      window.removeEventListener("resize", this._scale);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      if (nextProps.id) {
        this._update(nextProps.id);
      } else {
        this.setState({
          data: null
        });
      }
    }
  }
  render() {
    const { id } = this.props;
    const { errored, loading, scale, data } = this.state;
    if (errored) {
      return <NotFound />;
    }
    if (id) {
      return (
        <div ref={this.containerRef} className="data-canvas-container">
          {id && !data ? null : (
            <div
              className="data-canvas"
              ref={this.canvasRef}
              style={{
                transform: `perspective(1px) translateZ(0) scale(${scale},${scale})`
              }}
            >
              <Canvas data={data} />
            </div>
          )}
        </div>
      );
    } else {
      return <Canvas />;
    }
  }
}
