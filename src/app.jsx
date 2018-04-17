import React from "react";

import "skeleton-css/css/normalize.css";
import "skeleton-css/css/skeleton.css";

import "styles/main.less";

import Header from "components/Header.jsx";
import Footer from "components/Footer.jsx";
import Canvas from "components/Canvas";

export default class Application extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Canvas>
          <Canvas.Row grow="1" widths="equal" color="blue" attached="top">
            <Canvas.Item title="Nome da candidata" color="blue" />
            <Canvas.Item title="Cargo que concorre" color="blue" />
            <Canvas.Item title="Local" color="blue" />
            <Canvas.Item title="Partido" color="blue" />
            <Canvas.Item title="Número" color="blue" />
          </Canvas.Row>
          <Canvas.Row grow="10">
            <Canvas.Column grow="3">
              <Canvas.Row grow="1.5">
                <Canvas.Item
                  title="Causas"
                  color="pink"
                  grow="1"
                  icon="heart"
                  // details="Lorem ipsum dolor sit"
                >
                  <Canvas.List title="Causa" amount={3} />
                </Canvas.Item>
                <Canvas.Item
                  title="Candidata"
                  color="pink"
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
              </Canvas.Row>
              <Canvas.Row grow="1.5">
                <Canvas.Item
                  title="Princípios"
                  color="pink"
                  grow="1"
                  icon="check-circle"
                >
                  <Canvas.List title="Princípio" amount={3} />
                </Canvas.Item>
                <Canvas.Item
                  title="Compromissos"
                  color="pink"
                  grow="1"
                  icon="list-alt"
                >
                  <Canvas.List title="Compromisso" amount={3} />
                </Canvas.Item>
                <Canvas.Item
                  title="Diferenciais de campanha"
                  grow="3"
                  icon="cubes"
                >
                  <Canvas.Field title="O que eu tenho que meus competidores não tem" />
                </Canvas.Item>
              </Canvas.Row>
              <Canvas.Row grow="1">
                <Canvas.Item
                  title="Quanto vai custar sua campanha?"
                  grow="2.5"
                  icon="money"
                  color="green"
                >
                  <Canvas.Field title="Valor total de custo" />
                </Canvas.Item>
                <Canvas.Item
                  title="Como você vai arrecadar?"
                  grow="4.5"
                  icon="money"
                  color="green"
                >
                  <Canvas.Field title="Lista de atividades de captação" />
                </Canvas.Item>
              </Canvas.Row>
            </Canvas.Column>
            <Canvas.Column padded>
              <Canvas.Item title="Competidores" icon="thumb-tack">
                <Canvas.Table columns={["Nome", "Partido"]} />
              </Canvas.Item>
              <Canvas.Item title="Equipe" icon="users">
                <Canvas.Table columns={["Nome", "Cargo"]} />
              </Canvas.Item>
            </Canvas.Column>
          </Canvas.Row>
        </Canvas>
        <Footer />
      </div>
    );
  }
}
