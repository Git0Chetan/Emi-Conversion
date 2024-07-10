import java.util.Scanner;
 
class Testing {

    public static void main(String [] args) {
 
        Scanner keyboard = new Scanner(System.in);
 
        
        System.out.print("Enter the Loan Amount: ");
        double amount = keyboard.nextDouble();
 
        System.out.print("Enter the Interest Rate: ");
        double interestRate = keyboard.nextDouble();
 
        
        System.out.print("Enter Loan Term in Years: ");
        int years = keyboard.nextInt();
 
       
        int months = years * 12;
 
        
        double monthlyIR = interestRate / 100.0 / 12;
 
        
        displayAmortizationTable(amount, monthlyIR, months);
 
        
        keyboard.close();
    }
 
   
    public static double calcMonthlyPayment(double amount, double rate, int months) {
        return (rate * amount) / (1 - Math.pow(1 + rate, -months)); 
    }
 
    public static void displayAmortizationTable(double amount, double rate, int months) {
 
        double balance = amount; 
        double payment = calcMonthlyPayment(amount, rate, months);
        double irPaid, amountPaid, newBalance;
        double totalinterest=0;

        
        System.out.printf("%n%n%12s %12s %12s %12s %12s %12s%n", "Month", 
           "Old Balance", "Payment", "Interest", "Principal", "New Balance");
        System.out.printf("%12s %12s %12s %12s %12s %12s%n", "============", 
           "============", "============", "============", "============", "============");
        for(int month = 1; month <= months; month++) {
            irPaid = balance * rate;
            amountPaid = payment - irPaid;
            newBalance = balance - amountPaid;
            totalinterest+=irPaid;
 
            
            System.out.printf("%12d %12.2f %12.2f %12.2f %12.2f %12.2f%n", month, 
           balance, payment, irPaid, amountPaid, newBalance);

            balance = newBalance;
        }

        System.out.printf("%n%nMonthly Emi:%12.2f %n",payment);
        System.out.printf("Total Interest :%12.2f %n",totalinterest);
        System.out.printf("Total Payment has to be done :%12.2f %n",totalinterest+amount);
        
    }
}