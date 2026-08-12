export type ToolCategory =
  | "HR & Payroll"
  | "Business Tools"
  | "Tax & Compliance"
  | "Legal & Documents";

export interface ToolInfo {
  name: string;
  slug: string;
  category: ToolCategory;
  description: string;
  popular?: boolean;
}

export const tools: ToolInfo[] = [
  {
    name: "Salary Slip Generator",
    slug: "salary-slip-generator",
    category: "HR & Payroll",
    description:
      "Create professional salary slips online with earnings, deductions and PDF export.",
    popular: true,
  },
  {
    name: "New Joiner Salary Calculator",
    slug: "new-joiner-salary-calculator",
    category: "HR & Payroll",
    description:
      "Calculate new employee salary using full salary, joining-date pro-rata or manual payable days with custom allowances, PF, ESIC, TDS and PDF summary.",
    popular: true,
  },
  {
    name: "Invoice Generator",
    slug: "invoice-generator",
    category: "Business Tools",
    description:
      "Create GST and non-GST invoices online with tax calculation and PDF download.",
    popular: true,
  },
  {
    name: "GST Calculator",
    slug: "gst-calculator",
    category: "Tax & Compliance",
    description:
      "Calculate GST amount, taxable value, CGST/SGST, IGST and GST-inclusive or exclusive totals quickly.",
    popular: true,
  },
  {
    name: "PF / ESIC Calculator",
    slug: "pf-esic-calculator",
    category: "HR & Payroll",
    description:
      "Calculate employee and employer PF/ESIC contributions, EPS split, employee deductions and employer statutory cost.",
    popular: true,
  },
  {
    name: "Offer Letter Generator",
    slug: "offer-letter-generator",
    category: "HR & Payroll",
    description:
      "Create professional employee offer letters online with role, joining date, salary, probation, notice period and PDF download.",
    popular: true,
  },
  {
    name: "Appointment Letter Generator",
    slug: "appointment-letter-generator",
    category: "HR & Payroll",
    description:
      "Generate professional appointment letters with employment terms, salary, probation, notice period, working hours and PDF download.",
  },
  {
    name: "Experience Letter Generator",
    slug: "experience-letter-generator",
    category: "HR & Payroll",
    description:
      "Create professional employee experience letters online with employment period, designation, conduct note and PDF download.",
  },
  {
    name: "Relieving Letter Generator",
    slug: "relieving-letter-generator",
    category: "HR & Payroll",
    description:
      "Create professional employee relieving letters online with resignation details, last working date, handover status and PDF download.",
  },
  {
    name: "Quotation Generator",
    slug: "quotation-generator",
    category: "Business Tools",
    description:
      "Create professional GST and non-GST quotations online with item-wise pricing, discounts, terms, validity and PDF download.",
  },
  {
    name: "TDS Calculator",
    slug: "tds-calculator",
    category: "Tax & Compliance",
    description:
      "Calculate TDS deduction, net payable amount and reverse gross amount using common TDS presets or custom rates.",
  },
  {
    name: "Full & Final Settlement Calculator",
    slug: "full-and-final-settlement-calculator",
    category: "HR & Payroll",
    description:
      "Estimate employee full and final settlement with earned salary, leave encashment, gratuity, additions, deductions and net payable PDF summary.",
  },
  {
    name: "Receipt Generator",
    slug: "receipt-generator",
    category: "Business Tools",
    description:
      "Generate professional payment receipts online with payer details, receipt number, amount, payment mode, invoice reference and PDF download.",
  },
  {
    name: "Purchase Order Generator",
    slug: "purchase-order-generator",
    category: "Business Tools",
    description:
      "Create professional purchase orders for vendors with buyer details, supplier details, item table, GST calculation, delivery terms and PDF download.",
  },
  {
    name: "Delivery Challan Generator",
    slug: "delivery-challan-generator",
    category: "Business Tools",
    description:
      "Create professional delivery challans with dispatch, consignee, item, transport and PDF details.",
  },
  {
    name: "Credit Note / Debit Note Generator",
    slug: "credit-note-debit-note-generator",
    category: "Business Tools",
    description:
      "Create professional credit notes and debit notes with original invoice reference, reason, item-wise GST adjustment and PDF download.",
  },
  {
    name: "Rent Agreement Draft Generator",
    slug: "rent-agreement-draft-generator",
    category: "Legal & Documents",
    description:
      "Create a basic rent agreement or leave and license draft with landlord, tenant, property, rent, deposit, term, notice and PDF download.",
  },
  {
    name: "Board Resolution Generator",
    slug: "board-resolution-generator",
    category: "Legal & Documents",
    description:
      "Create professional board resolution drafts for bank accounts, GST authorization, trademark filing, authorized signatory appointments and general company decisions.",
  },
  {
    name: "NDA Generator",
    slug: "nda-generator",
    category: "Legal & Documents",
    description:
      "Create a simple non-disclosure agreement draft for mutual, one-way, employee, vendor, freelancer, consultant or client confidentiality use.",
  },
  {
    name: "Client Proposal Generator",
    slug: "client-proposal-generator",
    category: "Business Tools",
    description:
      "Create professional client proposals with scope, deliverables, timeline, pricing, payment terms, assumptions, acceptance section and PDF download.",
  },
  {
    name: "HRA Calculator",
    slug: "hra-calculator",
    category: "Tax & Compliance",
    description:
      "Calculate House Rent Allowance exemption, taxable HRA and rent paid minus 10% salary using metro or non-metro rules with PDF summary.",
  },
  {
    name: "PDF Compressor",
    slug: "pdf-compressor",
    category: "Business Tools",
    description:
      "Compress PDF files online in the browser with low, medium or high compression and download a smaller PDF. Best for scanned or image-heavy PDFs.",
  },
  {
    name: "Income Tax Calculator",
    slug: "income-tax-calculator",
    category: "Tax & Compliance",
    description:
      "Compare old and new income tax regime for AY 2026-27 with standard deduction, deductions, rebate, cess and estimated tax payable.",
  },
];

export const toolCategories: ToolCategory[] = [
  "HR & Payroll",
  "Business Tools",
  "Tax & Compliance",
  "Legal & Documents",
];
