"use client";
import React, { useState } from "react";
import {
  ToolCard,
  FormSection,
  FieldGrid,
  Field,
  PreviewBox,
  inputCls,
  selectCls,
  btnPrimary,
  btnSecondary,
  btnOutline,
} from "@/components/tools/fields";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(Math.max(0, Number(n) || 0)));

const pdfFmt = (n: number) =>
  "Rs. " +
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Math.round(Math.max(0, Number(n) || 0))
  );

type Slab = [number, number, number];

function slabTax(amount: number, slabs: Slab[]) {
  let tax = 0;
  for (const [lower, upper, rate] of slabs) {
    if (amount > lower) tax += (Math.min(amount, upper) - lower) * rate;
  }
  return Math.max(0, tax);
}

function oldSlabs(age: string): Slab[] {
  if (age === "senior")
    return [
      [300000, 500000, 0.05],
      [500000, 1000000, 0.2],
      [1000000, Infinity, 0.3],
    ];
  if (age === "superSenior")
    return [
      [500000, 1000000, 0.2],
      [1000000, Infinity, 0.3],
    ];
  return [
    [250000, 500000, 0.05],
    [500000, 1000000, 0.2],
    [1000000, Infinity, 0.3],
  ];
}

const newSlabs: Slab[] = [
  [400000, 800000, 0.05],
  [800000, 1200000, 0.1],
  [1200000, 1600000, 0.15],
  [1600000, 2000000, 0.2],
  [2000000, 2400000, 0.25],
  [2400000, Infinity, 0.3],
];

function surchargeRate(income: number, regime: "old" | "new") {
  if (income <= 5000000) return 0;
  if (income <= 10000000) return 0.1;
  if (income <= 20000000) return 0.15;
  if (income <= 50000000) return 0.25;
  return regime === "new" ? 0.25 : 0.37;
}

interface Inputs {
  income: number;
  age: string;
  isSalary: boolean;
  resident: boolean;
  oldExtra: number;
  oldHraHome: number;
  professionalTax: number;
  newAllowed: number;
}

function calculateRegime(inp: Inputs, regime: "old" | "new") {
  const standard = inp.isSalary
    ? Math.min(inp.income, regime === "new" ? 75000 : 50000)
    : 0;
  const extra =
    regime === "old"
      ? inp.oldExtra + inp.oldHraHome + inp.professionalTax
      : inp.newAllowed;
  const taxable = Math.max(0, inp.income - standard - extra);
  const baseTax = slabTax(taxable, regime === "old" ? oldSlabs(inp.age) : newSlabs);
  let rebate = 0;

  if (inp.resident) {
    if (regime === "old" && taxable <= 500000) rebate = Math.min(baseTax, 12500);
    if (regime === "new" && taxable <= 1200000) rebate = Math.min(baseTax, 60000);
    if (regime === "new" && taxable > 1200000) {
      const excess = taxable - 1200000;
      if (baseTax > excess) rebate = baseTax - excess;
    }
  }

  const taxAfterRebate = Math.max(0, baseTax - rebate);
  const surcharge = taxAfterRebate * surchargeRate(taxable, regime);
  const cess = (taxAfterRebate + surcharge) * 0.04;
  const total = taxAfterRebate + surcharge + cess;
  return { standard, extra, taxable, baseTax, rebate, surcharge, cess, total };
}

const ageLabels: Record<string, string> = {
  below60: "Below 60 years",
  senior: "Senior citizen: 60 to 79 years",
  superSenior: "Super senior citizen: 80+ years",
};
const typeLabels: Record<string, string> = {
  salary: "Salary / pension",
  other: "Other individual income",
};

