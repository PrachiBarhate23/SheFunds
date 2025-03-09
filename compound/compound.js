function calculateCI() {
    let principal = parseFloat(document.getElementById("principal").value);
    let rate = parseFloat(document.getElementById("rate").value);
    let time = parseFloat(document.getElementById("time").value);
    let frequency = parseInt(document.getElementById("frequency").value);

    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
        alert("Please enter valid numbers.");
        return;
    }

    // Convert rate into decimal
    let r = rate / 100;

    // Compound Interest Formula
    let amount = principal * Math.pow((1 + r / frequency), (frequency * time));
    let maturityAmount = amount.toFixed(2);

    document.getElementById("result").innerText = maturityAmount;
}