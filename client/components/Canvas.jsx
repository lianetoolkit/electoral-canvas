import React from "react";
import FlexCanvas from "react-flexcanvas";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";
import Label from "components/Label.jsx";
import Details from "components/Details";

const roles = {
  general_coordination: "Coordenadora geral",
  communication: "Comunicação",
  finance: "Financeiro",
  legal: "Jurídico",
  mobilization: "Mobilização/Território",
  schedule: "Agenda",
  alliances: "Alianças",
  politics: "Política"
};

const gender = {
  cis_woman: "Mulher Cis",
  cis_man: "Homem Cis",
  trans_woman: "Mulher Trans",
  cis_male: "Homem Trans",
  travesti: "Travesti",
  non_binary: "Não binario"
};

const race = {
  asian: "Amarelo",
  white: "Branco",
  indigenous: "Indigena",
  brown: "Pardo",
  black: "Negro"
};

const education = {
  none: "Nenhum",
  high: "Médio",
  college: "Superior",
  middle: "Básico"
};

const socialClass = {
  low: "Baixa",
  medium_low: "Média Baixa",
  medium: "Média",
  medium_high: "Média Alta",
  high: "Alta"
};

export default class Canvas extends React.Component {
  _format = key => data => {
    switch (key) {
      case "electorate":
        return this._handleElectorate(data);
      case "team":
        return this._handleTeam(data);
      default:
        if (typeof data == "string")
          return <ReactMarkdown source={data} plugins={[breaks]} />;
        return data;
    }
  };
  _label(str) {
    if (str) {
      return <Label>{str}</Label>;
    }
    return null;
  }
  _handleTeam = members => {
    if (members) {
      members.forEach((member, i) => {
        if (roles[member[1]]) {
          members[i][1] = roles[member[1]];
        }
      });
    }
    return members;
  };
  _handleElectorate = profiles => {
    if (profiles && profiles.length) {
      let parsed = [];
      profiles.forEach((profile, i) => {
        parsed.push(
          <span>
            <strong>{profile.tag}</strong>:{" "}
            {this._label(
              profile.demographics && profile.demographics.gender
                ? gender[profile.demographics.gender]
                : ""
            )}{" "}
            {this._label(
              profile.demographics && profile.demographics.ethnicity
                ? race[profile.demographics.ethnicity]
                : ""
            )}
            {this._label(
              profile.demographics && profile.demographics.age
                ? ", " + profile.demographics.age + " anos"
                : ""
            )}{" "}
            {this._label(
              profile.demographics && profile.demographics.education
                ? "com ensino " +
                  education[profile.demographics.education].toLowerCase()
                : ""
            )}.{" "}
            {profile.location &&
            (profile.location.neighbourhood || profile.location.city) ? (
              <span>
                Mora em{" "}
                {profile.location.neighbourhood ? (
                  <span>{profile.location.neighbourhood}, </span>
                ) : null}
                {profile.location.city ? (
                  <span>{profile.location.city}</span>
                ) : null}.{" "}
              </span>
            ) : null}
            {profile.location.locus ? (
              <span>Frequenta {profile.location.locus}</span>
            ) : null}
          </span>
        );
      });
      return parsed;
    }
    return profiles;
  };
  render() {
    const { data } = this.props;
    return (
      <FlexCanvas data={data || {}}>
        <FlexCanvas.Row grow={1} widths="equal" color="blue" attached="top">
          <FlexCanvas.Item
            title="Nombre de la candidata"
            color="blue"
            dataKey="basic_info.name_bb"
          />
          <FlexCanvas.Item
            title="Cargo que compite"
            color="blue"
            dataKey="basic_info.electoral_post"
          />
          <FlexCanvas.Item
            title="Lugar"
            color="blue"
            dataKey="basic_info.location"
          />
          <FlexCanvas.Item
            title="Partido"
            color="blue"
            dataKey="basic_info.party_name"
          />
          <FlexCanvas.Item
            title="Número"
            color="blue"
            dataKey="basic_info.number"
          />
        </FlexCanvas.Row>
        <FlexCanvas.Row grow={10}>
          <FlexCanvas.Column grow={5}>
            <FlexCanvas.Row grow={2}>
              <FlexCanvas.Item
                title="Principios"
                color="pink"
                grow={1}
                // icon={<span className="fa fa-check-circle" />}
                dataKey="principles"
                details={<Details.Principles />}
              >
                <FlexCanvas.List title="Principio" amount={3} />
              </FlexCanvas.Item>
              <FlexCanvas.Item
                title="Candidata"
                color="pink"
                grow={3}
                featured
                // icon={<span className="fa fa-address-card" />}
                details={<Details.Candidate />}
              >
                <FlexCanvas.FieldGroup>
                  <FlexCanvas.Field
                    title="Característica positiva"
                    dataKey="candidate.positive_characteristic"
                  />
                  <FlexCanvas.Field
                    title="Característica negativa"
                    dataKey="candidate.negative_characteristic"
                  />
                </FlexCanvas.FieldGroup>
                <FlexCanvas.FieldGroup>
                  <FlexCanvas.Field
                    title="Un talento"
                    dataKey="candidate.talent"
                  />
                  <FlexCanvas.Field
                    title="Una limitación"
                    dataKey="candidate.limitation"
                  />
                </FlexCanvas.FieldGroup>
                <FlexCanvas.Field
                  title="Una experiencia de vida"
                  grow={2}
                  dataKey="candidate.life_experience"
                  format={this._format()}
                />
              </FlexCanvas.Item>
              <FlexCanvas.Item
                title="Diferenciales de campaña"
                grow={1}
                // icon={<span className="fa fa-cubes" />}
                details={<Details.Assets />}
              >
                <FlexCanvas.Field
                  title="Lo que tengo que mis competidores no tiene"
                  dataKey="assets"
                  format={this._format()}
                />
              </FlexCanvas.Item>
            </FlexCanvas.Row>
            <FlexCanvas.Row grow={2}>
              <FlexCanvas.Item
                title="Causas"
                color="pink"
                grow={1}
                // icon={<span className="fa fa-heart" />}
                dataKey="causes"
                details={<Details.Causes />}
              >
                <FlexCanvas.List title="Causa" amount={3} />
              </FlexCanvas.Item>
              <FlexCanvas.Item
                title="Compromisos"
                color="pink"
                grow={1}
                // icon={<span className="fa fa-list-alt" />}
                dataKey="commitments"
                details={<Details.Commitments />}
              >
                <FlexCanvas.List title="Compromiso" amount={3} />
              </FlexCanvas.Item>
              <FlexCanvas.Item
                title="Electorado"
                color="red"
                grow={3}
                // icon={<span className="fa fa-filter" />}
                dataKey="electorate"
                format={this._format("electorate")}
                details={<Details.Electorate />}
              >
                <FlexCanvas.List title="Perfil" amount={3} />
              </FlexCanvas.Item>
            </FlexCanvas.Row>
            <FlexCanvas.Row grow={1}>
              <FlexCanvas.Item
                title="¿Cuánto va a costar su campaña?"
                grow={2.5}
                // icon={<span className="fa fa-money" />}
                color="green"
                details={<Details.Expense />}
              >
                <FlexCanvas.Field
                  title="Valor total de coste"
                  dataKey="funds.expense"
                  format={this._format()}
                />
              </FlexCanvas.Item>
              <FlexCanvas.Item
                title="¿Cómo vas a recoger?"
                grow={4.5}
                // icon={<span className="fa fa-money" />}
                color="green"
                details={<Details.Funders />}
              >
                <FlexCanvas.Field
                  title="Lista de actividades de captación"
                  dataKey="funds.funders"
                  format={this._format()}
                />
              </FlexCanvas.Item>
            </FlexCanvas.Row>
          </FlexCanvas.Column>
          <FlexCanvas.Column>
            <FlexCanvas.Item
              title="Competidores"
              // icon={<span className="fa fa-thumb-tack" />}
              dataKey="competitors"
              details={<Details.Competitors />}
            >
              <FlexCanvas.Table columns={["Nombre", "Partido"]} />
            </FlexCanvas.Item>
            <FlexCanvas.Item
              title="Equipo"
              // icon={<span className="fa fa-users" />}
              dataKey="team"
              format={this._format("team")}
              details={<Details.Team />}
            >
              <FlexCanvas.Table columns={["Nombre", "Cargo"]} />
            </FlexCanvas.Item>
          </FlexCanvas.Column>
        </FlexCanvas.Row>
      </FlexCanvas>
    );
  }
}
