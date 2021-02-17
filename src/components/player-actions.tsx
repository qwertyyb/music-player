import { PlayMode } from "../types/app_types"
import './player-actions.scss'

interface PlayerActionsProps {
  playing: boolean,
  mode: PlayMode,
  onPlayBtnTap: () => void,
  onPlaylistBtnTap: () => void,
  onPrevBtnTap?: () => void,
  onNextBtnTap?: () => void,
  onModeBtnTap: () => void,
}

const getModeIcon = (mode: PlayMode) => {
  const icons = {
    [PlayMode.list]: 'fa-retweet',
    [PlayMode.random]: 'fa-random',
    [PlayMode.single]: 'fa-bolt'
  }
  return icons[mode]
}

export default function PlayerActions(props: PlayerActionsProps) {
  const playIcon = props.playing ? 'fa-pause-circle' : 'fa-play-circle'
  return (
    <div className="component-player-actions flex justify-between items-center text-white mt-4">
      <div className="action-btn" onClick={props.onModeBtnTap}>
        <i className={`fa ${getModeIcon(props.mode)} text-2xl text-gray-400`} aria-hidden="true"></i>
      </div>
      <div className="action-btn" onClick={props.onPrevBtnTap}>
        <i className="fa fa-step-backward text-3xl" aria-hidden="true"></i>
      </div>
      <div className="action-btn" onClick={props.onPlayBtnTap}>
        <i className={["fa", "text-7xl", playIcon].join(' ')} aria-hidden="true"></i>
      </div>
      <div className="action-btn" onClick={props.onNextBtnTap}>
        <i className="fa fa-step-forward text-3xl" aria-hidden="true"></i>
      </div>
      <div className="action-btn" onClick={props.onPlaylistBtnTap}>
        <i className="fa fa-list text-2xl text-gray-400"
          aria-hidden="true"></i>
      </div>
    </div>
  )
}