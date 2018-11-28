import React, { Component } from "react";
import Nav from "./nav";
import Footer from "./footer";
import $ from "jquery";
import axios from "axios";
import hotnew from "./hotnew";
import {
  setTranslations,
  setDefaultLanguage,
  translate,
  setLanguage
} from "react-multi-lang";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Detailmember from "./detailmember";
class registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
      member: "",
      name: "",
      email: "",
      password: "",
      country: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitaccount = this.submitaccount.bind(this);
    this.submitaccount = this.submitaccount.bind(this);
    this.name = this.name.bind(this);
    this.email = this.email.bind(this);
    this.password = this.password.bind(this);
    this.country = this.country.bind(this);
    this.emaillogin = this.emaillogin.bind(this);
  }
  componentDidMount() {
    this.setState({ detailMember: localStorage.getItem("loginmember") });
  }
  name(e) {
    this.setState({ name: e.target.value });
  }
  email(e) {
    this.setState({ email: e.target.value });
    const data = {
      email: e.target.value
    };
    axios
      .post("http://localhost:8000/checkmember", data)
      .then(req => req.data)
      .then(data => {
        if (data == "error") {
          this.setState({ erroremail: "" });
        } else {
          this.setState({ erroremail: "ok" });
        }
      });
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
  emaillogin() {}
  submitaccount(e) {
    e.preventDefault();
    const datas = {
      email: $("#email").val(),
      password: $("#password").val()
    };
    axios
      .post("http://localhost:8000/postLoginMember/", datas)
      .then(req => req.data)
      .then(data => {
        console.log(data);
        if (data.postLoginMember == "value") {
          localStorage.setItem("loginmember", true);
          localStorage.setItem("namemember", data.name);
          localStorage.setItem("emailmember", data.email);
          localStorage.setItem("id_member", data.id_member);
          localStorage.setItem("country", data.country);
          this.setState({ member: localStorage.getItem("loginmember") });
        } else {
          this.setState({ error: "ok" });
        }
      });
  }
  render() {
    const { data, loading } = this.state;
    const FadingRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={props => <Redirect to="/" />} />
    );
    return (
      <React.Fragment>
        {this.state.detailMember ? (
          <Detailmember />
        ) : (
          <React.Fragment>
            {this.state.member ? (
              <FadingRoute path="/" component={hotnew} />
            ) : (
              <React.Fragment>
                <Nav />
                <div class="section">
                  <div class="container">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="section-row">
                          <h3>{this.props.t("member.Register account")}</h3>
                          {data == "ok" && (
                            <div class="alert alert-success alert-dismissible">
                              <strong>Success!</strong> This alert box could
                              indicate a successful or positive action.
                            </div>
                          )}
                          <form onSubmit={this.handleSubmit}>
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
                                  {this.state.name.length < 6 ? (
                                    <label style={{ color: "red" }}>
                                      Name must be greater than 6
                                    </label>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div class="form-group">
                                  <span>{this.props.t("member.Email")}</span>
                                  <input
                                    class="input"
                                    type="email"
                                    onChange={this.email}
                                    value={this.state.email}
                                  />
                                  {this.state.email == "" ||
                                  this.state.erroremail == "" ? (
                                    <label style={{ color: "red" }}>
                                      {this.state.erroremail == ""
                                        ? "duplicate items"
                                        : "Email is not empty"}
                                    </label>
                                  ) : (
                                    ""
                                  )}
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
                                  {this.state.password.length < 6 ? (
                                    <label style={{ color: "red" }}>
                                      Password must be greater than 6
                                    </label>
                                  ) : (
                                    ""
                                  )}
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
                                    <option value="0">Choose ...</option>
                                    <option value="1">Việt nam</option>
                                    <option value="2">U.S</option>
                                  </select>
                                  {this.state.country == 0 ? (
                                    <label style={{ color: "red" }}>
                                      Choose country
                                    </label>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div class="col-md-12">
                                {this.state.name.length < 6 ||
                                this.state.password < 6 ||
                                this.state.email == "" ||
                                this.state.country == 0 ||
                                this.state.erroremail == "" ? (
                                  <button
                                    class="primary-button"
                                    style={{ backgroundColor: "#9c8585" }}
                                    disabled
                                  >
                                    {this.props.t("member.Register")}
                                  </button>
                                ) : (
                                  <button class="primary-button">
                                    {this.props.t("member.Register")}
                                  </button>
                                )}
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="section-row">
                          <h3>{this.props.t("member.Login account")}</h3>
                          {this.state.error == "ok" && (
                            <div class="alert alert-danger alert-dismissible">
                              <strong>Error!</strong> account or password is
                              incorrect
                            </div>
                          )}
                          <form onSubmit={this.submitaccount}>
                            <div class="row">
                              <div class="col-md-11">
                                <div class="form-group">
                                  <span>{this.props.t("member.Email")}</span>
                                  <input
                                    class="input"
                                    type=""
                                    name="email"
                                    id="email"
                                    onChange={this.emaillogin}
                                  />
                                </div>
                              </div>
                              <div class="col-md-11">
                                <div class="form-group">
                                  <span>{this.props.t("member.Password")}</span>
                                  <input
                                    class="input"
                                    type="Password"
                                    name="subject"
                                    id="password"
                                  />
                                </div>
                              </div>
                              <div class="col-md-12">
                                <button class="primary-button">
                                  {this.props.t("member.Login")}
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Footer />
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
export default translate(registration);
