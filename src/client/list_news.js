import React, { Component } from "react";
import axios from "axios";
import Nav from "./nav";
import Footer from "./footer";
import qc from "../images/ad-1.jpg";
import qc2 from "../images/ad-2.jpg";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import logo from "../images/logos.png";
import {
  setTranslations,
  setDefaultLanguage,
  translate,
  setLanguage
} from "react-multi-lang";
class list_news extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      one: null,
      news: "",
      cate: "",
      hai: "",
      most: ""
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    axios
      .get("http://localhost:8000/list_news/" + id)
      .then(req => req.data)
      .then(data => {
        this.setState({
          news: data.new,
          one: data.one,
          cate: data.cate.name,
          hai: data.all,
          most: data.most,
          loading: false
        });
        console.log(data + "ss");
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: true });
      });
    this.category();
    this.host_news();
  }
  category() {
    axios
      .get("http://localhost:8000/category/" + this.props.t("member.lang"))
      .then(req => req.data)
      .then(data => {
        this.setState({ countcate: data.cate });
      });
  }
  host_news() {
    axios
      .get("http://localhost:8000/hot_news/" + this.props.t("member.lang"))
      .then(req => req.data)
      .then(data => {
        this.setState({
          most: data.most,
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: true });
      });
  }
  componentWillReceiveProps(nextProps) {
    let id = nextProps.match.params.id;
    axios
      .get("http://localhost:8000/list_news/" + id)
      .then(req => req.data)
      .then(data => {
        this.setState({
          news: data.new,
          one: data.one,
          cate: data.cate.name,
          hai: data.all,
          loading: false
        });
        console.log(data);
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: true });
      });
    //host new
    this.host_news();
    this.category();
  }
  render() {
    let id = this.props.match.params.id;

    const { news, one, cate, most, loading } = this.state;
    const url = "http://localhost:8000/image/";
    return (
      <div>
        <Helmet>
          <title>{cate && cate}</title>
          <link rel="shortcut icon" href={logo} />
        </Helmet>
        <Nav />
        {/* {loading ? <h1>loading....</h1> : ""} */}
        {loading ? <h1>loading....</h1> : ""}
        <div class="section">
          <div class="container">
            <div class="row">
              <div class="col-md-8">
                <div class="row">
                  <div class="col-md-12">
                    <div class="post post-thumb">
                      <Link
                        class="post-img"
                        to={
                          one
                            ? "/detail/" + one.id + "-" + one.slug + ".html"
                            : ""
                        }
                      >
                        <img src={one && url + one.image} alt="" />
                      </Link>
                      <div class="post-body">
                        <div class="post-meta">
                          <a class="post-category cat-2" href="#">
                            {cate && cate}
                          </a>
                          <span class="post-date">{one && one.created_at}</span>
                        </div>
                        <h3 class="post-title">
                          <Link
                            class="post-img"
                            to={
                              one
                                ? "/detail/" + one.id + "-" + one.slug + ".html"
                                : ""
                            }
                          >
                            {one && one.title}
                          </Link>
                        </h3>
                      </div>
                    </div>
                  </div>
                  {news &&
                    news.map((index, i) => (
                      <React.Fragment>
                        {i < 2 ? (
                          <div class="col-md-6">
                            <div class="post">
                              <Link
                                class="post-img"
                                to={
                                  "/detail/" +
                                  index.id +
                                  "-" +
                                  index.slug +
                                  ".html"
                                }
                              >
                                <img src={url + index.image} alt="" />
                              </Link>
                              <div class="post-body">
                                <div class="post-meta">
                                  <a class="post-category cat-2" href="#">
                                    {cate && cate}
                                  </a>
                                  <span class="post-date">
                                    {index.created_at}
                                  </span>
                                </div>
                                <h3 class="post-title">
                                  <Link
                                    class="post-img"
                                    to={
                                      "/detail/" +
                                      index.id +
                                      "-" +
                                      index.slug +
                                      ".html"
                                    }
                                  >
                                    {index.title}
                                  </Link>
                                </h3>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </React.Fragment>
                    ))}

                  <div class="clearfix visible-md visible-lg" />

                  <div class="col-md-12">
                    <div class="section-row">
                      <a href="#">
                        <img
                          class="img-responsive center-block"
                          src={qc2}
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  {news &&
                    news.map((index, i) => (
                      <React.Fragment>
                        {i >= 2 ? (
                          <div class="col-md-12">
                            <div class="post post-row">
                              <Link
                                class="post-img"
                                to={
                                  "/detail/" +
                                  index.id +
                                  "-" +
                                  index.slug +
                                  ".html"
                                }
                              >
                                <img src={url + index.image} alt="" />
                              </Link>
                              <div class="post-body">
                                <div class="post-meta">
                                  <a class="post-category cat-2" href="#">
                                    {cate && cate}
                                  </a>
                                  <span class="post-date">
                                    {index.created_at}
                                  </span>
                                </div>
                                <h3 class="post-title">
                                  <Link
                                    class="post-img"
                                    to={
                                      "/detail/" +
                                      index.id +
                                      "-" +
                                      index.slug +
                                      ".html"
                                    }
                                  >
                                    {index.title}
                                  </Link>
                                </h3>
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipisicing elit, sed do eiusmod tempor
                                  incididunt ut labore et dolore magna aliqua.
                                  Ut enim ad minim veniam...
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </React.Fragment>
                    ))}

                  <div class="col-md-12">
                    <div class="section-row">
                      <button class="primary-button center-block">
                        Load More
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-4">
                <div class="aside-widget text-center">
                  <a
                    href="#"
                    style={{ display: "inline-block", margin: "auto" }}
                  >
                    <img class="img-responsive" src={qc} alt="" />
                  </a>
                </div>

                <div class="aside-widget">
                  <div class="section-title">
                    <h2>Most Read</h2>
                  </div>
                  {most &&
                    most.map((index, i) => (
                      <div class="post post-widget">
                        <Link
                          to={
                            "/detail/" + index.id + "-" + index.slug + ".html"
                          }
                          class="post-img"
                        >
                          <img src={url + index.image} alt="" />
                        </Link>
                        <div class="post-body">
                          <h3 class="post-title">
                            <a href="#">{index.title}</a>
                          </h3>
                        </div>
                      </div>
                    ))}
                </div>

                <div class="aside-widget">
                  <div class="section-title">
                    <h2>Catagories</h2>
                  </div>
                  <div class="category-widget">
                    <ul>
                      {this.state.countcate &&
                        this.state.countcate.map((index, i) => (
                          <li>
                            <Link
                              to={"/list-news/" + index.slug + "/" + index.id}
                              class="cat-1"
                            >
                              {index.name}
                              <span>{index.countcate}</span>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>

                <div class="aside-widget">
                  <div class="section-title">
                    <h2>Archive</h2>
                  </div>
                  <div class="archive-widget">
                    <ul>
                      <li>
                        <a href="#">Jan 2018</a>
                      </li>
                      <li>
                        <a href="#">Feb 2018</a>
                      </li>
                      <li>
                        <a href="#">Mar 2018</a>
                      </li>
                    </ul>
                  </div>
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
export default translate(list_news);
