function calculateCreditScore(loan, newEmi) {
    // Define the variables to track various factors
    let totalEMIsPaid = loan['EMIs paid on Time'];
    let totalTenure = loan.tenure;
    let currentYearActivityPoints = 0;


    // Check for current year loan activity (modify the current year condition as needed)
    const currentDate = new Date();

    // Define the loan start date
    const loanStartDate = new Date(loan.start_date);

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - loanStartDate;

    // Calculate the number of months
    const monthsDifference = timeDifference / (1000 * 60 * 60 * 24 * 30.44); // Approximate average number of days in a month

    // Check if the loan was taken more than 12 months ago
    if (monthsDifference >= 12) {
        currentYearActivityPoints += 10;
    }
    // Calculate the average ratio of EMIs paid on time to total tenure
    const averageRatio = totalEMIsPaid / totalTenure;

    // Calculate the credit score based on the factors
    let creditScore = 0;
    creditScore = creditScore + (averageRatio) * 70; // Adjust based on the average ratio
    creditScore += currentYearActivityPoints;

    // Ensure the credit score is a whole number (round it if necessary)
    return Math.round(creditScore);
}





export { calculateCreditScore };