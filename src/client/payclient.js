import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import {
  setTranslations,
  setDefaultLanguage,
  translate,
  setLanguage
} from "react-multi-lang";

class payclient extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, data: null, sum: "", check: "", views: "" };
  }
  componentDidMount() {
    let id = localStorage.getItem("id_member");
    axios
      .get("http://localhost:8000/check_view_member/" + id)
      .then(req => req.data)
      .then(data => {
        this.setState({
          sum: data.sum,
          views: data.views,
          check: data.check.pay
        });
        console.log(data.check.pay);
      })
      .catch(err => {
        console.log(err);
        // this.setState({ loading: true });
      });
    axios
      .get("http://localhost:8000/pay/")
      .then(req => req.data)
      .then(data => {
        this.setState({ viewsdemo: data[0].views, usd: data[0].money });
      });
  }
  money = () => {
    let id = localStorage.getItem("id_member");
    axios
      .get("http://localhost:8000/money/" + id)
      .then(req => req.data)
      .then(data => {
        this.setState({ pay: data.pay, check: data.check.pay });
        this.componentDidMount();
      })
      .catch(err => {
        console.log(err);
        // this.setState({ loading: true });
      });
  };
  render() {
    return (
      <div>
        <h4>{this.props.t("member.Analytics & pay")}</h4>
        <span>
          {this.props.t("member.note")}
          <i>
            {this.props.t("member.note2")}&nbsp;
            {this.state.viewsdemo && this.state.viewsdemo}{" "}
            {this.props.t("member.views")}
          </i>
        </span>
        <br />
        <br />
        <div className="controller">
          <div class="row">
            <div class="col-lg-3 col-xs-6">
              <div
                class="small-box"
                style={{
                  backgroundColor: "#f39c12",
                  position: "relative",
                  padding: "10px 10px 0px 10px"
                }}
              >
                <div class="inner">
                  <h3>{this.state.views && this.state.views}</h3>
                  <p>{this.props.t("member.Your estimated views")}</p>
                </div>
                <div
                  class="icon"
                  style={{ position: "absolute", top: "10px", right: "10px" }}
                >
                  <i class="fa fa-bar-chart" style={{ fontSize: "50px" }} />
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-xs-6">
              <div
                class="small-box"
                style={{
                  backgroundColor: "#00c0ef",
                  position: "relative",
                  padding: "10px 10px 0 10px"
                }}
              >
                <div class="inner">
                  <h3>
                    ${" "}
                    {(
                      this.state.views *
                      (this.state.usd / this.state.viewsdemo)
                    ).toFixed(4)}{" "}
                  </h3>
                  <p>{this.props.t("member.Current account balance")}</p>
                </div>
                <div
                  class="icon"
                  style={{ position: "absolute", top: "10px", right: "10px" }}
                >
                  <i class="fa fa-shopping-bag" style={{ fontSize: "50px" }} />
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-xs-6">
              <div
                class="small-box "
                style={{
                  backgroundColor: "#00a65a",
                  position: "relative",
                  padding: "10px 10px 0 10px"
                }}
              >
                <div class="inner">
                  <h3>{this.state.sum && this.state.sum}</h3>
                  <p>{this.props.t("member.number of posts")}</p>
                </div>
                <div
                  class="icon"
                  style={{ position: "absolute", top: "10px", right: "10px" }}
                >
                  <i class="fa fa-exchange" style={{ fontSize: "50px" }} />
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-xs-6">
              <div
                class="small-box "
                style={{
                  backgroundColor: "#dd4b39",
                  position: "relative",
                  padding: "10px 10px 0 10px"
                }}
              >
                <div class="inner">
                  <h3>${this.state.usd && this.state.usd}</h3>
                  <p> {this.props.t("member.Average CPM")}</p>
                </div>
                <div
                  class="icon"
                  style={{ position: "absolute", top: "10px", right: "10px" }}
                >
                  <i class="fa fa-usd" style={{ fontSize: "50px" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {this.state.views > this.state.viewsdemo ? (
          <React.Fragment>
            {this.state.check == 2 ? (
              <div>
                {this.props.t("member.Current account balance")} :
                {(
                  this.state.views *
                  (this.state.usd / this.state.viewsdemo)
                ).toFixed(4)}{" "}
                $
                <br />
                <button>
                  <i
                    class="fa fa-cc-paypal"
                    style={{ fontSize: "40px", color: "red" }}
                  />
                </button>
              </div>
            ) : (
              <React.Fragment>
                {this.state.check == 1 ? (
                  <h2>
                    <i>{this.props.t("member.waiting for approval")}</i>
                  </h2>
                ) : (
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={this.money}
                  >
                    {this.props.t("member.turn on money")}
                  </button>
                )}
              </React.Fragment>
            )}
          </React.Fragment>
        ) : (
          <button type="button" class="btn btn-primary" disabled>
            {this.props.t("member.turn on money")}
          </button>
        )}
      </div>
    );
  }
}
export default translate(payclient);
