// emiCalculator.js

function calculateEMI(principal, annualInterestRate, tenureMonths) {
    
    const monthlyInterestRate = (annualInterestRate / 12) / 100;
  
    // Calculate EMI using the formula
    const emi = (principal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -tenureMonths));
  
  
    return Math.round(emi);
  }
  
  // Export the EMI calculation function
  export {calculateEMI}
  