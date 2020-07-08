// Init packges
const path = require("path")
const grpc = require("grpc")
const _loadProto = require("./utils")

// define path to proto
const PROTO_PATH = path.join(__dirname, "./proto/demo.proto")

// define port
const PORT = process.env.PORT || 5000

// load proto
const demoPorto = _loadProto(PROTO_PATH)

/**
 * Get Hello world
 */
const getHelloWorld = (call, callback) => {
  callback(null, { text: "Hello world from gRPC!" })
}

/**
 * multiplication array by
 */
const multiplicationArray = (call, callback) => {
  const multiplicationArray = call.request.array.map(el => el * call.request.multiplyBy)
  callback(null, { multiplicationArray })
}

/**
 * Server Entry point
 */
const main = () => {
  // define server
  const server = new grpc.Server()
  server.addService(demoPorto.DemoService.service, { getHelloWorld, multiplicationArray })
  server.bind(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure())
  server.start()

  console.log(`Starting gRPC server on port ${PORT}...`)
}

main()

