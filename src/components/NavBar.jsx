import React, { Component } from "react";

import "../css/navbar.css";

const Navbar = () => {
  return (
    <React.Fragment>
      <div class="nav">
        <input type="checkbox" id="nav-check" />
        <div class="nav-header">
          <div class="nav-title">CryptoRappi</div>
        </div>
        <div class="nav-btn">
          <label for="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
