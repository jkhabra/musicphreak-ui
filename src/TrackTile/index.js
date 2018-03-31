import React, { Component } from "react";
import "./style.css";

class TrackTile extends Component {
  handlePlay = () => {
    const song = this.props.song;

    this.props.onPlay(song);
  };

  render() {
    const song = this.props.song;
    const isPlaying = this.props.isPlaying;

    return (
      <div className="album-wrapper">
        <div className="song-thumb">
          <img className="song-art" src={song.thumb} alt="song' thumb nail" />
        </div>
        <div className="title">{song.name}</div>
        <div className="artist">{song.artist.name}</div>
        <div
          className={isPlaying ? "pause" : "play"}
          onClick={this.handlePlay}
        />
        <div className="option" />
      </div>
    );
  }
}

export default TrackTile;
