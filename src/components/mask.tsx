import MountComponent from './mount-component'

export default function Mask(props: { children: any, visible: boolean, onTap: () => void }) {
  const className = ['component-mask', 'w-screen', 'h-screen', 'bg-black', 'bg-opacity-50', 'fixed', 'inset-0', 'z-20']
  if (!props.visible) {
    className.push('hidden')
  }
  return (
    <MountComponent>
      <div className={className.join(' ')} onClick={props.onTap}>
      </div>
      {props.children}
    </MountComponent>
  )
}