import React, { Component } from "react";
import "./css/admin.css";
import axios from "axios";
import { Bar } from "react-chartjs-2";
var views = localStorage.getItem("views");
var day = localStorage.getItem("day");

// console.log(list(localStorage.getItem("s")));
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:8000/count_dashboad")
      .then(req => req.data)
      .then(data => {
        this.setState({ data: data });
      });
    axios
      .get("http://localhost:8000/chart")
      .then(req => req.data)
      .then(data => {
        this.setState({ views: data.views, day: data.date });
        localStorage.setItem("views", data.views);
        localStorage.setItem("day", data.date);
      });
  }
  componentWillReceiveProps() {
    axios
      .get("http://localhost:8000/chart")
      .then(req => req.data)
      .then(data => {
        this.setState({ views: data.views, day: data.date });
        localStorage.setItem("views", data.views);
        localStorage.setItem("day", data.date);
      });
  }
  render() {
    var day = this.state.day;
    var view = this.state.views;
    const data = {
      labels: day,
      datasets: [
        {
          label: "views",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: view
        }
      ]
    };
    return (
      <div className="main-panels">
        <div className="content-wrapper">
          <div className="row purchace-popup" />
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 grid-margin stretch-card">
              <div className="card card-statistics">
                <div className="card-body">
                  <div className="clearfix">
                    <div className="float-left">
                      <i className="mdi mdi-cube text-danger icon-lg" />
                    </div>
                    <div className="float-right">
                      <p className="mb-0 text-right">Posts</p>
                      <div className="fluid-container">
                        <h3 className="font-weight-medium text-right mb-0">
                          {this.state.data.post && this.state.data.post}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted mt-3 mb-0">
                    {this.state.data.post_vn && this.state.data.post_vn}&nbsp;
                    articles in Vietnamese <br />
                    {this.state.data.post_en && this.state.data.post_en}&nbsp;
                    articles in english
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 grid-margin stretch-card">
              <div className="card card-statistics">
                <div className="card-body">
                  <div className="clearfix">
                    <div className="float-left">
                      <i className="mdi mdi-account-location text-info icon-lg" />
                    </div>
                    <div className="float-right">
                      <p className="mb-0 text-right">Category</p>
                      <div className="fluid-container">
                        <h3 className="font-weight-medium text-right mb-0">
                          {this.state.data.category && this.state.data.category}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted mt-3 mb-0">
                    {this.state.data.category_vn && this.state.data.category_vn}
                    &nbsp; categories in Vietnamese
                    <br />
                    {this.state.data.category_vn && this.state.data.category_vn}
                    &nbsp;categories in English
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 grid-margin stretch-card">
              <div className="card card-statistics">
                <div className="card-body">
                  <div className="clearfix">
                    <div className="float-left">
                      <i className="mdi mdi-receipt text-warning icon-lg" />
                    </div>
                    <div className="float-right">
                      <p className="mb-0 text-right">Member</p>
                      <div className="fluid-container">
                        <h3 className="font-weight-medium text-right mb-0">
                          {this.state.data.member && this.state.data.member}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted mt-3 mb-0">
                    <i
                      className="mdi mdi-bookmark-outline mr-1"
                      aria-hidden="true"
                    />{" "}
                    Product-wise sales
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 grid-margin stretch-card">
              <div className="card card-statistics">
                <div className="card-body">
                  <div className="clearfix">
                    <div className="float-left">
                      <i className="mdi mdi-poll-box text-success icon-lg" />
                    </div>
                    <div className="float-right">
                      <p className="mb-0 text-right">uesr</p>
                      <div className="fluid-container">
                        <h3 className="font-weight-medium text-right mb-0">
                          {this.state.data.user && this.state.data.user}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted mt-3 mb-0">
                    <i className="mdi mdi-calendar mr-1" aria-hidden="true" />{" "}
                    Weekly Sales
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4>View graph of last 7 days</h4>
          <Bar
            data={data}
            width={30}
            height={400}
            options={{
              maintainAspectRatio: false
            }}
          />
        </div>
        <footer
          className="footer"
          style={{ position: "fixed", bottom: "0", width: "100%" }}
        >
          <div className="container-fluid clearfix">
            <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">
              Copyright © 2018
              <a href="http://www.bootstrapdash.com/" target="_blank">
                Bootstrapdash
              </a>
              . All rights reserved.
            </span>
            <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
              Hand-crafted & made with
              <i className="mdi mdi-heart text-danger" />
            </span>
          </div>
        </footer>
      </div>
    );
  }
}
export default Dashboard;
