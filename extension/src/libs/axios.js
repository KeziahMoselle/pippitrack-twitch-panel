import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://pippitrack-twitch.reverie.moe/',
})

export const fetcher = (url) => instance.get(url).then(res => res.data)