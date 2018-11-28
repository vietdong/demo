import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin, GoogleLogout } from "react-google-login";
export default class Facebook extends Component {
  state = {
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: ""
  };
  componentDidMount() {
    this.setState({
      isLoggedIn: localStorage.getItem("isLoggedIn"),
      userID: localStorage.getItem("userID"),
      email: localStorage.getItem("email"),
      name: localStorage.getItem("name"),
      picture: localStorage.getItem("picture")
    });
  }
  responseGoogle = response => {
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("userID", response.w3.Eea);
    localStorage.setItem("email", response.w3.U3);
    localStorage.setItem("name", response.w3.ig);
    localStorage.setItem("picture", response.w3.Paa);
    console.log(response);
  };
  logout() {
    console.log("sss");
    localStorage.clear();
  }
  render() {
    return (
      <div>
        <GoogleLogin
          clientId="636602304701-9431un1n9tpqgg7s6g5v8823antccg29.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
        />
        {!this.state.isLoggedIn ? <h1>ok</h1> : <h1>{this.state.name}</h1>}

        <button onClick={this.logout}>aaaa</button>
      </div>
    );
  }
}
