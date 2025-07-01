import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import Papa from "papaparse";

export const generateReport = (
  service,
  filteredData,
  filterMonth,
  filterYear,
  reportFormat
) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  // Dynamic report title based on filters and service
  let reportTitle = `${
    service.charAt(0).toUpperCase() + service.slice(1)
  } Report`;
  if (filterMonth !== "All" && filterYear !== "All") {
    reportTitle = `Report of ${filterMonth} ${filterYear} - ${service}`;
  } else if (filterMonth !== "All") {
    reportTitle = `Report of ${filterMonth} - ${service}`;
  } else if (filterYear !== "All") {
    reportTitle = `Report of ${filterYear} - ${service}`;
  }

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
        "End Date": item.end_date
          ? new Date(item.end_date).toLocaleDateString()
          : "—",
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
        "Target Date": item.target_date
          ? new Date(item.target_date).toLocaleDateString()
          : "—",
      });
      break;
    case "investments":
      headers = [
        "Title",
        "Type",
        "Institution",
        "Initial Amount",
        "Current Value",
        "Start Date",
        "End Date",
        "Status",
      ];
      dataMapper = (item) => ({
        Title: item.title,
        Type: item.investment_type,
        Institution: item.institution,
        "Initial Amount": `${item.initial_amount.toLocaleString()} BDT`,
        "Current Value": `${item.current_value.toLocaleString()} BDT`,
        "Start Date": new Date(item.start_date).toLocaleDateString(),
        "End Date": item.end_date
          ? new Date(item.end_date).toLocaleDateString()
          : "—",
        Status: item.status,
      });
      break;
    default:
      headers = [];
      dataMapper = (item) => ({});
  }

  // Table data
  const reportData = filteredData.map(dataMapper);
  console.log(reportFormat)
  // Generate report based on format
  switch (reportFormat?.toLowerCase()) {
    case "pdf":
      const doc = new jsPDF({
        orientation: "landscape",
      });

      // Header
      doc.setFontSize(20);
      doc.setTextColor(0, 0, 128); // Dark blue
      doc.text("BudgetBuddy Financial Services", 14, 22);
      doc.setFontSize(16);
      doc.text(reportTitle, 14, 30);
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0); // Black
      doc.text(`Generated on: ${currentDate}`, 14, 38);

      // Add a line separator
      doc.setDrawColor(0, 0, 0);
      doc.line(14, 40, 276, 40); // Adjusted line length for landscape (A4 width is 297mm)

      // AutoTable configuration
      autoTable(doc, {
        startY: 50,
        head: [headers],
        body: reportData.map((row) => Object.values(row)),
        theme: "grid",
        headStyles: {
          fillColor: [0, 102, 204],
          textColor: [255, 255, 255],
          fontSize: 10,
          fontStyle: "bold",
        },
        bodyStyles: {
          fillColor: [245, 245, 245],
          textColor: [0, 0, 0],
          fontSize: 8,
          lineWidth: 0.1,
        },
        alternateRowStyles: {
          fillColor: [255, 255, 255],
        },
        margin: { top: 40, bottom: 20, left: 14, right: 14 },
        didDrawPage: (data) => {
          doc.setFontSize(8);
          doc.text(
            `Page ${data.pageNumber} of ${Math.ceil(reportData.length / 30)}`,
            doc.internal.pageSize.width / 2,
            doc.internal.pageSize.height - 10,
            { align: "center" }
          );
        },
      });

      doc.save(`${service}_report_${currentDate.replace(/[:/]/g, "-")}.pdf`);
      break;

    case "excel":
      const worksheet = XLSX.utils.json_to_sheet(reportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      // Add metadata
      workbook.Props = {
        Title: reportTitle,
        Author: "BudgetBuddy",
        CreatedDate: new Date(),
      };

      // Style headers
      const headerRange = XLSX.utils.decode_range(worksheet["!ref"]);
      for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
        if (!worksheet[cellAddress]) continue;
        worksheet[cellAddress].s = {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0066CC" } },
        };
      }

      XLSX.writeFile(workbook, `${service}_report_${currentDate.replace(/[:/]/g, "-")}.xlsx`);
      break;

    case "csv":
      const csvData = Papa.unparse(reportData, {
        header: true,
        quotes: true,
        delimiter: ",",
      });
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `${service}_report_${currentDate.replace(/[:/]/g, "-")}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      break;

    default:
      toast.error("Unsupported report format");
  }
};