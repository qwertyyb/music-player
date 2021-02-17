
import { PlayMode, PlayingState, ActionType, DataSourceState, DataSource } from '../types/app_types'

const initialPlayingState: PlayingState = {
  mode: PlayMode.list,
  index: 0,
  currentTime: 0,
  duration: 1,
  playing: false,
  playlist: [{
    id: 1,
    title: "灯花佐酒",
    artist: "河图",
    cover: "https://y.gtimg.cn/music/photo_new/T002R800x800M0000002WzhX07r0ew.jpg?max_age=2592000",
    album: "灯花佐酒",
    lyrics: "",
    duration: 0,
    playUrl: "http://cdn.qwertyyb.cn/audio/河图-灯花佐酒.mp3"
  }]
}

interface Action {
  type: ActionType,
  payload: any,
}

const playingReducer = (state = initialPlayingState, action: Action) => {
  switch (action.type) {
    case ActionType.setSong:
      return {
        ...state,
        index: action.payload.index,
        playlist: action.payload.list,
      }
    case ActionType.setCurrentTime:
      return {
        ...state,
        currentTime: action.payload.currentTime
      }
    case ActionType.setDuration:
      return {
        ...state,
        duration: action.payload.duration
      }
    case ActionType.setPlaying:
      return {
        ...state,
        playing: action.payload.playing
      }
    case ActionType.setPlayingMode:
      return {
        ...state,
        mode: action.payload.mode
      }
  }
  return state
}


const localData = (() => {
  const url = localStorage.getItem('dataSourceUrl')
  let dataSource: DataSource | null = null
  if (url) {
    try {
      dataSource = JSON.parse(localStorage.getItem(url) || '')
    } catch(err) {
      console.log('local dataSource error', err)
    }
  }
  return {
    url,
    dataSource
  }
})()

console.log(localData)

const initialDataSourceState: DataSourceState = {
  url: localData.url || `https://gist.githubusercontent.com/qwertyyb/d39c09d3e618b013ddf66515ba2658ec/raw/datasource.json`,
  dataSource: localData.dataSource || {
    version: 1,
    categoryList: []
  }
}
const dataSourceReducer = (state = initialDataSourceState, action: Action) => {
  if (action.type === ActionType.setDataSource) {
    return {
      ...state,
      dataSource: action.payload.dataSource
    }
  } else if(action.type === ActionType.setDataSourceUrl) {
    return {
      ...state,
      url: action.payload.url
    }
  }
  return state
}

export { playingReducer, dataSourceReducer }