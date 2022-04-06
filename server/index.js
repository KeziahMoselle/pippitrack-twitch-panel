const dotenv = require('dotenv')
dotenv.config()
const fastify = require('fastify')
const topPlays = require('./topPlays')
const fastifyCors = require('fastify-cors')
const recentScores = require('./recentScores')
const pinnedScores = require('./pinnedScores')

class Api {

  /**
   * @type {fastify.FastifyInstance}
   */
  server = fastify()
  port = null

  constructor (port) {
    this.port = port

    this.server.register(fastifyCors, {
      origin: "*",
      methods: ["GET"]
    })

    this.routes()
  }

  routes () {
    this.server.get('/', (request, reply) => reply.redirect(301, 'https://dashboard.twitch.tv/extensions/zqst1nq21s3rw0y29kgrza7zt8jux0'))
    this.server.route({
      method: 'GET',
      url: '/v1/top_plays',
      schema: {
        querystring: {
          id: { type: 'string' },
          mode: { type: 'string' },
          best_limit: { type: 'number' },
        }
      },
      handler: topPlays
    })
    this.server.route({
      method: 'GET',
      url: '/v1/pinned_scores',
      schema: {
        querystring: {
          id: { type: 'string' },
          mode: { type: 'string' },
          best_limit: { type: 'number' },
        }
      },
      handler: pinnedScores
    })
    this.server.route({
      method: 'GET',
      url: '/v1/recent_scores',
      schema: {
        querystring: {
          id: { type: 'string' },
          mode: { type: 'string' },
          recent_limit: { type: 'number' }
        }
      },
      handler: recentScores
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