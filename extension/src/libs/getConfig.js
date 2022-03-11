function getConfig() {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('PippiTrack: get config for development mode.')
      return resolve({
        id: '5914915',
        mode: 'osu',
        best_limit: 15,
        recent_limit: 15,
      })
    }

    window.Twitch.ext.configuration.onChanged(() => {
      if (window.Twitch.ext.configuration.broadcaster) {
        const config = JSON.parse(window.Twitch.ext.configuration.broadcaster.content)

        if (typeof config === 'object') {
          resolve(config)
        } else {
          reject('Invalid config')
        }
      }
    })
  })
}

export default getConfig