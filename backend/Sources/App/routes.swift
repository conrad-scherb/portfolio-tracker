import Vapor
import Fluent

func routes(_ app: Application) throws {
    app.get { req in
        return "Server is running"
    }
    
    // MARK: User managment routes
    app.get("users") { req in
        return User.query(on: req.db).with(\.$stocks).all()
    }
    
    // Request the user's stocks
    app.get("users", ":authID", "stocks") { req -> EventLoopFuture<User> in
        let id = req.parameters.get("authID")!
        return User.query(on: req.db)
            .filter(\.$authUID == id)
            .with(\.$stocks)
            .first()
            .unwrap(or: Abort(.notFound))
    }
    
    app.post("users") { req -> EventLoopFuture<User> in
        let user = try req.content.decode(User.self)
        return user.create(on: req.db)
            .map { user }
    }
    
    app.post("users", "stocks") { req -> EventLoopFuture<Stock> in
        let stock = try req.content.decode(Stock.self)
        return stock.create(on: req.db)
            .map { stock }
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
