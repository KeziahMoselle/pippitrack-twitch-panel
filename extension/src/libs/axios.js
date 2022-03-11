import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://twitch.pippitrack.com/',
})

export const fetcher = (url) => instance.get(url).then(res => res.data)