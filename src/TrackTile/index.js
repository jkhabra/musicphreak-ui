import React, { Component } from "react";
import "./style.css";

class TrackTile extends Component {
  playSong = url => {
    this.props.audio.src = url;
    this.props.audio
      .play()
      .catch(err => console.warn("Play interrupted.", err));
  };

  handlePlaySong = song => {
    const s = this.props.song;
    let url = s.url["48"];

    if (this.props.currentSong === null) {
      this.playSong(url);
      this.props.handlingSong(s, true);
    } else if (this.props.currentSong.songId === s.songId) {
      this.props.audio.pause();
      this.props.handlingSong(null, false);
    } else {
      this.playSong(url);
      this.props.handlingSong(s, true);
    }
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
