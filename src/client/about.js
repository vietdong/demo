import React, { Component } from "react";
import Nav from "./nav";
import Footer from "./footer";
import { Editor } from "@tinymce/tinymce-react";
import moment from "moment";
import axios from "axios";
import $ from "jquery";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  setTranslations,
  setDefaultLanguage,
  translate,
  setLanguage
} from "react-multi-lang";
class about extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "", loading: false, en: "", vn: "" };
  }
  componentDidMount() {
    axios
      .get("http://localhost:8000/about/" + this.props.t("member.lang"))
      .then(req => req.data)
      .then(data => {
        $("#about").html(data.text);
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: true });
      });

    axios
      .get("http://localhost:8000/hot_news/" + this.props.t("member.lang"))
      .then(req => req.data)
      .then(data => {
        this.setState({
          most: data.most
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: true });
      });
  }
  componentWillReceiveProps(nextProps) {
    this.componentDidMount();
  }
  render() {
    console.log(moment().startOf("day"));
    const url = "http://localhost:8000/image/";
    return (
      <div>
        {this.state.loading ? <h1>loading...</h1> : ""}
        <Nav />
        <div class="page-header">
          <div class="container">
            <div class="row">
              <div class="col-md-10">
                <ul class="page-header-breadcrumb">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>About Us</li>
                </ul>
                <h1>About Us</h1>
              </div>
            </div>
          </div>
        </div>
        <div class="section">
          <div class="container">
            <div class="row">
              <div class="col-md-8" id="about" />

              <div class="col-md-4">
                <div class="aside-widget text-center">
                  <a
                    href="#"
                    style={{ display: "inline-block", margin: "auto" }}
                  >
                    <img class="img-responsive" src="./img/ad-1.jpg" alt="" />
                  </a>
                </div>

                <div class="aside-widget">
                  <div class="section-title">
                    <h2>Most Read</h2>
                  </div>
                  {this.state.most &&
                    this.state.most.map((index, i) => (
                      <div class="post post-widget">
                        <Link
                          to={"detail/" + index.id + "-" + index.slug}
                          class="post-img"
                          onClick={() => this.clickviews(index.id)}
                        >
                          <img src={url + index.image} alt="" />
                        </Link>
                        <div class="post-body">
                          <h3 class="post-title">
                            <a onClick={() => this.clickviews(index.id)}>
                              {index.title}
                            </a>
                          </h3>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default translate(about);
