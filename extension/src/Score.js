import * as timeago from 'timeago.js'
const intlNumber = new Intl.NumberFormat(navigator.language)

export default function Score({ score }) {
  return (
    <div className="flex px-8 py-2 bg-black rounded-xl relative">
      <div className="flex items-center mr-4">
        { score.rank }
      </div>
      <div className="">
        <a className="text-sm font-semibold flex flex-col" href={`https://osu.ppy.sh/beatmapsets/${score.beatmapset.id}#${score.mode}/${score.beatmap.id}`}>
          <span>{ score.beatmapset.title }{" "}</span>
          <small>by { score.beatmapset.artist }</small>
        </a>
        <div className="text-xs">
          <span>{intlNumber.format(score.score)}</span> / <span>{score.max_combo}x</span>
          {" "}
          <span>{"{"} {score.statistics.count_300} / {score.statistics.count_100} / {score.statistics.count_50} / {score.statistics.count_miss} {"}"}</span>
        </div>
        <div className="text-xs mt-1">
          <span className="text-yellow">{score.beatmap.version}</span>
          <time className="text-black-light ml-4">{ timeago.format(score.created_at) }</time>
        </div>
      </div>
    </div>
  )
}