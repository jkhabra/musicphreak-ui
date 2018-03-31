import React, { Component } from "react";
import "./style.css";

class AudioPlayer extends Component {
  render() {
    const song = this.props.song;

    if (!song) {
      return null;
    }

    return (
      <div className="player">
        <div className="thumb-nail">
          <img className="player-thumb" src={song.thumb} alt="img thub" />
        </div>
        <div className="some-stuff">
          <div className="name-stuff">{song.name}</div>
          <div className="name-stuff">{song.artist.name}</div>
        </div>

        <div className="play-button">
          <div className="f-icon b-icon icon" />
          <div className="play-icon" />
          <div className="f-icon icon" />
        </div>

        <div className="play-time">00:00 / 00:00</div>
      </div>
    );
  }
}

export default AudioPlayer;
