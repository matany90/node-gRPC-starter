const protoLoader = require("@grpc/proto-loader")
const grpc = require("grpc")

/**
 * Load proto helper function
 */
module.exports = path => {
  const packageDefinition = protoLoader.loadSync(
    path,
    {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    }
  )

  return grpc.loadPackageDefinition(packageDefinition).proto;
}
