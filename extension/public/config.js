const form = document.querySelector('form')
const message = document.querySelector('#message')
const inputId = document.querySelector('#id')
const inputMode = document.querySelector('#mode')
const inputBestLimit = document.querySelector('#best_limit')
const inputRecentLimit = document.querySelector('#recent_limit')

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const data = new FormData(form)

  if (!data.get('id')) {
    return updateMessage('Please fill your osu! id.')
  }

  saveConfig({
    id: data.get('id'),
    mode: data.get('mode'),
    best_limit: data.get('best_limit'),
    recent_limit: data.get('recent_limit'),
  })

  updateMessage('Saved! You can now close this tab.')
})

window.Twitch.ext.configuration.onChanged(() => {
  if (window.Twitch.ext.configuration.broadcaster) {
    try {
      const config = JSON.parse(window.Twitch.ext.configuration.broadcaster.content)

      if (typeof config === 'object') {
        inputId.value = config.id
        inputMode.value = config.mode
        inputBestLimit.value = config.best_limit
        inputRecentLimit.value = config.recent_limit
      } else {
        console.log('Invalid config')
      }
    } catch (e) {
      console.log('Invalid config', e)
    }
  }
})

function saveConfig(data) {
  window.Twitch.ext.configuration.set('broadcaster', '1', JSON.stringify(data));
}

function updateMessage(value) {
  message.innerHTML = value

  setTimeout(() => {
    message.innerHTML = ''
  }, 2000);
}