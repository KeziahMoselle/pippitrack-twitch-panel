const Redis = require('ioredis')

const redis = new Redis(process.env.REDIS_URL, {
  reconnectOnError() {
    return true
  }
})

redis.on('reconnecting', () => console.log('Reconnecting to Redis...'))
redis.on('ready', () => console.log('Connected to Redis!'))
redis.on('error', (error) => console.error(error))
redis.on('end', () => console.error('Disconnected from Redis!'))

module.exports = redis