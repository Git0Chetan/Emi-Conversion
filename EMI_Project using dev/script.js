function calculateEMI() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    let loanTenure = parseInt(document.getElementById('loanTenure').value);
    const tenureType = document.getElementById('tenureType').value;

    // Validations
    if (loanAmount <= 0 || loanAmount > 9999999999) {
        alert('Please enter a valid loan amount between 1 and 9999999999.');
        return;
    }

    if (interestRate < 0 || interestRate > 100) {
        alert('Please enter a valid interest rate between 0 and 100%.');
        return;
    }

    if (loanTenure <= 0) {
        alert('Please enter a valid loan tenure.');
        return;
    }

    const loanTenureInMonths = tenureType === 'years' ? loanTenure * 12 : loanTenure;

    let monthlyInterestRate;
    let emi=0;

    if(interestRate!=0){
        monthlyInterestRate = interestRate / (12 * 100);
        emi = loanAmount * monthlyInterestRate * (Math.pow(1 + monthlyInterestRate, loanTenureInMonths)) / (Math.pow(1 + monthlyInterestRate, loanTenureInMonths) - 1);
    }
    else{
        monthlyInterestRate = interestRate;
        emi = loanAmount/loanTenureInMonths;
    }

    let outstandingPrincipal = loanAmount;
    let amortizationTable = '';
    let totalPrincipal = 0;
    let totalInterest = 0;

    for (let i = 1; i <= loanTenureInMonths; i++) {
        const interest = outstandingPrincipal * monthlyInterestRate;
        const principal = emi - interest;
        outstandingPrincipal -= principal;

        totalPrincipal += principal;
        totalInterest += interest;

        amortizationTable += `
            <tr>
                <td>${i}</td>
                <td>${outstandingPrincipal.toFixed(2)}</td>
                <td>${principal.toFixed(2)}</td>
                <td>${interest.toFixed(2)}</td>
                <td>${emi.toFixed(2)}</td>
            </tr>
        `;
    }

    const totalPayment = totalPrincipal + totalInterest;
    const interestPercentage = (totalInterest / loanAmount) * 100;

    document.getElementById('displayLoanAmount').innerText = loanAmount.toFixed(2);
    document.getElementById('displayInterestRate').innerText = interestRate.toFixed(2);
    document.getElementById('displayLoanTenure').innerText = loanTenure;
    document.getElementById('displayTenureType').innerText = tenureType === 'years' ? 'Years' : 'Months';

    document.getElementById('summaryLoanAmount').innerText = loanAmount.toFixed(2);
    document.getElementById('summaryInterestRate').innerText = interestRate.toFixed(2);
    document.getElementById('summaryLoanTenure').innerText = loanTenureInMonths;
    document.getElementById('summaryTotalInterest').innerText = totalInterest.toFixed(2);
    document.getElementById('summaryTotalPayment').innerText = totalPayment.toFixed(2);
    document.getElementById('summaryInterestPercentage').innerText = interestPercentage.toFixed(2);

    document.querySelector('.result').style.display = 'block';
    document.querySelector('#amortizationTable tbody').innerHTML = amortizationTable;

    const emiCtx = document.getElementById('emiChart').getContext('2d');
    new Chart(emiCtx, {
        type: 'pie',
        data: {
            labels: ['Principal', 'Interest'],
            datasets: [{
                data: [totalPrincipal, totalInterest],
                backgroundColor: ['#007bff', '#dc3545'],
                hoverBackgroundColor: ['#0056b3', '#c82333']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'EMI Breakdown'
                }
            }
        }
    });
}

function printPage() {
    window.print();
}

// function downloadPDF() {
//     const { jsPDF } = window.jspdf;
//     const resultDiv = document.querySelector('.result');
//     const pdf = new jsPDF('p', 'pt', 'a4');

//     html2canvas(resultDiv).then(canvas => {
//         const imgData = canvas.toDataURL('image/png');
//         const imgProps = pdf.getImageProperties(imgData);
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//         pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        
//         // Add additional pages if content exceeds one page
//         if (pdfHeight > pdf.internal.pageSize.getHeight()) {
//             const totalPages = Math.ceil(pdfHeight / pdf.internal.pageSize.getHeight());
//             for (let i = 1; i < totalPages; i++) {
//                 pdf.addPage();
//                 pdf.addImage(imgData, 'PNG', 0, -pdf.internal.pageSize.getHeight() * i, pdfWidth, pdfHeight);
//             }
//         }
        
//         pdf.save('emi-calculator.pdf');
//     });
// }

function shareEmail() {
    const loanAmount = document.getElementById('loanAmount').value;
    const interestRate = document.getElementById('interestRate').value;
    const loanTenure = document.getElementById('loanTenure').value;
    const tenureType = document.getElementById('tenureType').value;
    const loanTenureText = tenureType === 'years' ? `${loanTenure} Years` : `${loanTenure} Months`;

    const amortizationTableRows = document.querySelectorAll('#amortizationTable tbody tr');
    const summaryTableCells = document.querySelectorAll('#summaryTable tbody tr td');

    let amortizationTableText = 'Instalment No.\tOutstanding Principal (INR)\tPrincipal (INR)\tInterest (INR)\tInstalment (INR)\n';
    amortizationTableRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        amortizationTableText += `${cells[0].innerText}\t${cells[1].innerText}\t${cells[2].innerText}\t${cells[3].innerText}\t${cells[4].innerText}\n`;
    });

    let summaryTableText = `
Loan Amount (INR): ${summaryTableCells[0].innerText}
Interest Rate (%): ${summaryTableCells[1].innerText}
Tenure (Months): ${summaryTableCells[2].innerText}
Total Interest Paid (INR): ${summaryTableCells[3].innerText}
Total Payment Done (INR): ${summaryTableCells[4].innerText}
Percentage of Interest Paid (%): ${summaryTableCells[5].innerText}
    `;

    const subject = 'EMI Calculator Details';
    const body = `
Loan Amount: ${loanAmount} INR
Interest Rate: ${interestRate}%
Loan Tenure: ${loanTenureText}

Amortization Schedule:
${amortizationTableText}

Summary:
${summaryTableText}
    `;

    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}




