import asyncHandler from 'express-async-handler';
import Customer from '../models/customer.js';
import Loan from '../models/loan.js';
import { calculateEMI } from '../utils/emi.js';

const Register = asyncHandler(async (req, res) => {
    const { first_name, last_name, age, monthly_income, phone_number } = req.body;
    const approved_limit = Math.round(36 * monthly_income / 100000) * 100000;
    let input = {
        first_name,
        last_name,
        age,
        phone_number,
        monthly_salary: monthly_income,
        approved_limit,
        current_debt: 0,
        credit_score: 100
    };
    const customerCheck = await Customer.findOne({ where: { phone_number } });
    if (customerCheck) {
        return res.status(409).send({ message: "A customer with the same phone number already exists" });
    }
    await Customer.create(input);
    return res.status(201).send("New user created");
});

const checkEligibility = async (customer_id, tenure, loan_amount, interest_rate) => {
    const customer = await Customer.findOne({ where: { customer_id } });
    if (!customer) {
        return { eligible: false, message: "Customer not found" };
    }
    if (customer.approved_limit < loan_amount) {
        return { eligible: false, message: "Loan not approved because loan amount exceeds the approved limit" };
    }
    if (interest_rate <= 8) {
        interest_rate = 8;
    }
    const creditScore = customer.credit_score;
    if (creditScore > 50) {
        const monthly_installment = calculateEMI(loan_amount, interest_rate, tenure);
        return { eligible: true, interest_rate, corrected_interest_rate: interest_rate, tenure, monthly_installment };
    } else if (creditScore > 30) {
        const monthly_installment = calculateEMI(loan_amount, 12, tenure);
        return { eligible: true, interest_rate: 12, corrected_interest_rate: 12, tenure, monthly_installment };
    } else if (creditScore > 10) {
        const monthly_installment = calculateEMI(loan_amount, 16, tenure);
        return { eligible: true, interest_rate: 16, corrected_interest_rate: 16, tenure, monthly_installment };
    } else {
        return { eligible: false, message: "Loan not approved" };
    }
};

const CheckEligibility = asyncHandler(async (req, res) => {
    const { customer_id, tenure, loan_amount, interest_rate } = req.body;
    const eligibilityInfo = await checkEligibility(customer_id, tenure, loan_amount, interest_rate);
    res.json(eligibilityInfo);
});

const CreateLoan = asyncHandler(async (req, res) => {
    const { customer_id, tenure, loan_amount, interest_rate } = req.body;
    const eligibilityInfo = await checkEligibility(customer_id, tenure, loan_amount, interest_rate);
    if (eligibilityInfo.eligible) {
        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + eligibilityInfo.tenure);
        const newLoan = await Loan.create({
            customer_id,
            loan_id: 1234555,
            loan_amount,
            interest_rate: eligibilityInfo.interest_rate,
            emis_paid_on_time: 0,
            tenure: eligibilityInfo.tenure,
            monthly_payment: eligibilityInfo.monthly_installment,
            start_date: startDate,
            end_date: endDate,
            calculated_emi: eligibilityInfo.monthly_installment,
        });
        res.json({ message: "New loan created", loan: newLoan });
    } else {
        res.json(eligibilityInfo);
    }
});

const ViewLoan = asyncHandler(async (req, res) => {
    const customer_id = req.params.customer_id;
    const LoanData = await Loan.findAll({ where: { customer_id } });
    return res.status(200).json({ LoanData });
});

export { Register, CheckEligibility, CreateLoan, ViewLoan };
