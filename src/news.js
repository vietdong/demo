import React, { Component } from "react";
import axios from "axios";
import "./css/admin.css";
import $ from "jquery";
import { Editor } from "@tinymce/tinymce-react";
import moment from "moment";
export default class news extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
      id: "",
      content: "",
      cateen: "",
      lang: "",
      en: "",
      catevn: "",
      category: ""
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.category = this.category.bind(this);
  }
  componentDidMount() {
    axios
      .get("http://localhost:8000/news")
      .then(req => req.data)
      .then(data => {
        this.setState({
          en: data.en,
          loading: false,
          page: data.page,
          vn: data.vn
        });
        console.log(data.en);
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: true });
      });
    axios
      .get("http://localhost:8000/admincategory")
      .then(req => req.data)
      .then(data => {
        this.setState({ cateen: data.en, catevn: data.vn });
      });
  }
  category(event) {
    this.setState({ category: event.target.value });
  }
  changeLang(lang) {
    this.setState({ lang: lang });
  }
  // page(id) {
  //   $(".page-item").removeClass("active");
  //   $(".page-item")
  //     .eq(id)
  //     .addClass("active");
  //   axios
  //     .get("http://localhost:8000/news?page=" + id)
  //     .then(req => req.data)
  //     .then(data => {
  //       this.setState({ data: data.en, loading: false, page: data.page });
  //     });
  // }
  handleTitle(event) {
    this.setState({ title: event.target.value });
  }
  deletenews(id) {
    const arrays = window.confirm("remove item?");
    if (!arrays) {
      return false;
    }
    axios
      .get("http://localhost:8000/deletenews/" + id)
      .then(req => req.data)
      .then(data => {
        // console.log(array);
        this.componentDidMount();
      });
  }
  activenews(id) {
    axios
      .get("http://localhost:8000/activenews/" + id)
      .then(req => req.data)
      .then(data => {
        this.componentDidMount();
      });
  }
  editnews(id) {
    axios.get("http://localhost:8000/editnews/" + id).then(data => {
      this.setState({
        id: data.data.id,
        content: data.data.content,
        title: data.data.title,
        category: data.data.cate_id,
        image: ""
      });
      $("#upload").empty();
      $("#ss").text("edit news");
      $("#upload").append(
        "<img src='http://localhost:8000/image/" +
          data.data.image +
          "' style='width:200px;height:150px'/>"
      );
    });
  }
  handleEditorChange(content) {
    this.setState({ content });
  }
  add = () => {
    $("#ss").text("Add news");
    $("#image").val("");
    $("#upload").empty();
    this.setState({ content: "", title: "", id: "", category: 0, image: "" });
  };
  onChange(e) {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    this.createImage(files[0]);
  }
  createImage(file) {
    let reader = new FileReader();
    reader.onload = e => {
      this.setState({
        image: e.target.result
      });
    };
    reader.readAsDataURL(file);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.image) {
      console.log("ok");
      var image = this.state.image;
    } else {
      var image = "";
    }
    const Data = {
      lang: $("#lang").val(),
      id: this.state.id,
      title: this.state.title,
      cate_id: this.state.category,
      content: this.state.content,
      create_date: moment(moment().format("YYYY-MM-DD")).format("DD MMM YYYY"),
      file: image
    };
    axios
      .post("http://localhost:8000/savenews", Data)
      .then(req => req.data)
      .then(data => {
        this.componentDidMount();
        $(".close").click();
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
    const { en, loading, cateen, lang, vn, catevn } = this.state;
    const url = "http://localhost:8000/image/";
    let modal;
    modal = (
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div
            className="modal-content"
            style={{ width: "300%", marginLeft: "-500px" }}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="ss" />
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
              <input type="hidden" value={lang} id="lang" />
              <form onSubmit={this.handleSubmit} enctype="multipart/form-data">
                <input
                  type="hidden"
                  class="form-control"
                  id="id"
                  value={this.state.id == null ? "" : this.state.id}
                />
                <div class="form-group">
                  {lang == 2 ? (
                    <select
                      className="form-control"
                      onChange={this.category}
                      value={this.state.category}
                    >
                      <option value="0">select category</option>
                      {cateen &&
                        cateen.map((index, i) => (
                          <option value={index.id}>{index.name}</option>
                        ))}
                    </select>
                  ) : (
                    <select
                      className="form-control"
                      onChange={this.category}
                      value={this.state.category}
                    >
                      <option value="0">select category</option>
                      {catevn &&
                        catevn.map((index, i) => (
                          <option value={index.id}>{index.name}</option>
                        ))}
                    </select>
                  )}
                  {this.state.category == 0 && (
                    <label style={{ color: "red" }}>
                      category is not empty
                    </label>
                  )}
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">title</label>
                  <input
                    value={this.state.title || ""}
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="title"
                    onChange={this.handleTitle}
                  />
                  {this.state.title == "" && (
                    <label style={{ color: "red" }}>Title is not empty</label>
                  )}
                </div>
                <div class="form-group">
                  <label for="exampleFormControlTextarea1">Content</label>
                  <Editor
                    value={this.state.content || ""}
                    onEditorChange={this.handleEditorChange}
                  />
                  {this.state.content == "" && (
                    <label style={{ color: "red" }}>Content is not empty</label>
                  )}
                </div>
                <div class="form-group">
                  <label for="exampleFormControlFile1">news photos</label>
                  <input
                    type="file"
                    class="form-control-file"
                    id="image"
                    onChange={this.onChange}
                  />
                  {!this.state.id && this.state.image == "" ? (
                    <label style={{ color: "red" }}>Photos do not exist</label>
                  ) : (
                    ""
                  )}
                </div>
                <div class="form-group" id="upload" />
                <input type="hidden" id="loadimage" />
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  {this.state.title == "" ||
                  this.state.content == "" ||
                  (this.state.image == "" && !this.state.id) ||
                  this.state.category == 0 ? (
                    <button type="submit" className="btn btn-primary" disabled>
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
    );
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-lg-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">List news</h4>
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
                  {lang === "2" ? (
                    <React.Fragment>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>category</th>
                            <th>Title</th>

                            <th>Avatar</th>
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
                              {en.map((index, i) => (
                                <tr>
                                  <td className="font-weight-medium">
                                    {index.id}
                                  </td>
                                  <td>
                                    {index.cate ? index.cate : "Not classified"}
                                  </td>
                                  <td>{index.title}</td>

                                  <td>
                                    <img
                                      src={url + index.image}
                                      className="image"
                                    />
                                  </td>
                                  <td>
                                    {index.active == 1 ? (
                                      <a
                                        className="btn"
                                        onClick={() =>
                                          this.activenews(index.id)
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
                                          this.activenews(index.id)
                                        }
                                      >
                                        <i class="fa fa-check" />
                                      </a>
                                    )}
                                  </td>
                                  <td>{index.create_date}</td>
                                  <td>
                                    <a
                                      className="btn btn-danger"
                                      onClick={() => this.deletenews(index.id)}
                                    >
                                      <i className="fa fa-trash-o" />
                                    </a>
                                    <a
                                      className="btn btn-warning"
                                      data-toggle="modal"
                                      data-target="#exampleModal"
                                      onClick={() => this.editnews(index.id)}
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
                      {/* <ul
                        class="pagination"
                        role="navigation"
                        style={{ margin: "auto" }}
                      >
                        <li class="page-item">
                          <span class="page-link" aria-hidden="true">
                            ‹
                          </span>
                        </li>
                        {page &&
                          page.map((index, i) => (
                            <li className="page-item">
                              <span
                                className="page-link"
                                onClick={() => this.page(index)}
                              >
                                {index}
                              </span>
                            </li>
                          ))}
                        <li class="page-item">
                          <span class="page-link" aria-hidden="true">
                            ›
                          </span>
                        </li>
                      </ul> */}
                    </React.Fragment>
                  ) : (
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Danh mục</th>
                          <th>tiêu đề</th>

                          <th>ảnh</th>
                          <th>trạng thái</th>
                          <th>thòi gian tạo</th>
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
                                <td>
                                  {" "}
                                  {index.cate ? index.cate : "Chưa phân loại"}
                                </td>
                                <td>{index.title}</td>

                                <td>
                                  <img
                                    src={url + index.image}
                                    className="image"
                                  />
                                </td>
                                <td>
                                  {index.active == 1 ? (
                                    <a
                                      className="btn"
                                      onClick={() => this.activenews(index.id)}
                                    >
                                      <i
                                        className="fa fa-close"
                                        style={{ color: "#4CAF50" }}
                                      />
                                    </a>
                                  ) : (
                                    <a
                                      className="btn"
                                      onClick={() => this.activenews(index.id)}
                                    >
                                      <i class="fa fa-check" />
                                    </a>
                                  )}
                                </td>
                                <td>{index.create_date}</td>
                                <td>
                                  <a
                                    className="btn btn-danger"
                                    onClick={() => this.deletenews(index.id)}
                                  >
                                    <i className="fa fa-trash-o" />
                                  </a>
                                  <a
                                    className="btn btn-warning"
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                    onClick={() => this.editnews(index.id)}
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

        <div id="page" />
        {/* form add */}
        {modal}
        {/* end from add */}
      </React.Fragment>
    );
  }
}
