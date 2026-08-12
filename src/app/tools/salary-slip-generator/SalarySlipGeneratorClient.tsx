"use client";
import React, { useState } from "react";
import type { jsPDF } from "jspdf";
import {
  ToolCard,
  FormSection,
  FieldGrid,
  Field,
  PreviewBox,
  inputCls,
  textareaCls,
  btnPrimary,
  btnSecondary,
  btnOutline,
  fmtINR,
} from "@/components/tools/fields";

interface SlipData {
  companyName: string;
  companyAddress: string;
  employeeName: string;
  employeeCode: string;
  designation: string;
  department: string;
  salaryMonth: string;
  totalDays: string;
  paidDays: string;
  basic: number;
  hra: number;
  allowance: number;
  bonus: number;
  pf: number;
  esic: number;
  tds: number;
  other: number;
  gross: number;
  ded: number;
  net: number;
}

/* Same layout as the source pdfSlip(), with brand colors. */
function fillSlipPdf(doc: jsPDF, t: SlipData) {
  doc.setFillColor(15, 74, 137);
  doc.rect(40, 40, 515, 55, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text(t.companyName || "Company Name", 55, 70);
  doc.setFontSize(9);
  doc.text(t.companyAddress || "", 55, 88);
  doc.setTextColor(15, 74, 137);
  doc.setFontSize(16);
  doc.text("Salary Slip - " + (t.salaryMonth || ""), 40, 125);
  doc.setFontSize(10);
  doc.setTextColor(40, 40, 40);
  let y = 155;
  (
    [
      ["Employee Name", t.employeeName, "Employee Code", t.employeeCode],
      ["Designation", t.designation, "Department", t.department],
      ["Total Days", t.totalDays, "Paid Days", t.paidDays],
    ] as const
  ).forEach((r) => {
    doc.text(r[0] + ": " + r[1], 50, y);
    doc.text(r[2] + ": " + r[3], 310, y);
    y += 22;
  });
  y += 10;
  doc.setFillColor(243, 164, 4);
  doc.rect(40, y, 250, 24, "F");
  doc.rect(305, y, 250, 24, "F");
  doc.setTextColor(32, 32, 32);
  doc.setFontSize(12);
  doc.text("Earnings", 50, y + 16);
  doc.text("Deductions", 315, y + 16);
  y += 38;
  const e: [string, number][] = [
    ["Basic", t.basic],
    ["HRA", t.hra],
    ["Allowances", t.allowance],
    ["Bonus", t.bonus],
    ["Gross Salary", t.gross],
  ];
  const d: [string, number][] = [
    ["PF", t.pf],
    ["ESIC", t.esic],
    ["TDS", t.tds],
    ["Other", t.other],
    ["Total Deductions", t.ded],
  ];
  doc.setFontSize(10);
  doc.setTextColor(40, 40, 40);
  for (let i = 0; i < e.length; i++) {
    doc.text(e[i][0], 50, y);
    doc.text("Rs. " + fmtINR(e[i][1]), 200, y, { align: "right" });
    doc.text(d[i][0], 315, y);
    doc.text("Rs. " + fmtINR(d[i][1]), 500, y, { align: "right" });
    y += 24;
  }
  y += 14;
  doc.setFillColor(243, 164, 4);
  doc.rect(305, y, 250, 36, "F");
  doc.setFontSize(14);
  doc.setTextColor(32, 32, 32);
  doc.text("Net Salary: Rs. " + fmtINR(t.net), 500, y + 23, { align: "right" });
  doc.setFontSize(9);
  doc.setTextColor(96, 112, 141);
  doc.text(
    "Generated free at registrationseva.com. Verify all details before official use.",
    40,
    760
  );
}

const CSV_HEADERS = [
  "Company Name",
  "Company Address",
  "Employee Name",
  "Employee Code",
  "Designation",
  "Department",
  "Salary Month",
  "Total Days",
  "Paid Days",
  "Basic",
  "HRA",
  "Allowances",
  "Bonus",
  "PF",
  "ESIC",
  "TDS",
  "Other Deduction",
];

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          cur += '"';
          i++;
        } else inQuotes = false;
      } else cur += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") {
      row.push(cur);
      cur = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cur);
      cur = "";
      if (row.some((v) => v.trim() !== "")) rows.push(row);
      row = [];
    } else cur += c;
  }
  row.push(cur);
  if (row.some((v) => v.trim() !== "")) rows.push(row);
  return rows;
}

