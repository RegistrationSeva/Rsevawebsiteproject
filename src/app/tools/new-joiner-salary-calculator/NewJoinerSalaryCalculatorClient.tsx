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
  btnSecondary,
  btnOutline,
  btnDanger,
  fmtINR,
} from "@/components/tools/fields";

interface Allowance {
  name: string;
  amount: number;
}

const money = (n: number) => "INR " + fmtINR(n);

const monthValue = (d: Date) =>
  d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");

const daysInMonthFromValue = (v: string) => {
  if (!v) return 30;
  const [y, m] = v.split("-").map(Number);
  return new Date(y, m, 0).getDate();
};

export default function NewJoinerSalaryCalculatorClient() {
  const [empName, setEmpName] = useState("Rahul Sharma");
  const [empCode, setEmpCode] = useState("EMP-001");
  const [designation, setDesignation] = useState("Accounts Executive");
  const [department, setDepartment] = useState("Accounts");
  const [joiningDate, setJoiningDate] = useState("");
  const [salaryMonth, setSalaryMonth] = useState("");
  const [salaryMode, setSalaryMode] = useState("fullMonth");
  const [calculationBasis, setCalculationBasis] = useState("calendar");
  const [manualDays, setManualDays] = useState(30);
  const [manualPaidDays, setManualPaidDays] = useState(30);
  const [lopDays, setLopDays] = useState(0);
  const [basicSalary, setBasicSalary] = useState(22000);
  const [hra, setHra] = useState(10000);
  const [conveyance, setConveyance] = useState(1600);
  const [specialAllowance, setSpecialAllowance] = useState(11400);
  const [otherAdditions, setOtherAdditions] = useState(0);
  const [allowances, setAllowances] = useState<Allowance[]>([
    { name: "Custom Allowance", amount: 0 },
  ]);
  const [pfApplicable, setPfApplicable] = useState("yes");
  const [pfBasis, setPfBasis] = useState("earnedBasic");
  const [manualPFWage, setManualPFWage] = useState(15000);
  const [empPFRate, setEmpPFRate] = useState(12);
  const [erPFRate, setErPFRate] = useState(12);
  const [epsSplit, setEpsSplit] = useState("yes");
  const [esicApplicable, setEsicApplicable] = useState("auto");
  const [esicCeiling, setEsicCeiling] = useState("21000");
  const [customEsicCeiling, setCustomEsicCeiling] = useState(21000);
  const [tdsDeduction, setTdsDeduction] = useState(0);
  const [otherDeduction, setOtherDeduction] = useState(0);
  const [rounding, setRounding] = useState("yes");
  const [companyName, setCompanyName] = useState("ABC Private Limited");
  const [preparedBy, setPreparedBy] = useState("HR / Payroll Department");
  const [prepDate, setPrepDate] = useState("");
  const [note, setNote] = useState(
    "Subject to final appointment terms, payroll policy and statutory applicability verification."
  );

  useEffect(() => {
    const d = new Date();
    d.setDate(Math.min(d.getDate(), 10));
    setJoiningDate(d.toISOString().slice(0, 10));
    setSalaryMonth(monthValue(d));
    setPrepDate(new Date().toISOString().slice(0, 10));
  }, []);

  const onJoiningDateChange = (v: string) => {
    setJoiningDate(v);
    if (v) setSalaryMonth(monthValue(new Date(v + "T00:00:00")));
  };

  /* ---- Calculation (ported exactly from source JS) ---- */
  const customTotal = allowances.reduce((a, b) => a + (b.amount || 0), 0);
  const customItems = allowances.filter(
    (al) => (al.amount || 0) > 0 || al.name.trim()
  );
  const gross =
    (basicSalary || 0) +
    (hra || 0) +
    (conveyance || 0) +
    (specialAllowance || 0) +
    customTotal;

  const payrollDays =
    calculationBasis === "standard30"
      ? 30
      : calculationBasis === "manual"
      ? Math.max(1, manualDays || 0)
      : daysInMonthFromValue(salaryMonth);

  const joiningDays = (() => {
    const basisDays = payrollDays;
    if (!joiningDate || !salaryMonth) return basisDays;
    const joining = new Date(joiningDate + "T00:00:00");
    const [y, m] = salaryMonth.split("-").map(Number);
    const start = new Date(y, m - 1, 1);
    const end = new Date(y, m, 0);
    if (joining > end) return 0;
    if (joining < start) return basisDays;
    const calendarDays = daysInMonthFromValue(salaryMonth);
    const payableCalendarDays =
      (end.getTime() - joining.getTime()) / (1000 * 60 * 60 * 24) + 1;
    if (calculationBasis === "calendar") return Math.max(0, payableCalendarDays);
    if (calculationBasis === "standard30")
      return Math.max(
        0,
        Math.min(30, Math.round((payableCalendarDays / calendarDays) * 30 * 100) / 100)
      );
    if (calculationBasis === "manual")
      return Math.max(
        0,
        Math.round((payableCalendarDays / calendarDays) * basisDays * 100) / 100
      );
    return payableCalendarDays;
  })();

  let paidDays = payrollDays;
  if (salaryMode === "joiningProRata")
    paidDays = Math.max(0, joiningDays - (lopDays || 0));
  else if (salaryMode === "manualPaidDays")
    paidDays = Math.max(0, Math.min(payrollDays, manualPaidDays || 0));

  const factor = payrollDays ? paidDays / payrollDays : 0;
  const earnedBasic = (basicSalary || 0) * factor;
  const earnedHRA = (hra || 0) * factor;
  const earnedConveyance = (conveyance || 0) * factor;
  const earnedSpecial = (specialAllowance || 0) * factor;
  const earnedCustom = customTotal * factor;
  const earnedGross = gross * factor;
  const additions = otherAdditions || 0;

  let pfWage = 0,
    empPF = 0,
    erPF = 0,
    eps = 0,
    erEPF = 0;
  if (pfApplicable === "yes") {
    if (pfBasis === "cap15000") pfWage = Math.min(15000, earnedBasic);
    else if (pfBasis === "manual") pfWage = manualPFWage || 0;
    else pfWage = earnedBasic;
    empPF = (pfWage * (empPFRate || 0)) / 100;
    erPF = (pfWage * (erPFRate || 0)) / 100;
    if (epsSplit === "yes") {
      eps = (Math.min(pfWage, 15000) * 8.33) / 100;
      erEPF = Math.max(0, erPF - eps);
    } else {
      erEPF = erPF;
      eps = 0;
    }
  }

  const ceiling =
    esicCeiling === "custom" ? customEsicCeiling || 0 : parseFloat(esicCeiling);
  const esicWage = earnedGross;
  let esicEligible = false;
  if (esicApplicable === "yes") esicEligible = true;
  else if (esicApplicable === "auto")
    esicEligible = gross > 0 && gross <= ceiling;
  const empESIC = esicEligible ? (esicWage * 0.75) / 100 : 0;
  const erESIC = esicEligible ? (esicWage * 3.25) / 100 : 0;

  const tds = tdsDeduction || 0;
  const otherDed = otherDeduction || 0;
  const totalDeductions = empPF + empESIC + tds + otherDed;
  const netPay = earnedGross + additions - totalDeductions;
  const employerCost = earnedGross + additions + erPF + erESIC;

  const round = (v: number) =>
    rounding === "yes" ? Math.round(v) : Math.round(v * 100) / 100;

  const r = {
    payrollDays,
    joiningDays,
    paidDays,
    gross: round(gross),
    earnedGross: round(earnedGross),
    earnedBasic: round(earnedBasic),
    earnedHRA: round(earnedHRA),
    earnedConveyance: round(earnedConveyance),
    earnedSpecial: round(earnedSpecial),
    earnedCustom: round(earnedCustom),
    additions: round(additions),
    pfWage: round(pfWage),
    empPF: round(empPF),
    erPF: round(erPF),
    eps: round(eps),
    erEPF: round(erEPF),
    empESIC: round(empESIC),
    erESIC: round(erESIC),
    tds: round(tds),
    otherDed: round(otherDed),
    totalDeductions: round(totalDeductions),
    netPay: round(netPay),
    employerCost: round(employerCost),
    esicEligible,
  };

  const modeLabel =
    salaryMode === "fullMonth"
      ? "Full Monthly Salary"
      : salaryMode === "joiningProRata"
      ? "Joining Date Pro-rata"
      : "Manual Payable Days";

  const updateAllowance = (i: number, patch: Partial<Allowance>) =>
    setAllowances((prev) =>
      prev.map((al, idx) => (idx === i ? { ...al, ...patch } : al))
    );

  const reset = () => {
    const d = new Date();
    d.setDate(Math.min(d.getDate(), 10));
    setJoiningDate(d.toISOString().slice(0, 10));
    setSalaryMonth(monthValue(d));
    setPrepDate(new Date().toISOString().slice(0, 10));
    setEmpName("Rahul Sharma");
    setEmpCode("EMP-001");
    setDesignation("Accounts Executive");
    setDepartment("Accounts");
    setSalaryMode("fullMonth");
    setCalculationBasis("calendar");
    setManualDays(30);
    setManualPaidDays(30);
    setBasicSalary(22000);
    setHra(10000);
    setConveyance(1600);
    setSpecialAllowance(11400);
    setOtherAdditions(0);
    setLopDays(0);
    setAllowances([{ name: "Custom Allowance", amount: 0 }]);
    setPfApplicable("yes");
    setPfBasis("earnedBasic");
    setManualPFWage(15000);
    setEmpPFRate(12);
    setErPFRate(12);
    setEpsSplit("yes");
    setEsicApplicable("auto");
    setEsicCeiling("21000");
    setCustomEsicCeiling(21000);
    setTdsDeduction(0);
    setOtherDeduction(0);
    setRounding("yes");
    setCompanyName("ABC Private Limited");
    setPreparedBy("HR / Payroll Department");
    setNote(
      "Subject to final appointment terms, payroll policy and statutory applicability verification."
    );
  };

  const downloadPdf = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageW = 210,
      margin = 16;
    let y = 18;
    doc.setFillColor(15, 74, 137);
    doc.roundedRect(margin, y, pageW - margin * 2, 22, 3, 3, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text("New Joiner Salary Calculation Summary", margin + 6, y + 9);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(
      "Generated using Registration Seva New Joiner Salary Calculator",
      margin + 6,
      y + 16
    );
    y += 32;
    doc.setDrawColor(217, 230, 251);
    doc.setFillColor(247, 251, 255);
    doc.roundedRect(margin, y, pageW - margin * 2, 46, 3, 3, "FD");
    doc.setTextColor(15, 74, 137);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Employee Details", margin + 6, y + 8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 96, 125);
    doc.text("Company: " + (companyName || "-"), margin + 6, y + 15);
    doc.text(
      "Employee: " + (empName || "-") + " (" + (empCode || "-") + ")",
      margin + 6,
      y + 21
    );
    doc.text(
      "Designation: " + (designation || "-") + " | Department: " + (department || "-"),
      margin + 6,
      y + 27
    );
    doc.text(
      "Joining Date: " + (joiningDate || "-") + " | Salary Month: " + (salaryMonth || "-"),
      margin + 6,
      y + 33
    );
    doc.text(
      "Prepared By: " + (preparedBy || "-") + " | Date: " + (prepDate || "-"),
      margin + 6,
      y + 39
    );
    doc.text("Salary Mode: " + modeLabel, margin + 6, y + 45);
    y += 58;
    const tableX = margin,
      tableW = pageW - margin * 2,
      rowH = 8.5,
      labelW = 112;
    const rows: [string, number][] = [
      ["Payroll Days Basis", r.payrollDays],
      ["Payable Days Used", r.paidDays],
      ["Monthly Gross Salary", r.gross],
      ["Earned Basic Salary", r.earnedBasic],
      ["Earned HRA", r.earnedHRA],
      ["Earned Conveyance Allowance", r.earnedConveyance],
      ["Earned Special Allowance", r.earnedSpecial],
      ["Earned Custom Allowances", r.earnedCustom],
      ["Earned Gross Salary", r.earnedGross],
      ["Other Additions", r.additions],
      ["Employee PF", r.empPF],
      ["Employee ESIC", r.empESIC],
      ["TDS Deduction", r.tds],
      ["Other Deduction", r.otherDed],
      ["Total Employee Deductions", r.totalDeductions],
      ["Estimated Net Salary Payable", r.netPay],
      ["Employer PF Contribution", r.erPF],
      ["Employer ESIC Contribution", r.erESIC],
      ["Estimated Employer Cost", r.employerCost],
    ];
    doc.setFillColor(15, 74, 137);
    doc.roundedRect(tableX, y, tableW, rowH, 2, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text("Particulars", tableX + 5, y + 6);
    doc.text("Value / Amount", tableX + labelW + 5, y + 6);
    y += rowH;
    rows.forEach((row, idx) => {
      if (y > 270) {
        doc.addPage();
        y = 18;
      }
      const label = row[0];
      const isTotal =
        label.includes("Total") ||
        label.includes("Net") ||
        label.includes("Employer Cost");
      doc.setFillColor(
        isTotal ? 232 : idx % 2 === 0 ? 255 : 247,
        isTotal ? 241 : idx % 2 === 0 ? 255 : 251,
        255
      );
      doc.setDrawColor(217, 230, 251);
      doc.rect(tableX, y, tableW, rowH, "FD");
      doc.setTextColor(15, 74, 137);
      doc.setFont("helvetica", isTotal ? "bold" : "normal");
      doc.text(label, tableX + 5, y + 5.8);
      const value =
        idx <= 1 ? String(Number(row[1]).toFixed(2)) : money(row[1]);
      doc.text(value, tableX + labelW + 5, y + 5.8);
      y += rowH;
    });
    y += 5;
    if (y > 260) {
      doc.addPage();
      y = 18;
    }
    doc.setFillColor(243, 164, 4);
    doc.roundedRect(tableX, y, tableW, 14, 3, 3, "F");
    doc.setTextColor(32, 32, 32);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Estimated Net Salary Payable", tableX + 5, y + 9);
    doc.text(money(r.netPay), tableX + labelW + 5, y + 9);
    y += 24;
    doc.setTextColor(96, 112, 141);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    const noteText =
      "Important: This is a general payroll estimate only. Verify joining date, salary mode, payable days, salary structure, PF/ESIC applicability, TDS, professional tax, company policy and applicable law before official salary processing. " +
      (note || "");
    doc.text(doc.splitTextToSize(noteText, tableW), margin, y);
    doc.text(
      "Generated free at registrationseva.com. Verify all details before official use.",
      margin,
      287
    );
    doc.save("new-joiner-salary-calculation-RegistrationSeva.pdf");
  };

  return (
    <ToolCard>
      <h2 className="text-2xl font-bold text-primary mb-2">
        Calculate New Employee Joining Month Salary
      </h2>
      <p className="text-gray-600 text-sm mb-6">
        Use this tool to estimate salary payable for a new employee using
        full-month fixed salary, joining-date pro-rata calculation or manual
        payable days. Final payroll should be verified with company policy,
        appointment terms, PF/ESIC applicability and applicable law.
      </p>

      <FormSection title="Employee & Joining Details">
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
            <input type="date" className={inputCls} value={joiningDate} onChange={(e) => onJoiningDateChange(e.target.value)} />
          </Field>
          <Field label="Salary Month">
            <input type="month" className={inputCls} value={salaryMonth} onChange={(e) => setSalaryMonth(e.target.value)} />
          </Field>
          <Field label="Salary Calculation Mode">
            <select className={selectCls} value={salaryMode} onChange={(e) => setSalaryMode(e.target.value)}>
              <option value="fullMonth">Full Monthly Salary - Ignore Joining Date / Attendance</option>
              <option value="joiningProRata">Joining Date Pro-rata</option>
              <option value="manualPaidDays">Manual Payable Days</option>
            </select>
          </Field>
          <Field label="Payroll Days Basis">
            <select className={selectCls} value={calculationBasis} onChange={(e) => setCalculationBasis(e.target.value)}>
              <option value="calendar">Calendar Days in Month</option>
              <option value="standard30">Standard 30 Days</option>
              <option value="manual">Manual Payroll Days</option>
            </select>
          </Field>
          <Field label="Manual Payroll Days">
            <input type="number" min={1} step={1} className={inputCls} value={manualDays} onChange={(e) => setManualDays(+e.target.value)} />
          </Field>
          <Field label="Manual Payable Days">
            <input type="number" min={0} step={0.5} className={inputCls} value={manualPaidDays} onChange={(e) => setManualPaidDays(+e.target.value)} />
          </Field>
          <Field label="Optional Unpaid / LOP Days">
            <input type="number" min={0} step={0.5} className={inputCls} value={lopDays} onChange={(e) => setLopDays(+e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Monthly Salary Structure">
        <p className="text-gray-500 text-sm -mt-2 mb-3">
          Use practical private-sector salary components. DA is not shown
          separately. Add any extra allowance using custom fields.
        </p>
        <FieldGrid>
          <Field label="Basic Salary">
            <input type="number" min={0} step={0.01} className={inputCls} value={basicSalary} onChange={(e) => setBasicSalary(+e.target.value)} />
          </Field>
          <Field label="HRA">
            <input type="number" min={0} step={0.01} className={inputCls} value={hra} onChange={(e) => setHra(+e.target.value)} />
          </Field>
          <Field label="Conveyance / Transport Allowance">
            <input type="number" min={0} step={0.01} className={inputCls} value={conveyance} onChange={(e) => setConveyance(+e.target.value)} />
          </Field>
          <Field label="Special Allowance">
            <input type="number" min={0} step={0.01} className={inputCls} value={specialAllowance} onChange={(e) => setSpecialAllowance(+e.target.value)} />
          </Field>
          <Field label="Monthly Gross Salary (Auto)">
            <input type="number" className={inputCls} value={Math.round(gross * 100) / 100} readOnly />
          </Field>
          <Field label="Other Additions / Reimbursements">
            <input type="number" min={0} step={0.01} className={inputCls} value={otherAdditions} onChange={(e) => setOtherAdditions(+e.target.value)} />
          </Field>
        </FieldGrid>
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">
            Custom Allowance Fields
          </h4>
          {allowances.map((al, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_160px_auto] gap-2 items-end mb-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Allowance Name</label>
                <input className={inputCls} value={al.name} onChange={(e) => updateAllowance(i, { name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input type="number" min={0} step={0.01} className={inputCls} value={al.amount} onChange={(e) => updateAllowance(i, { amount: +e.target.value })} />
              </div>
              <button type="button" className={btnDanger} onClick={() => setAllowances((prev) => prev.filter((_, idx) => idx !== i))}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" className={btnSecondary} onClick={() => setAllowances((prev) => [...prev, { name: "Custom Allowance", amount: 0 }])}>
            + Add Custom Allowance
          </button>
        </div>
      </FormSection>

      <FormSection title="PF Settings">
        <FieldGrid>
          <Field label="PF Applicable?">
            <select className={selectCls} value={pfApplicable} onChange={(e) => setPfApplicable(e.target.value)}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </Field>
          <Field label="PF Wage Basis">
            <select className={selectCls} value={pfBasis} onChange={(e) => setPfBasis(e.target.value)}>
              <option value="earnedBasic">Earned Basic Salary</option>
              <option value="cap15000">Cap at INR 15,000</option>
              <option value="manual">Manual PF Wage</option>
            </select>
          </Field>
          <Field label="Manual PF Wage">
            <input type="number" min={0} step={0.01} className={inputCls} value={manualPFWage} onChange={(e) => setManualPFWage(+e.target.value)} />
          </Field>
          <Field label="Employee PF Rate (%)">
            <input type="number" min={0} step={0.01} className={inputCls} value={empPFRate} onChange={(e) => setEmpPFRate(+e.target.value)} />
          </Field>
          <Field label="Employer PF Rate (%)">
            <input type="number" min={0} step={0.01} className={inputCls} value={erPFRate} onChange={(e) => setErPFRate(+e.target.value)} />
          </Field>
          <Field label="Calculate EPS Split?">
            <select className={selectCls} value={epsSplit} onChange={(e) => setEpsSplit(e.target.value)}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="ESIC, TDS & Other Deductions">
        <FieldGrid>
          <Field label="ESIC Applicable?">
            <select className={selectCls} value={esicApplicable} onChange={(e) => setEsicApplicable(e.target.value)}>
              <option value="auto">Auto based on wage ceiling</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </Field>
          <Field label="ESIC Wage Ceiling">
            <select className={selectCls} value={esicCeiling} onChange={(e) => setEsicCeiling(e.target.value)}>
              <option value="21000">INR 21,000 Standard</option>
              <option value="25000">INR 25,000 PwD</option>
              <option value="custom">Custom Ceiling</option>
            </select>
          </Field>
          <Field label="Custom ESIC Ceiling">
            <input type="number" min={0} step={1} className={inputCls} value={customEsicCeiling} onChange={(e) => setCustomEsicCeiling(+e.target.value)} />
          </Field>
          <Field label="TDS Deduction">
            <input type="number" min={0} step={0.01} className={inputCls} value={tdsDeduction} onChange={(e) => setTdsDeduction(+e.target.value)} />
          </Field>
          <Field label="Professional Tax / Other Deduction">
            <input type="number" min={0} step={0.01} className={inputCls} value={otherDeduction} onChange={(e) => setOtherDeduction(+e.target.value)} />
          </Field>
          <Field label="Round Final Amount?">
            <select className={selectCls} value={rounding} onChange={(e) => setRounding(e.target.value)}>
              <option value="yes">Yes, round to nearest rupee</option>
              <option value="no">No, keep decimals</option>
            </select>
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Company Details for PDF">
        <FieldGrid>
          <Field label="Company Name">
            <input className={inputCls} value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </Field>
          <Field label="Prepared By">
            <input className={inputCls} value={preparedBy} onChange={(e) => setPreparedBy(e.target.value)} />
          </Field>
          <Field label="Preparation Date">
            <input type="date" className={inputCls} value={prepDate} onChange={(e) => setPrepDate(e.target.value)} />
          </Field>
          <Field label="Additional Note">
            <input className={inputCls} value={note} onChange={(e) => setNote(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <div className="mb-6 max-w-xl">
        <TotalRow label="Salary Calculation Mode" value={modeLabel} />
        <TotalRow label="Payroll Days Basis" value={String(r.payrollDays)} />
        <TotalRow label="Payable Days Used" value={Number(r.paidDays).toFixed(2)} />
        <TotalRow label="Monthly Gross Salary" value={money(r.gross)} />
        <TotalRow label="Earned Gross Salary" value={money(r.earnedGross)} />
        <TotalRow label="Employee PF" value={money(r.empPF)} />
        <TotalRow label="Employee ESIC" value={money(r.empESIC)} />
        <TotalRow label="Total Employee Deductions" value={money(r.totalDeductions)} />
        <TotalRow label="Estimated Net Salary Payable" value={money(r.netPay)} grand />
        <TotalRow label="Estimated Employer Cost" value={money(r.employerCost)} />
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="button" className={btnPrimary} onClick={downloadPdf}>
          Download PDF
        </button>
        <button type="button" className={btnOutline} onClick={reset}>
          Reset
        </button>
      </div>

      <PreviewBox>
        <div className="max-w-[820px] mx-auto border bg-white p-5 rounded-xl text-sm">
          <h3 className="text-lg font-bold text-primary mb-2">
            New Joiner Salary Calculation Summary
          </h3>
          <p>
            <b>Employee:</b> {empName || "-"} ({empCode || "-"})
            <br />
            <b>Designation:</b> {designation || "-"} · {department || "-"}
            <br />
            <b>Joining Date:</b> {joiningDate || "-"} · <b>Salary Month:</b>{" "}
            {salaryMonth || "-"}
            <br />
            <b>Salary Mode:</b> {modeLabel}
          </p>
          <hr className="my-3" />
          <p>
            <b>Payable Days:</b> {Number(r.paidDays).toFixed(2)} / {r.payrollDays}
            <br />
            <b>Monthly Gross:</b> {money(r.gross)}
            <br />
            <b>Earned Gross:</b> {money(r.earnedGross)}
            <br />
            <b>Total Deductions:</b> {money(r.totalDeductions)}
            <br />
            <b>Estimated Net Salary Payable:</b> {money(r.netPay)}
          </p>
          {customItems.length > 0 && (
            <p className="mt-2 text-gray-600">
              <b>Custom Allowances:</b>{" "}
              {customItems.map((al) => `${al.name}: ${money(al.amount)}`).join(" · ")}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-2">
            PF wage used: {money(r.pfWage)}. ESIC applicable in this
            calculation: {r.esicEligible ? "Yes" : "No"}. {note}
          </p>
        </div>
      </PreviewBox>
    </ToolCard>
  );
}
