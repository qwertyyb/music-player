import { ThunkAction } from "redux-thunk"
import { AppState } from "."
import services from "../services"
import { ActionType, PlayMode, Song, DataSource } from "../types/app_types"


const setPlayingMode = (mode: PlayMode) => ({
  type: ActionType.setPlayingMode,
  payload: {
    mode
  }
})
const setPlaying = (playing: boolean) => ({
  type: ActionType.setPlaying,
  payload: {
    playing
  }
})
const setSong = (index: number, list: Song[]) => ({
  type: ActionType.setSong,
  payload: {
    index, list
  }
})
const toggleMode = (): ThunkAction<void, AppState, null, ReturnType<typeof setPlayingMode>> => (dispatch, getState)  => {
  const { mode } = getState().playing
  const queue = [PlayMode.list, PlayMode.single, PlayMode.random]
  const nextIndex = (queue.indexOf(mode) + 1) % queue.length
  return dispatch(setPlayingMode(queue[nextIndex]))
}
const setDuration = (duration: number) => ({
  type: ActionType.setDuration,
  payload: {
    duration,
  }
})

const setCurrentTime = (currentTime: number) => ({
  type: ActionType.setCurrentTime,
  payload: {
    currentTime
  }
})

const setDataSourceUrl = (url: string) => {
  localStorage.setItem('dataSourceUrl', url)
  return {
    type: ActionType.setDataSourceUrl,
    payload: {
      url
    }
  }
}

const setDataSource = (dataSource: DataSource) => ({
  type: ActionType.setDataSource,
  payload: {
    dataSource,
  }
})

const loadDataSource = () : ThunkAction<void, AppState, null, ReturnType<typeof setDataSource>> => async (dispatch, getState) => {
  const { url } = getState().dataSource
  const dataSource = await services.getDataSource(url)
  localStorage.setItem(url, JSON.stringify(dataSource))
  return dispatch(setDataSource(dataSource))
}

const playing = {
  toggleMode,
  setPlaying,
  setSong,
  setDuration,
  setCurrentTime,
}

const dataSource = {
  setDataSourceUrl,
  loadDataSource
}
export {
  playing,
  dataSource
}