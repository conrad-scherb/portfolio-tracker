//
//  File.swift
//  
//
//  Created by Conrad on 12/09/21.
//

import Foundation
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
    
    @Children(for: \.$user)
    var stocks: [Stock]
    
    init() { }
    
    init(id: UUID? = nil, authUID: String) {
        self.id = id
        self.authUID = authUID
    }
}

final class Stock: Model, Content {
    static let schema = "stocks"
    
    @ID(key: .id)
    var id: UUID?
    
    @Field(key: "symbol")
    var symbol: String
    
    @Field(key: "numberHeld")
    var numberHeld: Double
    
    @Field(key: "costBasis")
    var costBasis: Double
    
    @Parent(key: "user_id")
    var user: User
    
    init() { }
    
    init(id: UUID? = nil, symbol: String, numberHeld: Double, costBasis: Double, userID: UUID) {
        self.id = id
        self.symbol = symbol
        self.numberHeld = numberHeld
        self.costBasis = costBasis
        self.$user.id = userID
    }
}
