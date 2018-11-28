import React, { Component } from "react";
import $ from "jquery";
import axios from "axios";
export default class memberpay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:8000/member")
      .then(req => req.data)
      .then(data => {
        this.setState({ data: data, loading: false });
        // console.log(data);
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: true });
      });
  }
  views(id) {
    axios
      .get("http://localhost:8000/news_member/" + id)
      .then(req => req.data)
      .then(data => {
        this.setState({
          news: data.news,
          loading: false,
          status: data.status.active
        });
        console.log(data);
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: true });
      });
  }
  activeMember(id) {
    axios
      .get("http://localhost:8000/browse_for_money/" + id)
      .then(req => req.data)
      .then(data => {
        this.componentDidMount();
      });
  }
  deleteMemberPay(id) {
    const arrays = window.confirm("remove item?");
    if (!arrays) {
      return false;
    }
    axios
      .get("http://localhost:8000/delete_member_pay/" + id)
      .then(req => req.data)
      .then(data => {
        this.componentDidMount();
      });
  }
  filter(e) {
    var value = e.target.value.toLowerCase();
    $(".table tbody tr").filter(function() {
      $(this).toggle(
        $(this)
          .text()
          .toLowerCase()
          .indexOf(value) > -1
      );
    });
  }
  render() {
    const { data, loading } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-lg-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Browse for money</h4>
                <input
                  class="form-control"
                  id="myInput"
                  type="text"
                  placeholder="Search.."
                  onKeyUp={this.filter}
                />
                <br />
                <div className="table-responsive" />
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      {/* <th>Address</th> */}
                      <th>status</th>
                      <th>See the article</th>
                      <th>views</th>
                      <th>posts</th>
                      <th>Date created</th>
                      <th>option</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <h3>Loading ...</h3>
                    ) : (
                      <React.Fragment>
                        {data.map((index, i) => (
                          <React.Fragment>
                            {index.pay == 1 || index.pay == 2 ? (
                              <tr>
                                <td className="font-weight-medium">
                                  {index.id}
                                </td>
                                <td>{index.name}</td>
                                <td>{index.email}</td>
                                <td>
                                  {index.pay == 2 ? (
                                    <a
                                      className="btn"
                                      onClick={() =>
                                        this.activeMember(index.id)
                                      }
                                    >
                                      <i
                                        className="fa fa-close"
                                        style={{ color: "#4CAF50" }}
                                      />
                                    </a>
                                  ) : (
                                    <a
                                      className="btn"
                                      onClick={() =>
                                        this.activeMember(index.id)
                                      }
                                    >
                                      <i class="fa fa-check" />
                                    </a>
                                  )}
                                </td>
                                <td>
                                  {" "}
                                  <a
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                    className="btn btn-success"
                                    onClick={() => this.views(index.id)}
                                  >
                                    <i className="fa fa-eye" />
                                  </a>
                                </td>
                                <td>{index.count}</td>
                                <td>{index.post}</td>
                                <td>{index.created_at}</td>
                                <td>
                                  <a
                                    className="btn btn-danger"
                                    onClick={() =>
                                      this.deleteMemberPay(index.id)
                                    }
                                  >
                                    <i className="fa fa-trash-o" />
                                  </a>
                                </td>
                              </tr>
                            ) : (
                              ""
                            )}
                          </React.Fragment>
                        ))}
                      </React.Fragment>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* form add */}
        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  All posts were written
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <React.Fragment>
                  {this.state.news &&
                    this.state.news.map((index, i) => (
                      <a
                        href={
                          "/detail/" + index.id + "-" + index.slug + ".html"
                        }
                        target="_blank"
                      >
                        {" "}
                        <h5>- {index.title}</h5>
                      </a>
                    ))}
                </React.Fragment>
              </div>
            </div>
          </div>
        </div>
        {/* end from add */}
      </div>
    );
  }
}
