/* eslint-disable no-new */
/* eslint-disable no-labels */
/* eslint-disable no-unused-vars */
const { ApolloServer, gql } = require('apollo-server')
const SessionsAPI = require('./datasources/sessions')

const typeDefs = gql`
type Query {
    sessions: [Session],
    sessionById(id: ID): Session
}
type Session {
    id: ID!
    title: String,
    description: String,
    startsAt: String,
    endsAt: String,
    room: String,
    day: String,
    format: String,
    track: String @deprecated(reason: "Too many sessions don't fit under a single track, will become a list"),
    level: String
}
`

const datasources = () => {
  sessionAPI: new SessionsAPI()
}

const resolvers = {
  Query: {
    sessions: (parent, args, { dataSources }, info) => {
      return dataSources.SessionsAPI.getSessions()
    },
    sessionById: (parent, { id }, { dataSources }, info) => {
      return dataSources.SessionsAPI.getSessionById(id)
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => {
    console.log(`graphql running at ${url}`)
  })
