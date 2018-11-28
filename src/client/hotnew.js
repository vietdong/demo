import React, { Component } from "react";
import Navs from "./nav";
import axios from "axios";
import Footer from "./footer";
import $ from "jquery";
import qc from "../images/ad-1.jpg";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class hotnew extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, data: null };
  }
  componentDidMount() {
    localStorage.setItem("lang", this.props.match.url);
    var lang = "";
    let url = this.props.match.url;

    if (url === "/en" || url === "/vn") {
      lang = url;
    } else {
      lang = "/vn";
    }
    axios
      .get("http://localhost:8000/hot_news" + lang)
      .then(req => req.data)
      .then(data => {
        this.setState({
          loading: false,
          data: data.hot,
          one_random: data.hot[8],
          most: data.most,
          posts: data.random,
          col3: data.col3
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: true });
      });
    axios
      .get("http://localhost:8000/category")
      .then(req => req.data)
      .then(data => {
        if (localStorage.getItem("lang") === "/en") {
          this.setState({ countcate: data.en });
        } else if (localStorage.getItem("lang") === "/vn") {
          this.setState({ countcate: data.vn });
        } else {
          this.setState({ countcate: data.vn });
        }
      });
  }

  clickviews(id) {
    axios.get("http://localhost:8000/clickviews/" + id);
  }
  render() {
    const { data, loading, one_random, most, col3, posts } = this.state;
    const url = "http://localhost:8000/image/";
    return (
      <React.Fragment>
        <Navs />
        {loading ? <h1>loading....</h1> : ""}
        <div class="section">
          <div class="container">
            <div class="row">
              {data &&
                data.map((index, i) => (
                  <div class="col-md-6">
                    {i < 2 ? (
                      <div class="post post-thumb">
                        <Link
                          to={"detail/" + index.id + "-" + index.slug + ".html"}
                          class="post-img"
                          onClick={() => this.clickviews(index.id)}
                        >
                          <img src={url + index.image} alt="" />
                        </Link>
                        <div class="post-body">
                          <div class="post-meta">
                            <Link
                              to={
                                "/list-news/" +
                                index.cate_slug +
                                "/" +
                                index.cate_id
                              }
                              class="post-category cat-2"
                            >
                              {index.category}
                            </Link>
                            <span class="post-date">{index.create_date}</span>
                          </div>
                          <h3 class="post-title">
                            <a onClick={() => this.clickviews(index.id)}>
                              {index.title}
                            </a>
                          </h3>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="section-title">
                  <h2>Recent Posts</h2>
                </div>
              </div>

              {data &&
                data.map((index, i) => (
                  <React.Fragment>
                    {i > 1 && i < 8 ? (
                      <div class="col-md-4">
                        <div class="post">
                          <Link
                            to={
                              "detail/" + index.id + "-" + index.slug + ".html"
                            }
                            class="post-img"
                            onClick={() => this.clickviews(index.id)}
                          >
                            <img src={url + index.image} alt="" />
                          </Link>
                          <div class="post-body">
                            <div class="post-meta">
                              <Link
                                to={
                                  "/list-news/" +
                                  index.cate_slug +
                                  "/" +
                                  index.cate_id
                                }
                                class="post-category cat-2"
                              >
                                {index.category}
                              </Link>
                              <span class="post-date">{index.create_date}</span>
                            </div>
                            <h3 class="post-title">
                              <a onClick={() => this.clickviews(index.id)}>
                                {index.title}
                              </a>
                            </h3>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </React.Fragment>
                ))}
            </div>
            <div class="row">
              <div class="col-md-8">
                <div class="row">
                  <div class="col-md-12">
                    <div class="post post-thumb">
                      <Link
                        to={
                          one_random
                            ? "detail/" +
                              one_random.id +
                              "-" +
                              one_random.slug +
                              ".html"
                            : ""
                        }
                        class="post-img"
                        onClick={() => this.clickviews(one_random.id)}
                      >
                        <img
                          src={one_random && url + one_random.image}
                          alt=""
                        />
                      </Link>
                      <div class="post-body">
                        <div class="post-meta">
                          <Link
                            to={
                              one_random
                                ? "/list-news/" +
                                  one_random.cate_slug +
                                  "/" +
                                  one_random.cate_id
                                : ""
                            }
                            class="post-category cat-3"
                          >
                            {one_random && one_random.category}
                          </Link>
                          <span class="post-date">
                            {one_random && one_random.create_date}
                          </span>
                        </div>
                        <h3 class="post-title">
                          <a onClick={() => this.clickviews(one_random.id)}>
                            {one_random && one_random.title}
                          </a>
                        </h3>
                      </div>
                    </div>
                  </div>
                  {data &&
                    data.map((index, i) => (
                      <React.Fragment>
                        {i > 8 && i < 15 ? (
                          <div class="col-md-6">
                            <div class="post">
                              <Link
                                to={
                                  "detail/" +
                                  index.id +
                                  "-" +
                                  index.slug +
                                  ".html"
                                }
                                class="post-img"
                                onClick={() => this.clickviews(index.id)}
                              >
                                <img src={url + index.image} alt="" />
                              </Link>
                              <div class="post-body">
                                <div class="post-meta">
                                  <Link
                                    to={
                                      "/list-news/" +
                                      index.cate_slug +
                                      "/" +
                                      index.cate_id
                                    }
                                    class="post-category cat-2"
                                  >
                                    {index.category}
                                  </Link>
                                  <span class="post-date">
                                    {index.create_date}
                                  </span>
                                </div>
                                <h3 class="post-title">
                                  <a onClick={() => this.clickviews(index.id)}>
                                    {index.title}
                                  </a>
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
                  <div class="clearfix visible-md visible-lg" />
                </div>
              </div>

              <div class="col-md-4">
                <div class="aside-widget">
                  <div class="section-title">
                    <h2>Most Read</h2>
                  </div>
                  {most &&
                    most.map((index, i) => (
                      <div class="post post-widget">
                        <Link
                          to={"detail/" + index.id + "-" + index.slug + ".html"}
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

                <div class="aside-widget">
                  <div class="section-title">
                    <h2>Featured Posts</h2>
                  </div>
                  {posts &&
                    posts.map((index, i) => (
                      <div class="post post-thumb">
                        <Link
                          to={"detail/" + index.id + "-" + index.slug + ".html"}
                          class="post-img"
                          onClick={() => this.clickviews(index.id)}
                        >
                          <img src={url + index.image} alt="" />
                        </Link>
                        <div class="post-body">
                          <div class="post-meta">
                            <Link
                              to={
                                "/list-news/" +
                                index.cate_slug +
                                "/" +
                                index.cate_id
                              }
                              class="post-category cat-2"
                            >
                              {index.category}
                            </Link>
                            <span class="post-date">{index.create_date}</span>
                          </div>
                          <h3 class="post-title">
                            <a onClick={() => this.clickviews(index.id)}>
                              {index.title}
                            </a>
                          </h3>
                        </div>
                      </div>
                    ))}
                  {/* <div class="post post-thumb">
                    <a class="post-img" href="blog-post.html">
                      <img src="./img/post-1.jpg" alt="" />
                    </a>
                    <div class="post-body">
                      <div class="post-meta">
                        <a class="post-category cat-2" href="category.html">
                          JavaScript
                        </a>
                        <span class="post-date">March 27, 2018</span>
                      </div>
                      <h3 class="post-title">
                        <a href="blog-post.html">
                          Chrome Extension Protects Against JavaScript-Based CPU
                          Side-Channel Attacks
                        </a>
                      </h3>
                    </div>
                  </div> */}
                </div>

                <div class="aside-widget text-center">
                  <a
                    href="#"
                    style={{ display: "inline-block", margin: "auto" }}
                  >
                    <img class="img-responsive" src={qc} alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="section section-grey">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="section-title text-center">
                  <h2>Featured Posts</h2>
                </div>
              </div>
              {col3 &&
                col3.map((index, i) => (
                  <div class="col-md-4">
                    <div class="post">
                      <Link
                        to={"detail/" + index.id + "-" + index.slug + ".html"}
                        class="post-img"
                        onClick={() => this.clickviews(index.id)}
                      >
                        <img src={url + index.image} alt="" />
                      </Link>
                      <div class="post-body">
                        <div class="post-meta">
                          <Link
                            to={
                              "/list-news/" +
                              index.cate_slug +
                              "/" +
                              index.cate_id
                            }
                            class="post-category cat-2"
                          >
                            {index.category}
                          </Link>
                          <span class="post-date">{index.create_date}</span>
                        </div>
                        <h3 class="post-title">
                          <a onClick={() => this.clickviews(index.id)}>
                            {index.title}
                          </a>
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* section3 */}
        <div class="section">
          <div class="container">
            <div class="row">
              <div class="col-md-8">
                <div class="row">
                  <div class="col-md-12">
                    <div class="section-title">
                      <h2>Most Read</h2>
                    </div>
                  </div>
                  {data &&
                    data.map((index, i) => (
                      <React.Fragment>
                        {i < 3 && (
                          <div class="col-md-12">
                            <div class="post post-row">
                              <Link
                                to={
                                  "detail/" +
                                  index.id +
                                  "-" +
                                  index.slug +
                                  ".html"
                                }
                                class="post-img"
                                onClick={() => this.clickviews(index.id)}
                              >
                                <img src={url + index.image} alt="" />
                              </Link>
                              <div class="post-body">
                                <div class="post-meta">
                                  <Link
                                    to={
                                      "/list-news/" +
                                      index.cate_slug +
                                      "/" +
                                      index.cate_id
                                    }
                                    class="post-category cat-2"
                                  >
                                    {index.category}
                                  </Link>
                                  <span class="post-date">
                                    {index.create_date}
                                  </span>
                                </div>
                                <h3 class="post-title">
                                  <a onClick={() => this.clickviews(index.id)}>
                                    {index.title}
                                  </a>
                                </h3>

                                <p>
                                  {index.content && (
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          index.content.slice(0, 550) + "..."
                                      }}
                                    />
                                  )}
                                  {/* {index.content.slice(0, 300)} ... */}
                                  <Link
                                    to={
                                      "detail/" +
                                      index.id +
                                      "-" +
                                      index.slug +
                                      ".html"
                                    }
                                    class="post-img"
                                    onClick={() => this.clickviews(index.id)}
                                    style={{ color: "#0999ff" }}
                                  >
                                    see more
                                  </Link>{" "}
                                </p>
                              </div>
                            </div>
                          </div>
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
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
