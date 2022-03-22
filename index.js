/* eslint-disable no-new */
/* eslint-disable no-labels */
/* eslint-disable no-unused-vars */
const { ApolloServer, gql } = require('apollo-server')
const SessionsAPI = require('./datasources/sessions')

const typeDefs = gql`
type Query {
    sessions(
      id: ID
      title: String,
      description: String,
      startsAt: String,
      endsAt: String,
      room: String,
      day: String,
      format: String,
      track: String
      level: String
    ): [Session],
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

const resolvers = {
  Query: {
    sessions: (parent, args, { dataSources }, info) => dataSources.sessionAPI.getSessions(args),
    sessionById: (parent, { id }, { dataSources }, info) => dataSources.sessionAPI.getSessionById(id),
  },
}

const dataSources = () => ({
  sessionAPI: new SessionsAPI(),
})

const server = new ApolloServer({ typeDefs, resolvers, dataSources })

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => {
    console.log(`graphql running at ${url}`)
  })
