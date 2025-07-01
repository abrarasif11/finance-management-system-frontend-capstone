import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateReport = (service, filteredData, filterMonth, filterYear) => {
  const doc = new jsPDF({
    orientation: "landscape", // Set to landscape mode
  });
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  // Dynamic report title based on filters and service
  let reportTitle = `${service.charAt(0).toUpperCase() + service.slice(1)} Report`;
  if (filterMonth !== "All" && filterYear !== "All") {
    reportTitle = `Report of ${filterMonth} ${filterYear} - ${service}`;
  } else if (filterMonth !== "All") {
    reportTitle = `Report of ${filterMonth} - ${service}`;
  } else if (filterYear !== "All") {
    reportTitle = `Report of ${filterYear} - ${service}`;
  }

  // Header
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 128); // Dark blue
  doc.text("BudgetBuddy Financial Services", 14, 22);
  doc.setFontSize(16);
  doc.text(reportTitle, 14, 30);
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0); // Black
  doc.text(`Generated on: ${currentDate}`, 14, 38); // e.g., "July 01, 2025, 11:10 PM +06"

  // Add a line separator
  doc.setDrawColor(0, 0, 0);
  doc.line(14, 40, 276, 40); // Adjusted line length for landscape (A4 width is 297mm)

  // Define column headers and data mapping based on service
  let headers, dataMapper;
  switch (service.toLowerCase()) {
    case "loans":
      headers = [
        "Loan Type",
        "Lender",
        "Principal Amount",
        "Total Payable",
        "Total Paid",
        "Due",
        "Interest Rate",
        "Start Date",
        "End Date",
        "Next Payment",
        "Payment Frequency",
        "Status",
        "Notes",
      ];
      dataMapper = (item) => ({
        "Loan Type": item.loan_type,
        Lender: item.lender_name,
        "Principal Amount": `${item.principal_amount.toLocaleString()} BDT`,
        "Total Payable": `${item.total_payable.toLocaleString()} BDT`,
        "Total Paid": `${item.total_paid.toLocaleString()} BDT`,
        Due: `${item.due.toLocaleString()} BDT`,
        "Interest Rate": `${item.interest_rate}%`,
        "Start Date": new Date(item.start_date).toLocaleDateString(),
        "End Date": item.end_date ? new Date(item.end_date).toLocaleDateString() : "—",
        "Next Payment": new Date(item.next_payment_date).toLocaleDateString(),
        "Payment Frequency": item.payment_frequency,
        Status:
          item.due > 0
            ? new Date(item.next_payment_date) < new Date()
              ? "Overdue"
              : "Active"
            : "Paid",
        Notes: item.notes || "—",
      });
      break;
    case "incomes":
      headers = ["Source", "Amount", "Date", "Category", "Notes"];
      dataMapper = (item) => ({
        Source: item.source,
        Amount: `${item.amount.toLocaleString()} BDT`,
        Date: new Date(item.date).toLocaleDateString(),
        Category: item.category || "—",
        Notes: item.notes || "—",
      });
      break;
    case "expenses":
      headers = ["Description", "Amount", "Date", "Category", "Notes"];
      dataMapper = (item) => ({
        Description: item.description,
        Amount: `${item.amount.toLocaleString()} BDT`,
        Date: new Date(item.date).toLocaleDateString(),
        Category: item.category || "—",
        Notes: item.notes || "—",
      });
      break;
    case "budgets":
      headers = ["Category", "Budgeted Amount", "Spent", "Remaining", "Month"];
      dataMapper = (item) => ({
        Category: item.category,
        "Budgeted Amount": `${item.budgeted_amount.toLocaleString()} BDT`,
        Spent: `${item.spent.toLocaleString()} BDT`,
        Remaining: `${(item.budgeted_amount - item.spent).toLocaleString()} BDT`,
        Month: item.month,
      });
      break;
    case "savingsgoals":
      headers = ["Goal Name", "Target Amount", "Saved", "Remaining", "Target Date"];
      dataMapper = (item) => ({
        "Goal Name": item.goal_name,
        "Target Amount": `${item.target_amount.toLocaleString()} BDT`,
        Saved: `${item.saved.toLocaleString()} BDT`,
        Remaining: `${(item.target_amount - item.saved).toLocaleString()} BDT`,
        "Target Date": item.target_date ? new Date(item.target_date).toLocaleDateString() : "—",
      });
      break;
    case "investments":
      headers = ["Asset", "Amount", "Purchase Date", "Return Rate", "Notes"];
      dataMapper = (item) => ({
        Asset: item.asset,
        Amount: `${item.amount.toLocaleString()} BDT`,
        "Purchase Date": new Date(item.purchase_date).toLocaleDateString(),
        "Return Rate": `${item.return_rate}%`,
        Notes: item.notes || "—",
      });
      break;
    default:
      headers = [];
      dataMapper = (item) => ({});
  }

  // Table data
  const reportData = filteredData.map(dataMapper);

  // AutoTable configuration
  autoTable(doc, {
    startY: 50,
    head: [headers],
    body: reportData.map((row) => Object.values(row)),
    theme: "grid", // Grid theme for borders
    headStyles: {
      fillColor: [0, 102, 204], // Blue header
      textColor: [255, 255, 255], // White text
      fontSize: 10,
      fontStyle: "bold",
    },
    bodyStyles: {
      fillColor: [245, 245, 245], // Light gray background
      textColor: [0, 0, 0], // Black text
      fontSize: 8,
      lineWidth: 0.1,
    },
    alternateRowStyles: {
      fillColor: [255, 255, 255], // White for alternate rows
    },
    margin: { top: 40, bottom: 20, left: 14, right: 14 }, // Adjusted margins for landscape
    didDrawPage: (data) => {
      // Footer
      doc.setFontSize(8);
      doc.text(
        `Page ${data.pageNumber} of ${Math.ceil(reportData.length / 30)}`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: "center" }
      );
    },
  });

  // Save the PDF
  doc.save(`${service}_report.pdf`);
};