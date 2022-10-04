"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociateReviewedBook = exports.BookFactory = exports.Book = void 0;
const sequelize_1 = require("sequelize");
const review_1 = require("./review");
class Book extends sequelize_1.Model {
}
exports.Book = Book;
function BookFactory(sequelize) {
    Book.init({
        bookId: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        volumeId: {
            type: sequelize_1.DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: sequelize_1.DataTypes.TEXT('medium'),
            allowNull: false
        },
        img: {
            type: sequelize_1.DataTypes.TEXT('medium'),
            allowNull: true
        },
        publishingCo: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        publishingDate: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        tableName: 'books',
        sequelize
    });
}
exports.BookFactory = BookFactory;
;
function AssociateReviewedBook() {
    review_1.Review.belongsTo(Book, { foreignKey: 'bookId' });
}
exports.AssociateReviewedBook = AssociateReviewedBook;
