import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { Book } from "./book";
import { User } from "./user";

export class Review extends Model<InferAttributes<Review>, InferCreationAttributes<Review>>{
    declare reviewId: number;
    declare userId: number;
    declare bookId: number;
    declare starRating: string | null;
    declare comment: string;
    declare updatedAt?: Date;
}

export function ReviewFactory(sequelize: Sequelize) {
    Review.init({
        reviewId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        starRating: {
            type: DataTypes.ENUM('value1', 'value2', 'value3', 'value4', 'value5'),
            allowNull: true,
            defaultValue: null
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        freezeTableName: true,
        tableName: 'reviews',
        sequelize
    });
};

export function AssociateUserReview() {
    User.hasMany(Review, { foreignKey: 'userId'});
    Review.belongsTo(User, { foreignKey: 'userId'});
}