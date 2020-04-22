import React, { Component } from "react";
import styled, { css } from "styled-components";

const FORMATS = {
  A1: {
    size: "841x594mm",
    grid: [4, 2],
  },
  A2: {
    size: "594x420mm",
    grid: [2, 2],
  },
  A3: {
    size: "420x297mm",
    grid: [2, 1],
  },
};

const Container = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  overflow: auto;
  h2 {
    font-size: 1em;
    text-align: center;
    margin: 0 0 4rem;
  }
`;

const Button = styled.a`
  background: #fe754a;
  color: rgba(255,255,255,0.7);
  padding: 1rem;
  border-radius: 7px;
  margin: 2rem 0 0;
  display: block;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  .fa {
    margin-right: 1rem;
  }
  &:hover,
  &:active,
  &:focus {
    color: #fff;
  }
  ${(props) =>
    props.disabled &&
    css`
      background: #333 !important;
      color: #666 !important;
    `}
`;

const Content = styled.div`
  max-width: 600px;
  padding: 4rem;
  background: #222;
  color: #f0f0f0;
  margin: 6rem auto;
  box-shadow: 0 0 4rem rgba(0, 0, 0, 0.5);
  border-radius: 7px;
  border: 1px solid #333;
`;

const PaperSelector = styled.div`
  width: 70%;
  margin: 0 auto;
  position: relative;
  &.has-format {
    .papers .paper-container .paper {
      opacity: 0.3;
    }
    .papers .paper-container.selected .paper {
      opacity: 1;
      background: #333;
    }
  }
  .papers {
    position: relative;
    width: 100%;
    padding-top: 70.63%;
    .paper-container {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      box-sizing: border-box;
      &:nth-child(2) {
        width: 70.417%;
      }
      &:nth-child(3) {
        width: 49.71%;
      }
      &:focus,
      &:active,
      &:hover {
        .paper {
          background-color: rgba(255, 255, 255, 0.05);
          box-shadow: 0 0 0.6rem #1eaedb;
        }
      }
    }
    .paper {
      width: 100%;
      padding-top: 70%;
      border: 1px solid #1eaedb;
      position: relative;
      cursor: pointer;
      box-sizing: border-box;
      outline: 0;
      transition: all linear 0.1s;
      .info {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0.5rem;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        span {
          padding: 0.5rem;
        }
        .name {
          font-weight: 600;
          font-size: 1.2em;
          margin-right: 1rem;
        }
        .size {
          font-size: 0.8em;
        }
      }
    }
  }
`;

const GridContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-wrap: wrap;
  .item {
    border-right: 1px dashed rgba(255, 255, 255, 0.1);
    border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
    box-sizing: border-box;
  }
`;

const SelectOutput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3rem 0 0;
  label {
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: normal;
    input {
      margin: 0 1rem 0 0;
    }
  }
`;

class Grid extends Component {
  render() {
    const { cols, rows, format } = this.props;
    const size = cols * rows;
    const width = 100 / cols;
    const height = 100 / rows;
    const style = {
      width: `${width}%`,
      height: `${height}%`,
    };
    return (
      <GridContainer>
        {Array.apply(null, Array(size)).map((value) => (
          <div key={value} className="item" style={style} />
        ))}
      </GridContainer>
    );
  }
}

class Download extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFormat: "",
      tiled: false,
    };
  }
  _setFormat = (format) => (ev) => {
    ev.preventDefault();
    const { selectedFormat } = this.state;
    this.setState({
      selectedFormat: format == selectedFormat ? "" : format,
    });
  };
  _handleOutputChange = ({ target }) => {
    if (target.value == "tiled") {
      this.setState({ tiled: true });
    } else {
      this.setState({ tiled: false });
    }
  };
  _getUrl = () => {
    const id = this.props.id || "default";
    const { selectedFormat, tiled } = this.state;
    if (!selectedFormat) return "#";
    let filename = `canvas-${id}-${selectedFormat.toUpperCase()}`;
    if (tiled) {
      filename += "-A4";
    }
    return `/files/${filename}.pdf`;
  };
  render() {
    const { tiled, selectedFormat } = this.state;
    return (
      <Container>
        <Content>
          <h2>Selecione um tamanho</h2>
          <PaperSelector className={selectedFormat ? "has-format" : ""}>
            <div className="papers">
              {Object.keys(FORMATS).map((format) => (
                <div
                  tabIndex="-1"
                  key={format}
                  className={`paper-container ${
                    format == selectedFormat ? "selected" : ""
                  }`}
                  onClick={this._setFormat(format)}
                >
                  <div className="paper">
                    {tiled ? (
                      <Grid
                        cols={FORMATS[format].grid[0]}
                        rows={FORMATS[format].grid[1]}
                      />
                    ) : null}
                    <div className="info">
                      <span className="name">{format}</span>
                      <span className="size">{FORMATS[format].size}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </PaperSelector>
          <SelectOutput>
            <label>
              <input
                type="radio"
                name="output"
                checked={!tiled}
                onChange={this._handleOutputChange}
                value="full"
              />
              Formato completo
            </label>
            <label>
              <input
                type="radio"
                name="output"
                checked={tiled}
                onChange={this._handleOutputChange}
                value="tiled"
              />
              Recortar para folhas{" "}
              {selectedFormat
                ? FORMATS[selectedFormat].grid[0] *
                  FORMATS[selectedFormat].grid[1]
                : ""}{" "}
              em tamanho A4
            </label>
          </SelectOutput>
          <Button disabled={!selectedFormat} href={this._getUrl()}>
            <span className="fa fa-file-pdf-o" />
            {!selectedFormat ? (
              "Selecione um formato"
            ) : (
              <span>
                Baixar em formato {selectedFormat}{" "}
                {tiled ? "recortado" : "completo"}
              </span>
            )}
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Download;
