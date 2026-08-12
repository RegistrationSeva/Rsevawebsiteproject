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
  textareaCls,
  btnPrimary,
  btnOutline,
} from "@/components/tools/fields";

const templates: Record<string, string> = {
  bank: `RESOLVED THAT approval of the Board be and is hereby accorded to open, operate and maintain a current bank account in the name of the Company with the bank/branch mentioned in the reference details, and that the authorized person named above be and is hereby authorized to sign, submit, execute and deliver all required forms, applications, KYC documents, declarations and papers in connection with the said bank account.\n\nRESOLVED FURTHER THAT the authorized person be and is hereby authorized to operate the said account, issue instructions, sign cheques and perform such acts as may be required by the bank, subject to the applicable limits, internal approvals and company policy.`,
  gst: `RESOLVED THAT the consent of the Board be and is hereby accorded to apply for GST registration, amendment, authentication, filing, correspondence and related GST portal work for and on behalf of the Company.\n\nRESOLVED FURTHER THAT the authorized person named above be and is hereby authorized to sign, submit, verify and upload applications, documents, declarations and returns, and to represent the Company before GST authorities or portal as may be required.`,
  trademark: `RESOLVED THAT approval of the Board be and is hereby accorded to file trademark application(s), replies, documents, declarations and other papers for protection of the brand name/logo/mark mentioned in the reference details.\n\nRESOLVED FURTHER THAT the authorized person named above be and is hereby authorized to sign, execute and submit all trademark-related documents, appoint professionals/agents where required and do all acts necessary for the trademark filing and related proceedings.`,
  signatory: `RESOLVED THAT the authorized person named above be and is hereby appointed as authorized signatory of the Company for the purpose mentioned in the reference details.\n\nRESOLVED FURTHER THAT the authorized person be and is hereby authorized to sign, execute, submit and deliver all applications, letters, forms, declarations, undertakings and documents as may be necessary for the said purpose.`,
  rent: `RESOLVED THAT approval of the Board be and is hereby accorded to enter into, execute and register, if required, a rent agreement / lease agreement / virtual office agreement for the premises mentioned in the reference details.\n\nRESOLVED FURTHER THAT the authorized person named above be and is hereby authorized to negotiate, sign, execute, submit and deliver the said agreement and all related documents for and on behalf of the Company.`,
  registration: `RESOLVED THAT approval of the Board be and is hereby accorded to apply for the registration/license/certificate mentioned in the reference details for and on behalf of the Company.\n\nRESOLVED FURTHER THAT the authorized person named above be and is hereby authorized to sign, submit and execute applications, declarations, forms, documents and correspondence required for the said registration/license/certificate.`,
  custom: `RESOLVED THAT the Board hereby approves the matter described in the reference details.\n\nRESOLVED FURTHER THAT the authorized person named above be and is hereby authorized to do all acts, deeds and things, sign documents and make submissions as may be necessary to give effect to this resolution.`,
};

const typeLabels: Record<string, string> = {
  bank: "Bank Account Opening",
  gst: "GST Registration / GST Authorization",
  trademark: "Trademark Filing Authorization",
  signatory: "Appointment of Authorized Signatory",
  rent: "Approval for Rent Agreement",
  registration: "Business Registration / License Authorization",
  custom: "Custom Board Resolution",
};

