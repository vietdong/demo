import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
export default class about extends Component {
  constructor(props) {
    super(props);
    this.state = { lang: "", vn: "", en: "" };
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }
  handleEditorChange(text) {
    this.setState({ text });
  }
  changeLang(lang) {
    this.setState({ lang: lang });
    this.componentDidMount();
  }
  componentDidMount() {
    axios
      .get("http://localhost:8000/about/")
      .then(req => req.data)
      .then(data => {
        this.setState({ vn: data[0], en: data[1] });
        console.log(data[0]);
      });
  }
  editAbout(id) {
    const datas = {
      id: id,
      text: this.state.text
    };
    axios
      .post("http://localhost:8000/edit_about/", datas)
      .then(req => req.data)
      .then(data => {
        this.setState({ data: true });
      });
  }
  render() {
    const { vn, en } = this.state;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-lg-12 grid-margin">
            <div className="card">
              <div className="card-body">
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

                <h4 className="card-title">
                  {this.state.lang == 2 ? "About" : "giới thiệu"}
                </h4>

                {this.state.lang == 2 ? (
                  <React.Fragment>
                    {this.state.data && (
                      <div class="alert alert-success alert-dismissible">
                        <a
                          href="#"
                          class="close"
                          data-dismiss="alert"
                          aria-label="close"
                        >
                          &times;
                        </a>
                        <strong>Success!</strong> save successfully .
                      </div>
                    )}
                    <div>
                      <Editor
                        onEditorChange={this.handleEditorChange}
                        value={en && en.text}
                      />
                    </div>
                    <br />
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={() => this.editAbout(2)}
                    >
                      Save changes
                    </button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {this.state.data && (
                      <div class="alert alert-success alert-dismissible">
                        <a
                          href="#"
                          class="close"
                          data-dismiss="alert"
                          aria-label="close"
                        >
                          &times;
                        </a>
                        <strong>thành công!</strong> lưu thành công.
                      </div>
                    )}
                    <div>
                      <Editor
                        onEditorChange={this.handleEditorChange}
                        value={vn && vn.text}
                      />
                    </div>
                    <br />
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={() => this.editAbout(1)}
                    >
                      lưu trạng thái
                    </button>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
