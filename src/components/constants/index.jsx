import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";


export const navItems = [
    { label: "Pricing", href: "/pricing" },
    { label: "Services", href: "services" },
    { label: "About Us", href: "about" },
    // { label: "", href: "#" },
    
  ];
  export const features = [
    {
      icon: <BotMessageSquare />,
      text: "Expense and Income Tracking",
      description:
        "Log expenses and income by category to understand spending patterns and manage budgets.",
    },
    {
      icon: <Fingerprint />,
      text: "Budgeting",
      description:
        "Set monthly or annual budgets with alerts to help users stick to financial limits.",
    },
    {
      icon: <ShieldHalf />,
      text: "Savings and Goal Planning",
      description:
        "Track savings goals (like vacations or emergency funds) with progress updates.",
    },
    {
      icon: <BatteryCharging />,
      text: "Investment Management",
      description:
        "Monitor personal investments, returns, and portfolio growth.",
    },
    {
      icon: <PlugZap />,
      text: "Debt and Loan Management",
      description:
        "Track bills, debts, and repayment schedules to avoid late fees and manage liabilities.",
    },
    {
      icon: <GlobeLock />,
      text: "Tax Preparation",
      description:
        "Store tax documents and track deductible expenses for simplified tax filing.",
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