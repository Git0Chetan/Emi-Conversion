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

    const monthlyInterestRate = interestRate / (12 * 100);
    const emi = loanAmount * monthlyInterestRate * (Math.pow(1 + monthlyInterestRate, loanTenureInMonths)) / (Math.pow(1 + monthlyInterestRate, loanTenureInMonths) - 1);

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

    document.getElementById('displayLoanAmount').innerText = loanAmount.toFixed(2);
    document.getElementById('displayInterestRate').innerText = interestRate.toFixed(2);
    document.getElementById('displayLoanTenure').innerText = loanTenure;
    document.getElementById('displayTenureType').innerText = tenureType === 'years' ? 'Years' : 'Months';

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

    const summaryCtx = document.getElementById('summaryChart').getContext('2d');
    new Chart(summaryCtx, {
        type: 'bar',
        data: {
            labels: ['Total Loan Amount', 'Interest Paid', 'Total Payment'],
            datasets: [{
                label: 'Summary',
                data: [loanAmount, totalInterest, totalPayment],
                backgroundColor: ['#007bff', '#dc3545', '#28a745'],
                hoverBackgroundColor: ['#0056b3', '#c82333', '#218838']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Loan Summary'
                }
            }
        }
    });
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const resultDiv = document.querySelector('.result');
    const pdf = new jsPDF('p', 'pt', 'a4');

    html2canvas(resultDiv).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        
        // Add additional pages if content exceeds one page
        if (pdfHeight > pdf.internal.pageSize.getHeight()) {
            const totalPages = Math.ceil(pdfHeight / pdf.internal.pageSize.getHeight());
            for (let i = 1; i < totalPages; i++) {
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, -pdf.internal.pageSize.getHeight() * i, pdfWidth, pdfHeight);
            }
        }
        
        pdf.save('emi-calculator.pdf');
    });
}
