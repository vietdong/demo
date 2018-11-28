import React, { Component } from "react";
import axios from "axios";
import {
  setTranslations,
  setDefaultLanguage,
  translate,
  setLanguage
} from "react-multi-lang";

class editmember extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, data: null, member: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.name = this.name.bind(this);
    this.email = this.email.bind(this);
    this.password = this.password.bind(this);
    this.country = this.country.bind(this);
  }
  componentDidMount() {
    let id = localStorage.getItem("id_member");
    axios.get("http://localhost:8000/editmember/" + id).then(data => {
      this.setState({
        name: data.data.name,
        id: data.data.id,
        email: data.data.email,
        country: data.data.country
      });
    });
  }
  name(e) {
    this.setState({ name: e.target.value });
  }
  email(e) {
    this.setState({ email: e.target.value });
  }
  password(e) {
    this.setState({ password: e.target.value });
  }
  country(e) {
    this.setState({ country: e.target.value });
    console.log(this.state.country);
  }
  handleSubmit(event) {
    event.preventDefault();
    const datas = {
      client: "ok",
      id: this.state.id,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      country: this.state.country,
      active: 0
    };
    axios
      .post("http://localhost:8000/savemember/", datas)
      .then(req => req.data)
      .then(data => {
        // const array = this.state.data;
        console.log(data);
        this.setState({ data: data });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: true });
      });
  }

  render() {
    return (
      <div>
        <h4>{this.props.t("member.Edit Member")}</h4>
        <form onSubmit={this.handleSubmit}>
          {this.state.data == "ok" && (
            <div class="alert alert-success alert-dismissible">
              <strong>Success!</strong> This alert box could indicate a
              successful or positive action.
            </div>
          )}
          <div class="row">
            <div class="col-md-10">
              <div class="form-group">
                <span>{this.props.t("member.Name")}</span>
                <input
                  class="input"
                  type="text"
                  onChange={this.name}
                  value={this.state.name}
                />
              </div>
              <div class="form-group">
                <span>{this.props.t("member.Email")}</span>
                <input
                  class="input"
                  type=""
                  onChange={this.email}
                  value={this.state.email}
                />
              </div>
            </div>
            <div class="col-md-10">
              <div class="form-group">
                <span>{this.props.t("member.Password")}</span>
                <input
                  class="input"
                  type="Password"
                  onChange={this.password}
                  value={this.state.password}
                />
              </div>
            </div>
            <div class="col-md-10">
              <div class="form-group">
                <span>{this.props.t("member.country")}</span>
                <select
                  class="input"
                  onChange={this.country}
                  value={this.state.country}
                >
                  <option value="1">Việt nam</option>
                  <option value="2">U.S</option>
                </select>
              </div>
            </div>
            <div class="col-md-12">
              <button class="primary-button">
                {this.props.t("member.save")}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default translate(editmember);
