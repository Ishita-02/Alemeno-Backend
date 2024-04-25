import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';


const Customer = sequelize.define('Customer', {
  customer_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true, 
  },
  monthly_salary: {
    type: DataTypes.INTEGER,
  },
  approved_limit: {
    type: DataTypes.INTEGER,
  },
  current_debt: {
    type: DataTypes.INTEGER,
  },
  credit_score: {
    type: DataTypes.INTEGER,
  }
}, {
  tableName: 'customers', 
  timestamps: false,
});

export default Customer