export default function SalarySlipGeneratorClient() {
  const [tab, setTab] = useState<"single" | "bulk">("single");
  const [companyName, setCompanyName] = useState("Demo Private Limited");
  const [companyContact, setCompanyContact] = useState("info@example.com");
  const [companyAddress, setCompanyAddress] = useState("New Delhi, India");
  const [employeeName, setEmployeeName] = useState("Amit Sharma");
  const [employeeCode, setEmployeeCode] = useState("EMP001");
  const [designation, setDesignation] = useState("Executive");
  const [department, setDepartment] = useState("Accounts");
  const [salaryMonth, setSalaryMonth] = useState("June 2026");
  const [totalDays, setTotalDays] = useState("30");
  const [paidDays, setPaidDays] = useState("30");
  const [basic, setBasic] = useState(25000);
  const [hra, setHra] = useState(10000);
  const [allowance, setAllowance] = useState(5000);
  const [bonus, setBonus] = useState(0);
  const [pf, setPf] = useState(1800);
  const [esic, setEsic] = useState(0);
  const [tds, setTds] = useState(500);
  const [other, setOther] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [bulkFile, setBulkFile] = useState<File | null>(null);

  const gross = (basic || 0) + (hra || 0) + (allowance || 0) + (bonus || 0);
  const ded = (pf || 0) + (esic || 0) + (tds || 0) + (other || 0);
  const net = gross - ded;

  const slipData: SlipData = {
    companyName,
    companyAddress,
    employeeName,
    employeeCode,
    designation,
    department,
    salaryMonth,
    totalDays,
    paidDays,
    basic: basic || 0,
    hra: hra || 0,
    allowance: allowance || 0,
    bonus: bonus || 0,
    pf: pf || 0,
    esic: esic || 0,
    tds: tds || 0,
    other: other || 0,
    gross,
    ded,
    net,
  };

  const reset = () => {
    setCompanyName("");
    setCompanyContact("");
    setCompanyAddress("");
    setEmployeeName("");
    setEmployeeCode("");
    setDesignation("");
    setDepartment("");
    setSalaryMonth("");
    setTotalDays("");
    setPaidDays("");
    setBasic(0);
    setHra(0);
    setAllowance(0);
    setBonus(0);
    setPf(0);
    setEsic(0);
    setTds(0);
    setOther(0);
    setShowPreview(false);
  };

  const downloadPdf = async () => {
    setShowPreview(true);
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF("p", "pt", "a4");
    fillSlipPdf(doc, slipData);
    doc.save(`Salary-Slip-${employeeName || "Employee"}.pdf`);
  };

  const downloadTemplate = () => {
    const sample = [
      "Demo Pvt Ltd",
      "New Delhi",
      "Amit Sharma",
      "EMP001",
      "Executive",
      "Accounts",
      "June 2026",
      "30",
      "30",
      "25000",
      "10000",
      "5000",
      "0",
      "1800",
      "0",
      "500",
      "0",
    ];
    const csv = CSV_HEADERS.join(",") + "\n" + sample.join(",");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "salary-slip-bulk-template.csv";
    a.click();
  };

  const generateBulk = async () => {
    if (!bulkFile) {
      alert("Upload filled CSV file.");
      return;
    }
    const rows = parseCsv(await bulkFile.text());
    if (rows.length < 2) {
      alert("No employee rows found in the CSV file.");
      return;
    }
    const header = rows[0].map((h) => h.trim());
    const { jsPDF } = await import("jspdf");
    for (let i = 1; i < rows.length; i++) {
      const cell = (name: string) => rows[i][header.indexOf(name)] || "";
      const num = (name: string) => +cell(name) || 0;
      const row: SlipData = {
        companyName: cell("Company Name"),
        companyAddress: cell("Company Address"),
        employeeName: cell("Employee Name"),
        employeeCode: cell("Employee Code"),
        designation: cell("Designation"),
        department: cell("Department"),
        salaryMonth: cell("Salary Month"),
        totalDays: cell("Total Days"),
        paidDays: cell("Paid Days"),
        basic: num("Basic"),
        hra: num("HRA"),
        allowance: num("Allowances"),
        bonus: num("Bonus"),
        pf: num("PF"),
        esic: num("ESIC"),
        tds: num("TDS"),
        other: num("Other Deduction"),
        gross: 0,
        ded: 0,
        net: 0,
      };
      row.gross = row.basic + row.hra + row.allowance + row.bonus;
      row.ded = row.pf + row.esic + row.tds + row.other;
      row.net = row.gross - row.ded;
      const doc = new jsPDF("p", "pt", "a4");
      fillSlipPdf(doc, row);
      doc.save(`Salary-Slip-${row.employeeName || i}.pdf`);
      // ponytail: sequential saves instead of ZIP (jszip not installed); stagger so the browser allows every download
      await new Promise((res) => setTimeout(res, 400));
    }
  };

  return (
    <ToolCard>
      <h2 className="text-2xl font-bold text-primary mb-2">Generate Salary Slip</h2>
      <p className="text-gray-600 text-sm mb-6">
        Fill employee, salary and attendance details. For bulk slips, download
        the CSV template and upload it back.
      </p>

      <div className="flex gap-2 mb-6">
        <button type="button" className={tab === "single" ? btnPrimary : btnOutline} onClick={() => setTab("single")}>
          Single Salary Slip
        </button>
        <button type="button" className={tab === "bulk" ? btnPrimary : btnOutline} onClick={() => setTab("bulk")}>
          Bulk Salary Slips
        </button>
      </div>

      {tab === "single" ? (
        <>
          <FormSection title="Company Details">
            <FieldGrid>
              <Field label="Company Name">
                <input className={inputCls} value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
              </Field>
              <Field label="Phone / Email">
                <input className={inputCls} value={companyContact} onChange={(e) => setCompanyContact(e.target.value)} />
              </Field>
              <Field label="Company Address" full>
                <textarea className={textareaCls} value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} />
              </Field>
            </FieldGrid>
          </FormSection>

          <FormSection title="Employee Details">
            <FieldGrid>
              <Field label="Employee Name">
                <input className={inputCls} value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} />
              </Field>
              <Field label="Employee Code">
                <input className={inputCls} value={employeeCode} onChange={(e) => setEmployeeCode(e.target.value)} />
              </Field>
              <Field label="Designation">
                <input className={inputCls} value={designation} onChange={(e) => setDesignation(e.target.value)} />
              </Field>
              <Field label="Department">
                <input className={inputCls} value={department} onChange={(e) => setDepartment(e.target.value)} />
              </Field>
              <Field label="Salary Month">
                <input className={inputCls} value={salaryMonth} onChange={(e) => setSalaryMonth(e.target.value)} />
              </Field>
              <Field label="Total Days">
                <input type="number" className={inputCls} value={totalDays} onChange={(e) => setTotalDays(e.target.value)} />
              </Field>
              <Field label="Paid Days">
                <input type="number" className={inputCls} value={paidDays} onChange={(e) => setPaidDays(e.target.value)} />
              </Field>
            </FieldGrid>
          </FormSection>

          <FormSection title="Earnings & Deductions">
            <FieldGrid>
              <Field label="Basic Salary">
                <input type="number" className={inputCls} value={basic} onChange={(e) => setBasic(+e.target.value)} />
              </Field>
              <Field label="HRA">
                <input type="number" className={inputCls} value={hra} onChange={(e) => setHra(+e.target.value)} />
              </Field>
              <Field label="Allowances">
                <input type="number" className={inputCls} value={allowance} onChange={(e) => setAllowance(+e.target.value)} />
              </Field>
              <Field label="Bonus / Incentive">
                <input type="number" className={inputCls} value={bonus} onChange={(e) => setBonus(+e.target.value)} />
              </Field>
              <Field label="PF Deduction">
                <input type="number" className={inputCls} value={pf} onChange={(e) => setPf(+e.target.value)} />
              </Field>
              <Field label="ESIC Deduction">
                <input type="number" className={inputCls} value={esic} onChange={(e) => setEsic(+e.target.value)} />
              </Field>
              <Field label="TDS Deduction">
                <input type="number" className={inputCls} value={tds} onChange={(e) => setTds(+e.target.value)} />
              </Field>
              <Field label="Other Deduction">
                <input type="number" className={inputCls} value={other} onChange={(e) => setOther(+e.target.value)} />
              </Field>
            </FieldGrid>
          </FormSection>

          <div className="flex flex-wrap gap-3">
            <button type="button" className={btnPrimary} onClick={() => setShowPreview(true)}>
              Calculate & Preview
            </button>
            <button type="button" className={btnSecondary} onClick={downloadPdf}>
              Download PDF
            </button>
            <button type="button" className={btnOutline} onClick={reset}>
              Reset
            </button>
          </div>

          <PreviewBox>
            {showPreview ? (
              <div className="max-w-[760px] mx-auto border bg-white p-5 text-sm">
                <h2 className="text-center text-xl font-bold text-primary">
                  {companyName || "Company Name"}
                </h2>
                <p className="text-center text-gray-600">
                  {companyAddress || "Company Address"}
                </p>
                <h3 className="text-center bg-primary/5 text-primary font-semibold p-2 rounded-lg mt-2">
                  Salary Slip - {salaryMonth || "Month"}
                </h3>
                <table className="w-full mt-3">
                  <tbody>
                    <tr>
                      <td className="py-1"><b>Employee:</b> {employeeName}</td>
                      <td className="py-1"><b>Code:</b> {employeeCode}</td>
                    </tr>
                    <tr>
                      <td className="py-1"><b>Designation:</b> {designation}</td>
                      <td className="py-1"><b>Department:</b> {department}</td>
                    </tr>
                    <tr>
                      <td className="py-1"><b>Total Days:</b> {totalDays}</td>
                      <td className="py-1"><b>Paid Days:</b> {paidDays}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-primary/5 text-primary">
                        <th colSpan={2} className="p-1">Earnings</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="py-1">Basic</td><td className="py-1 text-right">₹{fmtINR(basic)}</td></tr>
                      <tr><td className="py-1">HRA</td><td className="py-1 text-right">₹{fmtINR(hra)}</td></tr>
                      <tr><td className="py-1">Allowances</td><td className="py-1 text-right">₹{fmtINR(allowance)}</td></tr>
                      <tr><td className="py-1">Bonus</td><td className="py-1 text-right">₹{fmtINR(bonus)}</td></tr>
                      <tr><td className="py-1"><b>Gross</b></td><td className="py-1 text-right"><b>₹{fmtINR(gross)}</b></td></tr>
                    </tbody>
                  </table>
                  <table className="w-full">
                    <thead>
                      <tr className="bg-primary/5 text-primary">
                        <th colSpan={2} className="p-1">Deductions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="py-1">PF</td><td className="py-1 text-right">₹{fmtINR(pf)}</td></tr>
                      <tr><td className="py-1">ESIC</td><td className="py-1 text-right">₹{fmtINR(esic)}</td></tr>
                      <tr><td className="py-1">TDS</td><td className="py-1 text-right">₹{fmtINR(tds)}</td></tr>
                      <tr><td className="py-1">Other</td><td className="py-1 text-right">₹{fmtINR(other)}</td></tr>
                      <tr><td className="py-1"><b>Total</b></td><td className="py-1 text-right"><b>₹{fmtINR(ded)}</b></td></tr>
                    </tbody>
                  </table>
                </div>
                <h2 className="text-right text-lg font-bold text-primary mt-3">
                  Net Salary: ₹{fmtINR(net)}
                </h2>
                <p className="text-center text-xs text-gray-500 mt-2">
                  This is a system generated salary slip.
                </p>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Preview will appear here.</p>
            )}
          </PreviewBox>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-primary mb-1">1. Download Template</h3>
            <p className="text-gray-600 text-sm mb-3">Download the CSV template.</p>
            <button type="button" className={btnPrimary} onClick={downloadTemplate}>
              Download Template
            </button>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-primary mb-1">2. Upload Filled CSV</h3>
            <p className="text-gray-600 text-sm mb-3">Fill one row per employee.</p>
            <input
              type="file"
              accept=".csv"
              className="text-sm"
              onChange={(e) => setBulkFile(e.target.files?.[0] || null)}
            />
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-primary mb-1">3. Generate PDFs</h3>
            <p className="text-gray-600 text-sm mb-3">One salary slip PDF per employee.</p>
            <button type="button" className={btnSecondary} onClick={generateBulk}>
              Generate PDFs
            </button>
          </div>
        </div>
      )}
    </ToolCard>
  );
}
