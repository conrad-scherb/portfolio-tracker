import Vapor
import Fluent

struct StockResponse: Content {
    var latestPrice: Double
    var changePercent: Double
    var companyName: String
}

final class User: Model, Content {
    static let schema = "users"
    
    @ID(key: .id)
    var id: UUID?
    
    @Field(key: "authUID")
    var authUID: String
    
    @Field(key: "stocks")
    var stocks: [String]
    
    init() { }
    
    init(id: UUID? = nil, authUID: String, stocks: [String]) {
        self.id = id
        self.authUID = authUID
        self.stocks = stocks
    }
}

func routes(_ app: Application) throws {
    app.get { req in
        return "Server is running"
    }
    
    // MARK: User managment routes
    app.get("users") { req in
        return User.query(on: req.db).all()
    }
    
    // Request the user's stocks
    app.get("users", ":authID", "stocks") { req -> EventLoopFuture<User> in
        let id = req.parameters.get("authID")!
        return User.query(on: req.db)
            .filter(\.$authUID == id)
            .first()
            .unwrap(or: Abort(.notFound))
    }
    
    app.post("users") { req -> EventLoopFuture<User> in
        let user = try req.content.decode(User.self)
        return user.create(on: req.db)
            .map { user }
    }
    
    
    // MARK: Stock routes
    app.get("stock", "quote", ":symbol") { req -> EventLoopFuture<StockResponse> in
        let symbol = req.parameters.get("symbol")!
        let client = req.client
        let stockRequest = client.get("https://cloud.iexapis.com/stable/stock/\(symbol)/quote?token=\(iexCloudToken)")
        
        return stockRequest.flatMapThrowing { res in
            try res.content.decode(StockResponse.self)
        }.map { json in
            return json
        }
    }
}
