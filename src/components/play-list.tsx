import React from 'react'
import { Song } from '../types/app_types'
import './play-list.scss'

interface PlayerListProps {
  list: Song[],
  playingIndex?: number,
  onSelect?: (index: number, song: Song, list: Song[]) => void,
  onRemove?: (index: number, song: Song) => void,
}

export default class PlayerList extends React.Component<PlayerListProps> {

  render() {
    return (
      <div className="component-play-list w-screen fixed left-0 right-0 bottom-0 z-20">
        <ul className="play-list bg-gray-600 px-3 pb-8 absolute bottom-0 left-0 right-0">
          {
            this.props.list.map((item, index) => (
              <li className={`play-list-item flex text-gray-200 items-center py-2 ${this.props.playingIndex === index ? 'playing' : ''}`}
                key={index}
                onClick={() => this.props.onSelect?.(index, item, this.props.list)}>
                <div className="item-title text-base text-white">{item.title}</div>
                <div className="item-artist text-xs">&nbsp;-&nbsp;{item.artist}</div>
                <i className="item-playing-icon fa fa-music fa-spin text-sm ml-2 hidden"></i>
                <i className="item-remove-icon fa fa-times text-xl ml-auto"
                  onClick={
                    (e) => {
                      e.stopPropagation()
                      this.props.onRemove?.(index, item)
                    }
                  }></i>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}