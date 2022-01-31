const StreamParser = require('./parser')

/**
 *
 * @param {string} channel Streaming channel name
 * @param {object} data Error payload
 */
const error = (channel, data) => console.log(new Date(), 'error', channel, data)

/**
 * @param {string} pair Streaming pair name
 * @param {object} data Streaming payload
 * @param {array} data.asks Ask posititons
 * @param {number} data.asks[][0] Ask price
 * @param {number} data.asks[][1] Quantity
 * @param {array} data.bids Bid posititons
 * @param {number} data.bids[][0] Bid price
 * @param {number} data.bids[][1] Quantity
 */
const depth = (pair, data) => console.log(pair, data.asks, data.bids)

const Controller = {
  depth: depth,
  error: error
}

module.exports = (response) => {
  let [pair, fn, data] = StreamParser(response)
  Controller[fn](pair, data)
}