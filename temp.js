const ab = {"messages": [
            {"from":"917486835085",
            "id":"ABEGkXSGg1CFAgo-sF31DP0I-1zs",
            "text":{"body":"hii"},
            "timestamp":"1645556845",
            "type":"text"}
        ],
        "contacts": 
        [
            {"profile":{"name":"Khushi"},
            "wa_id":"917486835085"}]
}

console.log(ab.messages[0].text.body);

// "dependencies": {
//   "async": "^3.2.0",
//   "bcrypt-nodejs": "0.0.3",
//   "body-parser": "^1.19.0",
//   "dotenv": "^8.2.0",
//   "express": "^4.17.1",
//   "express-session": "^1.17.1",
//   "jsdom": "^16.4.0",
//   "jsonwebtoken": "^8.5.1",
//   "lodash": "^4.17.20",
//   "mysql": "^2.18.1",
//   "mysql2": "^2.2.5",
//   "passport": "^0.4.1",
//   "passport-local": "^1.0.0",
//   "sequelize": "^6.3.5"
// },
// "devDependencies": {
//   "babel-eslint": "^10.1.0",
//   "chai": "^4.2.0",
//   "chai-spies": "^1.0.0",
//   "eslint": "^7.18.0",
//   "mocha": "^8.2.1"
// }