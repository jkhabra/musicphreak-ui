import React, { Component } from "react";
import T from "prop-types";
import "./style.css";

class TrackTile extends Component {
  static propTypes = {
    song: T.object.isRequired,
    isPlaying: T.bool.isRequired,
    onPlay: T.func.isRequired
  };

  handlePlaySong = () => {
    this.props.onPlay(this.props.song);
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
          onClick={this.handlePlaySong}
        />
        <div className="option" />
      </div>
    );
  }
}

export default TrackTile;
