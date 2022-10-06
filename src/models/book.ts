import { DataTypes, InferAttributes, InferCreationAttributes, 
    Model, Sequelize } from "sequelize";
import { Review } from "./review";

export class Book extends Model<InferAttributes<Book>, InferCreationAttributes<Book>>{
    declare bookId: number;
    declare title: string;
    declare authors: string;
    declare description: string;
    declare imageLinks: string;
    declare publisher: string;
    declare publishedDate: string;
}

export function BookFactory(sequelize: Sequelize) {
    Book.init({
        bookId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        authors: {
            type: DataTypes.JSON,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT('medium'),
            allowNull: false
        },
        imageLinks: {
            type: DataTypes.JSON,
            allowNull: false
        },
        publisher: {
            type: DataTypes.STRING,
            allowNull: false
        },
        publishedDate: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        tableName: 'books',
        sequelize
    });
};

export function AssociateReviewedBook() {
    Review.belongsTo(Book, { foreignKey: 'bookId' });
}