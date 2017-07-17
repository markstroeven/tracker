import {Sequelize, SyncOptions} from 'sequelize';

export const sequelize = new Sequelize('tracker','root','root', {
  host: '127.0.0.1',
  dialect: 'mysql',
  logging: true,
  define: {
        freezeTableName: true
    }
});

sequelize.afterBulkSync((options: SyncOptions) => {
  console.log('synced');
});
