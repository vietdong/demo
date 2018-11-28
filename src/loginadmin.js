import React, { Component } from "react";
import "./css/loginadmin.css";
import axios from "axios";
import $ from "jquery";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Admin from "./admin";
import createHistory from "history/createBrowserHistory";
export default class loginadmin extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const datas = {
      email: $("#email").val(),
      password: $("#password").val()
    };
    axios
      .post("http://localhost:8000/postLogin/", datas)
      .then(req => req.data)
      .then(data => {
        console.log(data);
        if (data.postLogin == "value") {
          localStorage.setItem("loginadmin", true);
          localStorage.setItem("name", data.name);
          localStorage.setItem("name", data.email);
          localStorage.setItem("role", data.role);
          //   const history = createHistory();
          //   history.go(0);
          this.setState({ data: data });
        } else {
          localStorage.removeItem("loginadmin");
        }
      });
  }
  render() {
    const { data, loading } = this.state;
    return (
      <React.Fragment>
        {data ? (
          <Admin />
        ) : (
          <div>
            <div class="limiter">
              <div class="container-login100">
                <div class="wrap-login100">
                  <form
                    class="login100-form validate-form"
                    onSubmit={this.handleSubmit}
                  >
                    <span class="login100-form-title p-b-26">Welcome</span>
                    <span class="login100-form-title p-b-48">
                      <i class="fa fa-diamond" />
                    </span>

                    <div
                      class="wrap-input100 validate-input"
                      data-validate="Valid email is: a@b.c"
                    >
                      <input
                        class="input100"
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                      />
                    </div>

                    <div
                      class="wrap-input100 validate-input"
                      data-validate="Enter password"
                    >
                      <input
                        class="input100"
                        type="password"
                        name="pass"
                        id="password"
                        placeholder="Password"
                      />
                    </div>

                    <div class="container-login100-form-btn">
                      <div class="wrap-login100-form-btn">
                        <div class="login100-form-bgbtn" />
                        <button class="login100-form-btn">Login</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
