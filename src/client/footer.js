import React, { Component } from "react";
import {
  setTranslations,
  setDefaultLanguage,
  translate,
  setLanguage
} from "react-multi-lang";
import axios from "axios";
import logo from "../images/logos.png";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class footer extends Component {
  constructor(props) {
    super(props);
    this.state = { data: "" };
  }
  componentDidMount() {
    axios
      .get("http://localhost:8000/category/" + this.props.t("member.lang"), {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })
      .then(req => req.data)
      .then(data => {
        console.log(data);
        this.setState({ data: data.cate });
      });
  }
  componentWillReceiveProps(nextProps) {
    axios
      .get("http://localhost:8000/category/" + this.props.t("member.lang"), {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })
      .then(req => req.data)
      .then(data => {
        this.setState({ data: data.cate });
      });
  }
  render() {
    const { data } = this.state;
    return (
      <footer id="footer">
        <div class="container">
          <div class="row">
            <div class="col-md-5">
              <div class="footer-widget">
                <div class="footer-logo">
                  <a href="index.html" class="logo">
                    <img src={logo} alt="" width="150px" />
                  </a>
                </div>
                <ul class="footer-nav">
                  <li>
                    <a href="#">{this.props.t("footer.footer")}</a>
                  </li>
                  <li>
                    <a href="#">{this.props.t("footer.footer2")}</a>
                  </li>
                </ul>
                <div class="footer-copyright">
                  <span>{this.props.t("footer.footer3")}</span>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="row">
                <div class="col-md-6">
                  <div class="footer-widget">
                    <h3 class="footer-title">
                      {" "}
                      {this.props.t("footer.about")}
                    </h3>
                    <ul class="footer-links">
                      <Link to="/about>"> {this.props.t("footer.about")}</Link>
                    </ul>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="footer-widget">
                    <h3 class="footer-title">
                      {this.props.t("footer.category")}
                    </h3>

                    <ul class="footer-links">
                      {data &&
                        data.map((index, i) => (
                          <li>
                            <Link
                              to={"/list-news/" + index.slug + "/" + index.id}
                            >
                              {index.name}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-3">
              <div class="footer-widget">
                <h3 class="footer-title">
                  {this.props.t("footer.Newsletter")}
                </h3>
                <div class="footer-newsletter">
                  <form>
                    <input
                      class="input"
                      type="email"
                      name="newsletter"
                      placeholder="Enter your email"
                    />
                    <button class="newsletter-btn">
                      <i class="fa fa-paper-plane" />
                    </button>
                  </form>
                </div>
                <ul class="footer-social">
                  <li>
                    <a href="#">
                      <i class="fa fa-facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-google-plus" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-pinterest" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
export default translate(footer);
