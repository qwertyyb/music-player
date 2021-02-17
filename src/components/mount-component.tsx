import React from 'react'
import ReactDOM from 'react-dom'

interface MountComponentProps {
  parent?: string
}

class MountComponent extends React.Component<MountComponentProps> {
  el = document.createElement('div')
  parentDom?: Element

  componentDidMount() {
    const parent = this.props.parent || 'body'
    this.parentDom = document.querySelector(parent) || document.body
    this.parentDom.appendChild(this.el);
  }

  componentWillUnmount() {
    this.parentDom?.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }
}

export default MountComponent