const { createClient } = require('redis')

const redis = createClient({
  url: process.env.REDIS_URL
})

redis.connect()

redis.on('error', (err) => console.log('Redis Client Error', err));

module.exports = redis