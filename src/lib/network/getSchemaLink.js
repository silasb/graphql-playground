import { makeRemoteExecutableSchema, introspectSchema } from 'graphql-tools'
import link from './httpLink'
import { SchemaLink } from 'apollo-link-schema'

export default async () => {
  const schema = await introspectSchema(link)

  const executableSchema = makeRemoteExecutableSchema({
    schema,
    link,
  })

  return new SchemaLink({ schema: executableSchema })
}
