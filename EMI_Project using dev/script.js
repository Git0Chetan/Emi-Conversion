document.getElementById('loan-form').addEventListener('submit', function (e) {
    e.preventDefault();
 
    // Get input values
    const amount = parseFloat(document.getElementById('amount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const years = parseInt(document.getElementById('years').value);
 
    // Calculate values
    const months = years * 12;
    const monthlyIR = interestRate / 100 / 12;
 
    // Calculate monthly payment
    const monthlyPayment = calcMonthlyPayment(amount, monthlyIR, months);
 
    // Display amortization table
    displayAmortizationTable(amount, monthlyIR, months, monthlyPayment);
});
 
function calcMonthlyPayment(amount, rate, months) {
    return (rate * amount) / (1 - Math.pow(1 + rate, -months));
}
 
function displayAmortizationTable(amount, rate, months, payment) {
    let balance = amount;
    let totalInterest = 0;
 
    const table = document.getElementById('amortization-table');
    table.innerHTML = `
        <tr>
            <th>Month</th>
            <th>Old Balance</th>
            <th>Payment</th>
            <th>Interest</th>
            <th>Principal</th>
            <th>New Balance</th>
        </tr>
    `;
 
    for (let month = 1; month <= months; month++) {
        const irPaid = balance * rate;
        const amountPaid = payment - irPaid;
        const newBalance = balance - amountPaid;
        totalInterest += irPaid;
 
        const row = `
            <tr>
                <td>${month}</td>
                <td>${balance.toFixed(2)}</td>
                <td>${payment.toFixed(2)}</td>
                <td>${irPaid.toFixed(2)}</td>
                <td>${amountPaid.toFixed(2)}</td>
                <td>${newBalance.toFixed(2)}</td>
            </tr>
        `;
 
        table.innerHTML += row;
        balance = newBalance;
    }
 
    table.innerHTML += `
        <tr>
            <td colspan="6">Monthly EMI: ${payment.toFixed(2)}</td>
        </tr>
        <tr>
            <td colspan="6">Total Interest: ${totalInterest.toFixed(2)}</td>
        </tr>
        <tr>
            <td colspan="6">Total Payment: ${(totalInterest + amount).toFixed(2)}</td>
        </tr>
    `;
}