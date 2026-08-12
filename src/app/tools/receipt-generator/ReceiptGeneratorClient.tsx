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
  textareaCls,
  btnPrimary,
  btnOutline,
} from "@/components/tools/fields";

const fmt = (n: number) =>
  (Math.round((n + Number.EPSILON) * 100) / 100).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const todayISO = () => new Date().toISOString().slice(0, 10);

export default function ReceiptGeneratorClient() {
  const [businessName, setBusinessName] = useState("Demo Services Pvt Ltd");
  const [businessContact, setBusinessContact] = useState("contact@example.com | +91 9999999999");
  const [businessGstin, setBusinessGstin] = useState("");
  const [businessAddress, setBusinessAddress] = useState("New Delhi, India");
  const [receiptType, setReceiptType] = useState("Payment Receipt");
  const [receiptNo, setReceiptNo] = useState("REC-001");
  const [receiptDate, setReceiptDate] = useState("");
  const [paymentMode, setPaymentMode] = useState("UPI");
  const [paymentRef, setPaymentRef] = useState("UPI123456789");
  const [invoiceRef, setInvoiceRef] = useState("INV-001");
  const [payerName, setPayerName] = useState("ABC Enterprises");
  const [payerContact, setPayerContact] = useState("customer@example.com");
  const [amountReceived, setAmountReceived] = useState(10000);
  const [deduction, setDeduction] = useState(0);
  const [dueAmount, setDueAmount] = useState(10000);
  const [receivedBy, setReceivedBy] = useState("Authorized Representative");
  const [payerAddress, setPayerAddress] = useState("Mumbai, Maharashtra");
  const [paymentPurpose, setPaymentPurpose] = useState(
    "Payment received against professional services / invoice reference mentioned above."
  );
  const [receiptNotes, setReceiptNotes] = useState(
    "This receipt confirms payment received subject to realization of cheque/bank transaction, where applicable."
  );

  useEffect(() => {
    setReceiptDate(todayISO());
  }, []);

  const amount = amountReceived || 0;
  const ded = deduction || 0;
  const due = dueAmount || 0;
  const totalAcknowledged = amount + ded;
  const balance = Math.max(0, due - totalAcknowledged);

  const reset = () => {
    setBusinessName("Demo Services Pvt Ltd");
    setBusinessContact("contact@example.com | +91 9999999999");
    setBusinessGstin("");
    setBusinessAddress("New Delhi, India");
    setReceiptType("Payment Receipt");
    setReceiptNo("REC-001");
    setReceiptDate(todayISO());
    setPaymentMode("UPI");
    setPaymentRef("UPI123456789");
    setInvoiceRef("INV-001");
    setPayerName("ABC Enterprises");
    setPayerContact("customer@example.com");
    setAmountReceived(10000);
    setDeduction(0);
    setDueAmount(10000);
    setReceivedBy("Authorized Representative");
    setPayerAddress("Mumbai, Maharashtra");
    setPaymentPurpose(
      "Payment received against professional services / invoice reference mentioned above."
    );
    setReceiptNotes(
      "This receipt confirms payment received subject to realization of cheque/bank transaction, where applicable."
    );
  };

  const downloadPdf = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF("p", "pt", "a4");
    const m = 42;
    const w = 511;
    let y = 44;
    const wrap = (text: string, x: number, yy: number, width: number, lineGap = 13) => {
      const lines = doc.splitTextToSize(String(text || ""), width);
      doc.text(lines, x, yy);
      return yy + lines.length * lineGap;
    };
    doc.setFillColor(15, 74, 137);
    doc.rect(m, y, w, 58, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(businessName || "Business Name", m + 15, y + 24);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.text(
      doc.splitTextToSize(
        (businessAddress || "") +
          (businessContact ? " | " + businessContact : "") +
          (businessGstin ? " | GSTIN: " + businessGstin : ""),
        w - 30
      ),
      m + 15,
      y + 43
    );
    y += 88;
    doc.setTextColor(15, 74, 137);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(19);
    doc.text(receiptType || "Payment Receipt", m, y);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(40, 40, 40);
    doc.text("Receipt No: " + (receiptNo || "-"), 390, y - 6);
    doc.text("Date: " + (receiptDate || "-"), 390, y + 10);
    y += 36;
    doc.setFont("helvetica", "bold");
    doc.text("Received From:", m, y);
    doc.setFont("helvetica", "normal");
    y = wrap(
      (payerName || "Payer") +
        "\n" +
        (payerAddress || "") +
        (payerContact ? "\n" + payerContact : ""),
      m,
      y + 15,
      250,
      11
    );
    y += 16;
    doc.setFillColor(15, 74, 137);
    doc.rect(m, y, w, 128, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Payment Summary", m + 15, y + 20);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    let sy = y + 43;
    const row = (label: string, value: number, bold = false) => {
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.text(label, m + 15, sy);
      doc.text("INR " + fmt(value), m + w - 15, sy, { align: "right" });
      sy += 18;
    };
    row("Amount Received", amount);
    row("TDS / Deduction", ded);
    row("Total Acknowledged", totalAcknowledged, true);
    row("Total Due / Invoice Amount", due);
    row("Balance, if any", balance, true);
    y += 152;
    doc.setTextColor(40, 40, 40);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Payment Mode: " + (paymentMode || "-"), m, y);
    y += 16;
    doc.text("Reference No.: " + (paymentRef || "-"), m, y);
    y += 16;
    doc.text("Invoice / Bill Ref.: " + (invoiceRef || "-"), m, y);
    y += 24;
    y = wrap("Payment Against: " + (paymentPurpose || "-"), m, y, w, 12);
    y += 8;
    y = wrap("Notes: " + (receiptNotes || "-"), m, y, w, 12);
    y += 28;
    doc.setFont("helvetica", "bold");
    doc.text("Received By: " + (receivedBy || "-"), m, y);
    doc.setTextColor(96, 112, 141);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(
      "Generated free at registrationseva.com. Verify all details before official use.",
      m,
      775
    );
    doc.save("receipt-" + (receiptNo || "RegistrationSeva") + ".pdf");
  };

  return (
    <ToolCard>
      <h2 className="text-2xl font-bold text-primary mb-2">Create Payment Receipt</h2>
      <p className="text-gray-600 text-sm mb-6">
        Fill the details below, preview the receipt and download a clean PDF
        for your records.
      </p>

      <FormSection title="Business Details">
        <FieldGrid>
          <Field label="Business Name">
            <input className={inputCls} value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
          </Field>
          <Field label="Email / Phone">
            <input className={inputCls} value={businessContact} onChange={(e) => setBusinessContact(e.target.value)} />
          </Field>
          <Field label="GSTIN, if any">
            <input className={inputCls} value={businessGstin} placeholder="Optional" onChange={(e) => setBusinessGstin(e.target.value)} />
          </Field>
          <Field label="Business Address">
            <input className={inputCls} value={businessAddress} onChange={(e) => setBusinessAddress(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Receipt Details">
        <FieldGrid>
          <Field label="Receipt Type">
            <select className={selectCls} value={receiptType} onChange={(e) => setReceiptType(e.target.value)}>
              <option>Payment Receipt</option>
              <option>Advance Receipt</option>
              <option>Invoice Payment Receipt</option>
              <option>Security Deposit Receipt</option>
            </select>
          </Field>
          <Field label="Receipt No.">
            <input className={inputCls} value={receiptNo} onChange={(e) => setReceiptNo(e.target.value)} />
          </Field>
          <Field label="Receipt Date">
            <input type="date" className={inputCls} value={receiptDate} onChange={(e) => setReceiptDate(e.target.value)} />
          </Field>
          <Field label="Payment Mode">
            <select className={selectCls} value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
              <option>UPI</option>
              <option>Bank Transfer</option>
              <option>Cash</option>
              <option>Cheque</option>
              <option>Card</option>
              <option>Other</option>
            </select>
          </Field>
          <Field label="Reference / Transaction No.">
            <input className={inputCls} value={paymentRef} onChange={(e) => setPaymentRef(e.target.value)} />
          </Field>
          <Field label="Invoice / Bill Ref., if any">
            <input className={inputCls} value={invoiceRef} placeholder="Optional" onChange={(e) => setInvoiceRef(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Payer and Amount Details">
        <FieldGrid>
          <Field label="Received From">
            <input className={inputCls} value={payerName} onChange={(e) => setPayerName(e.target.value)} />
          </Field>
          <Field label="Payer Contact">
            <input className={inputCls} value={payerContact} onChange={(e) => setPayerContact(e.target.value)} />
          </Field>
          <Field label="Amount Received">
            <input type="number" className={inputCls} value={amountReceived} onChange={(e) => setAmountReceived(+e.target.value)} />
          </Field>
          <Field label="TDS / Deduction, if any">
            <input type="number" className={inputCls} value={deduction} onChange={(e) => setDeduction(+e.target.value)} />
          </Field>
          <Field label="Total Invoice / Due Amount, if any">
            <input type="number" className={inputCls} value={dueAmount} onChange={(e) => setDueAmount(+e.target.value)} />
          </Field>
          <Field label="Received By">
            <input className={inputCls} value={receivedBy} onChange={(e) => setReceivedBy(e.target.value)} />
          </Field>
          <Field label="Payer Address" full>
            <textarea className={textareaCls} value={payerAddress} onChange={(e) => setPayerAddress(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Purpose and Notes">
        <FieldGrid>
          <Field label="Payment Against / Purpose">
            <textarea className={textareaCls} value={paymentPurpose} onChange={(e) => setPaymentPurpose(e.target.value)} />
          </Field>
          <Field label="Additional Notes">
            <textarea className={textareaCls} value={receiptNotes} onChange={(e) => setReceiptNotes(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <div className="mb-6 max-w-sm ml-auto">
        <TotalRow label="Amount Received" value={`INR ${fmt(amount)}`} />
        <TotalRow label="TDS / Deduction" value={`INR ${fmt(ded)}`} />
        <TotalRow label="Total Acknowledged" value={`INR ${fmt(totalAcknowledged)}`} />
        <TotalRow label="Total Due / Invoice Amount" value={`INR ${fmt(due)}`} />
        <TotalRow label="Balance, if any" value={`INR ${fmt(balance)}`} grand />
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="button" className={btnPrimary} onClick={downloadPdf}>
          Download Receipt PDF
        </button>
        <button type="button" className={btnOutline} onClick={reset}>
          Reset Form
        </button>
      </div>

      <PreviewBox>
        <div className="max-w-[820px] mx-auto border bg-white p-5 text-sm">
          <div className="flex justify-between gap-4 flex-wrap">
            <div>
              <h3 className="text-lg font-bold text-primary">{businessName || "Business Name"}</h3>
              <p className="text-gray-600">
                {businessAddress}
                <br />
                {businessContact}
                {businessGstin && (
                  <>
                    <br />
                    GSTIN: {businessGstin}
                  </>
                )}
              </p>
            </div>
            <div className="text-right">
              <h3 className="text-lg font-bold text-primary">{receiptType}</h3>
              <p className="text-gray-600">
                No: {receiptNo || "-"}
                <br />
                Date: {receiptDate || "-"}
              </p>
            </div>
          </div>
          <hr className="my-3" />
          <p>
            <b>Received From:</b>
            <br />
            {payerName}
            <br />
            {payerAddress}
            <br />
            {payerContact}
          </p>
          <div className="mt-3 max-w-sm ml-auto">
            <TotalRow label="Amount Received" value={`INR ${fmt(amount)}`} />
            <TotalRow label="TDS / Deduction" value={`INR ${fmt(ded)}`} />
            <TotalRow label="Total Acknowledged" value={`INR ${fmt(totalAcknowledged)}`} />
            <TotalRow label="Total Due / Invoice Amount" value={`INR ${fmt(due)}`} />
            <TotalRow label="Balance, if any" value={`INR ${fmt(balance)}`} grand />
          </div>
          <p className="mt-2">
            <b>Payment Mode:</b> {paymentMode}
          </p>
          <p className="mt-1">
            <b>Reference No.:</b> {paymentRef || "-"}
          </p>
          <p className="mt-1">
            <b>Invoice / Bill Ref.:</b> {invoiceRef || "-"}
          </p>
          <p className="mt-1">
            <b>Payment Against:</b> {paymentPurpose}
          </p>
          <p className="mt-1">
            <b>Notes:</b> {receiptNotes}
          </p>
          <p className="mt-1">
            <b>Received By:</b> {receivedBy}
          </p>
        </div>
      </PreviewBox>
    </ToolCard>
  );
}
