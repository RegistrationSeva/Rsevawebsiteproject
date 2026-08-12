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
const plusDaysISO = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
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
const money = (n: string | number) =>
  "INR " +
  Number(n || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

const defaultTerms =
  "Your employment shall be governed by the policies, rules and procedures of the Company as amended from time to time. You are expected to maintain confidentiality of company information, client data, business records and internal processes. The Company may assign duties and responsibilities based on business requirements.";

export default function AppointmentLetterGeneratorClient() {
  const [companyName, setCompanyName] = useState("Registration Seva Business Solutions");
  const [companyEmail, setCompanyEmail] = useState("hr@example.com");
  const [companyAddress, setCompanyAddress] = useState("New Delhi, India");
  const [issueDate, setIssueDate] = useState("");
  const [employeeName, setEmployeeName] = useState("Rahul Sharma");
  const [employeeAddress, setEmployeeAddress] = useState("Delhi, India");
  const [employeeEmail, setEmployeeEmail] = useState("employee@example.com");
  const [employeeCode, setEmployeeCode] = useState("EMP001");
  const [designation, setDesignation] = useState("Accounts Executive");
  const [department, setDepartment] = useState("Accounts");
  const [employmentType, setEmploymentType] = useState("Full Time");
  const [workLocation, setWorkLocation] = useState("Office / Delhi");
  const [joiningDate, setJoiningDate] = useState("");
  const [reportingManager, setReportingManager] = useState("HR Manager");
  const [ctc, setCtc] = useState("300000");
  const [salaryPeriod, setSalaryPeriod] = useState("Per Annum");
  const [probation, setProbation] = useState("6 months");
  const [noticePeriod, setNoticePeriod] = useState("30 days after confirmation");
  const [workingHours, setWorkingHours] = useState("As per company policy");
  const [leavePolicy, setLeavePolicy] = useState("As per company policy");
  const [signatoryName, setSignatoryName] = useState("Authorized Signatory");
  const [signatoryDesignation, setSignatoryDesignation] = useState("HR / Management");
  const [additionalTerms, setAdditionalTerms] = useState(defaultTerms);

  useEffect(() => {
    setIssueDate(todayISO());
    setJoiningDate(plusDaysISO(15));
  }, []);

  const issueDateF = fmtDate(issueDate);
  const joiningDateF = fmtDate(joiningDate);
  const ctcF = money(ctc);

  const reset = () => {
    setCompanyName("Registration Seva Business Solutions");
    setCompanyEmail("hr@example.com");
    setCompanyAddress("New Delhi, India");
    setIssueDate(todayISO());
    setEmployeeName("Rahul Sharma");
    setEmployeeAddress("Delhi, India");
    setEmployeeEmail("employee@example.com");
    setEmployeeCode("EMP001");
    setDesignation("Accounts Executive");
    setDepartment("Accounts");
    setEmploymentType("Full Time");
    setWorkLocation("Office / Delhi");
    setJoiningDate(plusDaysISO(15));
    setReportingManager("HR Manager");
    setCtc("300000");
    setSalaryPeriod("Per Annum");
    setProbation("6 months");
    setNoticePeriod("30 days after confirmation");
    setWorkingHours("As per company policy");
    setLeavePolicy("As per company policy");
    setSignatoryName("Authorized Signatory");
    setSignatoryDesignation("HR / Management");
    setAdditionalTerms(defaultTerms);
  };

  const downloadPdf = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const m = 16;
    const w = 178;
    let y = 18;
    const addPageIfNeeded = (yy: number) => {
      if (yy > 270) {
        doc.addPage();
        return 18;
      }
      return yy;
    };
    const addWrapped = (text: string, x: number, yy: number, ww: number, lineH: number) => {
      const lines: string[] = doc.splitTextToSize(text, ww);
      for (const line of lines) {
        yy = addPageIfNeeded(yy);
        doc.text(line, x, yy);
        yy += lineH;
      }
      return yy;
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
    y += 10;
    doc.text("To,", m, y);
    y += 6;
    doc.setFont("helvetica", "bold");
    doc.text(employeeName || "Employee Name", m, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    if (employeeAddress) {
      y = addWrapped(employeeAddress, m, y, w, 5);
      y += 1;
    }
    if (employeeEmail) {
      doc.text(employeeEmail, m, y);
      y += 8;
    }
    doc.setTextColor(15, 74, 137);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text("Appointment Letter", 105, y, { align: "center" });
    doc.setFillColor(243, 164, 4);
    doc.rect(90, y + 2, 30, 1.2, "F");
    y += 11;
    doc.setTextColor(40, 40, 40);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    y = addWrapped("Dear " + (employeeName || "Employee") + ",", m, y, w, 5);
    y += 3;
    const p1 = `With reference to your acceptance of our offer, we are pleased to appoint you as ${designation || "Designation"}${department ? " in the " + department + " department" : ""} at ${companyName || "the Company"}. Your employment type will be ${employmentType}, and your date of joining will be ${joiningDateF || "to be confirmed"}.`;
    y = addWrapped(p1, m, y, w, 5);
    y += 5;
    const rows: [string, string][] = [
      ["Employee Code", employeeCode],
      ["Designation", designation],
      ["Salary / CTC", ctcF + " " + salaryPeriod],
      ["Probation Period", probation],
      ["Notice Period", noticePeriod],
      ["Working Hours", workingHours],
      ["Leave / Weekly Off", leavePolicy],
    ];
    doc.setDrawColor(217, 230, 251);
    rows.forEach((r, i) => {
      y = addPageIfNeeded(y);
      doc.setFillColor(i % 2 ? 255 : 247, i % 2 ? 255 : 251, i % 2 ? 255 : 255);
      doc.rect(m, y, w, 10, "FD");
      doc.setFont("helvetica", "bold");
      doc.text(r[0], m + 4, y + 6.7);
      doc.setFont("helvetica", "normal");
      doc.text(doc.splitTextToSize(r[1] || "", 105), m + 62, y + 6.7);
      y += 10;
    });
    y += 6;
    y = addWrapped(
      `You will be posted at ${workLocation || "the assigned work location"} and will report to ${reportingManager || "the reporting manager"} or any other person designated by the Company.`,
      m,
      y,
      w,
      5
    );
    y += 4;
    y = addWrapped(additionalTerms || "", m, y, w, 5);
    y += 4;
    y = addWrapped(
      "Please sign and return a copy of this appointment letter as confirmation of your acceptance of the above terms.",
      m,
      y,
      w,
      5
    );
    y += 12;
    y = addPageIfNeeded(y + 35);
    doc.setFont("helvetica", "bold");
    doc.text("For " + (companyName || "Company Name"), m, y);
    doc.text("Accepted by Employee", 118, y);
    y += 18;
    doc.text(signatoryName || "Authorized Signatory", m, y);
    doc.setFont("helvetica", "normal");
    doc.text("Signature: __________________", 118, y);
    y += 5;
    doc.text(signatoryDesignation || "", m, y);
    y = 277;
    doc.setDrawColor(217, 230, 251);
    doc.line(m, y, w + m, y);
    y += 6;
    doc.setTextColor(96, 112, 141);
    doc.setFontSize(9);
    doc.text("Generated free at registrationseva.com. Verify all details before official use.", m, y);
    doc.save("appointment-letter-RegistrationSeva.pdf");
  };

  return (
    <ToolCard>
      <h2 className="text-2xl font-bold text-primary mb-2">Create Appointment Letter</h2>
      <p className="text-gray-600 text-sm mb-6">
        Fill the details below, review the preview and download a professional
        appointment letter PDF.
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
          <Field label="Employee Address">
            <input className={inputCls} value={employeeAddress} onChange={(e) => setEmployeeAddress(e.target.value)} />
          </Field>
          <Field label="Email / Contact">
            <input className={inputCls} value={employeeEmail} onChange={(e) => setEmployeeEmail(e.target.value)} />
          </Field>
          <Field label="Employee ID / Code">
            <input className={inputCls} value={employeeCode} onChange={(e) => setEmployeeCode(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Job Details">
        <FieldGrid>
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
          <Field label="Date of Joining">
            <input type="date" className={inputCls} value={joiningDate} onChange={(e) => setJoiningDate(e.target.value)} />
          </Field>
          <Field label="Reporting Manager">
            <input className={inputCls} value={reportingManager} onChange={(e) => setReportingManager(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Salary and Employment Terms">
        <FieldGrid>
          <Field label="Salary / CTC Amount">
            <input type="number" min={0} step={1} className={inputCls} value={ctc} onChange={(e) => setCtc(e.target.value)} />
          </Field>
          <Field label="Salary Period">
            <select className={selectCls} value={salaryPeriod} onChange={(e) => setSalaryPeriod(e.target.value)}>
              <option>Per Annum</option>
              <option>Per Month</option>
            </select>
          </Field>
          <Field label="Probation Period">
            <input className={inputCls} value={probation} onChange={(e) => setProbation(e.target.value)} />
          </Field>
          <Field label="Notice Period">
            <input className={inputCls} value={noticePeriod} onChange={(e) => setNoticePeriod(e.target.value)} />
          </Field>
          <Field label="Working Hours">
            <input className={inputCls} value={workingHours} onChange={(e) => setWorkingHours(e.target.value)} />
          </Field>
          <Field label="Weekly Off / Leave">
            <input className={inputCls} value={leavePolicy} onChange={(e) => setLeavePolicy(e.target.value)} />
          </Field>
          <Field label="Signatory Name">
            <input className={inputCls} value={signatoryName} onChange={(e) => setSignatoryName(e.target.value)} />
          </Field>
          <Field label="Signatory Designation">
            <input className={inputCls} value={signatoryDesignation} onChange={(e) => setSignatoryDesignation(e.target.value)} />
          </Field>
          <Field label="Additional Terms / Notes" full>
            <textarea rows={6} className={textareaCls} value={additionalTerms} onChange={(e) => setAdditionalTerms(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <div className="flex flex-wrap gap-3">
        <button type="button" className={btnPrimary} onClick={downloadPdf}>
          Download Appointment Letter PDF
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
          <p className="mt-2">
            <b>To,</b>
            <br />
            {employeeName || "Employee Name"}
            <br />
            {employeeAddress}
            {employeeEmail ? (
              <>
                <br />
                {employeeEmail}
              </>
            ) : null}
          </p>
          <h3 className="text-center text-lg font-bold text-primary my-5">Appointment Letter</h3>
          <p>Dear {employeeName || "Employee"},</p>
          <p className="mt-2">
            With reference to your acceptance of our offer, we are pleased to appoint you as{" "}
            <b>{designation || "Designation"}</b>
            {department ? ` in the ${department} department` : ""} at <b>{companyName || "the Company"}</b>.
            Your employment type will be <b>{employmentType}</b>, and your date of joining will be{" "}
            <b>{joiningDateF || "to be confirmed"}</b>.
          </p>
          <table className="w-full border-collapse my-4">
            <tbody>
              {[
                ["Employee Code", employeeCode],
                ["Designation", designation],
                ["Salary / CTC", `${ctcF} ${salaryPeriod}`],
                ["Probation Period", probation],
                ["Notice Period", noticePeriod],
                ["Working Hours", workingHours],
              ].map(([k, v]) => (
                <tr key={k}>
                  <td className="border p-2 font-semibold w-1/3">{k}</td>
                  <td className="border p-2">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            You will be posted at <b>{workLocation || "the assigned work location"}</b> and will report to{" "}
            <b>{reportingManager || "the reporting manager"}</b> or any other person designated by the Company.
          </p>
          <p className="mt-2">
            Leave, attendance, weekly off, holidays and other workplace rules will be governed by{" "}
            <b>{leavePolicy || "company policy"}</b>.
          </p>
          <p className="mt-2">{additionalTerms}</p>
          <p className="mt-2">
            Please sign and return a copy of this appointment letter as confirmation of your acceptance of
            the above terms.
          </p>
          <div className="mt-8 flex flex-wrap justify-between gap-8">
            <div>
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
            <div>
              <p>
                <b>Accepted by Employee</b>
              </p>
              <br />
              <p>Signature: __________________</p>
            </div>
          </div>
          <hr className="my-5" />
          <p className="text-xs text-gray-500">
            Generated using Registration Seva Appointment Letter Generator. Review and customize before
            official use.
          </p>
        </div>
      </PreviewBox>
    </ToolCard>
  );
}
