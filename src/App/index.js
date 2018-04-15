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

    this.playSong(song.url["48"]);
  };

  playSong = url => {
    this.audio.src = url;

    this.setState({ isLoadingSong: true });

    this.audio
      .play()
      .then(() => {
        this.setState({ isLoadingSong: false });
      })
      .catch(err => {
        console.warn("Play interrupted.", err);
        this.setState({ isLoadingSong: false });
      });
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
          <AudioPlayer song={playingSong} />
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
              <div class="lds-ellipsis">
                <div />
                <div />
                <div />
                <div />
              </div>
            ) : null}
            {songs.map((song, index) => {
              return (
                <TrackTile
                  key={song.songId}
                  song={song}
                  isPlaying={
                    this.state.activeSong
                      ? this.state.activeSong.id === song.songId
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
