import React, { Component } from "react";
import Nav from "./nav";
import Footer from "./footer";
import Registration from "./registration";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import editmember from "./editmember";
import addproductmember from "./addproductmember";
import payclient from "./payclient";
import axios from "axios";
import {
  setTranslations,
  setDefaultLanguage,
  translate,
  setLanguage
} from "react-multi-lang";

class detailmember extends Component {
  constructor(props) {
    super(props);
    this.state = { detailMember: "" };
  }

  componentDidMount() {
    let id = localStorage.getItem("id_member");
    axios
      .get("http://localhost:8000/news_member/" + id)
      .then(req => req.data)
      .then(data => {
        this.setState({
          loading: false,
          status: data.status.active
        });
        console.log(data);
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: true });
      });
    this.setState({ detailMember: localStorage.getItem("loginmember") });
  }
  logout = () => {
    localStorage.removeItem("loginmember");
    localStorage.removeItem("emailmember");
    localStorage.removeItem("namemember");
    localStorage.removeItem("country");
    this.setState({ detailMember: "" });
  };
  render() {
    return (
      <React.Fragment>
        {this.state.detailMember == "" ? (
          <Registration />
        ) : (
          <React.Fragment>
            <Nav />
            <div className="page-header">
              <div className="container">
                <div className="row">
                  <div className="col-md-10">
                    <ul className="page-header-breadcrumb">
                      <li>
                        <Link to="/"> {this.props.t("member.home")}</Link>
                      </li>
                      <li> {this.props.t("member.Dashboad Member")}</li>
                    </ul>
                    <h1> {this.props.t("member.Dashboad Member")}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="container">
                <div className="row">
                  <div className="col-md-2">
                    <ul className="list-group">
                      <li className="list-group-item">
                        <Link to="edit-member">
                          {" "}
                          <i
                            className="fa fa-edit"
                            style={{ paddingRight: "10px" }}
                          />
                          {this.props.t("member.Edit Member")}
                        </Link>
                      </li>
                      {this.state.status == 1 && (
                        <React.Fragment>
                          <li className="list-group-item">
                            <Link to="add-product-member">
                              {" "}
                              <i
                                className="fa fa-cart-plus"
                                style={{ paddingRight: "10px" }}
                              />
                              {this.props.t("member.Product")}
                            </Link>
                          </li>

                          <li className="list-group-item">
                            <Link to="client-pay">
                              {" "}
                              <i
                                className="fa fa-line-chart"
                                style={{ paddingRight: "10px" }}
                              />
                              {this.props.t("member.Analytics & pay")}
                            </Link>
                          </li>
                        </React.Fragment>
                      )}
                      <li className="list-group-item">
                        <a onClick={this.logout}>
                          {" "}
                          <i
                            className="fa fa-sign-out"
                            style={{ paddingRight: "10px" }}
                          />
                          {this.props.t("member.Logout")}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-10">
                    <Route exact path="/member-login" component={editmember} />
                    <Route exact path="/edit-member" component={editmember} />
                    <Route
                      path="/add-product-member"
                      component={addproductmember}
                    />
                    <Route path="/client-pay" component={payclient} />
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default translate(detailmember);
