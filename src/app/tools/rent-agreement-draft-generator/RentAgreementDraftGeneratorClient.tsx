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

const money = (n: string | number) =>
  "INR " + Number(n || 0).toLocaleString("en-IN");

const formatDate = (d: string) => {
  if (!d) return "__________";
  return new Date(d + "T00:00:00").toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const defaults = {
  agreementType: "Rent Agreement",
  purpose: "Residential Use",
  ownerName: "Owner Name",
  ownerGuardian: "",
  ownerId: "",
  ownerAddress: "Owner address",
  tenantName: "Tenant Name",
  tenantType: "Individual",
  tenantId: "",
  tenantAddress: "Tenant address",
  propertyAddress: "Full property address",
  propertyDesc: "Office / Shop / Flat / Premises",
  areaDetails: "",
  rent: "25000",
  deposit: "50000",
  startDate: "",
  endDate: "",
  lockIn: "Not applicable / As mutually agreed",
  notice: "30 days",
  dueDate: "On or before 7th day of each month",
  escalation: "As mutually agreed / Not applicable",
  utilities: "To be borne by tenant as per actuals",
  maintenance: "As mutually agreed between parties",
  stamp: "To be borne as mutually agreed between the parties",
  subletting: "Not allowed without written consent",
  additionalTerms:
    "The tenant shall use the premises only for the permitted purpose and shall not carry out unlawful activities. The parties may add specific clauses as per their mutual understanding.",
  signPlace: "Delhi",
  signDate: "",
  witness1: "",
  witness2: "",
};

export default function RentAgreementDraftGeneratorClient() {
  const [form, setForm] = useState(defaults);

  const set = (key: keyof typeof defaults) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const f = form;
  const clauseCls = "font-bold uppercase mt-4";

  const downloadPdf = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF("p", "mm", "a4");
    let y = 18;
    const margin = 16;
    doc.setFont("times", "bold");
    doc.setFontSize(14);
    doc.text(f.agreementType.toUpperCase(), 105, y, { align: "center" });
    y += 10;
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    const paras = [
      `This ${f.agreementType} is made at ${f.signPlace || "__________"} on ${formatDate(f.signDate)} by and between:`,
      `Owner / Landlord: ${f.ownerName}${f.ownerGuardian ? ", " + f.ownerGuardian : ""}, address: ${f.ownerAddress}${f.ownerId ? ", ID/PAN: " + f.ownerId : ""}.`,
      `Tenant / Licensee: ${f.tenantName}, ${f.tenantType}, address: ${f.tenantAddress}${f.tenantId ? ", ID/PAN/CIN: " + f.tenantId : ""}.`,
      `Property / Premises: ${f.propertyAddress}. Description: ${f.propertyDesc}${f.areaDetails ? ", " + f.areaDetails : ""}.`,
      `Purpose of Use: ${f.purpose}.`,
      `Term: From ${formatDate(f.startDate)} to ${formatDate(f.endDate)}, unless terminated earlier as per agreed terms.`,
      `Rent and Deposit: Monthly rent shall be ${money(f.rent)}, payable ${f.dueDate}. Refundable security deposit shall be ${money(f.deposit)}, subject to agreed adjustment.`,
      `Lock-in and Notice: Lock-in period: ${f.lockIn}. Notice period: ${f.notice}.`,
      `Utilities and Maintenance: Electricity/utilities: ${f.utilities}. Maintenance: ${f.maintenance}.`,
      `Escalation: ${f.escalation}.`,
      `Subletting: ${f.subletting}.`,
      `Stamp Duty / Registration: ${f.stamp}. Parties should verify applicable state requirements before execution.`,
      `Additional Terms: ${f.additionalTerms}`,
      `The tenant shall maintain the premises in good condition, ordinary wear and tear excepted, and hand over peaceful possession after clearing agreed dues.`,
      `Important Note: This is a general draft format. Verify legal, stamp duty, registration and state-specific requirements before signing.`,
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
    doc.text("Owner / Landlord", margin, y);
    doc.text("Tenant / Licensee", 118, y);
    y += 22;
    doc.text("_______________________", margin, y);
    doc.text("_______________________", 118, y);
    y += 6;
    doc.text(f.ownerName || "Owner Name", margin, y);
    doc.text(f.tenantName || "Tenant Name", 118, y);
    y += 18;
    doc.text("Witness 1: _______________________", margin, y);
    doc.text("Witness 2: _______________________", 118, y);
    y += 12;
    doc.setFontSize(9);
    doc.setTextColor(96, 112, 141);
    doc.text(
      "Generated free at registrationseva.com. Verify all details before official use.",
      margin,
      y
    );
    doc.save("rent-agreement-draft.pdf");
  };

  return (
    <ToolCard>
      <h2 className="text-2xl font-bold text-primary mb-2">
        Create Rent Agreement Draft
      </h2>
      <p className="text-gray-600 text-sm mb-6">
        Fill the details, review the draft and download a PDF. The draft should
        be verified before signing or registration.
      </p>

      <FormSection title="Agreement Type">
        <FieldGrid>
          <Field label="Agreement Format">
            <select className={selectCls} value={f.agreementType} onChange={set("agreementType")}>
              <option>Rent Agreement</option>
              <option>Leave and License Agreement</option>
              <option>Commercial Rent Agreement</option>
              <option>Virtual Office / Business Address Agreement Draft</option>
            </select>
          </Field>
          <Field label="Purpose / Use">
            <select className={selectCls} value={f.purpose} onChange={set("purpose")}>
              <option>Residential Use</option>
              <option>Commercial / Office Use</option>
              <option>Business Registration / GST Address Use</option>
              <option>Warehouse / Storage Use</option>
              <option>Other Permitted Use</option>
            </select>
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Owner / Landlord Details">
        <FieldGrid>
          <Field label="Owner / Landlord Name">
            <input className={inputCls} value={f.ownerName} onChange={set("ownerName")} />
          </Field>
          <Field label="Owner Father/Spouse Name">
            <input className={inputCls} value={f.ownerGuardian} placeholder="Optional" onChange={set("ownerGuardian")} />
          </Field>
          <Field label="Owner PAN / ID">
            <input className={inputCls} value={f.ownerId} placeholder="PAN / Aadhaar / ID, if required" onChange={set("ownerId")} />
          </Field>
          <Field label="Owner Address" full>
            <textarea className={textareaCls} value={f.ownerAddress} onChange={set("ownerAddress")} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Tenant / Licensee Details">
        <FieldGrid>
          <Field label="Tenant / Licensee Name">
            <input className={inputCls} value={f.tenantName} onChange={set("tenantName")} />
          </Field>
          <Field label="Tenant Type">
            <select className={selectCls} value={f.tenantType} onChange={set("tenantType")}>
              <option>Individual</option>
              <option>Proprietorship</option>
              <option>Partnership Firm</option>
              <option>LLP</option>
              <option>Private Limited Company</option>
              <option>Other Entity</option>
            </select>
          </Field>
          <Field label="Tenant PAN / ID / CIN">
            <input className={inputCls} value={f.tenantId} placeholder="PAN / CIN / ID, if required" onChange={set("tenantId")} />
          </Field>
          <Field label="Tenant Address" full>
            <textarea className={textareaCls} value={f.tenantAddress} onChange={set("tenantAddress")} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Property Details">
        <FieldGrid>
          <Field label="Property / Premises Address" full>
            <textarea className={textareaCls} value={f.propertyAddress} onChange={set("propertyAddress")} />
          </Field>
          <Field label="Property Description">
            <input className={inputCls} value={f.propertyDesc} onChange={set("propertyDesc")} />
          </Field>
          <Field label="Area / Unit Details">
            <input className={inputCls} value={f.areaDetails} placeholder="Area, floor, unit no., shop no. etc." onChange={set("areaDetails")} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Commercial Terms">
        <FieldGrid>
          <Field label="Monthly Rent (INR)">
            <input type="number" className={inputCls} value={f.rent} onChange={set("rent")} />
          </Field>
          <Field label="Security Deposit (INR)">
            <input type="number" className={inputCls} value={f.deposit} onChange={set("deposit")} />
          </Field>
          <Field label="Agreement Start Date">
            <input type="date" className={inputCls} value={f.startDate} onChange={set("startDate")} />
          </Field>
          <Field label="Agreement End Date">
            <input type="date" className={inputCls} value={f.endDate} onChange={set("endDate")} />
          </Field>
          <Field label="Lock-in Period">
            <input className={inputCls} value={f.lockIn} onChange={set("lockIn")} />
          </Field>
          <Field label="Notice Period">
            <input className={inputCls} value={f.notice} onChange={set("notice")} />
          </Field>
          <Field label="Rent Due Date">
            <input className={inputCls} value={f.dueDate} onChange={set("dueDate")} />
          </Field>
          <Field label="Annual Increase / Escalation">
            <input className={inputCls} value={f.escalation} onChange={set("escalation")} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Other Terms">
        <FieldGrid>
          <Field label="Electricity / Utility Charges">
            <input className={inputCls} value={f.utilities} onChange={set("utilities")} />
          </Field>
          <Field label="Maintenance Charges">
            <input className={inputCls} value={f.maintenance} onChange={set("maintenance")} />
          </Field>
          <Field label="Stamp Duty / Registration Charges">
            <input className={inputCls} value={f.stamp} onChange={set("stamp")} />
          </Field>
          <Field label="Subletting">
            <select className={selectCls} value={f.subletting} onChange={set("subletting")}>
              <option>Not allowed without written consent</option>
              <option>Allowed with prior written consent</option>
              <option>Not applicable</option>
            </select>
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
          <Field label="Witness 1 Name">
            <input className={inputCls} value={f.witness1} placeholder="Optional" onChange={set("witness1")} />
          </Field>
          <Field label="Witness 2 Name">
            <input className={inputCls} value={f.witness2} placeholder="Optional" onChange={set("witness2")} />
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
            {f.agreementType}
          </h2>
          <p className="mb-3 text-justify">
            This {f.agreementType.toLowerCase()} is made at {f.signPlace || "__________"} on {formatDate(f.signDate)} by and between:
          </p>
          <div className="border bg-gray-50 p-3 my-3">
            <p className="mb-3 text-justify">
              <strong>Owner / Landlord:</strong> {f.ownerName}
              {f.ownerGuardian ? `, ${f.ownerGuardian}` : ""}, having address at {f.ownerAddress}
              {f.ownerId ? `, ID/PAN: ${f.ownerId}` : ""}.
            </p>
            <p className="text-justify">
              <strong>Tenant / Licensee:</strong> {f.tenantName}, {f.tenantType}, having address at {f.tenantAddress}
              {f.tenantId ? `, ID/PAN/CIN: ${f.tenantId}` : ""}.
            </p>
          </div>
          <p className="mb-3 text-justify">
            The Owner agrees to let out and the Tenant agrees to take on
            rent/license the property described below, subject to the terms
            mentioned in this draft agreement.
          </p>
          <p className={clauseCls}>1. Property / Premises</p>
          <p className="mb-3 text-justify">
            The premises covered under this agreement are situated at {f.propertyAddress}. Property description: {f.propertyDesc}
            {f.areaDetails ? `, ${f.areaDetails}` : ""}.
          </p>
          <p className={clauseCls}>2. Purpose of Use</p>
          <p className="mb-3 text-justify">
            The premises shall be used for {f.purpose.toLowerCase()} and for no unlawful purpose.
          </p>
          <p className={clauseCls}>3. Term</p>
          <p className="mb-3 text-justify">
            This agreement shall commence from {formatDate(f.startDate)} and shall remain valid until {formatDate(f.endDate)}, unless terminated earlier in accordance with the agreed notice period or mutual understanding of the parties.
          </p>
          <p className={clauseCls}>4. Rent and Security Deposit</p>
          <p className="mb-3 text-justify">
            The monthly rent shall be {money(f.rent)}, payable {f.dueDate}. The tenant shall pay a refundable security deposit of {money(f.deposit)}, subject to adjustment against unpaid dues, damages or other agreed deductions at the time of vacation/termination.
          </p>
          <p className={clauseCls}>5. Lock-in and Notice</p>
          <p className="mb-3 text-justify">
            Lock-in period: {f.lockIn}. Either party may terminate the agreement by giving {f.notice} notice, unless otherwise mutually agreed in writing.
          </p>
          <p className={clauseCls}>6. Utilities and Maintenance</p>
          <p className="mb-3 text-justify">
            Electricity and utility charges: {f.utilities}. Maintenance charges: {f.maintenance}.
          </p>
          <p className={clauseCls}>7. Escalation</p>
          <p className="mb-3 text-justify">
            Rent escalation / annual increase shall be: {f.escalation}.
          </p>
          <p className={clauseCls}>8. Subletting</p>
          <p className="mb-3 text-justify">
            Subletting / transfer of possession is {f.subletting.toLowerCase()}.
          </p>
          <p className={clauseCls}>9. Stamp Duty / Registration</p>
          <p className="mb-3 text-justify">
            Stamp duty, registration, notarization and related charges shall be: {f.stamp}. The parties shall verify applicable state requirements before execution.
          </p>
          <p className={clauseCls}>10. Additional Terms</p>
          <p className="mb-3 text-justify whitespace-pre-line">{f.additionalTerms}</p>
          <p className={clauseCls}>11. Handover and Condition</p>
          <p className="mb-3 text-justify">
            The tenant shall maintain the premises in good condition, ordinary
            wear and tear excepted, and shall hand over peaceful possession at
            the time of termination or expiry after clearing agreed dues.
          </p>
          <p className="mb-3 text-justify">
            IN WITNESS WHEREOF, the parties have agreed to execute this draft
            agreement on the date and place mentioned above.
          </p>
          <div className="flex flex-col sm:flex-row justify-between gap-5 mt-10 font-sans text-xs">
            <div>
              <strong>Owner / Landlord</strong>
              <br />
              <br />
              <br />
              _______________________
              <br />
              {f.ownerName}
            </div>
            <div>
              <strong>Tenant / Licensee</strong>
              <br />
              <br />
              <br />
              _______________________
              <br />
              {f.tenantName}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-5 mt-10 font-sans text-xs">
            <div>
              <strong>Witness 1</strong>
              <br />
              <br />
              _______________________
              <br />
              {f.witness1 || "Name"}
            </div>
            <div>
              <strong>Witness 2</strong>
              <br />
              <br />
              _______________________
              <br />
              {f.witness2 || "Name"}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <div className="bg-white border rounded-lg p-3 text-sm">
            <strong className="block text-primary mb-1">Draft Type</strong>
            {f.agreementType}
          </div>
          <div className="bg-white border rounded-lg p-3 text-sm">
            <strong className="block text-primary mb-1">Monthly Rent</strong>
            {money(f.rent)}
          </div>
          <div className="bg-white border rounded-lg p-3 text-sm">
            <strong className="block text-primary mb-1">Security Deposit</strong>
            {money(f.deposit)}
          </div>
          <div className="bg-white border rounded-lg p-3 text-sm">
            <strong className="block text-primary mb-1">Notice Period</strong>
            {f.notice}
          </div>
        </div>
      </PreviewBox>

      <p className="mt-6 text-xs text-gray-500">
        <strong>Important Disclaimer:</strong> This tool is for general draft
        and utility purposes only. Rent agreement terms, stamp duty,
        registration, notarization, address proof acceptance, lock-in,
        termination, dispute resolution and legal enforceability may vary based
        on state, property type, parties, facts and professional advice. Verify
        the final agreement before signing or official use.
      </p>
    </ToolCard>
  );
}