export default function IncomeTaxCalculatorClient() {
  const [income, setIncome] = useState(1200000);
  const [ageGroup, setAgeGroup] = useState("below60");
  const [taxpayerType, setTaxpayerType] = useState("salary");
  const [oldDeductions, setOldDeductions] = useState(150000);
  const [hraHome, setHraHome] = useState(0);
  const [professionalTax, setProfessionalTax] = useState(0);
  const [newAllowed, setNewAllowed] = useState(0);
  const [resident, setResident] = useState("yes");

  const nz = (v: number) => Math.max(0, Number(v) || 0);

  const inputs: Inputs = {
    income: nz(income),
    age: ageGroup,
    isSalary: taxpayerType === "salary",
    resident: resident === "yes",
    oldExtra: nz(oldDeductions),
    oldHraHome: nz(hraHome),
    professionalTax: nz(professionalTax),
    newAllowed: nz(newAllowed),
  };
  const oldR = calculateRegime(inputs, "old");
  const newR = calculateRegime(inputs, "new");
  const best = newR.total <= oldR.total ? "New Regime" : "Old Regime";
  const saving = Math.abs(oldR.total - newR.total);

  const rows: [string, number, number][] = [
    ["Gross income", inputs.income, inputs.income],
    ["Standard deduction", oldR.standard, newR.standard],
    ["Other deductions / benefits", oldR.extra, newR.extra],
    ["Taxable income", oldR.taxable, newR.taxable],
    ["Tax before rebate", oldR.baseTax, newR.baseTax],
    ["Rebate / marginal relief", oldR.rebate, newR.rebate],
    ["Surcharge", oldR.surcharge, newR.surcharge],
    ["Health & education cess", oldR.cess, newR.cess],
    ["Estimated tax payable", oldR.total, newR.total],
  ];

  const reset = () => {
    setIncome(1200000);
    setAgeGroup("below60");
    setTaxpayerType("salary");
    setOldDeductions(150000);
    setHraHome(0);
    setProfessionalTax(0);
    setNewAllowed(0);
    setResident("yes");
  };

  const downloadPdf = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 14;
    let y = 16;

    const addFooter = () => {
      doc.setFontSize(8);
      doc.setTextColor(90, 98, 112);
      doc.text(
        "Generated free at registrationseva.com. Verify all details before official use.",
        margin,
        pageHeight - 9
      );
    };

    const ensureSpace = (height: number) => {
      if (y + height > pageHeight - 18) {
        addFooter();
        doc.addPage();
        y = 16;
      }
    };

    const line = (
      text: string,
      size = 10,
      bold = false,
      color: [number, number, number] = [20, 33, 61]
    ) => {
      ensureSpace(8);
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.setFontSize(size);
      doc.setTextColor(color[0], color[1], color[2]);
      const wrapped = doc.splitTextToSize(String(text), pageWidth - margin * 2);
      doc.text(wrapped, margin, y);
      y += wrapped.length * (size * 0.36) + 3;
    };

    const sectionTitle = (text: string) => {
      ensureSpace(12);
      y += 2;
      doc.setFillColor(243, 164, 4);
      doc.roundedRect(margin, y - 5, pageWidth - margin * 2, 9, 2, 2, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(32, 32, 32);
      doc.text(text, margin + 3, y + 1);
      y += 9;
    };

    const keyValue = (label: string, value: string) => {
      ensureSpace(7);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(16, 35, 63);
      doc.text(String(label), margin, y);
      doc.setFont("helvetica", "normal");
      doc.text(String(value), margin + 76, y);
      y += 6;
    };

    const table = (tableRows: [string, number, number][]) => {
      const x = margin;
      const widths = [78, 49, 49];
      const totalW = widths[0] + widths[1] + widths[2];
      const headerH = 9;
      const padX = 2.4;
      const padY = 2.4;
      const lineH = 4.4;

      const drawTableHeader = () => {
        ensureSpace(headerH + 8);
        doc.setFillColor(15, 74, 137);
        doc.setDrawColor(15, 74, 137);
        doc.rect(x, y, totalW, headerH, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9.2);
        doc.text("Particulars", x + padX, y + 6);
        doc.text("Old Regime", x + widths[0] + padX, y + 6);
        doc.text("New Regime", x + widths[0] + widths[1] + padX, y + 6);
        y += headerH;
      };

      drawTableHeader();

      tableRows.forEach((r, idx) => {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.2);
        const c1 = doc.splitTextToSize(String(r[0]), widths[0] - padX * 2);
        const c2 = doc.splitTextToSize(pdfFmt(r[1]), widths[1] - padX * 2);
        const c3 = doc.splitTextToSize(pdfFmt(r[2]), widths[2] - padX * 2);
        const rowH = Math.max(
          10,
          padY * 2 + Math.max(c1.length, c2.length, c3.length) * lineH
        );

        if (y + rowH > pageHeight - 24) {
          addFooter();
          doc.addPage();
          y = 16;
          drawTableHeader();
        }

        if (idx % 2 === 0) {
          doc.setFillColor(248, 251, 255);
          doc.rect(x, y, totalW, rowH, "F");
        }

        doc.setDrawColor(219, 232, 247);
        doc.rect(x, y, totalW, rowH, "S");
        doc.line(x + widths[0], y, x + widths[0], y + rowH);
        doc.line(x + widths[0] + widths[1], y, x + widths[0] + widths[1], y + rowH);

        doc.setTextColor(20, 33, 61);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.2);
        const textY = y + padY + 3.2;
        doc.text(c1, x + padX, textY, { lineHeightFactor: 1.18 });
        doc.text(c2, x + widths[0] + padX, textY, { lineHeightFactor: 1.18 });
        doc.text(c3, x + widths[0] + widths[1] + padX, textY, {
          lineHeightFactor: 1.18,
        });
        y += rowH;
      });
    };

    doc.setFillColor(15, 74, 137);
    doc.rect(0, 0, pageWidth, 28, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(17);
    doc.text("Income Tax Computation", margin, 13);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("FY 2025-26 / AY 2026-27 - Old vs New Regime Comparison", margin, 21);
    y = 38;

    sectionTitle("Summary");
    keyValue(
      "Recommended regime",
      newR.total === oldR.total ? "Both regimes are equal" : best
    );
    keyValue(
      "Estimated saving",
      newR.total === oldR.total ? "Nil" : pdfFmt(saving)
    );
    keyValue("Old regime tax payable", pdfFmt(oldR.total));
    keyValue("New regime tax payable", pdfFmt(newR.total));
    keyValue("Generated on", new Date().toLocaleDateString("en-IN"));

    sectionTitle("Input Details");
    keyValue("Annual gross income", pdfFmt(inputs.income));
    keyValue("Age category", ageLabels[ageGroup]);
    keyValue("Income type", typeLabels[taxpayerType]);
    keyValue("Old deductions", pdfFmt(inputs.oldExtra));
    keyValue("HRA / home loan benefits", pdfFmt(inputs.oldHraHome));
    keyValue("Professional tax", pdfFmt(inputs.professionalTax));
    keyValue("New allowed deductions", pdfFmt(inputs.newAllowed));
    keyValue("Resident rebate applied", inputs.resident ? "Yes" : "No");

    sectionTitle("Detailed Computation");
    table(rows);

    sectionTitle("Important Notes");
    line(
      "This computation is an estimate for planning and educational use only. Final tax may vary due to surcharge marginal relief, special-rate income, capital gains, perquisites, exemptions, business income, foreign income, and return-filing rules.",
      9,
      false,
      [90, 98, 112]
    );
    line(
      "For ITR filing or case-specific advice, consult a tax professional.",
      9,
      false,
      [90, 98, 112]
    );
    addFooter();

    const datePart = new Date().toISOString().slice(0, 10);
    doc.save("RegistrationSeva-Income-Tax-Computation-" + datePart + ".pdf");
  };

  return (
    <>
      <ToolCard>
        <h2 className="text-2xl font-bold text-primary mb-2">
          Enter Income Details
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Use annual figures. This tool is designed for resident individual
          taxpayers and salaried/pension income estimates.
        </p>

        <FormSection title="Income & Deductions">
          <FieldGrid>
            <Field label="Annual gross salary / total income before deductions" full>
              <input
                type="number"
                min={0}
                step={1000}
                className={inputCls}
                value={income}
                onChange={(e) => setIncome(+e.target.value)}
              />
              <small className="text-gray-500">
                Enter salary or regular income before standard deduction and
                Chapter VI-A deductions.
              </small>
            </Field>
            <Field label="Age category">
              <select className={selectCls} value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)}>
                <option value="below60">Below 60 years</option>
                <option value="senior">Senior citizen: 60 to 79 years</option>
                <option value="superSenior">Super senior citizen: 80+ years</option>
              </select>
            </Field>
            <Field label="Income type">
              <select className={selectCls} value={taxpayerType} onChange={(e) => setTaxpayerType(e.target.value)}>
                <option value="salary">Salary / pension</option>
                <option value="other">Other individual income</option>
              </select>
            </Field>
            <Field label="Old regime deductions">
              <input type="number" min={0} step={1000} className={inputCls} value={oldDeductions} onChange={(e) => setOldDeductions(+e.target.value)} />
              <small className="text-gray-500">
                Example: 80C, 80D, 80CCD(1B), eligible donations, etc.
              </small>
            </Field>
            <Field label="HRA / home loan / other old regime benefits">
              <input type="number" min={0} step={1000} className={inputCls} value={hraHome} onChange={(e) => setHraHome(+e.target.value)} />
              <small className="text-gray-500">
                Add eligible HRA exemption, home loan interest set-off and
                similar old regime benefits.
              </small>
            </Field>
            <Field label="Professional tax">
              <input type="number" min={0} step={100} className={inputCls} value={professionalTax} onChange={(e) => setProfessionalTax(+e.target.value)} />
              <small className="text-gray-500">
                Usually claimable under old regime for salaried taxpayers, where
                applicable.
              </small>
            </Field>
            <Field label="New regime allowed deductions">
              <input type="number" min={0} step={1000} className={inputCls} value={newAllowed} onChange={(e) => setNewAllowed(+e.target.value)} />
              <small className="text-gray-500">
                Example: eligible employer NPS contribution u/s 80CCD(2), if
                applicable.
              </small>
            </Field>
            <Field label="Resident individual rebate (Section 87A)">
              <select className={selectCls} value={resident} onChange={(e) => setResident(e.target.value)}>
                <option value="yes">Yes, resident individual</option>
                <option value="no">No / do not apply rebate</option>
              </select>
              <small className="text-gray-500">
                Apply Section 87A rebate where taxable income is within the
                applicable limit.
              </small>
            </Field>
          </FieldGrid>
        </FormSection>

        <div className="flex flex-wrap gap-3">
          <button type="button" className={btnPrimary} onClick={downloadPdf}>
            Download PDF Computation
          </button>
          <button type="button" className={btnSecondary} onClick={() => window.print()}>
            Print / Save PDF
          </button>
          <button type="button" className={btnOutline} onClick={reset}>
            Reset
          </button>
        </div>

        <PreviewBox>
          <div className="max-w-[820px] mx-auto">
            <div className="rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white p-5 mb-4">
              <span className="opacity-90 text-sm">
                {newR.total === oldR.total
                  ? "Both regimes are equal"
                  : "Recommended option"}
              </span>
              <strong className="block text-3xl mt-1">{best}</strong>
              <span className="opacity-90 text-sm">
                {newR.total === oldR.total
                  ? "Estimated tax is same in both regimes"
                  : `Estimated saving: ${fmt(saving)}`}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="rounded-lg border bg-white p-4">
                <span className="text-gray-500 text-sm">New Regime Tax</span>
                <strong className="block text-xl text-green-600 mt-1">
                  {fmt(newR.total)}
                </strong>
              </div>
              <div className="rounded-lg border bg-white p-4">
                <span className="text-gray-500 text-sm">Old Regime Tax</span>
                <strong className="block text-xl text-gray-800 mt-1">
                  {fmt(oldR.total)}
                </strong>
              </div>
              <div className="rounded-lg border bg-white p-4">
                <span className="text-gray-500 text-sm">New Taxable Income</span>
                <strong className="block text-xl text-gray-800 mt-1">
                  {fmt(newR.taxable)}
                </strong>
              </div>
              <div className="rounded-lg border bg-white p-4">
                <span className="text-gray-500 text-sm">Old Taxable Income</span>
                <strong className="block text-xl text-gray-800 mt-1">
                  {fmt(oldR.taxable)}
                </strong>
              </div>
            </div>
            <table className="w-full text-sm border-collapse bg-white">
              <thead>
                <tr className="bg-primary/5 text-primary">
                  <th className="p-2 text-left font-semibold">Particulars</th>
                  <th className="p-2 text-left font-semibold">Old Regime</th>
                  <th className="p-2 text-left font-semibold">New Regime</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2">{r[0]}</td>
                    <td className="p-2">{fmt(r[1])}</td>
                    <td className="p-2">{fmt(r[2])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-sm text-gray-600 bg-secondary/10 border border-secondary/40 rounded-lg p-3">
              This is an estimate for planning only. Final tax may change due
              to surcharge marginal relief, special-rate income, capital gains,
              employer perquisites, exemptions and return-filing rules.
            </p>
          </div>
        </PreviewBox>
      </ToolCard>

      <div className="max-w-5xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border shadow-lg p-5">
          <h3 className="text-lg font-semibold text-primary mb-3">
            New Tax Regime (AY 2026-27)
          </h3>
          <div className="space-y-2 text-sm">
            {[
              ["Up to ₹4,00,000", "Nil"],
              ["₹4,00,001 – ₹8,00,000", "5%"],
              ["₹8,00,001 – ₹12,00,000", "10%"],
              ["₹12,00,001 – ₹16,00,000", "15%"],
              ["₹16,00,001 – ₹20,00,000", "20%"],
              ["₹20,00,001 – ₹24,00,000", "25%"],
              ["Above ₹24,00,000", "30%"],
            ].map(([slab, rate]) => (
              <div key={slab} className="flex justify-between border rounded-lg px-3 py-2">
                <strong>{slab}</strong>
                <span className="text-gray-500">{rate}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border shadow-lg p-5">
          <h3 className="text-lg font-semibold text-primary mb-3">
            Old Tax Regime (AY 2026-27)
          </h3>
          <div className="space-y-2 text-sm">
            {[
              ["Below 60: up to ₹2,50,000", "Nil"],
              ["Senior citizen: up to ₹3,00,000", "Nil"],
              ["Super senior: up to ₹5,00,000", "Nil"],
              ["Next slab up to ₹5,00,000", "5%"],
              ["₹5,00,001 – ₹10,00,000", "20%"],
              ["Above ₹10,00,000", "30%"],
            ].map(([slab, rate]) => (
              <div key={slab} className="flex justify-between border rounded-lg px-3 py-2">
                <strong>{slab}</strong>
                <span className="text-gray-500">{rate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
