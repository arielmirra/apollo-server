const { DataSource } = require('apollo-datasource')
const _ = require('lodash')
const sessions = require('../data/sessions.json')

class SessionsAPI extends DataSource {
  initialize(config) {

  }

  getSessions() {
    return sessions
  }

  getSessionById(id) {
    const session = _.filter(sessions, { id: parseInt(id, 10) })
    return session[0]
  }
}

module.exports = SessionsAPI
