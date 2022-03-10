import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://twitch.pippitrack.com/',
})

export async function getBestPerformance({
  id,
  mode,
}) {
  if (!id || !mode) {
    throw new Error('Missing required parameters: id or mode.')
  }

  const { data } = await instance.get(`v1/top_plays?id=${id}&mode=${mode}`)
  return data;
}

export async function getRecentScores({
  id,
  mode,
}) {
  if (!id || !mode) {
    throw new Error('Missing required parameters: id or mode.')
  }

  const { data } = await instance.get(`v1/recent_scores?id=${id}&mode=${mode}`)
  return data;
}