import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import admin from "./admin";
import hotnew from "./client/hotnew";
import nav from "./client/detailnew";
import list from "./client/list_news";
import loginadmin from "./loginadmin";
import loginmember from "./client/registration";
import error404 from "./error404";
import about from "./client/about";
import s from "./client/demo";
import {
  setTranslations,
  setDefaultLanguage,
  translate,
  setLanguage
} from "react-multi-lang";
import vn from "./translations/vn.json";
import en from "./translations/en.json";
setTranslations({ vn, en });
setDefaultLanguage("vn");

if (!localStorage.getItem("lang")) {
  localStorage.setItem("lang", "/vn");
}
class Index extends Component {
  constructor() {
    super();
    this.state = { loading: true, data: null, role: "" };
  }
  componentDidMount() {
    this.setState({
      data: localStorage.getItem("loginadmin"),
      role: localStorage.getItem("role")
    });
    if (localStorage.getItem("lang") == "/en") {
      setLanguage("en");
    } else if (localStorage.getItem("lang") == "/vn") {
      setLanguage("vn");
    } else {
      setLanguage("vn");
    }
  }

  render() {
    const { data, role } = this.state;
    return (
      <Router>
        <React.Fragment>
          <Route exact path="/" component={hotnew} />

          <Route exact path="/demo" component={s} />
          <Route path="/edit-member" component={loginmember} />
          <Route path="/add-product-member" component={loginmember} />
          <Route path="/about" component={about} />
          <Route path="/detail/:id-:slug" component={nav} />
          <Route path="/list-news/:cate/:id" component={list} />
          <Route path="/member-login" component={loginmember} />
          <Route path="/client-pay" component={loginmember} />
          {/* <Route component={error404} /> */}
          {data ? (
            <React.Fragment>
              <Route path="/admin" component={admin} />
              {role == 2 ? (
                ""
              ) : (
                <React.Fragment>
                  <Route path="/dashboard" component={admin} />
                  <Route path="/member" component={admin} />
                  <Route path="/users" component={admin} />
                </React.Fragment>
              )}
              <Route path="/news" component={admin} />
              <Route path="/category" component={admin} />
              <Route path="/admin-about" component={admin} />
              <Route path="/member-pay" component={admin} />
              <Route path="/confirm-views" component={admin} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Route path="/admin" component={loginadmin} />
              <Route path="/dashboard" component={loginadmin} />
              <Route path="/member" component={loginadmin} />
              <Route path="/news" component={loginadmin} />
              <Route path="/users" component={loginadmin} />
              <Route path="/category" component={loginadmin} />
              <Route path="/admin-about" component={loginadmin} />
              <Route path="/member-pay" component={loginadmin} />
              <Route path="/confirm-views" component={loginadmin} />
            </React.Fragment>
          )}
        </React.Fragment>
      </Router>
    );
  }
}
if (document.getElementById("home")) {
  ReactDOM.render(<Index />, document.getElementById("home"));
}
export default translate(Index);
