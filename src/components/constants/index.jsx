import { Calculator, CircleDollarSign, HandCoins, Landmark } from "lucide-react";
import LoanIcon from '../../assets/money-bag.png';


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
      icon: <Calculator />,
      text: "Budgeting",
      description:
        "Set monthly or annual budgets with alerts to help users stick to financial limits.",
    },
    {
      icon: <HandCoins />,
      text: "Savings Planning",
      description:
        "Track savings goals (like vacations or emergency funds) with progress updates.",
    },
    {
      icon: <Landmark />,
      text: "Investment Management",
      description:
        "Monitor personal investments, returns, and portfolio growth.",
    },
    {
      icon: <img src={LoanIcon} />,
      text: "Loan Management",
      description:
        "Track bills, debts, and repayment schedules to avoid late fees and manage liabilities.",
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