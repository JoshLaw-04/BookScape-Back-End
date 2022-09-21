import { Sequelize } from 'sequelize';
import { AssociateUserReview, ReviewFactory } from './review';
import { UserFactory } from './user';

const dbName = 'bookscapeDB';
const username = 'root';
const password = 'Password1!';

const sequelize = new Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

UserFactory(sequelize);
ReviewFactory(sequelize);
AssociateUserReview();


export const db = sequelize;