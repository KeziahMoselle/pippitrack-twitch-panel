const dotenv = require('dotenv')
dotenv.config()
const fastify = require('fastify')
const topPlays = require('./topPlays')

class Api {

  /**
   * @type {fastify.FastifyInstance}
   */
  server = fastify()
  port = null

  constructor (port) {
    this.port = port

    this.routes()
  }

  routes () {
    this.server.get('/', () => 'owo')
    this.server.route({
      method: 'GET',
      url: '/v1/top_plays',
      schema: {
        querystring: {
          username: { type: 'string' },
          mode: { type: 'string' },
        }
      },
      handler: topPlays
    })
  }

  start () {
    this.server.listen(
      this.port,
      process.env.NODE_ENV === 'production' ? '0.0.0.0' : undefined,
      (err, address) => {
        if (err) {
          console.error('API start error :', err)
          process.exit(1)
        }

        console.log(`API is listening at : ${address}`)
      }
    )

    return this
  }

  close () {
    return this.server.close()
  }
}

new Api(process.env.PORT || 80).start()