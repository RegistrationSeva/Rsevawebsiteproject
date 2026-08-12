"use client";
import React, { useState } from "react";
import {
  ToolCard,
  FormSection,
  FieldGrid,
  Field,
  TotalRow,
  PreviewBox,
  inputCls,
  selectCls,
  textareaCls,
  btnPrimary,
  btnOutline,
  fmtINR,
} from "@/components/tools/fields";

const money = (n: number) => "INR " + fmtINR(n);

const defaultNotes =
  "This is an estimated HRA calculation. Final tax treatment should be verified before payroll or ITR filing.";

export default function HraCalculatorClient() {
  const [mode, setMode] = useState("annual");
  const [monthsInput, setMonthsInput] = useState("12");
  const [cityType, setCityType] = useState("metro");
  const [payRent, setPayRent] = useState("yes");
  const [basicInput, setBasicInput] = useState("50000");
  const [hraInput, setHraInput] = useState("20000");
  const [rentInput, setRentInput] = useState("18000");
  const [daInput, setDaInput] = useState("0");
  const [commissionInput, setCommissionInput] = useState("0");
  const [pan, setPan] = useState("yes");
  const [employeeName, setEmployeeName] = useState("Employee Name");
  const [fy, setFy] = useState("2026-27");
  const [notes, setNotes] = useState(defaultNotes);

  const months = Math.max(1, Math.min(12, Number(monthsInput) || 12));
  const annualize = (x: number) => (mode === "monthly" ? x * months : x);

  const basic = annualize(Number(basicInput) || 0);
  const hra = annualize(Number(hraInput) || 0);
  const rent = annualize(Number(rentInput) || 0);
  const da = annualize(Number(daInput) || 0);
  const commission = annualize(Number(commissionInput) || 0);
  const salary = basic + da + commission;
  const actual = hra;
  let rentMinus = rent - salary * 0.1;
  if (rentMinus < 0) rentMinus = 0;
  const limitRate = cityType === "metro" ? 0.5 : 0.4;
  const limit = salary * limitRate;
  let exempt = 0;
  if (payRent === "yes") exempt = Math.min(actual, rentMinus, limit);
  if (!isFinite(exempt) || exempt < 0) exempt = 0;
  const taxable = Math.max(0, hra - exempt);

  const annualRent =
    mode === "monthly" ? (Number(rentInput) || 0) * months : Number(rentInput) || 0;
  let note =
    "HRA exemption is available only when rent is actually paid for rented accommodation and other conditions are satisfied.";
  if (annualRent > 100000 && pan === "no")
    note +=
      " Annual rent appears to exceed INR 1,00,000. Landlord PAN reporting/documentation may be required as per tax guidance.";
  if (payRent === "no")
    note = "No rent paid selected. HRA exemption has been treated as zero.";

  const cityLabel =
    cityType === "metro"
      ? "Metro city - 50% salary limit"
      : "Non-metro city - 40% salary limit";

  const reset = () => {
    setMode("annual");
    setMonthsInput("12");
    setCityType("metro");
    setPayRent("yes");
    setBasicInput("50000");
    setHraInput("20000");
    setRentInput("18000");
    setDaInput("0");
    setCommissionInput("0");
    setPan("yes");
    setEmployeeName("Employee Name");
    setFy("2026-27");
    setNotes(defaultNotes);
  };

  const downloadPdf = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF("p", "mm", "a4");
    const m = 16;
    let y = 18;

    // Header
    doc.setFillColor(15, 74, 137);
    doc.roundedRect(m, y, 210 - m * 2, 22, 3, 3, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text("HRA CALCULATION SUMMARY", 105, y + 9, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Generated using Registration Seva HRA Calculator", 105, y + 16, {
      align: "center",
    });
    y += 32;

    doc.setTextColor(40, 40, 40);
    doc.setFontSize(10);
    const lines = [
      `Employee: ${employeeName} | Financial Year: ${fy} | Period: ${months} month(s)`,
      `City Type: ${cityType === "metro" ? "Metro - 50% limit" : "Non-metro - 40% limit"}`,
      `Basic Salary: ${money(basic)}`,
      `DA, if applicable: ${money(da)}`,
      `Turnover Commission, if applicable: ${money(commission)}`,
      `Salary for HRA purpose: ${money(salary)}`,
      `Actual HRA received: ${money(actual)}`,
      `Rent paid: ${money(rent)}`,
      `Rent paid minus 10% of salary: ${money(rentMinus)}`,
      `50% / 40% salary limit: ${money(limit)}`,
      `HRA Exemption: ${money(exempt)}`,
      `Taxable HRA: ${money(taxable)}`,
      `Notes: ${notes}`,
      `Disclaimer: This is a general calculation summary. Verify actual rent, documents, salary components and applicable tax rules before official use.`,
    ];
    lines.forEach((p) => {
      const split = doc.splitTextToSize(p, 178);
      if (y + split.length * 6 > 280) {
        doc.addPage();
        y = 18;
      }
      doc.text(split, m, y);
      y += split.length * 6 + 2;
    });

    doc.setFontSize(9);
    doc.setTextColor(96, 112, 141);
    if (y > 284) {
      doc.addPage();
      y = 18;
    }
    doc.text(
      "Generated free at registrationseva.com. Verify all details before official use.",
      m,
      y + 4
    );
    doc.save("hra-calculation-summary.pdf");
  };

  return (
    <ToolCard>
      <h2 className="text-2xl font-bold text-primary mb-2">
        Calculate HRA Exemption
      </h2>
      <p className="text-gray-600 text-sm mb-6">
        Enter salary, HRA and rent details. Keep optional fields as zero if not
        applicable.
      </p>

      <FormSection title="Calculation Period">
        <FieldGrid>
          <Field label="Calculation Mode">
            <select className={selectCls} value={mode} onChange={(e) => setMode(e.target.value)}>
              <option value="annual">Annual Calculation</option>
              <option value="monthly">Monthly Calculation</option>
            </select>
          </Field>
          <Field label="Months Rented / HRA Period">
            <input type="number" min={1} max={12} className={inputCls} value={monthsInput} onChange={(e) => setMonthsInput(e.target.value)} />
          </Field>
          <Field label="City Type">
            <select className={selectCls} value={cityType} onChange={(e) => setCityType(e.target.value)}>
              <option value="metro">Metro - Delhi, Mumbai, Kolkata, Chennai</option>
              <option value="nonmetro">Non-Metro / Other City</option>
            </select>
          </Field>
          <Field label="Do you pay rent?">
            <select className={selectCls} value={payRent} onChange={(e) => setPayRent(e.target.value)}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Salary and Rent Details">
        <FieldGrid>
          <Field label="Basic Salary">
            <input type="number" className={inputCls} value={basicInput} onChange={(e) => setBasicInput(e.target.value)} />
          </Field>
          <Field label="HRA Received">
            <input type="number" className={inputCls} value={hraInput} onChange={(e) => setHraInput(e.target.value)} />
          </Field>
          <Field label="Rent Paid">
            <input type="number" className={inputCls} value={rentInput} onChange={(e) => setRentInput(e.target.value)} />
          </Field>
          <Field label="DA, if applicable">
            <input type="number" className={inputCls} value={daInput} onChange={(e) => setDaInput(e.target.value)} />
          </Field>
          <Field label="Turnover Commission, if applicable">
            <input type="number" className={inputCls} value={commissionInput} onChange={(e) => setCommissionInput(e.target.value)} />
          </Field>
          <Field label="Landlord PAN Available?">
            <select className={selectCls} value={pan} onChange={(e) => setPan(e.target.value)}>
              <option value="yes">Yes / Not required</option>
              <option value="no">No</option>
            </select>
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Employee Details for PDF">
        <FieldGrid>
          <Field label="Employee Name">
            <input className={inputCls} value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} />
          </Field>
          <Field label="Financial Year">
            <input className={inputCls} value={fy} onChange={(e) => setFy(e.target.value)} />
          </Field>
          <Field label="Notes" full>
            <textarea className={textareaCls} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        {[
          ["HRA Exempt", money(exempt)],
          ["Taxable HRA", money(taxable)],
          ["Rent - 10% Salary", money(rentMinus)],
          ["40% / 50% Limit", money(limit)],
        ].map(([label, value]) => (
          <div key={label} className="bg-primary/5 border border-primary/15 rounded-lg p-4">
            <span className="block text-sm font-semibold text-gray-700 mb-1">
              {label}
            </span>
            <span className="text-lg font-bold text-primary">{value}</span>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <TotalRow label="Actual HRA received" value={money(actual)} />
        <TotalRow label="Rent paid minus 10% of salary" value={money(rentMinus)} />
        <TotalRow label="50% of salary for metro / 40% for non-metro" value={money(limit)} />
        <TotalRow label="Least of above = HRA Exemption" value={money(exempt)} grand />
        <TotalRow label="Taxable HRA" value={money(taxable)} />
      </div>

      <div className="mt-4 bg-secondary/10 border border-secondary/40 rounded-lg p-4 text-sm text-gray-700">
        {note}
      </div>

      <div className="flex flex-wrap gap-3 mt-6">
        <button type="button" className={btnPrimary} onClick={downloadPdf}>
          Download PDF
        </button>
        <button type="button" className={btnOutline} onClick={reset}>
          Reset
        </button>
      </div>

      <PreviewBox>
        <div className="max-w-[850px] mx-auto border bg-white p-6 text-sm">
          <h3 className="text-center text-lg font-bold uppercase text-primary mb-2">
            HRA Calculation Summary
          </h3>
          <p className="text-center">
            <strong>{employeeName}</strong> | Financial Year: {fy} | Period:{" "}
            {months} month(s)
          </p>
          <table className="w-full mt-3 border-collapse">
            <thead>
              <tr className="bg-primary/5 text-primary">
                <th className="border p-2 text-left">Particulars</th>
                <th className="border p-2 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Basic Salary", money(basic)],
                ["DA, if applicable", money(da)],
                ["Turnover Commission, if applicable", money(commission)],
                ["Salary for HRA purpose", money(salary)],
                ["Actual HRA received", money(actual)],
                ["Rent paid", money(rent)],
                ["Rent paid minus 10% of salary", money(rentMinus)],
                [cityLabel, money(limit)],
              ].map(([label, value]) => (
                <tr key={label}>
                  <td className="border p-2">{label}</td>
                  <td className="border p-2">{value}</td>
                </tr>
              ))}
              <tr>
                <td className="border p-2 font-bold">HRA Exemption</td>
                <td className="border p-2 font-bold">{money(exempt)}</td>
              </tr>
              <tr>
                <td className="border p-2 font-bold">Taxable HRA</td>
                <td className="border p-2 font-bold">{money(taxable)}</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-3">{notes}</p>
          <p className="mt-2">
            <strong>Note:</strong> This is a general calculation summary. Final
            HRA exemption should be verified with actual rent receipts, salary
            structure and applicable tax rules.
          </p>
        </div>
      </PreviewBox>
    </ToolCard>
  );
}
