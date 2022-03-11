import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://twitch.pippitrack.com/',
})

export async function getBestPerformance(params) {

  const { data } = await instance.get('v1/top_plays', {
    params
  })
  return data;
}

export async function getRecentScores(params) {


  const { data } = await instance.get('v1/recent_scores', {
    params
  })
  return data;
}