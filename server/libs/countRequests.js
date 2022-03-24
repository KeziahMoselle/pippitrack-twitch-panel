const redis = require("../redis");

// Cache expires in 30m
const EX = 1800

async function countRequests() {
  const key = `countRequests:${new Date().getHours()}:${new Date().getMinutes()}`;

  const cached = await redis.get(key)

  if (cached) {
    return redis.set(key, Number(cached) + 1, 'EX', EX)
  }

  redis.set(key, 1, 'EX', EX)
}

module.exports = countRequests