"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const review_1 = require("./review");
const user_1 = require("./user");
const dbName = 'bookscapeDB';
const username = 'root';
const password = 'Password1!';
const sequelize = new sequelize_1.Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});
(0, user_1.UserFactory)(sequelize);
(0, review_1.ReviewFactory)(sequelize);
(0, review_1.AssociateUserReview)();
exports.db = sequelize;
