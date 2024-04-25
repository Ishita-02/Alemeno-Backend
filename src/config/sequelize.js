import { Sequelize } from "sequelize";


const sequelize = new Sequelize('bank_details', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
      timestamps: false // Disable createdAt and updatedAt columns
    },   
  logging: false 
  });

  // sequelize
  // .sync({ force: true }) // This will drop existing tables and recreate them
  // .then(() => {
  //   console.log('Tables created successfully');
  //   // Your code here
  // })
  // .catch(err => {
  //   console.error('Error creating tables:', err);
  // });

export default sequelize;
