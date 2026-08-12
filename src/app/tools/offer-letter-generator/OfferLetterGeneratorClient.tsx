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
  "This offer is subject to verification of documents, background checks where applicable and acceptance of company policies. The detailed appointment letter and employment terms may be issued at the time of joining.";

export default function OfferLetterGeneratorClient() {
  const [companyName, setCompanyName] = useState("Registration Seva Business Solutions");
  const [companyEmail, setCompanyEmail] = useState("hr@example.com");
  const [companyAddress, setCompanyAddress] = useState("New Delhi, India");
  const [issueDate, setIssueDate] = useState("");
  const [candidateName, setCandidateName] = useState("Rahul Sharma");
  const [candidateAddress, setCandidateAddress] = useState("Delhi, India");
  const [candidateEmail, setCandidateEmail] = useState("candidate@example.com");
  const [validUntil, setValidUntil] = useState("");
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
  const [signatoryName, setSignatoryName] = useState("Authorized Signatory");
  const [signatoryDesignation, setSignatoryDesignation] = useState("HR / Management");
  const [additionalTerms, setAdditionalTerms] = useState(defaultTerms);

  useEffect(() => {
    setIssueDate(todayISO());
    setValidUntil(plusDaysISO(7));
    setJoiningDate(plusDaysISO(15));
  }, []);

  const issueDateF = fmtDate(issueDate);
  const validUntilF = fmtDate(validUntil);
  const joiningDateF = fmtDate(joiningDate);
  const ctcF = money(ctc);

  const reset = () => {
    setCompanyName("Registration Seva Business Solutions");
    setCompanyEmail("hr@example.com");
    setCompanyAddress("New Delhi, India");
    setIssueDate(todayISO());
    setCandidateName("Rahul Sharma");
    setCandidateAddress("Delhi, India");
    setCandidateEmail("candidate@example.com");
    setValidUntil(plusDaysISO(7));
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
    y += 10;
    doc.text("To,", m, y);
    y += 6;
    doc.setFont("helvetica", "bold");
    doc.text(candidateName || "Candidate Name", m, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    if (candidateAddress) {
      y = addWrapped(candidateAddress, m, y, w, 5);
      y += 1;
    }
    if (candidateEmail) {
      doc.text(candidateEmail, m, y);
      y += 8;
    }
    doc.setTextColor(15, 74, 137);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text("Offer Letter", 105, y, { align: "center" });
    doc.setFillColor(243, 164, 4);
    doc.rect(90, y + 2, 30, 1.2, "F");
    y += 11;
    doc.setTextColor(40, 40, 40);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    y = addWrapped("Dear " + (candidateName || "Candidate") + ",", m, y, w, 5);
    y += 3;
    const p1 = `We are pleased to offer you the position of ${designation || "Designation"}${department ? " in the " + department + " department" : ""} at ${companyName || "the Company"}. Your employment type will be ${employmentType}, and your proposed work location will be ${workLocation || "as assigned by the Company"}.`;
    y = addWrapped(p1, m, y, w, 5);
    y += 4;
    const p2 = `Your expected date of joining is ${joiningDateF || "to be confirmed"}. You will report to ${reportingManager || "the reporting manager"} or any other person designated by the Company.`;
    y = addWrapped(p2, m, y, w, 5);
    y += 6;
    const rows: [string, string][] = [
      ["Designation", designation],
      ["Salary / CTC", ctcF + " " + salaryPeriod],
      ["Probation Period", probation],
      ["Notice Period", noticePeriod],
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
    y = addWrapped(additionalTerms || "", m, y, w, 5);
    y += 4;
    y = addWrapped(
      `This offer is valid until ${validUntilF || "the date communicated by the Company"}. Please confirm your acceptance by signing and returning a copy of this letter or by confirming through email.`,
      m,
      y,
      w,
      5
    );
    y += 5;
    y = addWrapped("We welcome you and look forward to your contribution.", m, y, w, 5);
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
    doc.save("offer-letter-RegistrationSeva.pdf");
  };

  return (
    <ToolCard>
      <h2 className="text-2xl font-bold text-primary mb-2">Create Offer Letter</h2>
      <p className="text-gray-600 text-sm mb-6">
        Fill the details below, review the preview and download a professional
        offer letter PDF.
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

      <FormSection title="Candidate Details">
        <FieldGrid>
          <Field label="Candidate Name">
            <input className={inputCls} value={candidateName} onChange={(e) => setCandidateName(e.target.value)} />
          </Field>
          <Field label="Candidate Address">
            <input className={inputCls} value={candidateAddress} onChange={(e) => setCandidateAddress(e.target.value)} />
          </Field>
          <Field label="Email / Contact">
            <input className={inputCls} value={candidateEmail} onChange={(e) => setCandidateEmail(e.target.value)} />
          </Field>
          <Field label="Offer Valid Until">
            <input type="date" className={inputCls} value={validUntil} onChange={(e) => setValidUntil(e.target.value)} />
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
          <Field label="Joining Date">
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
          <Field label="Signatory Name">
            <input className={inputCls} value={signatoryName} onChange={(e) => setSignatoryName(e.target.value)} />
          </Field>
          <Field label="Signatory Designation">
            <input className={inputCls} value={signatoryDesignation} onChange={(e) => setSignatoryDesignation(e.target.value)} />
          </Field>
          <Field label="Additional Terms / Notes" full>
            <textarea rows={5} className={textareaCls} value={additionalTerms} onChange={(e) => setAdditionalTerms(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <div className="flex flex-wrap gap-3">
        <button type="button" className={btnPrimary} onClick={downloadPdf}>
          Download Offer Letter PDF
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
            {candidateName || "Candidate Name"}
            <br />
            {candidateAddress}
            {candidateEmail ? (
              <>
                <br />
                {candidateEmail}
              </>
            ) : null}
          </p>
          <h3 className="text-center text-lg font-bold text-primary my-5">Offer Letter</h3>
          <p>Dear {candidateName || "Candidate"},</p>
          <p className="mt-2">
            We are pleased to offer you the position of <b>{designation || "Designation"}</b>
            {department ? ` in the ${department} department` : ""} at <b>{companyName || "the Company"}</b>.
            Your employment type will be <b>{employmentType}</b>, and your proposed work location will be{" "}
            <b>{workLocation || "as assigned by the Company"}</b>.
          </p>
          <p className="mt-2">
            Your expected date of joining is <b>{joiningDateF || "to be confirmed"}</b>. You will report to{" "}
            <b>{reportingManager || "the reporting manager"}</b> or any other person designated by the Company.
          </p>
          <table className="w-full border-collapse my-4">
            <tbody>
              {[
                ["Designation", designation],
                ["Salary / CTC", `${ctcF} ${salaryPeriod}`],
                ["Probation Period", probation],
                ["Notice Period", noticePeriod],
              ].map(([k, v]) => (
                <tr key={k}>
                  <td className="border p-2 font-semibold w-1/3">{k}</td>
                  <td className="border p-2">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>{additionalTerms}</p>
          <p className="mt-2">
            This offer is valid until <b>{validUntilF || "the date communicated by the Company"}</b>. Please
            confirm your acceptance by signing and returning a copy of this letter or by confirming through
            email.
          </p>
          <p className="mt-2">We welcome you and look forward to your contribution.</p>
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
            Generated using Registration Seva Offer Letter Generator. Review and customize before official use.
          </p>
        </div>
      </PreviewBox>
    </ToolCard>
  );
}
