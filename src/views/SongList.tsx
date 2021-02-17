import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import DatasourceContext from "../context/DataSource";
import audio from "../lib/audio";
import { AppState } from "../store";
import { playing } from "../store/actions";
import { Song, TypeInfo } from "../types/app_types";
import './SongList.scss'

interface SongListProps {
  info: TypeInfo,
  playingSong: Song,
  setSong: (index: number, songs: Song[]) => void,
}

class SongList extends React.Component<SongListProps> {
  onSongItemTap = (index: number, song: Song) => {
    this.props.setSong(index, this.props.info.songs || [])
  }
  render() {
    const { info, playingSong } = this.props
    return (
      <section className="view-song-list">
        <header className="flex px-6 pt-3 flex-col bg-gray-600 text-white">
          <nav className="navigation-bar">
            <Link
              to="/"
              className="nav-action active:bg-gray-400">
              <i className="fa fa-arrow-left nav-back-icon text-xl"></i>
            </Link>
          </nav>
          <div className="song-list-info flex pb-6 pt-3 items-center">
            <img src={info.cover}
              className="w-24"
              alt=""/>
            <div className="type-info ml-4">
              <div className="type-title text-2xl">{info.title}</div>
            </div>
          </div>
        </header>
        <main className="border-t">
          <ul className="song-list">
            {
              info.songs?.map((song, index) => (
                <li className={`song-item flex items-center py-2 px-4 border-b active:bg-gray-200 ${playingSong.id === song.id ? 'active': ''}`}
                  onClick={() => this.onSongItemTap(index, song)}
                  key={song.id}>
                  <img src={song.cover}
                    alt=""
                    className="song-cover w-10"/>
                  <div className="song-info ml-2">
                    <div className="song-title text-base">{song.title}</div>
                    <div className="song-artist text-xs text-gray-400">{song.artist}</div>
                  </div>
                  <div className="playing-icon w-16 hidden">
                    <i className="fa fa-music text-base ml-2 fa-spin"></i>
                  </div>
                </li>
              ))
            }
          </ul>
        </main>
      </section>
    )
  }
}

const ConnectSongList = connect(
  (state: AppState) => {
    const { playlist, index } = state.playing
    const playingSong = playlist[index]
    return {
      playingSong
    }
  },
  (dispatch) => ({
    setSong: (index: number, songs: Song[]) => {
      audio.src = songs[index].playUrl
      audio.play()
      dispatch(playing.setSong(index, songs))
    }
  })
)(SongList)

interface SongListPageParams {
  tid: string
}
export default function SongListPage(props: RouteComponentProps<SongListPageParams>) {
  const tid = props.match.params.tid
  return (
    <DatasourceContext.Consumer>
      {value => {
        const type = value.find(item => item.id + '' === tid) || value[0]
        return (<ConnectSongList info={type} />)
      }}
    </DatasourceContext.Consumer>
  )
}