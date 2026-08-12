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
  btnPrimary,
  btnOutline,
} from "@/components/tools/fields";

const money = (n: number) =>
  "₹" +
  Number(n || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
const pdfMoney = (n: number) =>
  "INR " +
  Number(n || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function PfEsicCalculatorClient() {
  const [pfInput, setPfInput] = useState(15000);
  const [pfBasis, setPfBasis] = useState("cap");
  const [epsApplicable, setEpsApplicable] = useState("yes");
  const [includeChargesSel, setIncludeChargesSel] = useState("no");
  const [esicWage, setEsicWage] = useState(20000);
  const [esicMode, setEsicMode] = useState("auto");
  const [dailyExemptSel, setDailyExemptSel] = useState("no");
  const [note, setNote] = useState("PF and ESIC calculation");

  /* Same formulas as the source calculatePayroll(). */
  const epsApplies = epsApplicable === "yes";
  const includeCharges = includeChargesSel === "yes";
  const pfWage = pfBasis === "cap" ? Math.min(pfInput || 0, 15000) : pfInput || 0;
  const employeePF = pfWage * 0.12;
  const employerPF = pfWage * 0.12;
  const epsWage = Math.min(pfWage, 15000);
  const employerEPS = epsApplies ? epsWage * 0.0833 : 0;
  const employerEPF = Math.max(employerPF - employerEPS, 0);
  const edli = includeCharges ? pfWage * 0.005 : 0;
  const admin = includeCharges ? pfWage * 0.005 : 0;
  const esicWageN = esicWage || 0;
  let esicApplies =
    esicMode === "yes" || (esicMode === "auto" && esicWageN <= 21000 && esicWageN > 0);
  if (esicMode === "no") esicApplies = false;
  const dailyExempt = dailyExemptSel === "yes";
  const employeeESIC = esicApplies && !dailyExempt ? esicWageN * 0.0075 : 0;
  const employerESIC = esicApplies ? esicWageN * 0.0325 : 0;
  const employeeTotal = employeePF + employeeESIC;
  const employerTotal = employerPF + employerESIC + edli + admin;

  const reset = () => {
    setPfInput(15000);
    setPfBasis("cap");
    setEpsApplicable("yes");
    setIncludeChargesSel("no");
    setEsicWage(20000);
    setEsicMode("auto");
    setDailyExemptSel("no");
    setNote("PF and ESIC calculation");
  };

  const downloadPdf = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageW = 210;
    const margin = 16;
    let y = 18;
    doc.setFillColor(15, 74, 137);
    doc.roundedRect(margin, y, pageW - margin * 2, 22, 3, 3, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Registration Seva PF / ESIC Calculation Summary", margin + 6, y + 9);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Generated using Registration Seva PF / ESIC Calculator", margin + 6, y + 16);
    y += 32;
    doc.setDrawColor(217, 230, 251);
    doc.setFillColor(247, 251, 255);
    doc.roundedRect(margin, y, pageW - margin * 2, 32, 3, 3, "FD");
    doc.setTextColor(15, 74, 137);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Calculation Details", margin + 6, y + 8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 96, 125);
    doc.text("Note: " + (note || "PF and ESIC calculation"), margin + 6, y + 15);
    doc.text("PF Wage Considered: " + pdfMoney(pfWage), margin + 6, y + 21);
    doc.text("ESIC Applied: " + (esicApplies ? "Yes" : "No"), margin + 6, y + 27);
    y += 44;
    const tableX = margin;
    const tableW = pageW - margin * 2;
    const rowH = 10;
    const labelW = 112;
    const rows: [string, string][] = [
      ["Employee PF @ 12%", pdfMoney(employeePF)],
      ["Employer EPF Share", pdfMoney(employerEPF)],
      ["Employer EPS Share", pdfMoney(employerEPS)],
      ["Employee ESIC @ 0.75%", pdfMoney(employeeESIC)],
      ["Employer ESIC @ 3.25%", pdfMoney(employerESIC)],
    ];
    if (includeCharges) {
      rows.push(
        ["EDLI Estimate @ 0.50%", pdfMoney(edli)],
        ["EPF Admin Estimate @ 0.50%", pdfMoney(admin)]
      );
    }
    doc.setFillColor(15, 74, 137);
    doc.roundedRect(tableX, y, tableW, rowH, 2, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Particulars", tableX + 5, y + 6.7);
    doc.text("Amount", tableX + labelW + 5, y + 6.7);
    y += rowH;
    doc.setFont("helvetica", "normal");
    rows.forEach((row, idx) => {
      doc.setFillColor(idx % 2 === 0 ? 255 : 247, idx % 2 === 0 ? 255 : 251, idx % 2 === 0 ? 255 : 255);
      doc.setDrawColor(217, 230, 251);
      doc.rect(tableX, y, tableW, rowH, "FD");
      doc.setTextColor(15, 74, 137);
      doc.text(row[0], tableX + 5, y + 6.7);
      doc.setFont("helvetica", "bold");
      doc.text(row[1], tableX + labelW + 5, y + 6.7);
      doc.setFont("helvetica", "normal");
      y += rowH;
    });
    y += 4;
    doc.setFillColor(15, 74, 137);
    doc.roundedRect(tableX, y, tableW, 14, 3, 3, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Total Employee Deduction", tableX + 5, y + 9);
    doc.text(pdfMoney(employeeTotal), tableX + labelW + 5, y + 9);
    y += 18;
    doc.setFillColor(243, 164, 4);
    doc.roundedRect(tableX, y, tableW, 14, 3, 3, "F");
    doc.setTextColor(32, 32, 32);
    doc.text("Total Employer Contribution / Cost", tableX + 5, y + 9);
    doc.text(pdfMoney(employerTotal), tableX + labelW + 5, y + 9);
    y += 24;
    doc.setTextColor(96, 112, 141);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const pdfNote =
      "Important: This calculation is for general utility only. Verify PF/ESIC applicability, wage components, contribution rates, wage limits and current law before official payroll processing.";
    doc.text(doc.splitTextToSize(pdfNote, tableW), margin, y);
    doc.text(
      "Generated free at registrationseva.com. Verify all details before official use.",
      margin,
      287
    );
    doc.save("pf-esic-calculation-RegistrationSeva.pdf");
  };

  return (
    <ToolCard>
      <h2 className="text-2xl font-bold text-primary mb-2">Calculate PF and ESIC</h2>
      <p className="text-gray-600 text-sm mb-6">
        Enter PF wage and ESIC wage to calculate common employee and employer
        payroll contributions.
      </p>

      <FormSection title="PF Details">
        <FieldGrid>
          <Field label="PF Wage / Basic + DA">
            <input type="number" min={0} step={0.01} className={inputCls} value={pfInput} onChange={(e) => setPfInput(+e.target.value)} />
          </Field>
          <Field label="PF Wage Basis">
            <select className={selectCls} value={pfBasis} onChange={(e) => setPfBasis(e.target.value)}>
              <option value="full">Use full PF wage</option>
              <option value="cap">Cap PF wage at INR 15,000</option>
            </select>
          </Field>
          <Field label="EPS Applicable?">
            <select className={selectCls} value={epsApplicable} onChange={(e) => setEpsApplicable(e.target.value)}>
              <option value="yes">Yes, calculate EPS split</option>
              <option value="no">No, full employer share to EPF</option>
            </select>
          </Field>
          <Field label="Include EDLI/Admin Estimate?">
            <select className={selectCls} value={includeChargesSel} onChange={(e) => setIncludeChargesSel(e.target.value)}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="ESIC Details">
        <FieldGrid>
          <Field label="ESIC Wage / Gross Wage">
            <input type="number" min={0} step={0.01} className={inputCls} value={esicWage} onChange={(e) => setEsicWage(+e.target.value)} />
          </Field>
          <Field label="ESIC Applicability">
            <select className={selectCls} value={esicMode} onChange={(e) => setEsicMode(e.target.value)}>
              <option value="auto">Auto based on INR 21,000 wage limit</option>
              <option value="yes">Apply ESIC</option>
              <option value="no">Do not apply ESIC</option>
            </select>
          </Field>
          <Field label="Daily Average Wage up to INR 176?">
            <select className={selectCls} value={dailyExemptSel} onChange={(e) => setDailyExemptSel(e.target.value)}>
              <option value="no">No</option>
              <option value="yes">Yes, employee ESIC exempt</option>
            </select>
          </Field>
          <Field label="Description / Note">
            <input className={inputCls} value={note} onChange={(e) => setNote(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <div className="mb-6">
        <TotalRow label="PF Wage Considered" value={money(pfWage)} />
        <TotalRow label="Employee PF @ 12%" value={money(employeePF)} />
        <TotalRow label="Employer EPF Share" value={money(employerEPF)} />
        <TotalRow label="Employer EPS Share" value={money(employerEPS)} />
        <TotalRow label="Employee ESIC @ 0.75%" value={money(employeeESIC)} />
        <TotalRow label="Employer ESIC @ 3.25%" value={money(employerESIC)} />
        {includeCharges && (
          <>
            <TotalRow label="EDLI Estimate @ 0.50%" value={money(edli)} />
            <TotalRow label="EPF Admin Estimate @ 0.50%" value={money(admin)} />
          </>
        )}
        <TotalRow label="Total Employee Deduction" value={money(employeeTotal)} grand />
        <TotalRow label="Total Employer Contribution / Cost" value={money(employerTotal)} grand />
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="button" className={btnPrimary} onClick={downloadPdf}>
          Download Calculation PDF
        </button>
        <button type="button" className={btnOutline} onClick={reset}>
          Reset
        </button>
      </div>

      <PreviewBox>
        <div className="max-w-[760px] mx-auto border bg-white p-5 text-sm rounded-xl">
          <h2 className="text-lg font-bold text-primary">PF / ESIC Calculation Summary</h2>
          <p className="mt-2">
            <b>Note:</b> {note || "PF and ESIC calculation"}
            <br />
            <b>PF Wage Considered:</b> {money(pfWage)}
            <br />
            <b>ESIC Applied:</b> {esicApplies ? "Yes" : "No"}
          </p>
          <hr className="my-3" />
          <p>
            <b>Employee PF:</b> {money(employeePF)}
            <br />
            <b>Employee ESIC:</b> {money(employeeESIC)}
            <br />
            <b>Total Employee Deduction:</b> {money(employeeTotal)}
            <br />
            <b>Total Employer Contribution / Cost:</b> {money(employerTotal)}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Verify applicability, wage components and current rates before
            official payroll processing.
          </p>
        </div>
      </PreviewBox>
    </ToolCard>
  );
}
