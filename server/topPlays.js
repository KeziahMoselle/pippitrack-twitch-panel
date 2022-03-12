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
    const { id, mode, best_limit } = request.query

    const key = `topPlays:${id}:${mode}:${best_limit}`

    const cached = await redis.get(key)

    if (cached) {
      return JSON.parse(cached)
    }

    const res = await v2.login(process.env.OSU_CLIENT_ID, process.env.OSU_CLIENT_SECRET)

    const response = await v2.scores.users.best(id, {
      mode: mode || 'osu',
      limit: Number(best_limit) || 15,
    })

    redis.set(key, JSON.stringify(response), {
      EX: 60 * 5 // 5 minutes cache
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