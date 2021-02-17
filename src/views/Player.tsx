import React from 'react';
import { connect } from 'react-redux';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import MiniPlayer from '../components/MiniPlayer';
import MusicPlayer from '../components/music-player'
import PlayList from '../components/play-list'
import PlayerActions from '../components/player-actions'
import audio from '../lib/audio'
import { AppState } from '../store';
import { playing } from '../store/actions';
import { PlayMode, Song, PlayingState } from '../types/app_types';
import './Player.scss'

interface PlayerProps extends PlayingState {
  ui: string,
  playingSong: Song,
  toggleUi: () => void,
  toggleMode: () => void,
  setPlaying: (playing: boolean) => void,
  setCurrentTime: (currentTime: number) => void,
  setDuration: (duration: number) => void,
  setSong: (index: number, songs: Song[]) => void
}

class Player extends React.Component<PlayerProps> {
  componentDidMount() {
    audio.addEventListener('playing', () => {
      this.props.setPlaying(true)
    })
    audio.addEventListener('pause', () => {
      this.props.setPlaying(false)
    })
    audio.addEventListener('timeupdate', () => {
      this.props.setCurrentTime(audio.currentTime)
    })
    audio.addEventListener('durationchange', () => {
      this.props.setDuration(audio.duration)
    })
    audio.addEventListener('ended', () => {
      this.playNext()
    })
    audio.src = this.props.playingSong.playUrl
  }

  calcNextIndex = () => {
    const { index, playlist, mode } = this.props
    if (mode === PlayMode.single) {
      return index
    } else if (mode === PlayMode.random) {
      return Math.floor(Math.random() * playlist.length)
    }
    return (index + 1) % playlist.length
  }

  playNext = () => {
    const nextIndex = this.calcNextIndex()
    this.playAtIndex(nextIndex)
  }

  calcPrevIndex = () => {
    const { index, playlist } = this.props
    return (index - 1 + playlist.length) % playlist.length
  }
  playPrev = () => {
    const prevIndex = this.calcPrevIndex()
    this.playAtIndex(prevIndex)
  }

  playAtIndex = (index: number, playlist = this.props.playlist) => {
    console.log(index, playlist)
    if (!playlist[index]) return
    audio.src = playlist[index].playUrl
    audio.play()
    this.props.setSong(index, playlist)
  }
  onModeBtnTap = () => {
    this.props.toggleMode()
  }
  onPlayBtnTap = () => {
    if (this.props.playing) {
      return audio.pause()
    }
    audio.play()
  }
  onSeek = (value: number) => {
    audio.currentTime = value
  }
  onPlaylistItemSelect = (index: number, song: Song, list: Song[]) => {
    if (this.props.index === index) return audio.play()
    if (index > list.length - 1) return
    this.playAtIndex(index, list);
  }
  onPlaylistItemRemove = (index: number, song: Song) => {
    const { index: playingIndex, playlist } = this.props
    let newPlaylist = playlist.slice()
    newPlaylist.splice(index, 1)
    let newPlayingIndex = playingIndex
    if (index < playingIndex) {
      newPlayingIndex -= 1
    }
    this.props.setSong(newPlayingIndex, newPlaylist)
  }

  render() {
    const {
      index, playlist, playingSong,
      currentTime, duration, playing, mode, ui
    } = this.props
    const generatePlayList = (playerProps: { closePlayList: () => void }) => {
      return (
        <PlayList list={playlist}
          playingIndex={index}
          onRemove={this.onPlaylistItemRemove}
          onSelect={(index, song, list) => {
            this.onPlaylistItemSelect(index, song, list)
            playerProps.closePlayList()
          }}/>
      )
    }
    const generatePlayerActions = (player: MusicPlayer) => {
      return (
        <PlayerActions playing={playing}
          mode={mode}
          onModeBtnTap={this.onModeBtnTap}
          onPlayBtnTap={this.onPlayBtnTap}
          onPlaylistBtnTap={player.openPlayList}
          onNextBtnTap={this.playNext}
          onPrevBtnTap={this.playPrev}
        ></PlayerActions>
      )
    }
    return (
      <div className="view-player relative z-10">
        <SwitchTransition>
        {
          ui === 'mini'
          ? <CSSTransition key={ui}
              timeout={200}
              addEndListener={(node, done) => {
                node.addEventListener("transitionend", done, false);
              }}
              classNames="slide-down">
                <MiniPlayer song={playingSong}
                  playing={playing}
                  currentTime={currentTime}
                  duration={duration}
                  onPlayBtnTap={this.onPlayBtnTap}
                  toggleUi={this.props.toggleUi} />
            </CSSTransition>
          : <CSSTransition key={ui}
              timeout={200}
              addEndListener={(node, done) => {
                node.addEventListener("transitionend", done, false);
              }}
              classNames="slide-up">
              <MusicPlayer song={playingSong}
                playing={playing}
                currentTime={currentTime}
                duration={duration}
                onPlayBtnTap={this.onPlayBtnTap}
                onPrevBtnTap={this.playPrev}
                onNextBtnTap={this.playNext}
                onSeek={this.onSeek}
                generatePlaylist={generatePlayList}
                generatePlayerActions={generatePlayerActions}
                toggleUi={this.props.toggleUi} />
            </CSSTransition>
        }
        </SwitchTransition>
        {/* </SwitchTransition> */}
        {/* {
          ui === 'mini'
          ? <MiniPlayer song={playingSong}
              playing={playing}
              currentTime={currentTime}
              duration={duration}
              onPlayBtnTap={this.onPlayBtnTap}
              toggleUi={this.props.toggleUi} />
          : <MusicPlayer song={playingSong}
              playing={playing}
              currentTime={currentTime}
              duration={duration}
              onPlayBtnTap={this.onPlayBtnTap}
              onPrevBtnTap={this.playPrev}
              onNextBtnTap={this.playNext}
              onSeek={this.onSeek}
              generatePlaylist={generatePlayList}
              generatePlayerActions={generatePlayerActions}
              toggleUi={this.props.toggleUi} >

            </MusicPlayer>
        } */}
      </div>
    );
  }
}

const PlayerPage = connect(
  (state: AppState) => {
    const { index, playlist } = state.playing
    return {
      ...state.playing,
      playingSong: playlist[index]
    }
  },
  (dispatch) => ({
    toggleMode: () => dispatch<any>(playing.toggleMode()),
    setPlaying: (isPlaying: boolean) => dispatch(playing.setPlaying(isPlaying)),
    setDuration: (duration: number) => dispatch(playing.setDuration(duration)),
    setCurrentTime: (currentTime: number) => dispatch(playing.setCurrentTime(currentTime)),
    setSong: (index: number, songs: Song[]) => dispatch(playing.setSong(index, songs))
  })
)(Player)

export default PlayerPage;
