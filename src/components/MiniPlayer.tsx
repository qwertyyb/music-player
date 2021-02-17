import { Song } from '../types/app_types'
import './MiniPlayer.scss'

interface MiniPlayerProps {
  song: Song,
  playing: boolean,
  currentTime: number,
  duration: number,
  onPlayBtnTap: () => void,
  toggleUi: () => void,
}

export default function MiniPlayer(props: MiniPlayerProps) {
  const str = (props.currentTime * 100 / props.duration) + '%'
  return (
    <div className="component-mini-player fixed left-0 right-0 bottom-0 z-10">
      <div
        onClick={props.toggleUi}
        style={{background: `linear-gradient(to right, #D1FAE5 ${str}, #fff ${str})`}}
        className="mini-player flex bg-white py-2 px-4 items-center border-t">
        <img src={props.song.cover}
          alt=""
          className="song-cover w-12 h-12 mr-3"/>
        <div className="text-base mr-auto">{props.song.title}</div>
        <div className="action-btn" onClick={(e) => {
          e.stopPropagation()
          props.onPlayBtnTap()
        }}>
          {
            props.playing
            ? <i className="play-btn fa fa-pause-circle text-3xl"></i>
            : <i className="play-btn fa fa-play-circle text-3xl"></i>
          }
        </div>
      </div>
    </div>
  )
}