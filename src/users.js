import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import InfiniteScroll from "react-infinite-scroll-component";
export default class users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
      name: "",
      email: "",
      password: "",
      role: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.name = this.name.bind(this);
    this.email = this.email.bind(this);
    this.password = this.password.bind(this);
    this.role = this.role.bind(this);
  }
  componentDidMount() {
    axios
      .get("http://localhost:8000/users")
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
  name(event) {
    this.setState({ name: event.target.value });
  }
  email(event) {
    this.setState({ email: event.target.value });
  }
  password(event) {
    this.setState({ password: event.target.value });
  }
  role(event) {
    this.setState({ role: event.target.value });
  }
  editusers(id) {
    axios.get("http://localhost:8000/editusers/" + id).then(data => {
      this.setState({
        id: data.data.id,
        name: data.data.name,
        email: data.data.email,
        password: "",
        role: data.data.role
      });
    });
  }
  activeusers(id) {
    axios
      .get("http://localhost:8000/activeusers/" + id)
      .then(req => req.data)
      .then(data => {
        this.componentDidMount();
      });
  }
  add = () => {
    this.setState({ id: "", name: "", email: "", password: "", role: 0 });
  };
  handleSubmit(event) {
    console.log(this);
    event.preventDefault();
    const datas = {
      id: this.state.id,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role,
      active: 1
    };
    axios
      .post("http://localhost:8000/saveusers/", datas)
      .then(req => req.data)
      .then(data => {
        this.componentDidMount();
        $(".close").click();
      });
  }
  deleteusers(id) {
    const arrays = window.confirm("remove item?");
    if (!arrays) {
      return false;
    }

    axios
      .get("http://localhost:8000/deleteusers/" + id)
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
    const { data, loading, name, email, password } = this.state;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-lg-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">users</h4>
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
                        <th>authority</th>
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
                                    onClick={() => this.activeusers(index.id)}
                                  >
                                    <i
                                      className="fa fa-close"
                                      style={{ color: "#4CAF50" }}
                                    />
                                  </a>
                                ) : (
                                  <a
                                    className="btn"
                                    onClick={() => this.activeusers(index.id)}
                                  >
                                    <i class="fa fa-check" />
                                  </a>
                                )}
                              </td>
                              <td>
                                {index.role == 1 ? (
                                  <label class="badge badge-success">
                                    administrators
                                  </label>
                                ) : (
                                  <label class="badge badge-warning">
                                    editor
                                  </label>
                                )}
                              </td>
                              <td>{index.created_at}</td>
                              <td>
                                <a
                                  className="btn btn-danger"
                                  onClick={() => this.deleteusers(index.id)}
                                >
                                  <i className="fa fa-trash-o" />
                                </a>
                                <a
                                  className="btn btn-warning"
                                  data-toggle="modal"
                                  data-target="#exampleModal"
                                  onClick={() => this.editusers(index.id)}
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
                  users
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
                      value={this.state.name}
                      onChange={this.name}
                      placeholder="name"
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
                      type="text"
                      class="form-control"
                      value={this.state.email}
                      onChange={this.email}
                      placeholder="Email"
                    />
                    {email == "" ? (
                      <label style={{ color: "red" }}>Email is not empty</label>
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
                      placeholder="Password"
                    />
                    {!this.state.id && password == "" ? (
                      <label style={{ color: "red" }}>Email is not empty</label>
                    ) : (
                      ""
                    )}
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">role</label>
                    <select
                      className="form-control"
                      onChange={this.role}
                      value={this.state.role}
                    >
                      <option value="0">Choose ...</option>
                      <option value="1">Manager</option>
                      <option value="2">Editor</option>
                    </select>
                    {this.state.role == 0 ? (
                      <label style={{ color: "red" }}>Role is not empty</label>
                    ) : (
                      ""
                    )}
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
                    this.state.role == 0 ||
                    (password == "" && !this.state.id) ? (
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
