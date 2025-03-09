function calculateFD() {
    let principal = parseFloat(document.getElementById("amount").value);
    let rate = parseFloat(document.getElementById("rate").value);
    let tenure = parseFloat(document.getElementById("tenure").value);

    if (isNaN(principal) || isNaN(rate) || isNaN(tenure) || principal <= 0 || rate <= 0 || tenure <= 0) {
        alert("Please enter valid values!");
        return;
    }

    // Convert rate into decimal & calculate compound interest
    let maturityAmount = principal * Math.pow((1 + (rate / 100)), tenure);

    // Show result
    document.getElementById("maturity").textContent = maturityAmount.toFixed(2);
}
