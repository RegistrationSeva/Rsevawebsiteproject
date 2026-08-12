"use client";
import React, { useState } from "react";
import {
  ToolCard,
  FormSection,
  FieldGrid,
  Field,
  TotalRow,
  PreviewBox,
  inputCls,
  selectCls,
  textareaCls,
  btnPrimary,
  btnSecondary,
  btnOutline,
  btnDanger,
  fmtINR,
} from "@/components/tools/fields";

interface Row {
  desc: string;
  qty: number;
  rate: number;
}

const defaultRows: Row[] = [
  { desc: "Service / Deliverable 1", qty: 1, rate: 10000 },
  { desc: "Service / Deliverable 2", qty: 1, rate: 5000 },
];

const money = (n: number | string) => `INR ${fmtINR(n)}`;

const formatDate = (d: string) => {
  if (!d) return "-";
  return new Date(d + "T00:00:00").toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export default function ClientProposalGeneratorClient() {
  const [businessName, setBusinessName] = useState("Your Business Name");
  const [businessContact, setBusinessContact] = useState(
    "enquiry@registrationseva.com | +91 9999395031"
  );
  const [businessAddress, setBusinessAddress] = useState("Business address");
  const [clientName, setClientName] = useState("Client Name");
  const [clientContact, setClientContact] = useState("");
  const [clientAddress, setClientAddress] = useState("Client address");
  const [proposalTitle, setProposalTitle] = useState("Service Proposal");
  const [proposalNo, setProposalNo] = useState("PROP-001");
  const [proposalDate, setProposalDate] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [preparedBy, setPreparedBy] = useState("Authorized Person");
  const [proposalType, setProposalType] = useState("Service Proposal");
  const [overview, setOverview] = useState(
    "This proposal outlines the scope, deliverables, timeline and commercial terms for the proposed services."
  );
  const [scope, setScope] = useState(
    "1. Understanding client requirements\n2. Planning and execution of agreed services\n3. Regular updates and coordination\n4. Delivery of agreed outputs"
  );
  const [deliverables, setDeliverables] = useState(
    "1. Project deliverable 1\n2. Project deliverable 2\n3. Final output / report / document / service completion"
  );
  const [timeline, setTimeline] = useState(
    "Estimated timeline: 7 to 15 working days from confirmation and receipt of required information."
  );
  const [pricingType, setPricingType] = useState("Non-GST Proposal");
  const [gstRate, setGstRate] = useState(18);
  const [rows, setRows] = useState<Row[]>(defaultRows);
  const [paymentTerms, setPaymentTerms] = useState(
    "50% advance payment and balance before final delivery, unless otherwise agreed in writing."
  );
  const [assumptions, setAssumptions] = useState(
    "This proposal is based on information currently available. Any additional work, change in scope, third-party fee, government fee, travel, subscription or out-of-pocket expense shall be charged separately, if applicable."
  );
  const [terms, setTerms] = useState(
    "Work will begin after written confirmation and receipt of required details/payment. Timelines may change if client inputs, approvals or documents are delayed."
  );
  const [acceptance, setAcceptance] = useState(
    "By signing below, the client confirms acceptance of the proposal scope, pricing and terms mentioned above."
  );

  const isGst = pricingType.includes("GST");
  const computed = rows.map((r) => ({ ...r, amount: (r.qty || 0) * (r.rate || 0) }));
  const subtotal = computed.reduce((s, r) => s + r.amount, 0);
  const gst = isGst ? (subtotal * (gstRate || 0)) / 100 : 0;
  const total = subtotal + gst;

  const updateRow = (i: number, patch: Partial<Row>) =>
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));

  const reset = () => setRows(defaultRows);

  const downloadPdf = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF("p", "mm", "a4");
    const m = 14;
    doc.setFillColor(15, 74, 137);
    doc.rect(0, 0, 210, 22, "F");
    doc.setFillColor(243, 164, 4);
    doc.rect(0, 22, 210, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text((proposalTitle || "Proposal").toUpperCase(), 105, 14, {
      align: "center",
    });
    let y = 32;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(40, 40, 40);
    const lines = [
      `Proposal No: ${proposalNo} | Date: ${formatDate(proposalDate)} | Valid Until: ${formatDate(validUntil)}`,
      `Prepared By: ${businessName} | ${businessContact}`,
      `Prepared For: ${clientName} | ${clientContact}`,
      `Overview: ${overview}`,
      `Scope of Work: ${scope}`,
      `Deliverables: ${deliverables}`,
      `Timeline: ${timeline}`,
      `Commercial Proposal: Subtotal ${money(subtotal)} | GST ${money(gst)} | Total ${money(total)}`,
      `Payment Terms: ${paymentTerms}`,
      `Assumptions and Exclusions: ${assumptions}`,
      `Terms and Conditions: ${terms}`,
      `Acceptance: ${acceptance}`,
    ];
    lines.forEach((p) => {
      const split = doc.splitTextToSize(p, 182);
      if (y + split.length * 5 > 280) {
        doc.addPage();
        y = 16;
      }
      doc.text(split, m, y);
      y += split.length * 5 + 4;
    });
    if (y > 245) {
      doc.addPage();
      y = 30;
    }
    y += 12;
    doc.text("For " + businessName, m, y);
    doc.text("Accepted by Client", 120, y);
    y += 24;
    doc.text("_______________________", m, y);
    doc.text("_______________________", 120, y);
    y += 6;
    doc.text(preparedBy, m, y);
    doc.text(clientName, 120, y);
    doc.setTextColor(96, 112, 141);
    doc.text(
      "Generated free at registrationseva.com. Verify all details before official use.",
      m,
      287
    );
    doc.save("client-proposal.pdf");
  };

  return (
    <ToolCard>
      <h2 className="text-2xl font-bold text-primary mb-2">
        Create Client Proposal
      </h2>
      <p className="text-gray-600 text-sm mb-6">
        Fill proposal details, add pricing rows, review the live preview and
        download a PDF.
      </p>

      <FormSection title="Business / Proposer Details">
        <FieldGrid>
          <Field label="Business Name">
            <input className={inputCls} value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
          </Field>
          <Field label="Email / Phone">
            <input className={inputCls} value={businessContact} onChange={(e) => setBusinessContact(e.target.value)} />
          </Field>
          <Field label="Business Address" full>
            <textarea className={textareaCls} value={businessAddress} onChange={(e) => setBusinessAddress(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Client Details">
        <FieldGrid>
          <Field label="Client Name">
            <input className={inputCls} value={clientName} onChange={(e) => setClientName(e.target.value)} />
          </Field>
          <Field label="Client Contact">
            <input className={inputCls} value={clientContact} placeholder="Email / phone, optional" onChange={(e) => setClientContact(e.target.value)} />
          </Field>
          <Field label="Client Address" full>
            <textarea className={textareaCls} value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Proposal Details">
        <FieldGrid>
          <Field label="Proposal Title">
            <input className={inputCls} value={proposalTitle} onChange={(e) => setProposalTitle(e.target.value)} />
          </Field>
          <Field label="Proposal Number">
            <input className={inputCls} value={proposalNo} onChange={(e) => setProposalNo(e.target.value)} />
          </Field>
          <Field label="Proposal Date">
            <input type="date" className={inputCls} value={proposalDate} onChange={(e) => setProposalDate(e.target.value)} />
          </Field>
          <Field label="Valid Until">
            <input type="date" className={inputCls} value={validUntil} onChange={(e) => setValidUntil(e.target.value)} />
          </Field>
          <Field label="Prepared By">
            <input className={inputCls} value={preparedBy} onChange={(e) => setPreparedBy(e.target.value)} />
          </Field>
          <Field label="Proposal Type">
            <select className={selectCls} value={proposalType} onChange={(e) => setProposalType(e.target.value)}>
              <option>Service Proposal</option>
              <option>Consulting Proposal</option>
              <option>Freelance Proposal</option>
              <option>Agency Proposal</option>
              <option>Project Proposal</option>
              <option>Custom Proposal</option>
            </select>
          </Field>
          <Field label="Project / Service Overview" full>
            <textarea className={textareaCls} value={overview} onChange={(e) => setOverview(e.target.value)} />
          </Field>
          <Field label="Scope of Work" full>
            <textarea className={textareaCls} value={scope} onChange={(e) => setScope(e.target.value)} />
          </Field>
          <Field label="Deliverables" full>
            <textarea className={textareaCls} value={deliverables} onChange={(e) => setDeliverables(e.target.value)} />
          </Field>
          <Field label="Timeline / Milestones" full>
            <textarea className={textareaCls} value={timeline} onChange={(e) => setTimeline(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Pricing">
        <FieldGrid>
          <Field label="Pricing Type">
            <select className={selectCls} value={pricingType} onChange={(e) => setPricingType(e.target.value)}>
              <option>Non-GST Proposal</option>
              <option>GST Proposal - CGST + SGST</option>
              <option>GST Proposal - IGST</option>
            </select>
          </Field>
          <Field label="Default GST Rate %">
            <input type="number" className={inputCls} value={gstRate} onChange={(e) => setGstRate(+e.target.value)} />
          </Field>
        </FieldGrid>
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm border-collapse min-w-[560px]">
            <thead>
              <tr className="bg-primary/5 text-primary">
                <th className="p-2 text-left font-semibold">Service / Item</th>
                <th className="p-2 font-semibold">Qty</th>
                <th className="p-2 font-semibold">Rate</th>
                <th className="p-2 font-semibold">Amount</th>
                <th className="p-2 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-b">
                  <td className="p-1">
                    <input className={inputCls} value={r.desc} onChange={(e) => updateRow(i, { desc: e.target.value })} />
                  </td>
                  <td className="p-1 w-20">
                    <input type="number" className={inputCls} value={r.qty} onChange={(e) => updateRow(i, { qty: +e.target.value })} />
                  </td>
                  <td className="p-1 w-28">
                    <input type="number" className={inputCls} value={r.rate} onChange={(e) => updateRow(i, { rate: +e.target.value })} />
                  </td>
                  <td className="p-1 text-center whitespace-nowrap">{money(computed[i].amount)}</td>
                  <td className="p-1 text-center">
                    <button type="button" className={btnDanger} onClick={() => setRows((prev) => prev.filter((_, idx) => idx !== i))}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <button type="button" className={btnSecondary} onClick={() => setRows((prev) => [...prev, { desc: "Service / Deliverable", qty: 1, rate: 10000 }])}>
            Add Row
          </button>
        </div>
        <div className="mt-5 max-w-sm ml-auto">
          <TotalRow label="Subtotal" value={money(subtotal)} />
          <TotalRow label={`GST @ ${gstRate}%`} value={money(gst)} />
          <TotalRow label="Valid Until" value={formatDate(validUntil)} />
          <TotalRow label="Total" value={money(total)} grand />
        </div>
      </FormSection>

      <FormSection title="Terms">
        <FieldGrid>
          <Field label="Payment Terms" full>
            <textarea className={textareaCls} value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value)} />
          </Field>
          <Field label="Assumptions and Exclusions" full>
            <textarea className={textareaCls} value={assumptions} onChange={(e) => setAssumptions(e.target.value)} />
          </Field>
          <Field label="Terms and Conditions" full>
            <textarea className={textareaCls} value={terms} onChange={(e) => setTerms(e.target.value)} />
          </Field>
          <Field label="Acceptance Text" full>
            <textarea className={textareaCls} value={acceptance} onChange={(e) => setAcceptance(e.target.value)} />
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
        <div className="max-w-[900px] mx-auto border bg-white p-6 md:p-10 text-sm leading-relaxed">
          <h2 className="text-center text-xl font-bold uppercase tracking-wide text-primary mb-2">
            {proposalTitle}
          </h2>
          <p className="text-center text-gray-600">
            Proposal No: {proposalNo} | Date: {formatDate(proposalDate)} | Valid
            Until: {formatDate(validUntil)}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="border border-gray-300 bg-gray-50 p-3">
              <strong className="text-primary">Prepared By</strong>
              <br />
              {businessName}
              <br />
              {businessContact}
              <br />
              <span className="whitespace-pre-line">{businessAddress}</span>
            </div>
            <div className="border border-gray-300 bg-gray-50 p-3">
              <strong className="text-primary">Prepared For</strong>
              <br />
              {clientName}
              <br />
              {clientContact}
              <br />
              <span className="whitespace-pre-line">{clientAddress}</span>
            </div>
          </div>
          <h3 className="font-semibold text-primary mt-5 mb-2">1. Project Overview</h3>
          <p className="whitespace-pre-line">{overview}</p>
          <h3 className="font-semibold text-primary mt-5 mb-2">2. Scope of Work</h3>
          <p className="whitespace-pre-line">{scope}</p>
          <h3 className="font-semibold text-primary mt-5 mb-2">3. Deliverables</h3>
          <p className="whitespace-pre-line">{deliverables}</p>
          <h3 className="font-semibold text-primary mt-5 mb-2">4. Timeline</h3>
          <p className="whitespace-pre-line">{timeline}</p>
          <h3 className="font-semibold text-primary mt-5 mb-2">5. Commercial Proposal</h3>
          <table className="w-full border-collapse my-3">
            <thead>
              <tr className="bg-primary/5 text-primary">
                <th className="border border-gray-300 p-2 text-left">Service / Item</th>
                <th className="border border-gray-300 p-2">Qty</th>
                <th className="border border-gray-300 p-2">Rate</th>
                <th className="border border-gray-300 p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {computed.map((r, i) => (
                <tr key={i}>
                  <td className="border border-gray-300 p-2">{i + 1}. {r.desc}</td>
                  <td className="border border-gray-300 p-2 text-center">{r.qty}</td>
                  <td className="border border-gray-300 p-2 text-center">{money(r.rate)}</td>
                  <td className="border border-gray-300 p-2 text-right">{money(r.amount)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={3} className="border border-gray-300 p-2"><strong>Subtotal</strong></td>
                <td className="border border-gray-300 p-2 text-right">{money(subtotal)}</td>
              </tr>
              {isGst && (
                <tr>
                  <td colSpan={3} className="border border-gray-300 p-2"><strong>GST @ {gstRate}%</strong></td>
                  <td className="border border-gray-300 p-2 text-right">{money(gst)}</td>
                </tr>
              )}
              <tr>
                <td colSpan={3} className="border border-gray-300 p-2"><strong>Total Proposal Value</strong></td>
                <td className="border border-gray-300 p-2 text-right"><strong>{money(total)}</strong></td>
              </tr>
            </tbody>
          </table>
          <h3 className="font-semibold text-primary mt-5 mb-2">6. Payment Terms</h3>
          <p className="whitespace-pre-line">{paymentTerms}</p>
          <h3 className="font-semibold text-primary mt-5 mb-2">7. Assumptions and Exclusions</h3>
          <p className="whitespace-pre-line">{assumptions}</p>
          <h3 className="font-semibold text-primary mt-5 mb-2">8. Terms and Conditions</h3>
          <p className="whitespace-pre-line">{terms}</p>
          <h3 className="font-semibold text-primary mt-5 mb-2">9. Acceptance</h3>
          <p className="whitespace-pre-line">{acceptance}</p>
          <div className="flex flex-col sm:flex-row justify-between gap-5 mt-10 text-[13px]">
            <div>
              <strong>For {businessName}</strong>
              <br />
              <br />
              <br />
              _______________________
              <br />
              {preparedBy}
            </div>
            <div>
              <strong>Accepted by Client</strong>
              <br />
              <br />
              <br />
              _______________________
              <br />
              {clientName}
            </div>
          </div>
        </div>
      </PreviewBox>
    </ToolCard>
  );
}
