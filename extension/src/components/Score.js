import * as timeago from 'timeago.js'

import F from '../assets/F.png'
import D from '../assets/D.png'
import C from '../assets/C.png'
import B from '../assets/B.png'
import A from '../assets/A.png'
import S from '../assets/S.png'
import SH from '../assets/SH.png'
import X from '../assets/X.png'
import XH from '../assets/XH.png'

import DT from '../assets/DT.png'
import EZ from '../assets/EZ.png'
import FL from '../assets/FL.png'
import HD from '../assets/HD.png'
import HR from '../assets/HR.png'
import HT from '../assets/HT.png'
import NC from '../assets/NC.png'
import NF from '../assets/NF.png'
import PF from '../assets/PF.png'
import SD from '../assets/SD.png'
import SO from '../assets/SO.png'

import missIcon from '../assets/miss.png'

const RANK_IMAGES = {
  F,
  D,
  C,
  B,
  A,
  S,
  SH,
  X,
  XH,
}

const MODS_IMAGES = {
  DT,
  EZ,
  FL,
  HD,
  HR,
  HT,
  NC,
  NF,
  PF,
  SD,
  SO,
}

export default function Score({ score }) {
  return (
    <a
      href={`https://osu.ppy.sh/beatmapsets/${score.beatmapset.id}#${score.mode}/${score.beatmap.id}`}
      target="_blank"
      rel="noreferrer noopener"
      title={`Score set ${timeago.format(score.created_at)}`}
      className="
        flex flex-col relative overflow-hidden
        px-4 py-3 bg-black rounded-xl
        transform transition-transform ease-out-cubic z-10
        hover:scale-105 hover:z-20
      ">
      <div className="flex items-center mr-4 mb-2">
        <div className="mr-4">
          <img
            src={RANK_IMAGES[score.rank]}
            alt={score.rank}
            height={20}
            width={40} />
        </div>
        <div className="w-full overflow-hidden">
          <p className="text-sm font-semibold truncate">
            <span>{ score.beatmapset.title }{" "}</span>
            <small>by { score.beatmapset.artist }</small>
          </p>
          <p className="text-xs truncate">
            <span className="text-yellow">
              {score.beatmap.version}
            </span>
            <span className="inline text-xs bg-black rounded-lg px-2">
              {Number(score.beatmap.difficulty_rating).toFixed(2)}⭐
            </span>
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center font-bold">
        <div className="flex">
          {score.mods.length === 0 && (
            <span className="text-sm">NM</span>
          )}

          {/* Splicing here is to avoid too many mods icons (no overflow) */}
          {[...score.mods].splice(0, 4).map(mod => (
            <img
              key={mod}
              src={MODS_IMAGES[mod]}
              alt={mod}
              height={28}
              width={28} />
          ))}
        </div>
        <div className="flex items-end">
          <div className="flex flex-col items-end mr-2">
            <div className="flex items-center text-xxs">
              {score.statistics.count_miss > 0 && (
                <div className="flex items-center text-xxs mr-1">
                  <span>{score.statistics.count_miss}</span>
                  <img className="w-2 h-2 ml-small" src={missIcon} alt="miss" />
                </div>
              )}

              <span className={`${score.perfect ? 'text-yellow' : ''}`}>
                {score.max_combo}x
              </span>

              <span className="text-white text-opacity-60 text-xxs ml-1">
                ({ Number(score.accuracy * 100).toPrecision(4) }%)
              </span>
            </div>
          </div>
          <span className="text-purple-accent">
            {Math.round(score.pp)}
          </span>
          <small className="text-purple-detail">
            pp
          </small>
        </div>
      </div>

      <img src={score.beatmapset.covers.card} alt={`${score.beatmapset.artist} ${score.beatmapset.title} cover`} className="absolute inset-0 opacity-10 pointer-events-none select-none w-full"/>
    </a>
  )
}