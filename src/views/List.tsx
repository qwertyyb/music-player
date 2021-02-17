import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppState } from '../store'
import { dataSource } from '../store/actions'
import { DataSourceState } from '../types/app_types'
import './List.scss'

interface ListProps {
  dataSource: DataSourceState,
  setDataSourceUrl: (url: string) => void,
}

class List extends React.Component<ListProps> {

  importData = () => {
    const newUrl = window.prompt('请输入数据源的地址', this.props.dataSource.url)
    if (newUrl) {
      this.props.setDataSourceUrl(newUrl)
    }
  }

  render() {
    const { dataSource } = this.props.dataSource
    return (
      <div className="view-list">
        <div className="flex justify-between items-center mx-2 my-4">
          <h1 className="font-bold text-2xl">播放列表</h1>
          <div className="import-data-action mr-4"
            onClick={this.importData}>
            <i className="fa fa-database text-2xl"></i>
          </div>
        </div>
        <ul className="type-list">
          {
            dataSource.categoryList.map(type => (
              <Link to={`/type/${type.id}/songs`}
                key={type.id}>
                <li className="type-item flex items-center py-2 px-4 border-t active:bg-gray-100 transition-colors border-gray-100">
                  <img src={type.cover}
                    alt=""
                    className="type-cover"/>
                  <div className="flex flex-col flex-1 ml-2">
                    <h3 className="type-title text-lg">{type.title}</h3>
                    <p className="type-subtitle text-gray-400 text-sm">{type.subtitle}</p>
                  </div>
                  <i className="fa fa-angle-right ml-auto text-3xl text-gray-300"></i>
                </li>
              </Link>
            ))
          }
        </ul>
      </div>
    )
  }
}

const CategoryList = connect(
  (state: AppState) => ({
    dataSource: state.dataSource
  }),
  (dispatch) => {
    return {
      setDataSourceUrl: (url: string) => {
        dispatch(dataSource.setDataSourceUrl(url))
        return dispatch<any>(dataSource.loadDataSource())
      }
    }
  }
)(List)

export default CategoryList
