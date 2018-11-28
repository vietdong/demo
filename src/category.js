import React, { Component } from "react";
import axios from "axios";
import "./css/admin.css";
import $ from "jquery";

export default class member extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, data: null, lang: "", vn: "", name: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.name = this.name.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/admincategory")
      .then(req => req.data)
      .then(data => {
        this.setState({ data: data.en, loading: false, vn: data.vn });
        // console.log(data);
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: true });
      });
  }
  editcate(id) {
    axios.get("http://localhost:8000/editcate/" + id).then(data => {
      this.setState({
        name: data.data.name,
        id: data.data.id,
        errorname: "ok"
      });
    });
  }
  name(e) {
    this.setState({ name: e.target.value });

    const data = {
      id: this.state.id,
      name: e.target.value
    };
    axios
      .post("http://localhost:8000/addcate", data)
      .then(req => req.data)
      .then(data => {
        if (data == "error") {
          this.setState({ errorname: "" });
        } else {
          this.setState({ errorname: "ok" });
        }
      });
  }
  activecate(id) {
    axios
      .get("http://localhost:8000/activecate/" + id)
      .then(req => req.data)
      .then(data => {
        this.componentDidMount();
      });
  }
  add = () => {
    this.setState({ id: "", name: "" });
  };
  handleSubmit(event) {
    console.log(this);
    event.preventDefault();
    const datas = {
      lang: $("#lang").val(),
      id: this.state.id,
      name: this.state.name,
      active: 1
    };
    axios
      .post("http://localhost:8000/savecate/", datas)
      .then(req => req.data)
      .then(data => {
        this.componentDidMount();
        $(".close").click();
      });
  }
  deleteMember(id) {
    const arrays = window.confirm("remove item?");
    if (!arrays) {
      return false;
    }

    axios
      .get("http://localhost:8000/deletecate/" + id)
      .then(req => req.data)
      .then(data => {
        // console.log(array);
        this.componentDidMount();
      });
  }
  changeLang(lang) {
    this.setState({ lang: lang });
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
    const { data, loading, lang, vn } = this.state;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-lg-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">category</h4>
                <input
                  class="form-control"
                  id="myInput"
                  type="text"
                  placeholder="Search.."
                  onKeyUp={this.filter}
                />
                <br />
                <div style={{ float: "right" }}>
                  <button
                    onClick={() => this.changeLang("1")}
                    style={{ marginRight: "20px" }}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/800px-Flag_of_Vietnam.svg.png"
                      width="23px"
                    />
                  </button>
                  <button onClick={() => this.changeLang("2")}>
                    <img
                      src="https://kenh14cdn.com/2017/2-1503128133740.png"
                      width="30px"
                    />
                  </button>
                </div>
                <div className="table-responsive">
                  {lang == 2 ? (
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          {/* <th>Address</th> */}
                          <th>status</th>
                          <th>Date created</th>
                          <th>
                            <a
                              data-toggle="modal"
                              data-target="#exampleModal"
                              className="btn btn-primary"
                              onClick={this.add}
                            >
                              <i className="fa fa-plus-square" />
                            </a>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <h3>Loading ...</h3>
                        ) : (
                          <React.Fragment>
                            {data.map((index, i) => (
                              <tr>
                                <td className="font-weight-medium">
                                  {index.id}
                                </td>
                                <td>{index.name}</td>
                                <td>
                                  {index.active == 1 ? (
                                    <a
                                      className="btn"
                                      onClick={() => this.activecate(index.id)}
                                    >
                                      <i
                                        className="fa fa-close"
                                        style={{ color: "#4CAF50" }}
                                      />
                                    </a>
                                  ) : (
                                    <a
                                      className="btn"
                                      onClick={() => this.activecate(index.id)}
                                    >
                                      <i class="fa fa-check" />
                                    </a>
                                  )}
                                </td>
                                <td>{index.created_at}</td>
                                <td>
                                  <a
                                    className="btn btn-danger"
                                    onClick={() => this.deleteMember(index.id)}
                                  >
                                    <i className="fa fa-trash-o" />
                                  </a>
                                  <a
                                    className="btn btn-warning"
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                    onClick={() => this.editcate(index.id)}
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </React.Fragment>
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Tên danh mục</th>
                          {/* <th>Address</th> */}
                          <th>Trạng thái</th>
                          <th>Ngày tạo</th>
                          <th>
                            <a
                              data-toggle="modal"
                              data-target="#exampleModal"
                              className="btn btn-primary"
                              onClick={this.add}
                            >
                              <i className="fa fa-plus-square" />
                            </a>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <h3>Loading ...</h3>
                        ) : (
                          <React.Fragment>
                            {vn.map((index, i) => (
                              <tr>
                                <td className="font-weight-medium">
                                  {index.id}
                                </td>
                                <td>{index.name}</td>
                                <td>
                                  {index.active == 1 ? (
                                    <a
                                      className="btn"
                                      onClick={() => this.activecate(index.id)}
                                    >
                                      <i
                                        className="fa fa-close"
                                        style={{ color: "#4CAF50" }}
                                      />
                                    </a>
                                  ) : (
                                    <a
                                      className="btn"
                                      onClick={() => this.activecate(index.id)}
                                    >
                                      <i class="fa fa-check" />
                                    </a>
                                  )}
                                </td>
                                <td>{index.created_at}</td>
                                <td>
                                  <a
                                    className="btn btn-danger"
                                    onClick={() => this.deleteMember(index.id)}
                                  >
                                    <i className="fa fa-trash-o" />
                                  </a>
                                  <a
                                    className="btn btn-warning"
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                    onClick={() => this.editcate(index.id)}
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </React.Fragment>
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
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
                  Add member
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
                <form onSubmit={this.handleSubmit}>
                  <input type="hidden" value={lang} id="lang" />
                  <input
                    type="hidden"
                    class="form-control"
                    value={this.state.id}
                  />
                  <div class="form-group">
                    <label for="exampleInputEmail1">Name</label>
                    <input
                      type="text"
                      class="form-control"
                      onChange={this.name}
                      value={this.state.name}
                      placeholder="name"
                    />
                    {this.state.name == "" || this.state.errorname == "" ? (
                      <label style={{ color: "red" }}>
                        {this.state.errorname == ""
                          ? "duplicate items"
                          : "Name is not empty"}
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                  {this.state.errorname}
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    {this.state.name == "" || this.state.errorname == "" ? (
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled
                      >
                        Save changes
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-primary">
                        Save changes
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* end from add */}
      </React.Fragment>
    );
  }
}
