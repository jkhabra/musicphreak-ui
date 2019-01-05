import React, { Component } from "react";

class SideBar extends Component {
  render() {
    return (
      <div className="side-bar">
        <div className="browse-section">
          <ul className="main-links">
            <li className="main-title">Browse</li>
            <li className="main-item">
              <a className="main-link home" href="/">
                Home
              </a>
            </li>
            <li className="main-item">
              <a className="main-link" href="#palylists">
                Playlists
              </a>
            </li>
          </ul>
        </div>
        <div className="my-music">
          <ul className="main-links">
            <li className="main-title my">My music</li>
            <li className="my-item">
              <a className="main-link my" href="/">
                Albums
              </a>
            </li>
            <li className="my-item">
              <a className="main-link my" href="#palylists">
                Artists
              </a>
            </li>
            <li className="my-item">
              <a className="main-link my" href="#palylists">
                Songs
              </a>
            </li>
            <li className="my-item">
              <a className="main-link my" href="#palylists">
                Genres
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default SideBar;
