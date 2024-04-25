import { DataTypes } from 'sequelize';
import Customer from './customer.js';
import sequelize from '../config/sequelize.js';

const Loan = sequelize.define('Loan', {
  loan_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Customer, 
      key: 'customer_id', 
    },
  },
  loan_amount: {
    type: DataTypes.INTEGER,
  },
  tenure: {
    type: DataTypes.INTEGER,
  },
  interest_rate: {
    type: DataTypes.FLOAT,
  },
  monthly_payment: {
    type: DataTypes.INTEGER,
  },
  emis_paid_on_time: {
    type: DataTypes.INTEGER,
  },
  start_date: {
    type: DataTypes.DATE,
  },
  end_date: {
    type: DataTypes.DATE,
  },
  calculated_emi: {
    type: DataTypes.INTEGER,
  }
}, {
  tableName: 'loans', // Ensure it matches your actual table name in the database
  timestamps: false,
});

export default Loan;
