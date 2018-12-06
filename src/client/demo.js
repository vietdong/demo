import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { Bar } from "react-chartjs-2";
const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [1, 2, 3, 4, 5, 6, 7]
    }
  ]
};
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
        <div>
          <h2>Bar Example (custom size)</h2>
          <Bar
            data={data}
            width={30}
            height={200}
            options={{
              maintainAspectRatio: false
            }}
          />
        </div>
      </div>
    );
  }
}
