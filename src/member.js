import React, { Component } from "react";
import axios from "axios";
import "./css/admin.css";
import $ from "jquery";

export default class member extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
      name: "",
      id: "",
      email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.name = this.name.bind(this);
    this.email = this.email.bind(this);
    this.password = this.password.bind(this);
  }
  name(event) {
    this.setState({ name: event.target.value });
  }
  email(event) {
    this.setState({ email: event.target.value });
    const data = {
      id: this.state.id,
      email: event.target.value
    };
    axios
      .post("http://localhost:8000/checkmember", data)
      .then(req => req.data)
      .then(data => {
        if (data == "error") {
          this.setState({ erroremail: "" });
        } else {
          this.setState({ erroremail: "ok" });
        }
      });
  }
  password(event) {
    this.setState({ password: event.target.value });
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
  editMember(id) {
    axios.get("http://localhost:8000/editmember/" + id).then(data => {
      this.setState({
        name: data.data.name,
        id: data.data.id,
        email: data.data.email,
        password: "",
        erroremail: "ok"
      });
    });
  }
  activeMember(id) {
    axios
      .get("http://localhost:8000/activemember/" + id)
      .then(req => req.data)
      .then(data => {
        this.setState({ data: data });
      });
  }
  add = () => {
    this.setState({ id: "", name: "", email: "", password: "" });
  };
  handleSubmit(event) {
    console.log(this);
    event.preventDefault();
    const datas = {
      id: this.state.id,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      active: 1
    };
    axios
      .post("http://localhost:8000/savemember/", datas)
      .then(req => req.data)
      .then(data => {
        this.setState({ data: data });
        $(".close").click();
      });
  }
  deleteMember(id) {
    const arrays = window.confirm("remove item?");
    if (!arrays) {
      return false;
    }

    axios
      .get("http://localhost:8000/member/" + id)
      .then(req => req.data)
      .then(data => {
        // console.log(array);
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
    const { data, loading, name, email, password } = this.state;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-lg-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">member</h4>
                <input
                  class="form-control"
                  id="myInput"
                  type="text"
                  placeholder="Search.."
                  onKeyUp={this.filter}
                />
                <br />
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        {/* <th>Address</th> */}
                        <th>status</th>
                        <th>information</th>
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
                              <td className="font-weight-medium">{index.id}</td>
                              <td>{index.name}</td>
                              <td>{index.email}</td>
                              <td>
                                {index.active == 1 ? (
                                  <a
                                    className="btn"
                                    onClick={() => this.activeMember(index.id)}
                                  >
                                    <i
                                      className="fa fa-close"
                                      style={{ color: "#4CAF50" }}
                                    />
                                  </a>
                                ) : (
                                  <a
                                    className="btn"
                                    onClick={() => this.activeMember(index.id)}
                                  >
                                    <i class="fa fa-check" />
                                  </a>
                                )}
                              </td>
                              <td>
                                {index.pay == 2 ? (
                                  <label class="badge badge-success">
                                    Approved
                                  </label>
                                ) : (
                                  <React.Fragment>
                                    {index.pay == 1 ? (
                                      <label class="badge badge-warning">
                                        Not approved
                                      </label>
                                    ) : (
                                      <label class="badge badge-danger">
                                        Not yet
                                      </label>
                                    )}
                                  </React.Fragment>
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
                                  onClick={() => this.editMember(index.id)}
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
                      placeholder="name"
                      value={this.state.name}
                      onChange={this.name}
                    />

                    {name.length < 6 ? (
                      <label style={{ color: "red" }}>
                        Name must be greater than 6
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      class="form-control"
                      value={this.state.email}
                      onChange={this.email}
                    />
                    {this.state.email == "" || this.state.erroremail == "" ? (
                      <label style={{ color: "red" }}>
                        {this.state.erroremail == ""
                          ? "duplicate items"
                          : "Email is not empty"}
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      value={this.state.password}
                      onChange={this.password}
                    />
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>

                    {name.length < 6 ||
                    email == "" ||
                    this.state.erroremail == "" ? (
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
