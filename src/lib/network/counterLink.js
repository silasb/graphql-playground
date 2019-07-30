import { ApolloLink } from 'apollo-link'
import mitt from 'mitt'

export const counterEmitter = mitt()

let numRequests = 0

export default new ApolloLink((operation, forward) => {
  numRequests++
  setTimeout(() => counterEmitter.emit('newCount', numRequests), 500)
  //console.log(`starting request for ${operation.operationName}`)

  return forward(operation).map(data => {
    //console.log(`ending request for ${operation.operationName}`)
    return data
  })
})
