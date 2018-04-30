import React from "react";

import "skeleton-css/css/normalize.css";
import "skeleton-css/css/skeleton.css";

import Header from "components/Header.jsx";
import Footer from "components/Footer.jsx";
import Canvas from "react-flexcanvas";

import "styles/main.less";
import "styles/font-awesome.scss";

export default class Application extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Canvas>
          <Canvas.Row grow={1} widths="equal" color="blue" attached="top">
            <Canvas.Item title="Nome da candidata" color="blue" />
            <Canvas.Item title="Cargo que concorre" color="blue" />
            <Canvas.Item title="Local" color="blue" />
            <Canvas.Item title="Partido" color="blue" />
            <Canvas.Item title="Número" color="blue" />
          </Canvas.Row>
          <Canvas.Row grow={10}>
            <Canvas.Column grow={5}>
              <Canvas.Row grow={2}>
                <Canvas.Item
                  title="Causas"
                  color="pink"
                  grow={1}
                  icon={<span className="fa fa-heart" />}
                  // details="Lorem ipsum dolor sit"
                >
                  <Canvas.List title="Causa" amount={3} />
                </Canvas.Item>
                <Canvas.Item
                  title="Candidata"
                  color="pink"
                  grow={3}
                  featured
                  icon={<span className="fa fa-address-card" />}
                  // details={<p>Dolor sit</p>}
                >
                  <Canvas.FieldGroup>
                    <Canvas.Field title="Característica positiva" />
                    <Canvas.Field title="Característica negativa" />
                  </Canvas.FieldGroup>
                  <Canvas.FieldGroup>
                    <Canvas.Field title="Um talento" />
                    <Canvas.Field title="Uma limitação" />
                  </Canvas.FieldGroup>
                  <Canvas.Field title="Uma experiência de vida" grow={2} />
                </Canvas.Item>
                <Canvas.Item
                  title="Diferenciais de campanha"
                  grow={1}
                  icon={<span className="fa fa-cubes" />}
                >
                  <Canvas.Field title="O que eu tenho que meus competidores não tem" />
                </Canvas.Item>
              </Canvas.Row>
              <Canvas.Row grow={2}>
                <Canvas.Item
                  title="Princípios"
                  color="pink"
                  grow={1}
                  icon={<span className="fa fa-check-circle" />}
                >
                  <Canvas.List title="Princípio" amount={3} />
                </Canvas.Item>
                <Canvas.Item
                  title="Compromissos"
                  color="pink"
                  grow={1}
                  icon={<span className="fa fa-list-alt" />}
                >
                  <Canvas.List title="Compromisso" amount={3} />
                </Canvas.Item>
                <Canvas.Item
                  title="Eleitorado"
                  grow={3}
                  icon={<span className="fa fa-filter" />}
                >
                  <Canvas.List title="Perfil" amount={3} />
                </Canvas.Item>
              </Canvas.Row>
              <Canvas.Row grow={1}>
                <Canvas.Item
                  title="Quanto vai custar sua campanha?"
                  grow={2.5}
                  icon={<span className="fa fa-money" />}
                  color="green"
                >
                  <Canvas.Field title="Valor total de custo" />
                </Canvas.Item>
                <Canvas.Item
                  title="Como você vai arrecadar?"
                  grow={4.5}
                  icon={<span className="fa fa-money" />}
                  color="green"
                >
                  <Canvas.Field title="Lista de atividades de captação" />
                </Canvas.Item>
              </Canvas.Row>
            </Canvas.Column>
            <Canvas.Column>
              <Canvas.Item
                title="Competidores"
                icon={<span className="fa fa-thumb-tack" />}
              >
                <Canvas.Table columns={["Nome", "Partido"]} />
              </Canvas.Item>
              <Canvas.Item
                title="Equipe"
                icon={<span className="fa fa-users" />}
              >
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
