"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociateUserReview = exports.ReviewFactory = exports.Review = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
class Review extends sequelize_1.Model {
}
exports.Review = Review;
function ReviewFactory(sequelize) {
    Review.init({
        reviewId: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        bookId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        starRating: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        comment: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW
        }
    }, {
        freezeTableName: true,
        tableName: 'reviews',
        sequelize
    });
}
exports.ReviewFactory = ReviewFactory;
;
function AssociateUserReview() {
    user_1.User.hasMany(Review, { foreignKey: 'userId' });
    Review.belongsTo(user_1.User, { foreignKey: 'userId' });
}
exports.AssociateUserReview = AssociateUserReview;
