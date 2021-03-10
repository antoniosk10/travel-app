import React, { Component } from "react";
import logo from './../assets/image/logo.png';

class Logo extends Component {
  render() {
    return <div className="logo">
      <img src={logo} alt=""/>
    </div>
  }
}

export default Logo;