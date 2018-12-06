import React, { Component } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import $ from "jquery";
import "../css/client.css";
import logo from "../images/logos.png";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import proxy from "http-proxy-middleware";
import {
  setTranslations,
  setDefaultLanguage,
  translate,
  setLanguage
} from "react-multi-lang";
import vn from "../translations/vn.json";
import en from "../translations/en.json";
setTranslations({ vn, en });
setDefaultLanguage("vn");
class nav extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, data: null };
    this.searchs = this.searchs.bind(this);
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
        this.setState({ data: data.cate });
      });
  }
  searchs(event) {
    event.preventDefault();

    const data = {
      search: event.target.value
    };
    axios
      .post("http://localhost:8000/search", data)
      .then(req => req.data)
      .then(data => {
        this.setState({ items: data });
        $("#div_se").css("display", "block");
      });
  }
  search() {
    $(".search-form").addClass("active");
  }
  close() {
    $(".search-input").val("");
    $(".search-form").removeClass("active");
  }
  changeLang(lang) {
    setLanguage(lang);
    var id = lang == "vn" ? 1 : 2;
    axios
      .get("http://localhost:8000/category/" + id, {
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
    const { data, search, items } = this.state;
    const lang = localStorage.getItem("lang");
    const url = "http://localhost:8000/image/";
    return (
      <header id="header">
        <div id="nav">
          <div id="nav-fixed">
            <div className="container">
              <div className="nav-logo">
                <a href="index.html" className="logo">
                  {/* <img src="./img/logo.png" alt="" /> */}
                </a>
              </div>

              <ul className="nav-menus ">
                <li>
                  <Link to={lang}>
                    <img src={logo} alt="" width="80px" />
                  </Link>
                </li>
                <React.Fragment>
                  {data &&
                    data.map((index, i) => (
                      <li>
                        <Link to={"/list-news/" + index.slug + "/" + index.id}>
                          {index.name}
                        </Link>
                      </li>
                    ))}
                </React.Fragment>
                <li>
                  <Link to="/about">Abouts</Link>
                </li>
              </ul>

              <div className="nav-btns">
                <div class="nav-btns">
                  <button class="aside-btn">
                    {localStorage.getItem("loginmember") ? (
                      <Link to="/member-login">
                        {localStorage.getItem("namemember")} ->>
                      </Link>
                    ) : (
                      <Link to="/member-login">
                        <i class="fa fa-sign-in" />
                      </Link>
                    )}
                  </button>

                  <button class="search-btn" onClick={this.search}>
                    <i class="fa fa-search" />
                  </button>
                  <a
                    style={{ marginRight: "10px" }}
                    onClick={() => this.changeLang("vn")}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/800px-Flag_of_Vietnam.svg.png"
                      width="23px"
                    />
                  </a>
                  <a onClick={() => this.changeLang("en")}>
                    <img
                      src="https://kenh14cdn.com/2017/2-1503128133740.png"
                      width="30px"
                    />
                  </a>

                  <div class="search-form">
                    <input
                      class="search-input"
                      type="text"
                      name="search"
                      placeholder="Enter Your Search ..."
                      onChange={this.searchs}
                    />
                    <div
                      style={{
                        width: "101%",
                        marginLeft: "-5px",
                        display: "none"
                      }}
                      id="div_se"
                    >
                      <table class="table" style={{ backgroundColor: "#fff" }}>
                        <thead>
                          <tr>
                            <th>id></th>
                            <th>image</th>
                            <th>Title</th>
                          </tr>
                        </thead>
                        <tbody className="ul_search">
                          <React.Fragment>
                            {items &&
                              items.map((index, i) => (
                                <tr>
                                  <td>{index.id}</td>
                                  <td>
                                    <img
                                      src={url + index.image}
                                      className="image"
                                      style={{
                                        width: "60px",
                                        height: "40px"
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <Link
                                      to={
                                        "detail/" +
                                        index.id +
                                        "-" +
                                        index.slug +
                                        ".html"
                                      }
                                    >
                                      {index.title}
                                    </Link>{" "}
                                  </td>
                                </tr>
                              ))}
                          </React.Fragment>
                        </tbody>
                      </table>
                    </div>
                    <button class="search-close" onClick={this.close}>
                      <i class="fa fa-times" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
export default translate(nav);
