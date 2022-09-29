import { DataTypes, InferAttributes, InferCreationAttributes, 
    Model, Sequelize } from "sequelize";
import { Review } from "./review";

export class Book extends Model<InferAttributes<Book>, InferCreationAttributes<Book>>{
    declare bookId: number;
    declare volumeId: string;
    declare title: string;
    declare author: string;
    declare description: string;
    declare img: string;
    declare publishingCo: string;
    declare publishingDate: string;
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
        volumeId: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        img: {
            type: DataTypes.STRING,
            allowNull: true
        },
        publishingCo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        publishingDate: {
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