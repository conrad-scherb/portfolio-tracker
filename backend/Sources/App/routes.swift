import Vapor

struct StockResponse: Content {
    var latestPrice: Double
    var changePercent: Double
    var companyName: String
}

func routes(_ app: Application) throws {
    app.get { req in
        return "Server is running"
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
