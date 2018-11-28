import React, { Component } from "react";
import "./css/404.css";
export default class error404 extends Component {
  render() {
    return (
      <div>
        <div id="notfound">
          <div class="notfound">
            <div class="notfound-404">
              <h1>
                4<span>0</span>4
              </h1>
            </div>
            <p>
              The page you are looking for might have been removed had its name
              changed or is temporarily unavailable.
            </p>
            <a href="#">home page</a>
          </div>
        </div>
      </div>
    );
  }
}
