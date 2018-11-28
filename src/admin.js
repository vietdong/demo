import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./css/admin.css";
import logo from "./images/logo.svg";
import logomini from "./images/logo-mini.svg";
import face3 from "./images/faces/face3.jpg";
import profile from "./logo.svg";
import Dashboard from "./dashboard";
import Member from "./member";
import news from "./news";
import users from "./users";
import category from "./category";
import Login from "./loginadmin";
import memberpay from "./memberpay";
import { Helmet } from "react-helmet";
import about from "./about";
class Admin extends Component {
  constructor() {
    super();
    this.state = { test: true, name: "", role: "" };
  }
  componentDidMount() {
    this.setState({
      name: localStorage.getItem("name"),
      loading: false,
      role: localStorage.getItem("role")
    });
    // console.log(data);
  }
  logoutadmin = () => {
    console.log("đ");
    localStorage.removeItem("loginadmin");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    this.setState({ test: localStorage.getItem("loginadmin") });
  };
  handleClick(e) {
    var id = e.target.getAttribute("dd");
    axios.get("http://localhost:8000/books/" + id);
  }
  render() {
    const { test, name, role } = this.state;

    return (
      <Router>
        <React.Fragment>
          <Helmet>
            <title>Dashboard</title>
          </Helmet>
          {!test ? (
            <div>
              <Login />
            </div>
          ) : (
            <div className="container-scroller">
              <nav className="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
                <div className="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center">
                  <a className="navbar-brand brand-logo" href="index.html">
                    <img src={logo} />
                  </a>
                  <a className="navbar-brand brand-logo-mini" href="index.html">
                    <img src={logomini} alt="logo" />
                  </a>
                </div>
                <div className="navbar-menu-wrapper d-flex align-items-center">
                  <ul className="navbar-nav navbar-nav-left header-links d-none d-md-flex">
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Schedule
                        <span className="badge badge-primary ml-1">New</span>
                      </a>
                    </li>
                    <li className="nav-item active">
                      <a href="#" className="nav-link">
                        <i className="mdi mdi-elevation-rise" />
                        Reports
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        <i className="mdi mdi-bookmark-plus-outline" />
                        Score
                      </a>
                    </li>
                  </ul>
                  <ul className="navbar-nav navbar-nav-right">
                    <li className="nav-item dropdown">
                      <div
                        className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                        aria-labelledby="messageDropdown"
                      >
                        <div className="dropdown-item">
                          <p className="mb-0 font-weight-normal float-left">
                            You have 7 unread mails
                          </p>
                          <span className="badge badge-info badge-pill float-right">
                            View all
                          </span>
                        </div>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item preview-item">
                          <div className="preview-thumbnail">
                            <img src={profile} alt="profile image" />
                          </div>
                          <div className="preview-item-content flex-grow">
                            <h6 className="preview-subject ellipsis font-weight-medium text-dark">
                              David Grey
                              <span className="float-right font-weight-light small-text">
                                1 Minutes ago
                              </span>
                            </h6>
                            <p className="font-weight-light small-text">
                              The meeting is cancelled
                            </p>
                          </div>
                        </a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item preview-item">
                          <div className="preview-thumbnail">
                            <img src={profile} alt="profile image" />
                          </div>
                          <div className="preview-item-content flex-grow">
                            <h6 className="preview-subject ellipsis font-weight-medium text-dark">
                              Tim Cook
                              <span className="float-right font-weight-light small-text">
                                15 Minutes ago
                              </span>
                            </h6>
                            <p className="font-weight-light small-text">
                              New product launch
                            </p>
                          </div>
                        </a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item preview-item">
                          <div className="preview-thumbnail">
                            <img
                              src={face3}
                              alt="image"
                              className="profile-pic"
                            />
                          </div>
                          <div className="preview-item-content flex-grow">
                            <h6 className="preview-subject ellipsis font-weight-medium text-dark">
                              {" "}
                              Johnson
                              <span className="float-right font-weight-light small-text">
                                18 Minutes ago
                              </span>
                            </h6>
                            <p className="font-weight-light small-text">
                              Upcoming board meeting
                            </p>
                          </div>
                        </a>
                      </div>
                    </li>
                    <li className="nav-item dropdown">
                      <div
                        className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                        aria-labelledby="notificationDropdown"
                      >
                        <a className="dropdown-item">
                          <p className="mb-0 font-weight-normal float-left">
                            You have 4 new notifications
                          </p>
                          <span className="badge badge-pill badge-warning float-right">
                            View all
                          </span>
                        </a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item preview-item">
                          <div className="preview-thumbnail">
                            <div className="preview-icon bg-success">
                              <i className="mdi mdi-alert-circle-outline mx-0" />
                            </div>
                          </div>
                          <div className="preview-item-content">
                            <h6 className="preview-subject font-weight-medium text-dark">
                              Application Error
                            </h6>
                            <p className="font-weight-light small-text">
                              Just now
                            </p>
                          </div>
                        </a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item preview-item">
                          <div className="preview-thumbnail">
                            <div className="preview-icon bg-warning">
                              <i className="mdi mdi-comment-text-outline mx-0" />
                            </div>
                          </div>
                          <div className="preview-item-content">
                            <h6 className="preview-subject font-weight-medium text-dark">
                              Settings
                            </h6>
                            <p className="font-weight-light small-text">
                              Private message
                            </p>
                          </div>
                        </a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item preview-item">
                          <div className="preview-thumbnail">
                            <div className="preview-icon bg-info">
                              <i className="mdi mdi-email-outline mx-0" />
                            </div>
                          </div>
                          <div className="preview-item-content">
                            <h6 className="preview-subject font-weight-medium text-dark">
                              New user registration
                            </h6>
                            <p className="font-weight-light small-text">
                              2 days ago
                            </p>
                          </div>
                        </a>
                      </div>
                    </li>
                    <li className="nav-item dropdown d-none d-xl-inline-block">
                      <a
                        className="nav-link dropdown-toggle"
                        id="UserDropdown"
                        href="#"
                        data-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span className="profile-text">Hello, {name} !</span>
                        <img
                          src={profile}
                          alt="profile image"
                          style={{ width: "50px" }}
                        />
                      </a>
                      <div
                        className="dropdown-menu dropdown-menu-right navbar-dropdown"
                        aria-labelledby="UserDropdown"
                      >
                        <a className="dropdown-item p-0">
                          <div className="d-flex border-bottom">
                            <div className="py-3 px-4 d-flex align-items-center justify-content-center">
                              <i className="mdi mdi-bookmark-plus-outline mr-0 text-gray" />
                            </div>
                            <div className="py-3 px-4 d-flex align-items-center justify-content-center border-left border-right">
                              <i className="mdi mdi-account-outline mr-0 text-gray" />
                            </div>
                            <div className="py-3 px-4 d-flex align-items-center justify-content-center">
                              <i className="mdi mdi-alarm-check mr-0 text-gray" />
                            </div>
                          </div>
                        </a>
                        <a className="dropdown-item mt-2">Manage Accounts</a>
                        <a className="dropdown-item">Change Password</a>
                        <a className="dropdown-item">Check Inbox</a>
                        <a className="dropdown-item" onClick={this.logoutadmin}>
                          Sign Out
                        </a>
                      </div>
                    </li>
                  </ul>
                  <button
                    className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
                    type="button"
                    data-toggle="offcanvas"
                  >
                    <span className="mdi mdi-menu" />
                  </button>
                </div>
              </nav>

              <div className="container-fluid page-body-wrapper">
                <nav className="sidebar sidebar-offcanvas" id="sidebar">
                  <ul className="nav">
                    <li className="nav-item nav-profile">
                      <div className="nav-link">
                        <div className="user-wrapper">
                          <div className="profile-image">
                            <img src={profile} alt="profile image" />
                          </div>
                          <div className="text-wrapper">
                            <p className="profile-name">{name}</p>
                            <div>
                              <small className="designation text-muted">
                                Manager
                              </small>
                              <span className="status-indicator online" />
                            </div>
                          </div>
                        </div>
                        <button className="btn btn-success btn-block">
                          New Project
                          <i className="mdi mdi-plus" />
                        </button>
                      </div>
                    </li>

                    <React.Fragment>
                      {role == 2 ? (
                        ""
                      ) : (
                        <React.Fragment>
                          <li className="nav-item">
                            <Link to="/dashboard" className="nav-link">
                              <i className="menu-icon mdi fa fa-tachometer" />
                              <span className="menu-title">Dashboard</span>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/member" className="nav-link">
                              <i className="menu-icon mdi 	fa fa-address-book-o" />
                              <span className="menu-title">Member</span>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              to="users"
                              className="nav-link"
                              href="pages/charts/chartjs.html"
                            >
                              <i className="menu-icon mdi 	fa fa-user-secret" />
                              <span className="menu-title">User Pages</span>
                            </Link>
                          </li>
                        </React.Fragment>
                      )}
                    </React.Fragment>
                    <li className="nav-item">
                      <Link
                        to="/news"
                        className="nav-link"
                        href="pages/forms/basic_elements.html"
                      >
                        <i className="menu-icon mdi fa fa-bullhorn" />
                        <span className="menu-title">List of News</span>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        to="category"
                        className="nav-link"
                        href="pages/tables/basic-table.html"
                      >
                        <i className="menu-icon mdi 	fa fa-window-restore" />
                        <span className="menu-title">Category</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="admin-about" className="nav-link">
                        <i className="menu-icon mdi 	fa fa-calendar-o" />
                        <span className="menu-title">About</span>
                      </Link>
                    </li>

                    <li class="nav-item">
                      <a
                        class="nav-link"
                        data-toggle="collapse"
                        href="#ui-basic"
                        aria-expanded="false"
                        aria-controls="ui-basic"
                      >
                        <i class="menu-icon mdi fa fa-line-chart" />
                        <span class="menu-title">Seting pay</span>
                        <i class="menu-arrow" />
                      </a>
                      <div class="collapse" id="ui-basic">
                        <ul class="nav flex-column sub-menu">
                          <li class="nav-item">
                            <Link to="member-pay" className="nav-link">
                              Browse For Money
                            </Link>
                          </li>
                          <li class="nav-item">
                            <Link to="confirm-views" className="nav-link">
                              Confirm Views
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a href="/" className="nav-link" target="_blank">
                        <i className="menu-icon mdi fa fa-institution " />
                        <span className="menu-title">Homepage</span>
                      </a>
                    </li>
                  </ul>
                </nav>
                <div className="main-panel">
                  <Route path="/admin" component={Dashboard} />
                  <Route exact path="/member" component={Member} />
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/news" component={news} />
                  <Route path="/users" component={users} />
                  <Route path="/category" component={category} />
                  <Route path="/admin-about" component={about} />
                  <Route path="/member-pay" component={memberpay} />
                  <Route path="/confirm-views" component={Views} />
                </div>
              </div>
            </div>
          )}
        </React.Fragment>
      </Router>
    );
  }
}
class Views extends Component {
  constructor(props) {
    super(props);
    this.state = { views: "", usd: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.views = this.views.bind(this);
    this.usd = this.usd.bind(this);
  }
  componentDidMount() {
    axios
      .get("http://localhost:8000/pay/")
      .then(req => req.data)
      .then(data => {
        this.setState({ views: data[0].views, usd: data[0].money });
      });
  }
  views(e) {
    this.setState({ views: e.target.value });
  }
  usd(e) {
    this.setState({ usd: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const datas = {
      id: 1,
      views: this.state.views,
      money: this.state.usd
    };
    axios
      .post("http://localhost:8000/edit_pay/", datas)
      .then(req => req.data)
      .then(data => {
        this.setState({ data: true });
      });
  }
  render() {
    return (
      <div className="col-lg-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Confirm views vs price</h4>
            <div className="table-responsive" />
            <form onSubmit={this.handleSubmit}>
              <div>
                <span>Estimated views :</span>
                <input
                  type="text"
                  placeholder="views"
                  onChange={this.views}
                  value={this.state.views}
                />
              </div>

              <div>
                <span>USD :</span>
                <input
                  type="text"
                  placeholder="money"
                  onChange={this.usd}
                  value={this.state.usd}
                />
              </div>
              <br />
              <button type="submit" className="btn btn-primary">
                Save changes
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Admin;
