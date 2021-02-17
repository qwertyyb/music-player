import React from 'react';
import { Route, HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import Player from './views/Player'
import List from './views/List'
import SongList from './views/SongList'
import store from './store'
import './App.scss';
import DatasourceContext, { defaultDataSource } from './context/DataSource';
import PlayerPage from './views/Player';

class App extends React.Component {
  state ={
    dataSource: defaultDataSource,
    playerUi: 'mini'
  }
  toggleUi = () => {
    const { playerUi } = this.state
    const newUi = playerUi === 'mini' ? 'normal' : 'mini'
    this.setState({
      playerUi: newUi
    })
  }
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <div className="app-container">
            <DatasourceContext.Provider value={this.state.dataSource}>
              <Router>
                <Route path="/" exact component={List}></Route>
                <Route path="/type/:tid/songs" component={SongList}></Route>
                <Route path="/player/:sid?" component={Player}></Route>
              </Router>
            </DatasourceContext.Provider>
          </div>
          <PlayerPage ui={this.state.playerUi}
            toggleUi={this.toggleUi}></PlayerPage>
        </Provider>
      </div>
    );
  }
}

export default App;
