import asyncHandler from 'express-async-handler';
import Loan from "../models/loan.js";

const MakePayment = asyncHandler(async (req, res) => {
    const { customer_id, loan_id, amount } = req.body;

    const loan = await Loan.findOne({ where: { customer_id, loan_id } });

    if (!loan) {
        return res.status(404).json({ error: 'Loan not found' });
    }

    const loanData = loan.dataValues;

    if (amount >= loanData.monthly_payment) {
        let remainingTerms = loanData.tenure - loanData.emis_paid_on_time;
        const remainingTenure = remainingTerms * loanData.monthly_payment - amount;
        const newTotalEmi = remainingTenure / (remainingTerms - 1);

        await Loan.update(
            {
              emis_paid_on_time: loanData.emis_paid_on_time + 1,
              monthly_payment: newTotalEmi,
            },
            {
              where: { customer_id, loan_id },
            }
        );

        return res.json({ message: 'Payment processed successfully' });
    } else if (amount < loanData.monthly_payment) {
        res.json(`Please pay amount ${loanData.monthly_payment}`);
    }
});

const ViewStatement = asyncHandler(async (req, res) => {
    const { customer_id, loan_id } = req.body;
    const loan = await Loan.findOne({ where: { customer_id, loan_id } });
    return res.status(201).json(loan.dataValues);
});

export { MakePayment, ViewStatement };
