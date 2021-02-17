import React from 'react'
import { CSSTransition } from 'react-transition-group'
import ProgressBar from './progress-bar'
import Mask from './mask'
import './music-player.scss'
import { Song } from '../types/app_types'

interface MusicPlayerProps {
  song: Song,
  playing: boolean,
  duration: number,
  currentTime: number,
  generatePlaylist?: any,
  generatePlayerActions?: any,
  toggleUi: () => void,
  onSeek: (value: number) => void,
  onPlayBtnTap: () => void,
  onPrevBtnTap?: () => void,
  onNextBtnTap?: () => void,
}

export default class MusicPlayer extends React.Component<MusicPlayerProps> {
  state = {
    playerListVisible: false
  }

  openPlayList = () => {
    this.setState({
      playerListVisible: true
    })
  }

  closePlayList = () => {
    this.setState({
      playerListVisible: false
    })
  }

  render () {
    const { song, currentTime, duration } = this.props
    const { title, artist, album, cover } = song
    return (
      <section className="component-music-player flex flex-col items-center box-border bg-gray-600 h-screen fixed inset-0">
        <header className="player-header flex-1 flex items-start justify-between text-white w-full h-4">
          <div className="header-action w-8 text-center" onClick={this.props.toggleUi}>
            <i className="fa fa-angle-down text-2xl"></i>
          </div>
          <div className="header-action w-8 text-center">
            <i className="fa fa-share-alt text-2xl text-gray-400"></i>
          </div>
        </header>
        <main className="player-cover-wrapper">
          <img src={cover}
            alt=""
            className="player-cover rounded-lg"/>
        </main>
        <div className="player-info w-full text-white mt-4">
          <div className="title text-lg">{title}</div>
          <div className="subtitle text-md text-gray-400 mb-1">{artist}</div>
          <div className="description text-sm text-gray-400">{album}</div>
        </div>
        <footer className="player-footer flex flex-col w-full mt-4">
          <ProgressBar value={currentTime}
            max={duration || song.duration}
            onSeek={this.props.onSeek}></ProgressBar>
          {this.props.generatePlayerActions(this)}
        </footer>
        <Mask visible={this.state.playerListVisible} onTap={this.closePlayList}>
          <CSSTransition
            in={this.state.playerListVisible}
            classNames="slide-up"
            addEndListener={(node, done) => {
              node.addEventListener("transitionend", done, false);
            }}
            unmountOnExit
            timeout={200}>
              {this.props.generatePlaylist?.({
                closePlayList: this.closePlayList
              })}
          </CSSTransition>
        </Mask>
      </section>
    )
  }
}