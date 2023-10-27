import { Sequelize } from 'sequelize';

import 'dotenv/config'

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER_ID,
    process.env.PASSWORD,
    {
       host: process.env.HOST,
       dialect: 'mysql',
    },
);
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

export default sequelize;