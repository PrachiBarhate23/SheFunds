function calculateEMI() {
    let P = parseFloat(document.getElementById('loanAmount').value);
    let annualRate = parseFloat(document.getElementById('interestRate').value);
    let years = parseFloat(document.getElementById('loanTenure').value);

    if (isNaN(P) || isNaN(annualRate) || isNaN(years) || P <= 0 || annualRate <= 0 || years <= 0) {
        document.getElementById('emiResult').innerHTML = "<span style='color: red;'>Please enter valid numbers.</span>";
        return;
    }

    let R = (annualRate / 12) / 100;  // Convert annual interest rate to monthly
    let N = years * 12;  // Convert years to months

    let EMI = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    EMI = EMI.toFixed(2);

    document.getElementById('emiResult').innerHTML = `Your Monthly EMI: <strong>₹${EMI}</strong>`;
}