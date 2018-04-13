import React from "react";

import "skeleton-css/css/normalize.css";
import "skeleton-css/css/skeleton.css";

import "styles/main.less";

import Header from "components/Header.jsx";
import Canvas from "components/Canvas";

export default class Application extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Canvas>
          <Canvas.Row grow=".4" widths="equal">
            <Canvas.Item title="Nome da candidatura" />
            <Canvas.Item title="Cargo que concorre" />
            <Canvas.Item title="Local" />
            <Canvas.Item title="Partido" />
            <Canvas.Item title="Número" />
          </Canvas.Row>
          <Canvas.Row grow="1.5">
            <Canvas.Item title="Causas" grow="1">
              <Canvas.List title="Causa" amount={3} />
            </Canvas.Item>
            <Canvas.Item title="Candidata" grow="3">
              <Canvas.Group>
                <Canvas.Field title="Característica positiva" />
                <Canvas.Field title="Característica negativa" />
              </Canvas.Group>
              <Canvas.Group>
                <Canvas.Field title="Um talento" />
                <Canvas.Field title="Uma limitação" />
              </Canvas.Group>
              <Canvas.Field title="Uma experiência de vida" grow="2" />
            </Canvas.Item>
            <Canvas.Item title="Eleitorado" grow="1">
              <Canvas.List title="Tag" amount={3} />
            </Canvas.Item>
            <Canvas.Item title="Competidores" grow="2">
              <Canvas.Table columns={["Nome", "Partido"]} />
            </Canvas.Item>
          </Canvas.Row>
          <Canvas.Row grow="1.2">
            <Canvas.Item title="Princípios" grow="1">
              <Canvas.List title="Título" amount={3} />
            </Canvas.Item>
            <Canvas.Item title="Compromissos" grow="1">
              <Canvas.List title="Título" amount={3} />
            </Canvas.Item>
            <Canvas.Item title="Ativos" grow="3">
              <Canvas.Field title="Lista de diferenciais da campanha" />
            </Canvas.Item>
            <Canvas.Item title="Equipe" grow="2">
              <Canvas.Table columns={["Nome", "Cargo"]} />
            </Canvas.Item>
          </Canvas.Row>
          <Canvas.Row grow=".8">
            <Canvas.Item title="Quanto vai custar sua campanha?" grow="2.5">
              <Canvas.Field title="Valor total de custo" />
            </Canvas.Item>
            <Canvas.Item title="Como você vai arrecadar?" grow="4.5">
              <Canvas.Field title="Lista de atividades de captação" />
            </Canvas.Item>
          </Canvas.Row>
        </Canvas>
      </div>
    );
  }
}
