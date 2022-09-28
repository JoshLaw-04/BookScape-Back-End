import { DataTypes, InferAttributes, InferCreationAttributes, 
    Model, Sequelize } from "sequelize";
import { Review } from "./review";

export class Book extends Model<InferAttributes<Book>, InferCreationAttributes<Book>>{
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
        volumeId: {
            type: DataTypes.STRING,
            primaryKey: true,
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
            allowNull: false
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

export function AssociateUserReview() {
    Review.hasOne(Book, { foreignKey: 'volumeId' });
    Book.belongsTo(Review, { foreignKey: 'volumeId' });
}