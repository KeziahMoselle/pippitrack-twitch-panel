const fastify = require('fastify')
const { v2, auth } = require('osu-api-extended')
const countRequests = require('./libs/countRequests')
const redis = require('./redis')

// Cache expires in 30 seconds
const EX = 30

/**
 * Send recent scores
 *
 * @param {fastify.FastifyRequest} request
 * @param {fastify.FastifyReply} reply
 * @return {*}
 */
async function recentScores(request, reply) {
  try {
    const { id, mode = 'osu', recent_limit = 15 } = request.query

    const key = `recentScores:${id}:${mode}:${recent_limit}`

    const cached = await redis.get(key)

    if (cached) {
      return JSON.parse(cached)
    }

    await auth.login(process.env.OSU_CLIENT_ID, process.env.OSU_CLIENT_SECRET)

    countRequests()
    const response = await v2.scores.users.recent(id, {
      mode: mode,
      limit: Number(recent_limit),
      include_fails: '1',
    })

    console.log(`[${key}]: Fetched ${response.length} scores. (${response?.[0]?.user?.username})`)

    redis.set(key, JSON.stringify(response), 'EX', EX)

    return response
  } catch (error) {
    console.log(error)
    return {
      message: error.message
    }
  }
}

module.exports = recentScores