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
            <Canvas.Item title="Nome da candidata" />
            <Canvas.Item title="Cargo que concorre" />
            <Canvas.Item title="Local" />
            <Canvas.Item title="Partido" />
            <Canvas.Item title="Número" />
          </Canvas.Row>
          <Canvas.Row grow="1.5">
            <Canvas.Item
              title="Causas"
              grow="1"
              icon="heart"
              // details="Lorem ipsum dolor sit"
            >
              <Canvas.List title="Causa" amount={3} />
            </Canvas.Item>
            <Canvas.Item
              title="Candidata"
              grow="3"
              featured
              icon="address-card"
              // details="Dolor sit"
            >
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
            <Canvas.Item title="Eleitorado" grow="1" icon="filter">
              <Canvas.List title="Perfil" amount={3} />
            </Canvas.Item>
            <Canvas.Item title="Competidores" grow="2" icon="thumb-tack">
              <Canvas.Table columns={["Nome", "Partido"]} />
            </Canvas.Item>
          </Canvas.Row>
          <Canvas.Row grow="1.2">
            <Canvas.Item title="Princípios" grow="1" icon="check-circle">
              <Canvas.List title="Princípio" amount={3} />
            </Canvas.Item>
            <Canvas.Item title="Compromissos" grow="1" icon="list-alt">
              <Canvas.List title="Compromisso" amount={3} />
            </Canvas.Item>
            <Canvas.Item title="Diferenciais de campanha" grow="3" icon="cubes">
              <Canvas.Field title="O que eu tenho que meus competidores não tem" />
            </Canvas.Item>
            <Canvas.Item title="Equipe" grow="2" icon="users">
              <Canvas.Table columns={["Nome", "Cargo"]} />
            </Canvas.Item>
          </Canvas.Row>
          <Canvas.Row grow=".8">
            <Canvas.Item
              title="Quanto vai custar sua campanha?"
              grow="2.5"
              icon="money"
            >
              <Canvas.Field title="Valor total de custo" />
            </Canvas.Item>
            <Canvas.Item
              title="Como você vai arrecadar?"
              grow="4.5"
              icon="money"
            >
              <Canvas.Field title="Lista de atividades de captação" />
            </Canvas.Item>
          </Canvas.Row>
        </Canvas>
      </div>
    );
  }
}
