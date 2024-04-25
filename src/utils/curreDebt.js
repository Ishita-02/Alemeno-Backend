import moment from 'moment'; // Import the moment library

function calculateCurrentDebt(loanData) {
  // Get the current date
  const currentDate = moment();


  customer8Loans.forEach((loan) => {
    totalDebt += calculateRemainingAmount(loan);
  });
  

  // Calculate the current debt for the customer
  const currentDebt = loanData.reduce((debt, loan) => {
    const endDate = moment(loan.end_date, 'MM/DD/YY'); // Parse the end_date as a moment object
    if (currentDate.isBefore(endDate)) {
      // The loan is still active
      return debt + loan.loan_amount;
    }
    return debt;
  }, 0);

  return currentDebt;
}

export { calculateCurrentDebt };