const formatDate = (d: string) => {
  if (!d) return "__________";
  return new Date(d + "T00:00:00").toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export default function BoardResolutionGeneratorClient() {
  const [companyName, setCompanyName] = useState("ABC PRIVATE LIMITED");
  const [cin, setCin] = useState("");
  const [companyAddress, setCompanyAddress] = useState(
    "Registered office address of the company"
  );
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("11:00 AM");
  const [meetingPlace, setMeetingPlace] = useState("Registered Office");
  const [chairperson, setChairperson] = useState("Mr./Ms. Director Name");
  const [resolutionType, setResolutionType] = useState("bank");
  const [authName, setAuthName] = useState("Mr./Ms. Authorized Person");
  const [authDesignation, setAuthDesignation] = useState(
    "Director / Authorized Signatory"
  );
  const [authId, setAuthId] = useState("");
  const [referenceDetails, setReferenceDetails] = useState(
    "Bank / GST / trademark / agreement / license details may be entered here as applicable."
  );
  const [resolutionText, setResolutionText] = useState(templates.bank);
  const [signName, setSignName] = useState("Director Name");
  const [signDesignation, setSignDesignation] = useState("Director");
  const [note, setNote] = useState(
    "This is a system-generated draft format for general business utility. Please verify final wording, authority, documents, law and professional requirements before official use."
  );

  const typeLabel = typeLabels[resolutionType];

  const changeType = (type: string) => {
    setResolutionType(type);
    setResolutionText(templates[type] || templates.custom);
  };

  const reset = () => {
    setCompanyName("ABC PRIVATE LIMITED");
    setCin("");
    setCompanyAddress("Registered office address of the company");
    setMeetingDate("");
    setMeetingTime("11:00 AM");
    setMeetingPlace("Registered Office");
    setChairperson("Mr./Ms. Director Name");
    setAuthName("Mr./Ms. Authorized Person");
    setAuthDesignation("Director / Authorized Signatory");
    setAuthId("");
    setReferenceDetails(
      "Bank / GST / trademark / agreement / license details may be entered here as applicable."
    );
    setSignName("Director Name");
    setSignDesignation("Director");
    setNote(
      "This is a system-generated draft format for general business utility. Please verify final wording, authority, documents, law and professional requirements before official use."
    );
    changeType("bank");
  };

  const downloadPdf = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF("p", "mm", "a4");
    const margin = 16;
    let y = 18;
    doc.setFont("times", "bold");
    doc.setFontSize(13);
    doc.text("CERTIFIED TRUE COPY OF THE BOARD RESOLUTION", 105, y, { align: "center" });
    y += 8;
    doc.setFont("times", "bold");
    doc.setFontSize(12);
    doc.text(companyName.toUpperCase() || "COMPANY NAME", 105, y, { align: "center" });
    y += 8;
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    const meta: [string, string][] = [
      ["CIN / Registration No.", cin || "Not specified"],
      ["Registered Office", companyAddress],
      ["Meeting Date", formatDate(meetingDate)],
      ["Meeting Time", meetingTime],
      ["Meeting Place / Mode", meetingPlace],
      ["Resolution Purpose", typeLabel],
    ];
    meta.forEach(([k, v]) => {
      doc.setFont("times", "bold");
      doc.text(k + ":", margin, y);
      doc.setFont("times", "normal");
      const lines = doc.splitTextToSize(v || "", 118);
      doc.text(lines, 70, y);
      y += Math.max(6, lines.length * 5);
    });
    y += 4;
    const body = [
      `The Chairperson informed the Board regarding the requirement for ${typeLabel.toLowerCase()} and placed before the Board the relevant documents and details for consideration.`,
      resolutionText,
      `Authorized Person: ${authName}, ${authDesignation}${authId ? ", " + authId : ""}.`,
      `Reference Details: ${referenceDetails}`,
      "RESOLVED FURTHER THAT a certified true copy of this resolution be provided to the concerned authority, bank, department, portal, professional or person wherever required.",
      `Note: ${note}`,
    ];
    body.forEach((par) => {
      const lines = doc.splitTextToSize(par || "", 178);
      if (y + lines.length * 5 > 270) {
        doc.addPage();
        y = 18;
      }
      doc.text(lines, margin, y);
      y += lines.length * 5 + 4;
    });
    if (y > 240) {
      doc.addPage();
      y = 30;
    }
    y += 8;
    doc.setFont("times", "bold");
    doc.text(`For ${companyName}`, margin, y);
    y += 22;
    doc.setFont("times", "normal");
    doc.text("_______________________", margin, y);
    y += 6;
    doc.text(signName || "Director Name", margin, y);
    y += 6;
    doc.text(signDesignation || "Director", margin, y);
    y += 12;
    doc.setFontSize(9);
    doc.setTextColor(96, 112, 141);
    doc.text(
      "Generated free at registrationseva.com. Verify all details before official use.",
      margin,
      y
    );
    doc.save("board-resolution-draft.pdf");
  };

  return (
    <ToolCard>
      <h2 className="text-2xl font-bold text-primary mb-2">
        Create Board Resolution Draft
      </h2>
      <p className="text-gray-600 text-sm mb-6">
        Fill company details, meeting details and resolution type. Review the
        draft and download a PDF copy.
      </p>

      <FormSection title="Company Details">
        <FieldGrid>
          <Field label="Company Name">
            <input className={inputCls} value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </Field>
          <Field label="CIN / Registration No.">
            <input className={inputCls} value={cin} placeholder="U00000DL2026PTC000000" onChange={(e) => setCin(e.target.value)} />
          </Field>
          <Field label="Registered Office Address" full>
            <textarea className={textareaCls} value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Meeting Details">
        <FieldGrid>
          <Field label="Board Meeting Date">
            <input type="date" className={inputCls} value={meetingDate} onChange={(e) => setMeetingDate(e.target.value)} />
          </Field>
          <Field label="Meeting Time">
            <input className={inputCls} value={meetingTime} onChange={(e) => setMeetingTime(e.target.value)} />
          </Field>
          <Field label="Meeting Place / Mode">
            <input className={inputCls} value={meetingPlace} onChange={(e) => setMeetingPlace(e.target.value)} />
          </Field>
          <Field label="Chairperson Name">
            <input className={inputCls} value={chairperson} onChange={(e) => setChairperson(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Resolution Type">
        <FieldGrid>
          <Field label="Choose Resolution Purpose">
            <select className={selectCls} value={resolutionType} onChange={(e) => changeType(e.target.value)}>
              <option value="bank">Bank Account Opening</option>
              <option value="gst">GST Registration / GST Authorization</option>
              <option value="trademark">Trademark Filing Authorization</option>
              <option value="signatory">Appointment of Authorized Signatory</option>
              <option value="rent">Approval for Rent Agreement</option>
              <option value="registration">Business Registration / License Authorization</option>
              <option value="custom">Custom Board Resolution</option>
            </select>
          </Field>
          <Field label="Authorized Person Name">
            <input className={inputCls} value={authName} onChange={(e) => setAuthName(e.target.value)} />
          </Field>
          <Field label="Designation">
            <input className={inputCls} value={authDesignation} onChange={(e) => setAuthDesignation(e.target.value)} />
          </Field>
          <Field label="PAN / DIN / ID Detail">
            <input className={inputCls} value={authId} placeholder="PAN / DIN / ID, if required" onChange={(e) => setAuthId(e.target.value)} />
          </Field>
          <Field label="Additional Reference Details" full>
            <textarea className={textareaCls} value={referenceDetails} onChange={(e) => setReferenceDetails(e.target.value)} />
          </Field>
          <Field label="Resolution Text" full>
            <textarea className={textareaCls} rows={7} value={resolutionText} onChange={(e) => setResolutionText(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Signing Details">
        <FieldGrid>
          <Field label="Certified True Copy Signed By">
            <input className={inputCls} value={signName} onChange={(e) => setSignName(e.target.value)} />
          </Field>
          <Field label="Signing Designation">
            <input className={inputCls} value={signDesignation} onChange={(e) => setSignDesignation(e.target.value)} />
          </Field>
          <Field label="Disclaimer / Note" full>
            <textarea className={textareaCls} value={note} onChange={(e) => setNote(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <div className="flex flex-wrap gap-3">
        <button type="button" className={btnPrimary} onClick={downloadPdf}>
          Download PDF
        </button>
        <button type="button" className={btnOutline} onClick={reset}>
          Reset
        </button>
      </div>

      <PreviewBox>
        <div className="max-w-[820px] mx-auto border bg-white p-6 md:p-10 text-sm leading-relaxed font-serif">
          <h2 className="text-center text-lg font-bold uppercase tracking-wide mb-1">
            CERTIFIED TRUE COPY OF THE RESOLUTION
          </h2>
          <h3 className="text-center font-bold uppercase mb-5">
            Passed at the Meeting of the Board of Directors
          </h3>
          <p className="text-center mb-3">
            <strong>{companyName}</strong>
          </p>
          <p className="text-center mb-3 whitespace-pre-line">{companyAddress}</p>
          <table className="w-full border-collapse my-4 font-sans text-xs">
            <tbody>
              <tr>
                <td className="border p-2 align-top"><strong>CIN / Registration No.</strong></td>
                <td className="border p-2 align-top">{cin || "Not specified"}</td>
              </tr>
              <tr>
                <td className="border p-2 align-top"><strong>Meeting Date</strong></td>
                <td className="border p-2 align-top">{formatDate(meetingDate)}</td>
              </tr>
              <tr>
                <td className="border p-2 align-top"><strong>Meeting Time</strong></td>
                <td className="border p-2 align-top">{meetingTime}</td>
              </tr>
              <tr>
                <td className="border p-2 align-top"><strong>Meeting Place / Mode</strong></td>
                <td className="border p-2 align-top">{meetingPlace}</td>
              </tr>
              <tr>
                <td className="border p-2 align-top"><strong>Resolution Purpose</strong></td>
                <td className="border p-2 align-top">{typeLabel}</td>
              </tr>
            </tbody>
          </table>
          <p className="mb-3">
            The Chairperson informed the Board regarding the requirement for {typeLabel.toLowerCase()} and placed before the Board the relevant documents and details for consideration.
          </p>
          <p className="mb-3 whitespace-pre-line">
            <strong>&ldquo;{resolutionText}&rdquo;</strong>
          </p>
          <p className="mb-3">
            <strong>Authorized Person:</strong> {authName}, {authDesignation}
            {authId ? `, ${authId}` : ""}
          </p>
          <p className="mb-3 whitespace-pre-line">
            <strong>Reference Details:</strong>
            <br />
            {referenceDetails}
          </p>
          <p className="mb-3">
            RESOLVED FURTHER THAT a certified true copy of this resolution be
            provided to the concerned authority, bank, department, portal,
            professional or person wherever required.
          </p>
          <p className="mb-3">
            <strong>Note:</strong> {note}
          </p>
          <div className="flex flex-col sm:flex-row justify-between gap-5 mt-10 font-sans text-xs">
            <div>
              <strong>Certified True Copy</strong>
              <br />
              For {companyName}
              <br />
              <br />
              <br />
              _______________________
              <br />
              {signName}
              <br />
              {signDesignation}
            </div>
            <div>
              <strong>Chairperson</strong>
              <br />
              {chairperson}
              <br />
              <br />
              <br />
              _______________________
              <br />
              Signature
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          <div className="bg-white border rounded-lg p-3 text-sm">
            <strong className="block text-primary mb-1">Draft Type</strong>
            {typeLabel}
          </div>
          <div className="bg-white border rounded-lg p-3 text-sm">
            <strong className="block text-primary mb-1">Company</strong>
            {companyName}
          </div>
          <div className="bg-white border rounded-lg p-3 text-sm">
            <strong className="block text-primary mb-1">Authorized Person</strong>
            {authName}
          </div>
        </div>
      </PreviewBox>
    </ToolCard>
  );
}
