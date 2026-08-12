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
const pastISO = (days: number) => {
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

const defaultResponsibilities =
  "During the period of employment, the employee handled assigned responsibilities related to the department and performed duties as per company requirements.";
const defaultNote =
  "We found the employee to be sincere, responsible and professional during the association with the Company. We wish the employee success in future endeavours.";

export default function ExperienceLetterGeneratorClient() {
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
  const [lastWorkingDate, setLastWorkingDate] = useState("");
  const [reasonStatus, setReasonStatus] = useState("resigned from the services of the Company");
  const [conduct, setConduct] = useState("good");
  const [responsibilities, setResponsibilities] = useState(defaultResponsibilities);
  const [additionalNote, setAdditionalNote] = useState(defaultNote);
  const [signatoryName, setSignatoryName] = useState("Authorized Signatory");
  const [signatoryDesignation, setSignatoryDesignation] = useState("HR / Management");

  useEffect(() => {
    setIssueDate(todayISO());
    setJoiningDate(pastISO(730));
    setLastWorkingDate(todayISO());
  }, []);

  const issueDateF = fmtDate(issueDate);
  const joiningDateF = fmtDate(joiningDate);
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
    setJoiningDate(pastISO(730));
    setLastWorkingDate(todayISO());
    setReasonStatus("resigned from the services of the Company");
    setConduct("good");
    setResponsibilities(defaultResponsibilities);
    setAdditionalNote(defaultNote);
    setSignatoryName("Authorized Signatory");
    setSignatoryDesignation("HR / Management");
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
    y += 16;
    doc.setTextColor(15, 74, 137);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text("Experience Letter", 105, y, { align: "center" });
    doc.setFillColor(243, 164, 4);
    doc.rect(90, y + 2, 30, 1.2, "F");
    y += 13;
    doc.setTextColor(40, 40, 40);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const p1 = `This is to certify that ${employeeName || "Employee Name"}${employeeCode ? " (Employee Code: " + employeeCode + ")" : ""} was employed with ${companyName || "the Company"} as ${designation || "Designation"}${department ? " in the " + department + " department" : ""}.`;
    y = addWrapped(p1, m, y, w, 5);
    y += 4;
    const p2 = `The employee worked with the Company from ${joiningDateF || "joining date"} to ${lastWorkingDateF || "last working date"} as a ${employmentType} employee at ${workLocation || "the assigned work location"}.`;
    y = addWrapped(p2, m, y, w, 5);
    y += 4;
    y = addWrapped(responsibilities || "", m, y, w, 5);
    y += 4;
    const p3 = `During the employment period, the employee's conduct and performance were found to be ${conduct}. The employee has ${reasonStatus}.`;
    y = addWrapped(p3, m, y, w, 5);
    y += 4;
    y = addWrapped(additionalNote || "", m, y, w, 5);
    y += 18;
    y = addPageIfNeeded(y + 35);
    doc.setFont("helvetica", "bold");
    doc.text("For " + (companyName || "Company Name"), m, y);
    y += 18;
    doc.text(signatoryName || "Authorized Signatory", m, y);
    doc.setFont("helvetica", "normal");
    y += 5;
    doc.text(signatoryDesignation || "", m, y);
    y = 277;
    doc.setDrawColor(217, 230, 251);
    doc.line(m, y, w + m, y);
    y += 6;
    doc.setTextColor(96, 112, 141);
    doc.setFontSize(9);
    doc.text("Generated free at registrationseva.com. Verify all details before official use.", m, y);
    doc.save("experience-letter-RegistrationSeva.pdf");
  };

  return (
    <ToolCard>
      <h2 className="text-2xl font-bold text-primary mb-2">Create Experience Letter</h2>
      <p className="text-gray-600 text-sm mb-6">
        Fill the details below, review the preview and download a professional
        experience letter PDF.
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

      <FormSection title="Employment Period">
        <FieldGrid>
          <Field label="Date of Joining">
            <input type="date" className={inputCls} value={joiningDate} onChange={(e) => setJoiningDate(e.target.value)} />
          </Field>
          <Field label="Last Working Date">
            <input type="date" className={inputCls} value={lastWorkingDate} onChange={(e) => setLastWorkingDate(e.target.value)} />
          </Field>
          <Field label="Reason / Status">
            <select className={selectCls} value={reasonStatus} onChange={(e) => setReasonStatus(e.target.value)}>
              <option>completed employment tenure with the Company</option>
              <option>resigned from the services of the Company</option>
              <option>completed internship with the Company</option>
              <option>completed contract assignment with the Company</option>
            </select>
          </Field>
          <Field label="Conduct / Performance">
            <select className={selectCls} value={conduct} onChange={(e) => setConduct(e.target.value)}>
              <option>satisfactory</option>
              <option>good</option>
              <option>very good</option>
              <option>excellent</option>
            </select>
          </Field>
          <Field label="Work Description / Responsibilities" full>
            <textarea rows={5} className={textareaCls} value={responsibilities} onChange={(e) => setResponsibilities(e.target.value)} />
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
          Download Experience Letter PDF
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
          <h3 className="text-center text-lg font-bold text-primary my-5">Experience Letter</h3>
          <p>
            This is to certify that <b>{employeeName || "Employee Name"}</b>
            {employeeCode ? ` (Employee Code: ${employeeCode})` : ""} was employed with{" "}
            <b>{companyName || "the Company"}</b> as <b>{designation || "Designation"}</b>
            {department ? ` in the ${department} department` : ""}.
          </p>
          <p className="mt-2">
            The employee worked with the Company from <b>{joiningDateF || "joining date"}</b> to{" "}
            <b>{lastWorkingDateF || "last working date"}</b> as a <b>{employmentType}</b> employee at{" "}
            <b>{workLocation || "the assigned work location"}</b>.
          </p>
          <p className="mt-2">{responsibilities}</p>
          <p className="mt-2">
            During the employment period, the employee&apos;s conduct and performance were found to be{" "}
            <b>{conduct}</b>. The employee has {reasonStatus}.
          </p>
          <p className="mt-2">{additionalNote}</p>
          <div className="mt-10">
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
            Generated using Registration Seva Experience Letter Generator. Review and customize before
            official use.
          </p>
        </div>
      </PreviewBox>
    </ToolCard>
  );
}
