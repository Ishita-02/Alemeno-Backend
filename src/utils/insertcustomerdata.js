import Customer from '../models/customer.js'
import Loan from '../models/loan.js'

async function InsertCustomerData(customer) {
    try {
        let input = {
            first_name: customer.first_name,
            last_name: customer.last_name,
            age: customer.age,
            phone_number: customer.phone_number,
            monthly_salary: customer.monthly_salary,
            approved_limit: customer.approved_limit,
            current_debt: 0,
            credit_score: 0
        }

        const customerCheck = await Customer.findOne({ where: { phone_number: customer.phone_number } })
        if (!customerCheck) {
            await Customer.create(input);
        }
    } catch (error) {
        // Handle the error here
        console.error('Error in InsertCustomerData:', error);
    }
}

async function InsertLoanData(loan, emi,phone_number) {
    try {
        let data = {
            loan_id: loan.loan_id,
            loan_amount: loan.loan_amount,
            tenure: loan.tenure,
            interest_rate: loan.interest_rate,
            monthly_payment: loan.monthly_payment,
            emis_paid_on_time: loan['EMIs paid on Time'],
            start_date: loan.start_date,
            end_date: loan.end_date,
            calculated_emi: emi
        }

        const loanCheck = await Loan.findOne({ where: { loan_id: loan.loan_id } });

        if (loanCheck) 
            return ;
        await Loan.create(data);
    } catch (error) {
        // Handle the error here
        console.error('Error in InsertLoanData:', error);
    }
}

export { InsertCustomerData, InsertLoanData }
