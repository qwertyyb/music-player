export interface Song {
  id?: string | number,
  title: string,
  artist: string,
  album: string,
  cover: string,
  duration: number,
  playUrl: string,
  lyrics: string,
}

export interface TypeInfo {
  id?: string | number,
  title: string,
  subtitle: string,
  cover: string,
  songs?: Song[]
}

export enum PlayMode {
  list, single, random
}

export interface PlayingState {
  mode: PlayMode,
  index: number,
  currentTime: number,
  duration: number,
  playing: boolean,
  playlist: Song[]
}

export interface DataSource {
  version: number,
  categoryList: TypeInfo[]
}

export interface DataSourceState {
  url: string,
  dataSource: DataSource
}

export enum ActionType {
  setSong, setPlaying, setCurrentTime, setDuration, setPlayingMode,

  setDataSource, setDataSourceUrl
}

export interface SetPlayingModeAction {
  type: ActionType.setPlayingMode,
  payload: {
    mode: PlayMode
  }
}