import {
  CircleDollarSign,
  File,
  Goal,
  HandCoins,
  Landmark,
  NotebookPen,
} from "lucide-react";
import LoanIcon from "../../assets/loan.png";
import { PlugZap } from "lucide-react";

export const navItems = [
  { label: "Pricing", href: "/pricing" },
  { label: "Services", href: "services" },
  { label: "About Us", href: "about" },
  // { label: "", href: "#" },
];
export const features = [
  {
    icon: <CircleDollarSign />,
    text: "Expense and Income Tracking",
    description:
      "Log expenses and income by category to understand spending patterns and manage budgets.",
  },
  {
    icon: <NotebookPen />,
    text: "Budgeting",
    description:
      "Set monthly or annual budgets with alerts to help users stick to financial limits.",
  },
  {
    icon: <Goal />,
    text: "Savings and Goal Planning",
    description:
      "Track savings goals (like vacations or emergency funds) with progress updates.",
  },
  {
    icon: <Landmark />,
    text: "Investment Management",
    description: "Monitor personal investments, returns, and portfolio growth.",
  },
  {
    icon: <HandCoins />,
    text: "Loan Management",
    description:
      "Track bills, debts, and repayment schedules to avoid late fees and manage liabilities.",
  },
  {
    icon: <File />,
    text: "Report and Analytics",
    description:
      "Download your records in PDF, Excel and CSV format for getting a clear picture.",
  },
];
export const checklistItems = [
  {
    title: "Code merge made easy",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "Review code without worry",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "AI Assistance to reduce time",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "Share work in minutes",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
];
