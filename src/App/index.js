import React, { Component } from "react";
import TrackTile from "../TrackTile";
import AudioPlayer from "../AudioPlayer";
import SideBar from "../SideBar";
import "./style.css";

class App extends Component {
  state = {
    songs: [],
    activeSong: null,
    isPaused: false,
    isLoadingSong: false
  };

  audio = new Audio();

  componentWillMount = () => {
    this.getData();
  };

  handlePlay = song => {
    this.setState({ activeSong: song });

    this.playSong(song.urls);
    this.pauseSong(song.urls);
  };

  playSong = url => {
    this.audio.src = url;

    this.setState({ isLoadingSong: true });

    this.audio
      .play()
      .then(() => {
        this.setState({ isLoadingSong: false, isPaused: true });
      })
      .catch(err => {
        console.warn("Play interrupted.", err);
        this.setState({ isLoadingSong: false });
      });
  };

  pauseSong = url => {
    this.audio.src = url;

    if(this.state.isPaused){
      this.audio
      .paused()
      .then(() => {
        this.setState({ isPaused: false });
      })
      .catch(err => {
        console.warn("Pause interrupted.", err);
      });
    }
  };

  getData = () => {
    const url = "http://localhost:5000/songs";

    fetch(url)
      .then(res => res.json())
      .then(res => {
        const songs = res.songs;
        this.setState({ songs: songs });
      })
      .catch(err => {
        console.warn("Error while fetching songs", err);
      });
  };

  render() {
    const songs = this.state.songs;
    const playingSong = this.state.activeSong;
    const isLoading = this.state.isLoadingSong;
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
          <AudioPlayer
            song={playingSong}
            onPlay={this.handlePlay}
          />
        </div>

        <div className="side-bar">
          <SideBar />
        </div>

        <div className="container-div">
          <div className="popular">
            <h2>Popular Songs</h2>
          </div>
          <div className="song-container">
            {isLoading ? (
              <div className="lds-ripple">
                <div></div>
                <div></div>
              </div>
            ) : null}
            {songs.map((song, index) => {
              return (
                <TrackTile
                  key={song.id}
                  song={song}
                  isPlaying={
                    this.state.activeSong
                      ? this.state.activeSong.id === song.id
                      : false
                  }
                  onPlay={this.handlePlay}
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
