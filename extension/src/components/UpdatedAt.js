import { FiRefreshCcw } from "react-icons/fi";
import * as timeago from 'timeago.js'

const intl = new Intl.DateTimeFormat(navigator.language, {
  hour: 'numeric',
  minute: 'numeric',
})

export default function UpdatedAt({ date }) {
  return (
    <div title={`Updated ${timeago.format(date)}`} className="fixed bottom-0 right-0 bg-purple text-white rounded-tl-lg px-2 z-goku text-sm flex items-center gap-x-1">
      <FiRefreshCcw /> {intl.format(date)}
    </div>
  )
}