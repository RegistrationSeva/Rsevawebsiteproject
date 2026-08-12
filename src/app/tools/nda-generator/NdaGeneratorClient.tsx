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

const formatDate = (d: string) => {
  if (!d) return "__________";
  return new Date(d + "T00:00:00").toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const partyTypes = [
  "Individual",
  "Proprietorship",
  "Partnership Firm",
  "LLP",
  "Private Limited Company",
  "Other Entity",
];

const defaults = {
  ndaType: "Mutual NDA",
  effectiveDate: "",
  disclosingName: "Disclosing Party Name",
  disclosingType: "Individual",
  disclosingId: "",
  disclosingAddress: "Disclosing party address",
  receivingName: "Receiving Party Name",
  receivingType: "Individual",
  receivingId: "",
  receivingAddress: "Receiving party address",
  purpose:
    "Discussion, evaluation, engagement, employment, service arrangement or business transaction between the parties.",
  confInfo:
    "Business plans, client data, pricing, financial information, technical information, documents, strategies, processes, trade secrets, login credentials, designs, software, proposals and other non-public information disclosed by either party.",
  exclusions:
    "Information already publicly available, already known to the receiving party without breach, independently developed, received from a third party without restriction, or required to be disclosed by law or authority.",
  confPeriod: "3 years from the date of disclosure",
  agreementTerm: "1 year from effective date unless terminated earlier",
  returnInfo: "Return or destroy on written request",
  jurisdiction: "India / Courts at Delhi",
  additionalTerms:
    "The receiving party shall use reasonable care to protect confidential information and shall not disclose it to unauthorized persons except as required for the stated purpose.",
  signPlace: "Delhi",
  signDate: "",
  sign1: "Authorized Signatory",
  sign2: "Authorized Signatory",
};

export default function NdaGeneratorClient() {
  const [form, setForm] = useState(defaults);

  const set = (key: keyof typeof defaults) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const f = form;
  const clauseCls = "font-bold uppercase mt-4";

  const mutualText = () => {
    if (f.ndaType === "Mutual NDA")
      return "Each party may disclose confidential information and each party shall protect the confidential information received from the other party.";
    if (f.ndaType === "One-way NDA")
      return "The receiving party shall protect confidential information disclosed by the disclosing party and shall use it only for the stated purpose.";
    return "The receiving party shall protect confidential information disclosed in connection with the stated relationship and shall use it only for the permitted purpose.";
  };

  const downloadPdf = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF("p", "mm", "a4");
    let y = 18;
    const margin = 16;
    doc.setFont("times", "bold");
    doc.setFontSize(14);
    doc.text(f.ndaType.toUpperCase(), 105, y, { align: "center" });
    y += 10;
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    const paras = [
      `This Non-Disclosure Agreement is made at ${f.signPlace || "__________"} on ${formatDate(f.signDate)} and shall be effective from ${formatDate(f.effectiveDate)} by and between:`,
      `Disclosing Party: ${f.disclosingName}, ${f.disclosingType}, address: ${f.disclosingAddress}${f.disclosingId ? ", ID/PAN/CIN: " + f.disclosingId : ""}.`,
      `Receiving Party: ${f.receivingName}, ${f.receivingType}, address: ${f.receivingAddress}${f.receivingId ? ", ID/PAN/CIN: " + f.receivingId : ""}.`,
      mutualText(),
      `Purpose: ${f.purpose}`,
      `Confidential Information: ${f.confInfo}`,
      `Obligations: The receiving party shall keep the confidential information confidential, use it only for the stated purpose, restrict access to persons who need to know it, and take reasonable care to prevent unauthorized disclosure.`,
      `Exclusions: ${f.exclusions}`,
      `Term and Confidentiality Period: This agreement shall remain valid for ${f.agreementTerm}. Confidentiality obligations shall continue for ${f.confPeriod}.`,
      `Return or Destruction: ${f.returnInfo}.`,
      `No Ownership Transfer: All confidential information shall remain the property of the disclosing party. No license, ownership or intellectual property right is granted except for limited use for the stated purpose.`,
      `Legal Disclosure: If disclosure is required by law, court, regulator or authority, the receiving party shall limit disclosure to the extent required.`,
      `Jurisdiction: ${f.jurisdiction}.`,
      `Additional Terms: ${f.additionalTerms}`,
      `Important Note: This is a general draft format. Verify legal suitability and enforceability before signing.`,
    ];
    paras.forEach((p) => {
      const lines = doc.splitTextToSize(p, 178);
      if (y + lines.length * 5 > 280) {
        doc.addPage();
        y = 18;
      }
      doc.text(lines, margin, y);
      y += lines.length * 5 + 4;
    });
    if (y > 240) {
      doc.addPage();
      y = 28;
    }
    y += 8;
    doc.text("Disclosing Party", margin, y);
    doc.text("Receiving Party", 118, y);
    y += 22;
    doc.text("_______________________", margin, y);
    doc.text("_______________________", 118, y);
    y += 6;
    doc.text(f.sign1 || "Authorized Signatory", margin, y);
    doc.text(f.sign2 || "Authorized Signatory", 118, y);
    y += 12;
    doc.setFontSize(9);
    doc.setTextColor(96, 112, 141);
    doc.text(
      "Generated free at registrationseva.com. Verify all details before official use.",
      margin,
      y
    );
    doc.save("nda-draft.pdf");
  };

  return (
    <ToolCard>
      <h2 className="text-2xl font-bold text-primary mb-2">
        Create Non-Disclosure Agreement Draft
      </h2>
      <p className="text-gray-600 text-sm mb-6">
        Fill the details, review the draft and download a PDF. Final legal
        review is recommended before signing.
      </p>

      <FormSection title="NDA Type">
        <FieldGrid>
          <Field label="NDA Format">
            <select className={selectCls} value={f.ndaType} onChange={set("ndaType")}>
              <option>Mutual NDA</option>
              <option>One-way NDA</option>
              <option>Employee NDA</option>
              <option>Vendor / Freelancer NDA</option>
              <option>Consultant NDA</option>
              <option>Client NDA</option>
            </select>
          </Field>
          <Field label="Effective Date">
            <input type="date" className={inputCls} value={f.effectiveDate} onChange={set("effectiveDate")} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Disclosing Party Details">
        <FieldGrid>
          <Field label="Disclosing Party Name">
            <input className={inputCls} value={f.disclosingName} onChange={set("disclosingName")} />
          </Field>
          <Field label="Disclosing Party Type">
            <select className={selectCls} value={f.disclosingType} onChange={set("disclosingType")}>
              {partyTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field label="PAN / CIN / ID">
            <input className={inputCls} value={f.disclosingId} placeholder="Optional" onChange={set("disclosingId")} />
          </Field>
          <Field label="Disclosing Party Address" full>
            <textarea className={textareaCls} value={f.disclosingAddress} onChange={set("disclosingAddress")} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Receiving Party Details">
        <FieldGrid>
          <Field label="Receiving Party Name">
            <input className={inputCls} value={f.receivingName} onChange={set("receivingName")} />
          </Field>
          <Field label="Receiving Party Type">
            <select className={selectCls} value={f.receivingType} onChange={set("receivingType")}>
              {partyTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field label="PAN / CIN / ID">
            <input className={inputCls} value={f.receivingId} placeholder="Optional" onChange={set("receivingId")} />
          </Field>
          <Field label="Receiving Party Address" full>
            <textarea className={textareaCls} value={f.receivingAddress} onChange={set("receivingAddress")} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Confidentiality Details">
        <FieldGrid>
          <Field label="Purpose of Disclosure" full>
            <textarea className={textareaCls} value={f.purpose} onChange={set("purpose")} />
          </Field>
          <Field label="Description of Confidential Information" full>
            <textarea className={textareaCls} value={f.confInfo} onChange={set("confInfo")} />
          </Field>
          <Field label="Exclusions From Confidential Information" full>
            <textarea className={textareaCls} value={f.exclusions} onChange={set("exclusions")} />
          </Field>
          <Field label="Confidentiality Period">
            <input className={inputCls} value={f.confPeriod} onChange={set("confPeriod")} />
          </Field>
          <Field label="Agreement Term">
            <input className={inputCls} value={f.agreementTerm} onChange={set("agreementTerm")} />
          </Field>
          <Field label="Return / Destroy Information">
            <select className={selectCls} value={f.returnInfo} onChange={set("returnInfo")}>
              <option>Return or destroy on written request</option>
              <option>Return on termination</option>
              <option>Destroy on termination</option>
              <option>As mutually agreed in writing</option>
            </select>
          </Field>
          <Field label="Governing Law / Jurisdiction">
            <input className={inputCls} value={f.jurisdiction} onChange={set("jurisdiction")} />
          </Field>
          <Field label="Additional Terms / Notes" full>
            <textarea className={textareaCls} value={f.additionalTerms} onChange={set("additionalTerms")} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Signing Details">
        <FieldGrid>
          <Field label="Place of Signing">
            <input className={inputCls} value={f.signPlace} onChange={set("signPlace")} />
          </Field>
          <Field label="Date of Signing">
            <input type="date" className={inputCls} value={f.signDate} onChange={set("signDate")} />
          </Field>
          <Field label="Disclosing Party Signatory">
            <input className={inputCls} value={f.sign1} onChange={set("sign1")} />
          </Field>
          <Field label="Receiving Party Signatory">
            <input className={inputCls} value={f.sign2} onChange={set("sign2")} />
          </Field>
        </FieldGrid>
      </FormSection>

      <div className="flex flex-wrap gap-3">
        <button type="button" className={btnPrimary} onClick={downloadPdf}>
          Download PDF
        </button>
        <button type="button" className={btnOutline} onClick={() => setForm(defaults)}>
          Reset
        </button>
      </div>

      <PreviewBox>
        <div className="max-w-[850px] mx-auto border bg-white p-6 md:p-10 text-sm leading-relaxed font-serif">
          <h2 className="text-center text-lg font-bold uppercase tracking-wide mb-5">
            {f.ndaType}
          </h2>
          <p className="mb-3 text-justify">
            This Non-Disclosure Agreement is made at {f.signPlace || "__________"} on {formatDate(f.signDate)} and shall be effective from {formatDate(f.effectiveDate)} by and between:
          </p>
          <div className="border bg-gray-50 p-3 my-3">
            <p className="mb-3 text-justify">
              <strong>Disclosing Party:</strong> {f.disclosingName}, {f.disclosingType}, having address at {f.disclosingAddress}
              {f.disclosingId ? `, ID/PAN/CIN: ${f.disclosingId}` : ""}.
            </p>
            <p className="text-justify">
              <strong>Receiving Party:</strong> {f.receivingName}, {f.receivingType}, having address at {f.receivingAddress}
              {f.receivingId ? `, ID/PAN/CIN: ${f.receivingId}` : ""}.
            </p>
          </div>
          <p className="mb-3 text-justify">{mutualText()}</p>
          <p className={clauseCls}>1. Purpose</p>
          <p className="mb-3 text-justify">
            The confidential information is being disclosed for the following purpose: {f.purpose}
          </p>
          <p className={clauseCls}>2. Confidential Information</p>
          <p className="mb-3 text-justify">
            Confidential information may include: {f.confInfo}
          </p>
          <p className={clauseCls}>3. Obligations of Receiving Party</p>
          <p className="mb-3 text-justify">
            The receiving party shall keep the confidential information
            confidential, use it only for the stated purpose, restrict access
            to persons who need to know it, and take reasonable care to prevent
            unauthorized disclosure.
          </p>
          <p className={clauseCls}>4. Exclusions</p>
          <p className="mb-3 text-justify">
            The following shall not be treated as confidential information: {f.exclusions}
          </p>
          <p className={clauseCls}>5. Term and Confidentiality Period</p>
          <p className="mb-3 text-justify">
            This agreement shall remain valid for {f.agreementTerm}. Confidentiality obligations shall continue for {f.confPeriod}, unless a longer period is required by law or written agreement.
          </p>
          <p className={clauseCls}>6. Return or Destruction</p>
          <p className="mb-3 text-justify">
            Upon request or termination, confidential information shall be handled as follows: {f.returnInfo}.
          </p>
          <p className={clauseCls}>7. No Ownership Transfer</p>
          <p className="mb-3 text-justify">
            All confidential information shall remain the property of the
            disclosing party. No license, ownership or intellectual property
            right is granted except for limited use for the stated purpose.
          </p>
          <p className={clauseCls}>8. Legal Disclosure</p>
          <p className="mb-3 text-justify">
            If disclosure is required by law, court, regulator or authority,
            the receiving party shall, where legally permitted, inform the
            disclosing party and limit disclosure to the extent required.
          </p>
          <p className={clauseCls}>9. Jurisdiction</p>
          <p className="mb-3 text-justify">
            This draft shall be governed as per {f.jurisdiction}, subject to final legal review and applicable law.
          </p>
          <p className={clauseCls}>10. Additional Terms</p>
          <p className="mb-3 text-justify whitespace-pre-line">{f.additionalTerms}</p>
          <p className="mb-3 text-justify">
            IN WITNESS WHEREOF, the parties have agreed to execute this draft
            agreement on the date and place mentioned above.
          </p>
          <div className="flex flex-col sm:flex-row justify-between gap-5 mt-10 font-sans text-xs">
            <div>
              <strong>Disclosing Party</strong>
              <br />
              <br />
              <br />
              _______________________
              <br />
              {f.sign1}
              <br />
              {f.disclosingName}
            </div>
            <div>
              <strong>Receiving Party</strong>
              <br />
              <br />
              <br />
              _______________________
              <br />
              {f.sign2}
              <br />
              {f.receivingName}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <div className="bg-white border rounded-lg p-3 text-sm">
            <strong className="block text-primary mb-1">NDA Type</strong>
            {f.ndaType}
          </div>
          <div className="bg-white border rounded-lg p-3 text-sm">
            <strong className="block text-primary mb-1">Disclosing Party</strong>
            {f.disclosingName}
          </div>
          <div className="bg-white border rounded-lg p-3 text-sm">
            <strong className="block text-primary mb-1">Receiving Party</strong>
            {f.receivingName}
          </div>
          <div className="bg-white border rounded-lg p-3 text-sm">
            <strong className="block text-primary mb-1">Confidentiality Period</strong>
            {f.confPeriod}
          </div>
        </div>
      </PreviewBox>
    </ToolCard>
  );
}
