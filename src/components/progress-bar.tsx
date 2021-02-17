import React from 'react'

interface ProgressBarProps {
  max: number,
  value: number,
  onSeek?: (value: number) => void
}

const formatDuration = (val: number) => {
  const intVal = Math.round(val)
  const s = intVal % 60
  const m = Math.floor(intVal / 60)
  return `${m > 9 ? m : '0' + m}:${s > 9 ? s : '0' + s}`
}

export default class ProgressBar extends React.Component<ProgressBarProps> {
  state = {
    seeking: false,
    value: 0,
  }
  addRangeChangeEvent = (target: HTMLInputElement) => {
    if (!target) return
    target.addEventListener('change', this.onChange)
  }
  onChange = (e: any) => {
    console.log(e.target.value)
    this.props.onSeek?.(e.target.value)
    // 设置个timeout, 等新的props.value到达
    setTimeout(_ => {
      this.setState({
        seeking: false,
        value: e.target.value
      })
    }, 200)
  }
  onInput = (e: any) => {
    this.setState({
      seeking: true,
      value: e.target.value
    })
  }
  render() {
    const { max, value: propsValue } = this.props
    const { seeking, value: stateValue } = this.state
    let value = propsValue
    if (seeking) {
      value = stateValue
    }
    return (
      <div className="component-progress-bar">
        <input type="range" min="0" max={max}
          ref={this.addRangeChangeEvent}
          onInput={this.onInput}
          value={value}
          className="progress w-full"/>
        {/* <div className="progress bg-gray-400 rounded">
          <div className="progress-value bg-white h-1 relative rounded-l" style={{
            width: (value * 100 / max) + '%'
          }}>
            <div className="progress-indicator absolute w-3 h-3 bg-white -top-1 -right-1 rounded-lg"
              onTouchStart={this.onTouchStart}></div>
          </div>
        </div> */}
        <div className="progress-labels text-gray-600 text-xs flex justify-between mt-2">
          <div className="progress-label">{formatDuration(value)}</div>
          <div className="progress-label">{formatDuration(max)}</div>
        </div>
      </div>
    )
  }
}