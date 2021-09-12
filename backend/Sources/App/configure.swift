import Vapor
import Fluent
import FluentMongoDriver

// configures your application
public func configure(_ app: Application) throws {
    // uncomment to serve files from /Public folder
    // app.middleware.use(FileMiddleware(publicDirectory: app.directory.publicDirectory))
        
    try routes(app)
    try app.databases.use(.mongo(connectionString: "mongodb://localhost:27017/portfolio-tracker"), as: .mongo)
}
