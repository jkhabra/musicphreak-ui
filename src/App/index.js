import React, { Component } from "react";
import TrackTile from "../TrackTile";
import AudioPlayer from "../AudioPlayer";
import "./style.css";

class App extends Component {
  state = {
    songs: [],
    playingSongId: null
  };

  audio = new Audio();

  componentWillMount = () => {
    this.getData();
  };

  getData = () => {
    const url = "http://localhost:5000/api/songs?skip=0&limit=20";

    fetch(url)
      .then(res => res.json())
      .then(res => {
        const songs = res.data;

        this.setState({ songs: songs });
      })
      .catch(err => {
        console.warn("Error while fetching songs", err);
      });
  };

  handlePlaySong = song => {
    let url = song.url["48"];

    if (this.state.playingSongId === song.songId) {
      this.audio.pause();

      this.setState({
        playingSongId: null
      });
    } else {
      this.audio.src = url;
      this.audio.play().catch(err => console.warn("Play interrupted.", err));
      window.t = this.audio.duration;

      this.setState({
        playingSongId: song.songId
      });
    }
  };

  render() {
    const songs = this.state.songs;
    const playingSong = !this.state.playingSongId
      ? null
      : this.state.songs.find(i => {
          return i.songId === this.state.playingSongId;
        });

    return (
      <div className="app-container">
        <div className="nav-bar">
          <a className="app-title" href="/">
            MusicPhreak
          </a>
          <div className="search-bar">
            <input className="search-input" type="text" name="search" />
          </div>
        </div>

        <div className="audio-player">
          <AudioPlayer song={playingSong} />
        </div>

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
        <div className="container-div">
          <div className="popular">
            <h2>Popular Songs</h2>
          </div>
          <div className="song-container">
            {songs.map((song, index) => {
              return (
                <TrackTile
                  key={song.songId}
                  song={song}
                  isPlaying={song.songId === this.state.playingSongId}
                  onPlay={this.handlePlaySong}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
