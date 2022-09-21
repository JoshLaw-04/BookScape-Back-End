import { DataType, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export class Review extends Model<InferAttributes<Review>, InferCreationAttributes<Review>>{
    declare reviewId: number;
    declare userId: number;
    declare bookId: string;
    // declare starRating:
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
            type: DataTypes.STRING,
            allowNull: false
        },
        // starRating: {
        //     type: DataTypes.ENUM('value1', 'value2', 'value3', 'value4', 'value5')
        //     allowNull: true,
        //     defaultValue: null,
        // },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            get: function() {
                return this.getDataValue('updatedAt')
                ?.toLocaleString('en-US', { timeZone: 'UTC'});
            }
        }
    }, {
        freezeTableName: true,
        tableName: 'reviews',
        sequelize
    });
}