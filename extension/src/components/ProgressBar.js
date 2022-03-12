export default function ProgressBar({ percent }) {
  return (
    <div
      className="absolute z-50 top-0 left-0 bg-purple transition-all ease-linear"
      style={{ width: `${percent}%`, height: '2px'}}>
    </div>
  )
}