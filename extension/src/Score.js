import * as timeago from 'timeago.js'
const intlNumber = new Intl.NumberFormat(navigator.language)

export default function Score({ score }) {
  return (
    <a
      href={`https://osu.ppy.sh/beatmapsets/${score.beatmapset.id}#${score.mode}/${score.beatmap.id}`}
      target="_blank"
      rel="noreferrer noopener"
      className="
        flex relative overflow-hidden
        px-8 py-2 bg-black rounded-xl
        transform transition-transform ease-out-cubic
        hover:scale-110
      ">
      <div className="flex items-center mr-4">
        { score.rank }
      </div>
      <div className="w-full overflow-hidden">
        <p className="text-sm font-semibold truncate">
          <span>{ score.beatmapset.title }{" "}</span>
          <small>by { score.beatmapset.artist }</small>
        </p>
        <div className="text-xs">
          <span>{intlNumber.format(score.score)}</span> / <span>{score.max_combo}x</span>
          {" "}
          <span>{"{"} {score.statistics.count_300} / {score.statistics.count_100} / {score.statistics.count_50} / {score.statistics.count_miss} {"}"}</span>
        </div>
        <div className="text-xs mt-1">
          <span className="text-yellow">
            {score.beatmap.version} +{score.mods.join('')}
          </span>
          <time className="text-black-light ml-4">{ timeago.format(score.created_at) }</time>
        </div>
      </div>

      <div className="flex items-center pl-4 font-bold">
        <span className="text-purple-accent">
          {Math.round(score.pp)}
        </span>
        <small className="text-purple-detail">
          pp
        </small>
      </div>

      <img src={score.beatmapset.covers.card} alt={`${score.beatmapset.artist} ${score.beatmapset.title} cover`} className="absolute inset-0 opacity-10 pointer-events-none select-none w-full"/>
    </a>
  )
}