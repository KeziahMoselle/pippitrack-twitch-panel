const fastify = require('fastify')
const { v2, auth } = require('osu-api-extended')
const countRequests = require('./libs/countRequests')
const redis = require('./redis')

// Cache expires in 1 hour
const EX = 3600

/**
 * Send pinned scores
 *
 * @param {fastify.FastifyRequest} request
 * @param {fastify.FastifyReply} reply
 * @return {*}
 */
async function pinnedScores(request, reply) {
  if (process.env.NODE_ENV !== 'development') {
    if (!request.headers.origin === 'https://www.twitch.tv') {
      return console.warn(`[api] origin "${request.headers.origin}" not allowed.`)
    }
  }

  try {
    const { id, mode = 'osu', pinned_limit = 50 } = request.query

    const key = `pinnedScores:${id}:${mode}:${pinned_limit}`

    const cached = await redis.get(key)

    if (cached) {
      return JSON.parse(cached)
    }

    const isLoggedIn = await auth.isLogin()
    if (!isLoggedIn) {
      await auth.login(process.env.OSU_CLIENT_ID, process.env.OSU_CLIENT_SECRET)
      console.log('[osu!oauth] Logged in')
    }

    countRequests()
    const response = await v2.scores.users.pinned(id, {
      mode: mode,
      limit: Number(pinned_limit)
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

module.exports = pinnedScores