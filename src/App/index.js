import React, { Component } from "react";
import TrackTile from "../TrackTile";
import AudioPlayer from "../AudioPlayer";
import SideBar from "../SideBar";
import "./style.css";

class App extends Component {
  state = {
    songs: [],
    activeSong: null,
    isPlaying: false
  };

  audio = new Audio();

  componentWillMount = () => {
    this.getData();
  };

  getSongData = (song, staus) => {
    this.setState({ activeSong: song, isPlaying: staus });
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

  render() {
    const songs = this.state.songs;
    //const playingSong = !this.state.playingSongId
    //? null
    //: this.state.songs.find(i => {
    //   return i.songId === this.state.playingSongId;
    // });

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
          <AudioPlayer onPlay={this.handlePlaySong} />
        </div>

        <div className="side-bar">
          <SideBar />
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
                  currentSong={this.state.activeSong}
                  audio={this.audio}
                  isPlaying={this.state.isPlaying}
                  handlingSong={this.getSongData}
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
