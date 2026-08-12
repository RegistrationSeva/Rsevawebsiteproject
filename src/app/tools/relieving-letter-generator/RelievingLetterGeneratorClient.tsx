"use client";
import React, { useEffect, useState } from "react";
import {
  ToolCard,
  FormSection,
  FieldGrid,
  Field,
  PreviewBox,
  inputCls,
  selectCls,
  textareaCls,
  btnPrimary,
  btnOutline,
} from "@/components/tools/fields";

const todayISO = () => new Date().toISOString().slice(0, 10);
const minusDaysISO = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
};
const fmtDate = (v: string) => {
  if (!v) return "";
  return new Date(v + "T00:00:00").toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const defaultAppreciation =
  "We appreciate the services rendered during the tenure with the Company and wish the employee success in future endeavours.";
const defaultAdditional =
  "This relieving letter is issued on the basis of company records and completion of applicable exit formalities.";

export default function RelievingLetterGeneratorClient() {
  const [companyName, setCompanyName] = useState("Registration Seva Business Solutions");
  const [companyEmail, setCompanyEmail] = useState("hr@example.com");
  const [companyAddress, setCompanyAddress] = useState("New Delhi, India");
  const [issueDate, setIssueDate] = useState("");
  const [employeeName, setEmployeeName] = useState("Rahul Sharma");
  const [employeeCode, setEmployeeCode] = useState("EMP001");
  const [designation, setDesignation] = useState("Accounts Executive");
  const [department, setDepartment] = useState("Accounts");
  const [employmentType, setEmploymentType] = useState("Full Time");
  const [workLocation, setWorkLocation] = useState("Delhi");
  const [joiningDate, setJoiningDate] = useState("");
  const [resignationDate, setResignationDate] = useState("");
  const [lastWorkingDate, setLastWorkingDate] = useState("");
  const [noticeStatus, setNoticeStatus] = useState("served the required notice period");
  const [handoverStatus, setHandoverStatus] = useState("completed the required handover formalities");
  const [settlementNote, setSettlementNote] = useState(
    "Full and final settlement, if any, shall be processed as per company policy."
  );
  const [appreciationNote, setAppreciationNote] = useState(defaultAppreciation);
  const [additionalNote, setAdditionalNote] = useState(defaultAdditional);
  const [signatoryName, setSignatoryName] = useState("Authorized Signatory");
  const [signatoryDesignation, setSignatoryDesignation] = useState("HR / Management");

  useEffect(() => {
    setIssueDate(todayISO());
    setJoiningDate(minusDaysISO(720));
    setResignationDate(minusDaysISO(30));
    setLastWorkingDate(todayISO());
  }, []);

  const issueDateF = fmtDate(issueDate);
  const joiningDateF = fmtDate(joiningDate);
  const resignationDateF = fmtDate(resignationDate);
  const lastWorkingDateF = fmtDate(lastWorkingDate);

  const reset = () => {
    setCompanyName("Registration Seva Business Solutions");
    setCompanyEmail("hr@example.com");
    setCompanyAddress("New Delhi, India");
    setIssueDate(todayISO());
    setEmployeeName("Rahul Sharma");
    setEmployeeCode("EMP001");
    setDesignation("Accounts Executive");
    setDepartment("Accounts");
    setEmploymentType("Full Time");
    setWorkLocation("Delhi");
    setJoiningDate(minusDaysISO(720));
    setResignationDate(minusDaysISO(30));
    setLastWorkingDate(todayISO());
    setNoticeStatus("served the required notice period");
    setHandoverStatus("completed the required handover formalities");
    setSettlementNote("Full and final settlement, if any, shall be processed as per company policy.");
    setAppreciationNote(defaultAppreciation);
    setAdditionalNote(defaultAdditional);
    setSignatoryName("Authorized Signatory");
    setSignatoryDesignation("HR / Management");
  };

  const downloadPdf = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const m = 16;
    const w = 178;
    let y = 18;
    const addWrapped = (text: string, x: number, yy: number, ww: number, lineH: number) => {
      const lines = doc.splitTextToSize(text, ww);
      doc.text(lines, x, yy);
      return yy + lines.length * lineH;
    };
    doc.setFillColor(15, 74, 137);
    doc.roundedRect(m, y, w, 24, 3, 3, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(companyName || "Company Name", m + 6, y + 9);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(
      doc.splitTextToSize((companyAddress || "") + (companyEmail ? " | " + companyEmail : ""), w - 12),
      m + 6,
      y + 16
    );
    y += 34;
    doc.setTextColor(40, 40, 40);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Date: " + issueDateF, m, y);
    y += 13;
    doc.setTextColor(15, 74, 137);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text("Relieving Letter", 105, y, { align: "center" });
    doc.setFillColor(243, 164, 4);
    doc.rect(90, y + 2, 30, 1.2, "F");
    y += 12;
    doc.setTextColor(40, 40, 40);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    y = addWrapped("To Whomsoever It May Concern,", m, y, w, 5);
    y += 4;
    const p1 = `This is to confirm that ${employeeName || "Employee Name"}${employeeCode ? " (Employee Code: " + employeeCode + ")" : ""} was employed with ${companyName || "the Company"} as ${designation || "Designation"}${department ? " in the " + department + " department" : ""}. The employee was associated with the Company from ${joiningDateF || "date of joining"} to ${lastWorkingDateF || "last working date"}.`;
    y = addWrapped(p1, m, y, w, 5);
    y += 4;
    const p2 = `The employee submitted resignation on ${resignationDateF || "resignation date"} and ${noticeStatus || "was relieved as per company policy"}. The employee has been relieved from the services of the Company with effect from the close of business hours on ${lastWorkingDateF || "last working date"}.`;
    y = addWrapped(p2, m, y, w, 5);
    y += 6;
    const rows: [string, string][] = [
      ["Employee Name", employeeName],
      ["Designation", designation],
      ["Department", department],
      ["Last Working Date", lastWorkingDateF],
      ["Handover Status", handoverStatus],
    ];
    doc.setDrawColor(217, 230, 251);
    rows.forEach((r, i) => {
      doc.setFillColor(i % 2 ? 255 : 247, i % 2 ? 255 : 251, i % 2 ? 255 : 255);
      doc.rect(m, y, w, 10, "FD");
      doc.setFont("helvetica", "bold");
      doc.text(r[0], m + 4, y + 6.7);
      doc.setFont("helvetica", "normal");
      doc.text(doc.splitTextToSize(r[1] || "", 105), m + 62, y + 6.7);
      y += 10;
    });
    y += 6;
    y = addWrapped(settlementNote || "", m, y, w, 5);
    y += 4;
    y = addWrapped(appreciationNote || "", m, y, w, 5);
    y += 4;
    y = addWrapped(additionalNote || "", m, y, w, 5);
    y += 12;
    doc.setFont("helvetica", "bold");
    doc.text("For " + (companyName || "Company Name"), m, y);
    y += 18;
    doc.text(signatoryName || "Authorized Signatory", m, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.text(signatoryDesignation || "", m, y);
    y = 277;
    doc.setDrawColor(217, 230, 251);
    doc.line(m, y, w + m, y);
    y += 6;
    doc.setTextColor(96, 112, 141);
    doc.setFontSize(9);
    doc.text("Generated free at registrationseva.com. Verify all details before official use.", m, y);
    doc.save("relieving-letter-RegistrationSeva.pdf");
  };

  return (
    <ToolCard>
      <h2 className="text-2xl font-bold text-primary mb-2">Create Relieving Letter</h2>
      <p className="text-gray-600 text-sm mb-6">
        Fill the details below, review the preview and download a professional
        relieving letter PDF.
      </p>

      <FormSection title="Company Details">
        <FieldGrid>
          <Field label="Company Name">
            <input className={inputCls} value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </Field>
          <Field label="Company Email">
            <input className={inputCls} value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} />
          </Field>
          <Field label="Company Address">
            <input className={inputCls} value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} />
          </Field>
          <Field label="Issue Date">
            <input type="date" className={inputCls} value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Employee Details">
        <FieldGrid>
          <Field label="Employee Name">
            <input className={inputCls} value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} />
          </Field>
          <Field label="Employee ID / Code">
            <input className={inputCls} value={employeeCode} onChange={(e) => setEmployeeCode(e.target.value)} />
          </Field>
          <Field label="Designation">
            <input className={inputCls} value={designation} onChange={(e) => setDesignation(e.target.value)} />
          </Field>
          <Field label="Department">
            <input className={inputCls} value={department} onChange={(e) => setDepartment(e.target.value)} />
          </Field>
          <Field label="Employment Type">
            <select className={selectCls} value={employmentType} onChange={(e) => setEmploymentType(e.target.value)}>
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Contractual</option>
              <option>Internship</option>
            </select>
          </Field>
          <Field label="Work Location">
            <input className={inputCls} value={workLocation} onChange={(e) => setWorkLocation(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Relieving Details">
        <FieldGrid>
          <Field label="Date of Joining">
            <input type="date" className={inputCls} value={joiningDate} onChange={(e) => setJoiningDate(e.target.value)} />
          </Field>
          <Field label="Resignation Date">
            <input type="date" className={inputCls} value={resignationDate} onChange={(e) => setResignationDate(e.target.value)} />
          </Field>
          <Field label="Last Working Date">
            <input type="date" className={inputCls} value={lastWorkingDate} onChange={(e) => setLastWorkingDate(e.target.value)} />
          </Field>
          <Field label="Notice Period Status">
            <select className={selectCls} value={noticeStatus} onChange={(e) => setNoticeStatus(e.target.value)}>
              <option>served the required notice period</option>
              <option>was relieved as per management approval</option>
              <option>was relieved after notice pay adjustment, if applicable</option>
              <option>completed the agreed assignment / contract period</option>
            </select>
          </Field>
          <Field label="Handover Status">
            <select className={selectCls} value={handoverStatus} onChange={(e) => setHandoverStatus(e.target.value)}>
              <option>completed the required handover formalities</option>
              <option>submitted the assigned company property and completed handover</option>
              <option>completed handover as per department confirmation</option>
              <option>completed applicable exit formalities</option>
            </select>
          </Field>
          <Field label="Final Settlement Note">
            <select className={selectCls} value={settlementNote} onChange={(e) => setSettlementNote(e.target.value)}>
              <option>Full and final settlement, if any, shall be processed as per company policy.</option>
              <option>Full and final settlement has been processed as per company records.</option>
              <option>No dues confirmation shall be subject to company records and applicable policy.</option>
              <option>Any pending dues, if applicable, shall be adjusted as per company policy.</option>
            </select>
          </Field>
          <Field label="Appreciation / Conduct Note" full>
            <textarea rows={4} className={textareaCls} value={appreciationNote} onChange={(e) => setAppreciationNote(e.target.value)} />
          </Field>
          <Field label="Additional Note" full>
            <textarea rows={4} className={textareaCls} value={additionalNote} onChange={(e) => setAdditionalNote(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Signatory Details">
        <FieldGrid>
          <Field label="Signatory Name">
            <input className={inputCls} value={signatoryName} onChange={(e) => setSignatoryName(e.target.value)} />
          </Field>
          <Field label="Signatory Designation">
            <input className={inputCls} value={signatoryDesignation} onChange={(e) => setSignatoryDesignation(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <div className="flex flex-wrap gap-3">
        <button type="button" className={btnPrimary} onClick={downloadPdf}>
          Download Relieving Letter PDF
        </button>
        <button type="button" className={btnOutline} onClick={reset}>
          Reset
        </button>
      </div>

      <PreviewBox>
        <div className="max-w-[820px] mx-auto border bg-white p-6 text-sm">
          <div className="border-b-[3px] border-primary pb-3 mb-5">
            <h3 className="text-lg font-bold text-primary">{companyName || "Company Name"}</h3>
            <p className="text-gray-600">
              {companyAddress}
              {companyEmail ? ` · ${companyEmail}` : ""}
            </p>
          </div>
          <p>
            <b>Date:</b> {issueDateF}
          </p>
          <h3 className="text-center text-lg font-bold text-primary my-5">Relieving Letter</h3>
          <p>To Whomsoever It May Concern,</p>
          <p className="mt-2">
            This is to confirm that <b>{employeeName || "Employee Name"}</b>
            {employeeCode ? ` (Employee Code: ${employeeCode})` : ""} was employed with{" "}
            <b>{companyName || "the Company"}</b> as <b>{designation || "Designation"}</b>
            {department ? ` in the ${department} department` : ""}. The employee was associated with the
            Company from <b>{joiningDateF || "date of joining"}</b> to{" "}
            <b>{lastWorkingDateF || "last working date"}</b>.
          </p>
          <p className="mt-2">
            The employee submitted resignation on <b>{resignationDateF || "resignation date"}</b> and{" "}
            {noticeStatus || "was relieved as per company policy"}. The employee has been relieved from the
            services of the Company with effect from the close of business hours on{" "}
            <b>{lastWorkingDateF || "last working date"}</b>.
          </p>
          <table className="w-full border-collapse my-4">
            <tbody>
              {[
                ["Employee Name", employeeName],
                ["Designation", designation],
                ["Department", department],
                ["Last Working Date", lastWorkingDateF],
                ["Handover Status", handoverStatus],
              ].map(([k, v]) => (
                <tr key={k}>
                  <td className="border p-2 font-semibold w-1/3">{k}</td>
                  <td className="border p-2">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>{settlementNote}</p>
          <p className="mt-2">{appreciationNote}</p>
          <p className="mt-2">{additionalNote}</p>
          <div className="mt-8">
            <p>
              <b>For {companyName || "Company Name"}</b>
            </p>
            <br />
            <p>
              <b>{signatoryName || "Authorized Signatory"}</b>
              <br />
              {signatoryDesignation}
            </p>
          </div>
          <hr className="my-5" />
          <p className="text-xs text-gray-500">
            Generated using Registration Seva Relieving Letter Generator. Review and customize before
            official use.
          </p>
        </div>
      </PreviewBox>
    </ToolCard>
  );
}
