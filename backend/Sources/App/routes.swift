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
    
    app.get("users") { req in
        User.query(on: req.db).all()
    }

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
