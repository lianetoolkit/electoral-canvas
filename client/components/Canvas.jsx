import React from "react";
import FlexCanvas from "react-flexcanvas";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";
import Label from "components/Label.jsx";

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
            <strong>{profile.tag}</strong> - {profile.name}{" "}
            {this._label(
              profile.demographics && profile.demographics.age
                ? profile.demographics.age + " anos"
                : ""
            )}
            {this._label(profile.location)}
            {this._label(
              profile.demographics && profile.demographics.education
                ? "Ensino " + education[profile.demographics.education]
                : ""
            )}
            {this._label(
              profile.demographics && profile.demographics.ethnicity
                ? race[profile.demographics.ethnicity]
                : ""
            )}
            {this._label(
              profile.demographics && profile.demographics.gender
                ? gender[profile.demographics.gender]
                : ""
            )}
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
            title="Nome da candidata"
            color="blue"
            dataKey="basic_info.name_bb"
          />
          <FlexCanvas.Item
            title="Cargo que concorre"
            color="blue"
            dataKey="basic_info.electoral_post"
          />
          <FlexCanvas.Item
            title="Local"
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
                title="Princípios"
                color="pink"
                grow={1}
                icon={<span className="fa fa-check-circle" />}
                dataKey="principles"
              >
                <FlexCanvas.List title="Princípio" amount={3} />
              </FlexCanvas.Item>
              <FlexCanvas.Item
                title="Candidata"
                color="pink"
                grow={3}
                featured
                icon={<span className="fa fa-address-card" />}
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
                    title="Um talento"
                    dataKey="candidate.talent"
                  />
                  <FlexCanvas.Field
                    title="Uma limitação"
                    dataKey="candidate.limitation"
                  />
                </FlexCanvas.FieldGroup>
                <FlexCanvas.Field
                  title="Uma experiência de vida"
                  grow={2}
                  dataKey="candidate.life_experience"
                  format={this._format()}
                />
              </FlexCanvas.Item>
              <FlexCanvas.Item
                title="Diferenciais de campanha"
                grow={1}
                icon={<span className="fa fa-cubes" />}
              >
                <FlexCanvas.Field
                  title="O que eu tenho que meus competidores não tem"
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
                icon={<span className="fa fa-heart" />}
                dataKey="causes"
              >
                <FlexCanvas.List title="Causa" amount={3} />
              </FlexCanvas.Item>
              <FlexCanvas.Item
                title="Compromissos"
                color="pink"
                grow={1}
                icon={<span className="fa fa-list-alt" />}
                dataKey="commitments"
              >
                <FlexCanvas.List title="Compromisso" amount={3} />
              </FlexCanvas.Item>
              <FlexCanvas.Item
                title="Eleitorado"
                color="red"
                grow={3}
                icon={<span className="fa fa-filter" />}
                dataKey="electorate"
                format={this._format("electorate")}
              >
                <FlexCanvas.List title="Perfil" amount={3} />
              </FlexCanvas.Item>
            </FlexCanvas.Row>
            <FlexCanvas.Row grow={1}>
              <FlexCanvas.Item
                title="Quanto vai custar sua campanha?"
                grow={2.5}
                icon={<span className="fa fa-money" />}
                color="green"
              >
                <FlexCanvas.Field
                  title="Valor total de custo"
                  dataKey="funds.expense"
                  format={this._format()}
                />
              </FlexCanvas.Item>
              <FlexCanvas.Item
                title="Como você vai arrecadar?"
                grow={4.5}
                icon={<span className="fa fa-money" />}
                color="green"
              >
                <FlexCanvas.Field
                  title="Lista de atividades de captação"
                  dataKey="funds.funders"
                  format={this._format()}
                />
              </FlexCanvas.Item>
            </FlexCanvas.Row>
          </FlexCanvas.Column>
          <FlexCanvas.Column>
            <FlexCanvas.Item
              title="Competidores"
              icon={<span className="fa fa-thumb-tack" />}
              dataKey="competitors"
            >
              <FlexCanvas.Table columns={["Nome", "Partido"]} />
            </FlexCanvas.Item>
            <FlexCanvas.Item
              title="Equipe"
              icon={<span className="fa fa-users" />}
              dataKey="team"
              format={this._format("team")}
            >
              <FlexCanvas.Table columns={["Nome", "Cargo"]} />
            </FlexCanvas.Item>
          </FlexCanvas.Column>
        </FlexCanvas.Row>
      </FlexCanvas>
    );
  }
}
