const form = document.querySelector('form')
const message = document.querySelector('#message')

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const data = new FormData(form)
  console.log(data)

  if (!data.get('id')) {
    message.innerText = 'Please fill your osu! id.'
    return
  }

  saveConfig({
    id: data.get('id'),
    mode: data.get('mode')
  })

  message.innerHTML = 'Saved! You can now close this tab.'
})

function saveConfig(data) {
  window.Twitch.ext.configuration.set('broadcaster', '1', JSON.stringify(data));
}