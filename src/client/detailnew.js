import React, { Component } from "react";
import Navs from "./nav";
import axios from "axios";
import $ from "jquery";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  setTranslations,
  setDefaultLanguage,
  translate,
  setLanguage
} from "react-multi-lang";
import Footer from "./footer";
class detailnew extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, data: null, most: "", posts: "" };
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    axios
      .get("http://localhost:8000/detailnew/" + id)
      .then(req => req.data)
      .then(data => {
        this.setState({
          data: data,
          loading: false
        });
        console.log(data);
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: true });
      });

    this.host_news();
    this.category();
  }
  host_news() {
    axios
      .get("http://localhost:8000/hot_news/" + this.props.t("member.lang"))
      .then(req => req.data)
      .then(data => {
        this.setState({
          most: data.most,
          posts: data.random
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: true });
      });
  }
  category() {
    axios
      .get("http://localhost:8000/category/" + this.props.t("member.lang"), {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })
      .then(req => req.data)
      .then(data => {
        this.setState({ countcate: data.cate });
      });
  }
  componentWillReceiveProps(nextProps) {
    let id = nextProps.match.params.id;
    axios
      .get("http://localhost:8000/detailnew/" + id)
      .then(req => req.data)
      .then(data => {
        this.setState({
          data: data,
          loading: false
        });
        console.log(data);
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: true });
      });
    this.host_news();
    this.category();
  }
  render() {
    const { data, loading, most, posts } = this.state;
    const url = "http://localhost:8000/image/";
    return (
      <React.Fragment>
        <Helmet>
          <title>{data && data.slug}</title>
          <link rel="shortcut icon" href={data && url + data.image} />
        </Helmet>
        <Navs />
        <div id="post-header" class="page-header">
          <div class="background-img" />
          <div class="container">
            <div class="row">
              <div class="col-md-10">
                <div class="post-meta">
                  <a class="post-category cat-2" href="category.html">
                    {data && data.category}
                  </a>
                  <span class="post-date">{data && data.create_date}</span>
                </div>
                <h1>{data && data.title}</h1>
              </div>
            </div>
          </div>
        </div>
        <div class="section">
          <div class="container">
            <div class="row">
              <div class="col-md-8">
                <div class="section-row sticky-container">
                  <div class="main-post">
                    <h3>{data && data.title}</h3>
                    <figure class="figure-img">
                      <img src={data && url + data.image} alt="" width="100%" />
                      <div>
                        <i> {data && data.title}</i>
                      </div>
                    </figure>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: data && data.content
                      }}
                    />
                  </div>
                  <div class="post-shares sticky-shares">
                    <a href="#" class="share-facebook">
                      <i class="fa fa-facebook" />
                    </a>
                    <a href="#" class="share-twitter">
                      <i class="fa fa-twitter" />
                    </a>
                    <a href="#" class="share-google-plus">
                      <i class="fa fa-google-plus" />
                    </a>
                    <a href="#" class="share-pinterest">
                      <i class="fa fa-pinterest" />
                    </a>
                    <a href="#" class="share-linkedin">
                      <i class="fa fa-linkedin" />
                    </a>
                    <a href="#">
                      <i class="fa fa-envelope" />
                    </a>
                  </div>
                </div>

                <div class="section-row text-center">
                  <a
                    href="#"
                    style={{ display: "inline-block", margin: "auto" }}
                  >
                    <img class="img-responsive" src="./img/ad-2.jpg" alt="" />
                  </a>
                </div>
                <div
                  class="fb-like"
                  data-href="https://www.9lessons.info/2017/11/reactjs-login-facebook-google-using-restful.html"
                  data-layout="standard"
                  data-action="like"
                  data-size="small"
                  data-show-faces="true"
                  data-share="true"
                />
                <div
                  class="fb-comments"
                  data-href="ss"
                  data-numposts="5"
                  data-width="100%"
                />

                <div class="section-row">
                  <div class="section-title">
                    <h2>Leave a reply</h2>
                    <p>
                      your email address will not be published. required fields
                      are marked *
                    </p>
                  </div>
                  <form class="post-reply">
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group">
                          <span>Name *</span>
                          <input class="input" type="text" name="name" />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <span>Email *</span>
                          <input class="input" type="email" name="email" />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <span>Website</span>
                          <input class="input" type="text" name="website" />
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group">
                          <textarea
                            class="input"
                            name="message"
                            placeholder="Message"
                          />
                        </div>
                        <button class="primary-button">Submit</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

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
                  {most &&
                    most.map((index, i) => (
                      <div class="post post-widget">
                        <Link to={index.id + "-" + index.slug} class="post-img">
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
                    <h2>Featured Posts</h2>
                  </div>
                  {posts &&
                    posts.map((index, i) => (
                      <div class="post post-thumb">
                        <Link to={index.id + "-" + index.slug} class="post-img">
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
                            <span class="post-date">March 27, 2018</span>
                          </div>
                          <h3 class="post-title">
                            <a href="">{index.title}</a>
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
                  <div class="tags-widget">
                    <ul>
                      <li>
                        <a href="#">Chrome</a>
                      </li>
                      <li>
                        <a href="#">CSS</a>
                      </li>
                      <li>
                        <a href="#">Tutorial</a>
                      </li>
                      <li>
                        <a href="#">Backend</a>
                      </li>
                      <li>
                        <a href="#">JQuery</a>
                      </li>
                      <li>
                        <a href="#">Design</a>
                      </li>
                      <li>
                        <a href="#">Development</a>
                      </li>
                      <li>
                        <a href="#">JavaScript</a>
                      </li>
                      <li>
                        <a href="#">Website</a>
                      </li>
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
                        <a href="#">January 2018</a>
                      </li>
                      <li>
                        <a href="#">Febuary 2018</a>
                      </li>
                      <li>
                        <a href="#">March 2018</a>
                      </li>
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
export default translate(detailnew);
