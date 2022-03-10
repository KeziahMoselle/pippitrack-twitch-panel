const fastify = require('fastify')
const { v2 } = require('osu-api-extended')
const redis = require('./redis')


/**
 * Send top plays
 *
 * @param {fastify.FastifyRequest} request
 * @param {fastify.FastifyReply} reply
 * @return {*}
 */
async function topPlays(request, reply) {
  try {
    const { id, mode } = request.query

    const key = `recentScores:${id}:${mode}`

    const cached = await redis.get(key)

    if (cached) {
      return JSON.parse(cached)
    }

    const res = await v2.login(process.env.OSU_CLIENT_ID, process.env.OSU_CLIENT_SECRET)

    const response = await v2.scores.users.recent(id, {
      mode,
      limit: 5,
    })

    redis.set(key, JSON.stringify(response), {
      EX: 30
    })

    return response
  } catch (error) {
    console.log(error)
    return {
      message: error.message
    }
  }
}

module.exports = topPlays