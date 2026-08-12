"use client";
import React, { useEffect, useState } from "react";
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

export default function FullAndFinalSettlementCalculatorClient() {
  const [empName, setEmpName] = useState("Rahul Sharma");
  const [empCode, setEmpCode] = useState("EMP-001");
  const [designation, setDesignation] = useState("Accounts Executive");
  const [department, setDepartment] = useState("Accounts");
  const [doj, setDoj] = useState("2021-04-01");
  const [lwd, setLwd] = useState("2026-06-30");
  const [settlementMonth, setSettlementMonth] = useState("June 2026");
  const [exitReason, setExitReason] = useState("Resignation");
  const [monthlyGross, setMonthlyGross] = useState(45000);
  const [basicDA, setBasicDA] = useState(22000);
  const [monthDaysInput, setMonthDaysInput] = useState(30);
  const [paidDaysInput, setPaidDaysInput] = useState(30);
  const [leaveDays, setLeaveDays] = useState(10);
  const [leaveBasis, setLeaveBasis] = useState("basic");
  const [bonus, setBonus] = useState(5000);
  const [reimburse, setReimburse] = useState(2500);
  const [arrears, setArrears] = useState(0);
  const [includeGratuity, setIncludeGratuity] = useState("yes");
  const [serviceYears, setServiceYears] = useState(5);
  const [serviceMonths, setServiceMonths] = useState(3);
  const [noticeDays, setNoticeDays] = useState(0);
  const [noticeBasis, setNoticeBasis] = useState("gross");
  const [advanceRecovery, setAdvanceRecovery] = useState(0);
  const [assetRecovery, setAssetRecovery] = useState(0);
  const [tdsDeduction, setTdsDeduction] = useState(0);
  const [otherDeduction, setOtherDeduction] = useState(0);
  const [companyName, setCompanyName] = useState("ABC Private Limited");
  const [preparedBy, setPreparedBy] = useState("HR Department");
  const [settlementDate, setSettlementDate] = useState("");
  const [additionalNote, setAdditionalNote] = useState(
    "Subject to final verification of attendance, assets, dues and company policy."
  );

  useEffect(() => {
    setSettlementDate(new Date().toISOString().slice(0, 10));
  }, []);

  /* Same formulas as the source calculateFNF(). */
  const gross = monthlyGross || 0;
  const basic = basicDA || 0;
  const monthDays = Math.max(1, monthDaysInput || 0);
  const paidDays = Math.max(0, paidDaysInput || 0);
  const earnedSalary = (gross / monthDays) * paidDays;
  const leaveBase = leaveBasis === "basic" ? basic : gross;
  const leaveEncashment = (leaveBase / 26) * (leaveDays || 0);
  const gratuityYears =
    Math.max(0, Math.floor(serviceYears || 0)) +
    (Math.max(0, Math.floor(serviceMonths || 0)) > 6 ? 1 : 0);
  const gratuityEligible = gratuityYears >= 5;
  const gratuity =
    includeGratuity === "yes" && gratuityEligible
      ? (basic * 15 * gratuityYears) / 26
      : 0;
  const noticeBase = noticeBasis === "basic" ? basic : gross;
  const noticeRecovery = (noticeBase / monthDays) * (noticeDays || 0);
  const deductions =
    noticeRecovery +
    (advanceRecovery || 0) +
    (assetRecovery || 0) +
    (tdsDeduction || 0) +
    (otherDeduction || 0);
  const totalPayables =
    earnedSalary + leaveEncashment + (bonus || 0) + (reimburse || 0) + (arrears || 0) + gratuity;
  const netPayable = totalPayables - deductions;
  const gratuityNote =
    includeGratuity === "yes"
      ? gratuityEligible
        ? `Gratuity years considered: ${gratuityYears}`
        : "Gratuity not calculated because service years considered are below 5."
      : "Gratuity excluded by user.";

  const reset = () => {
    setEmpName("Rahul Sharma");
    setEmpCode("EMP-001");
    setDesignation("Accounts Executive");
    setDepartment("Accounts");
    setDoj("2021-04-01");
    setLwd("2026-06-30");
    setSettlementMonth("June 2026");
    setExitReason("Resignation");
    setMonthlyGross(45000);
    setBasicDA(22000);
    setMonthDaysInput(30);
    setPaidDaysInput(30);
    setLeaveDays(10);
    setLeaveBasis("basic");
    setBonus(5000);
    setReimburse(2500);
    setArrears(0);
    setIncludeGratuity("yes");
    setServiceYears(5);
    setServiceMonths(3);
    setNoticeDays(0);
    setNoticeBasis("gross");
    setAdvanceRecovery(0);
    setAssetRecovery(0);
    setTdsDeduction(0);
    setOtherDeduction(0);
    setCompanyName("ABC Private Limited");
    setPreparedBy("HR Department");
    setSettlementDate(new Date().toISOString().slice(0, 10));
    setAdditionalNote(
      "Subject to final verification of attendance, assets, dues and company policy."
    );
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
    doc.setFontSize(15);
    doc.text("Full & Final Settlement Summary", margin + 6, y + 9);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Generated using Registration Seva F&F Calculator", margin + 6, y + 16);
    y += 32;
    doc.setDrawColor(217, 230, 251);
    doc.setFillColor(247, 251, 255);
    doc.roundedRect(margin, y, pageW - margin * 2, 42, 3, 3, "FD");
    doc.setTextColor(15, 74, 137);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Employee Details", margin + 6, y + 8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 96, 125);
    doc.text("Company: " + (companyName || "-"), margin + 6, y + 15);
    doc.text("Employee: " + (empName || "-") + " (" + (empCode || "-") + ")", margin + 6, y + 21);
    doc.text("Designation: " + (designation || "-") + " | Department: " + (department || "-"), margin + 6, y + 27);
    doc.text("DOJ: " + (doj || "-") + " | LWD: " + (lwd || "-") + " | Reason: " + exitReason, margin + 6, y + 33);
    doc.text("Settlement Date: " + (settlementDate || "-") + " | Prepared By: " + (preparedBy || "-"), margin + 6, y + 39);
    y += 54;
    const tableX = margin;
    const tableW = pageW - margin * 2;
    const rowH = 9;
    const labelW = 112;
    const rows: [string, number][] = [
      ["Earned Salary", earnedSalary],
      ["Leave Encashment", leaveEncashment],
      ["Bonus / Incentive", bonus || 0],
      ["Reimbursement", reimburse || 0],
      ["Salary Arrears / Other Payable", arrears || 0],
      ["Gratuity Estimate", gratuity],
      ["Total Payables", totalPayables],
      ["Notice Pay Recovery", noticeRecovery],
      ["Other Deductions", deductions - noticeRecovery],
      ["Total Deductions", deductions],
      ["Estimated Net F&F Payable", netPayable],
    ];
    doc.setFillColor(15, 74, 137);
    doc.roundedRect(tableX, y, tableW, rowH, 2, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Particulars", tableX + 5, y + 6.2);
    doc.text("Amount", tableX + labelW + 5, y + 6.2);
    y += rowH;
    rows.forEach((row, idx) => {
      const isTotal = row[0].includes("Total") || row[0].includes("Net");
      doc.setFillColor(
        isTotal ? 232 : idx % 2 === 0 ? 255 : 247,
        isTotal ? 241 : idx % 2 === 0 ? 255 : 251,
        isTotal ? 255 : 255
      );
      doc.setDrawColor(217, 230, 251);
      doc.rect(tableX, y, tableW, rowH, "FD");
      doc.setTextColor(15, 74, 137);
      doc.setFont("helvetica", isTotal ? "bold" : "normal");
      doc.text(row[0], tableX + 5, y + 6.1);
      doc.text(pdfMoney(row[1]), tableX + labelW + 5, y + 6.1);
      y += rowH;
    });
    y += 6;
    doc.setFillColor(243, 164, 4);
    doc.roundedRect(tableX, y, tableW, 14, 3, 3, "F");
    doc.setTextColor(32, 32, 32);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Estimated Net Settlement Payable", tableX + 5, y + 9);
    doc.text(pdfMoney(netPayable), tableX + labelW + 5, y + 9);
    y += 24;
    doc.setTextColor(96, 112, 141);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.7);
    const note =
      "Important: This is a general estimate only. Verify attendance, leave balance, salary structure, gratuity eligibility, notice recovery, TDS, PF/ESIC, employment terms, company policy and applicable law before official settlement. " +
      (additionalNote || "");
    doc.text(doc.splitTextToSize(note, tableW), margin, y);
    doc.text(
      "Generated free at registrationseva.com. Verify all details before official use.",
      margin,
      287
    );
    doc.save("full-and-final-settlement-RegistrationSeva.pdf");
  };

  return (
    <ToolCard>
      <h2 className="text-2xl font-bold text-primary mb-2">
        Calculate Full & Final Settlement
      </h2>
      <p className="text-gray-600 text-sm mb-6">
        Enter employee exit and payroll details. This tool gives a general
        estimate and should be verified before official settlement, payroll
        processing or legal use.
      </p>

      <FormSection title="Employee & Exit Details">
        <FieldGrid>
          <Field label="Employee Name">
            <input className={inputCls} value={empName} onChange={(e) => setEmpName(e.target.value)} />
          </Field>
          <Field label="Employee ID / Code">
            <input className={inputCls} value={empCode} onChange={(e) => setEmpCode(e.target.value)} />
          </Field>
          <Field label="Designation">
            <input className={inputCls} value={designation} onChange={(e) => setDesignation(e.target.value)} />
          </Field>
          <Field label="Department">
            <input className={inputCls} value={department} onChange={(e) => setDepartment(e.target.value)} />
          </Field>
          <Field label="Date of Joining">
            <input type="date" className={inputCls} value={doj} onChange={(e) => setDoj(e.target.value)} />
          </Field>
          <Field label="Last Working Date">
            <input type="date" className={inputCls} value={lwd} onChange={(e) => setLwd(e.target.value)} />
          </Field>
          <Field label="Settlement Month">
            <input className={inputCls} value={settlementMonth} onChange={(e) => setSettlementMonth(e.target.value)} />
          </Field>
          <Field label="Exit Reason">
            <select className={selectCls} value={exitReason} onChange={(e) => setExitReason(e.target.value)}>
              <option>Resignation</option>
              <option>Termination</option>
              <option>Retirement</option>
              <option>Contract End</option>
              <option>Other</option>
            </select>
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Salary Payable">
        <FieldGrid>
          <Field label="Monthly Gross Salary">
            <input type="number" min={0} step={0.01} className={inputCls} value={monthlyGross} onChange={(e) => setMonthlyGross(+e.target.value)} />
          </Field>
          <Field label="Monthly Basic + DA">
            <input type="number" min={0} step={0.01} className={inputCls} value={basicDA} onChange={(e) => setBasicDA(+e.target.value)} />
          </Field>
          <Field label="Total Days in Settlement Month">
            <input type="number" min={1} step={1} className={inputCls} value={monthDaysInput} onChange={(e) => setMonthDaysInput(+e.target.value)} />
          </Field>
          <Field label="Paid Days up to Last Working Date">
            <input type="number" min={0} step={0.5} className={inputCls} value={paidDaysInput} onChange={(e) => setPaidDaysInput(+e.target.value)} />
          </Field>
          <Field label="Leave Encashment Days">
            <input type="number" min={0} step={0.5} className={inputCls} value={leaveDays} onChange={(e) => setLeaveDays(+e.target.value)} />
          </Field>
          <Field label="Leave Encashment Basis">
            <select className={selectCls} value={leaveBasis} onChange={(e) => setLeaveBasis(e.target.value)}>
              <option value="gross">Monthly Gross Salary</option>
              <option value="basic">Basic + DA</option>
            </select>
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Additions">
        <FieldGrid>
          <Field label="Bonus / Incentive Payable">
            <input type="number" min={0} step={0.01} className={inputCls} value={bonus} onChange={(e) => setBonus(+e.target.value)} />
          </Field>
          <Field label="Reimbursement Payable">
            <input type="number" min={0} step={0.01} className={inputCls} value={reimburse} onChange={(e) => setReimburse(+e.target.value)} />
          </Field>
          <Field label="Salary Arrears / Other Payable">
            <input type="number" min={0} step={0.01} className={inputCls} value={arrears} onChange={(e) => setArrears(+e.target.value)} />
          </Field>
          <Field label="Include Gratuity Estimate?">
            <select className={selectCls} value={includeGratuity} onChange={(e) => setIncludeGratuity(e.target.value)}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </Field>
          <Field label="Completed Years of Service">
            <input type="number" min={0} step={1} className={inputCls} value={serviceYears} onChange={(e) => setServiceYears(+e.target.value)} />
          </Field>
          <Field label="Additional Months of Service">
            <input type="number" min={0} max={11} step={1} className={inputCls} value={serviceMonths} onChange={(e) => setServiceMonths(+e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Deductions">
        <FieldGrid>
          <Field label="Notice Pay Recovery Days">
            <input type="number" min={0} step={0.5} className={inputCls} value={noticeDays} onChange={(e) => setNoticeDays(+e.target.value)} />
          </Field>
          <Field label="Notice Recovery Basis">
            <select className={selectCls} value={noticeBasis} onChange={(e) => setNoticeBasis(e.target.value)}>
              <option value="gross">Monthly Gross Salary</option>
              <option value="basic">Basic + DA</option>
            </select>
          </Field>
          <Field label="Loan / Advance Recovery">
            <input type="number" min={0} step={0.01} className={inputCls} value={advanceRecovery} onChange={(e) => setAdvanceRecovery(+e.target.value)} />
          </Field>
          <Field label="Asset / Damage Recovery">
            <input type="number" min={0} step={0.01} className={inputCls} value={assetRecovery} onChange={(e) => setAssetRecovery(+e.target.value)} />
          </Field>
          <Field label="TDS / Tax Deduction">
            <input type="number" min={0} step={0.01} className={inputCls} value={tdsDeduction} onChange={(e) => setTdsDeduction(+e.target.value)} />
          </Field>
          <Field label="Other Deduction">
            <input type="number" min={0} step={0.01} className={inputCls} value={otherDeduction} onChange={(e) => setOtherDeduction(+e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Company Details">
        <FieldGrid>
          <Field label="Company Name">
            <input className={inputCls} value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </Field>
          <Field label="Prepared By / HR Name">
            <input className={inputCls} value={preparedBy} onChange={(e) => setPreparedBy(e.target.value)} />
          </Field>
          <Field label="Settlement Date">
            <input type="date" className={inputCls} value={settlementDate} onChange={(e) => setSettlementDate(e.target.value)} />
          </Field>
          <Field label="Additional Note">
            <input className={inputCls} value={additionalNote} onChange={(e) => setAdditionalNote(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <div className="mb-6">
        <TotalRow label="Earned Salary" value={money(earnedSalary)} />
        <TotalRow label="Leave Encashment" value={money(leaveEncashment)} />
        <TotalRow label="Gratuity Estimate" value={money(gratuity)} />
        <TotalRow label="Other Additions" value={money((bonus || 0) + (reimburse || 0) + (arrears || 0))} />
        <TotalRow label="Total Payables" value={money(totalPayables)} />
        <TotalRow label="Total Deductions" value={money(deductions)} />
        <TotalRow label="Estimated Net F&F Payable" value={money(netPayable)} grand />
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="button" className={btnPrimary} onClick={downloadPdf}>
          Download F&F PDF
        </button>
        <button type="button" className={btnOutline} onClick={reset}>
          Reset
        </button>
      </div>

      <PreviewBox>
        <div className="max-w-[820px] mx-auto border bg-white p-5 text-sm rounded-xl">
          <h2 className="text-lg font-bold text-primary">
            Full & Final Settlement Summary
          </h2>
          <p className="mt-2">
            <b>Employee:</b> {empName || "-"} ({empCode || "-"})
            <br />
            <b>Designation:</b> {designation || "-"} · {department || "-"}
            <br />
            <b>Company:</b> {companyName || "-"}
            <br />
            <b>Last Working Date:</b> {lwd || "-"} · <b>Exit Reason:</b> {exitReason}
          </p>
          <hr className="my-3" />
          <p>
            <b>Total Payables:</b> {money(totalPayables)}
            <br />
            <b>Total Deductions:</b> {money(deductions)}
            <br />
            <b>Estimated Net F&F Payable:</b> {money(netPayable)}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {gratuityNote}
            <br />
            {additionalNote}
          </p>
        </div>
      </PreviewBox>
    </ToolCard>
  );
}
