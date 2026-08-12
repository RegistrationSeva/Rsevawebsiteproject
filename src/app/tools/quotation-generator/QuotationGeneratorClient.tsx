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
  btnSecondary,
  btnOutline,
  btnDanger,
} from "@/components/tools/fields";

interface Item {
  desc: string;
  hsn: string;
  qty: number;
  rate: number;
  disc: number;
  gst: number;
}

const defaultItem: Item = {
  desc: "Business Consultancy Services",
  hsn: "9983",
  qty: 1,
  rate: 10000,
  disc: 0,
  gst: 18,
};

const fmt = (n: number) =>
  (Math.round((n + Number.EPSILON) * 100) / 100).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const todayISO = () => new Date().toISOString().slice(0, 10);
const plusDaysISO = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

export default function QuotationGeneratorClient() {
  const [businessName, setBusinessName] = useState("Demo Services Pvt Ltd");
  const [businessContact, setBusinessContact] = useState("contact@example.com");
  const [businessGstin, setBusinessGstin] = useState("");
  const [businessAddress, setBusinessAddress] = useState("New Delhi, India");
  const [quoteType, setQuoteType] = useState("GST Quotation");
  const [gstType, setGstType] = useState("CGST + SGST");
  const [quoteNo, setQuoteNo] = useState("QTN-001");
  const [quoteDate, setQuoteDate] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [preparedBy, setPreparedBy] = useState("Authorized Representative");
  const [customerName, setCustomerName] = useState("ABC Enterprises");
  const [customerContact, setCustomerContact] = useState("customer@example.com");
  const [customerAddress, setCustomerAddress] = useState("Mumbai, Maharashtra");
  const [paymentTerms, setPaymentTerms] = useState(
    "50% advance and balance before delivery or as mutually agreed."
  );
  const [quoteNotes, setQuoteNotes] = useState(
    "This quotation is valid until the mentioned date. Final invoice may vary based on scope, quantity, taxes and agreed terms."
  );
  const [items, setItems] = useState<Item[]>([defaultItem]);

  useEffect(() => {
    setQuoteDate(todayISO());
    setValidUntil(plusDaysISO(15));
  }, []);

  const isNonGst = quoteType === "Non-GST Quotation";

  const computed = items.map((it) => {
    const base = (it.qty || 0) * (it.rate || 0);
    const discount = (base * (it.disc || 0)) / 100;
    const taxable = Math.max(0, base - discount);
    const gstRate = isNonGst ? 0 : it.gst || 0;
    const gstAmt = (taxable * gstRate) / 100;
    return { ...it, base, discount, taxable, gstRate, gstAmt, total: taxable + gstAmt };
  });
  const subTotal = computed.reduce((a, b) => a + b.base, 0);
  const discount = computed.reduce((a, b) => a + b.discount, 0);
  const taxable = computed.reduce((a, b) => a + b.taxable, 0);
  const gst = computed.reduce((a, b) => a + b.gstAmt, 0);
  const total = computed.reduce((a, b) => a + b.total, 0);
  const igst = !isNonGst && gstType === "IGST" ? gst : 0;
  const cgst = !isNonGst && gstType !== "IGST" ? gst / 2 : 0;
  const sgst = cgst;

  const updateItem = (i: number, patch: Partial<Item>) =>
    setItems((prev) => prev.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));

  const reset = () => {
    setBusinessName("Demo Services Pvt Ltd");
    setBusinessContact("contact@example.com");
    setBusinessGstin("");
    setBusinessAddress("New Delhi, India");
    setQuoteType("GST Quotation");
    setGstType("CGST + SGST");
    setQuoteNo("QTN-001");
    setQuoteDate(todayISO());
    setValidUntil(plusDaysISO(15));
    setPreparedBy("Authorized Representative");
    setCustomerName("ABC Enterprises");
    setCustomerContact("customer@example.com");
    setCustomerAddress("Mumbai, Maharashtra");
    setPaymentTerms("50% advance and balance before delivery or as mutually agreed.");
    setQuoteNotes(
      "This quotation is valid until the mentioned date. Final invoice may vary based on scope, quantity, taxes and agreed terms."
    );
    setItems([defaultItem]);
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
    doc.setFontSize(18);
    doc.text(quoteType || "Quotation", m, y);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(40, 40, 40);
    doc.text("Quotation No: " + (quoteNo || "-"), 390, y - 6);
    doc.text("Date: " + (quoteDate || "-"), 390, y + 10);
    doc.text("Valid Until: " + (validUntil || "-"), 390, y + 26);
    y += 36;
    doc.setFont("helvetica", "bold");
    doc.text("Quote To:", m, y);
    doc.setFont("helvetica", "normal");
    y = wrap(
      (customerName || "Customer") +
        "\n" +
        (customerAddress || "") +
        (customerContact ? "\n" + customerContact : ""),
      m,
      y + 15,
      230,
      11
    );
    y += 12;
    doc.setFillColor(243, 164, 4);
    doc.rect(m, y, w, 24, "F");
    doc.setTextColor(32, 32, 32);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Description", m + 8, y + 16);
    doc.text("Qty", m + 255, y + 16, { align: "right" });
    doc.text("Rate", m + 325, y + 16, { align: "right" });
    doc.text("GST", m + 395, y + 16, { align: "right" });
    doc.text("Total", m + w - 8, y + 16, { align: "right" });
    y += 40;
    doc.setFont("helvetica", "normal");
    computed.forEach((it) => {
      if (y > 690) {
        doc.addPage();
        y = 50;
      }
      doc.text(doc.splitTextToSize(it.desc || "-", 190), m + 8, y);
      doc.text(fmt(it.qty), m + 255, y, { align: "right" });
      doc.text("INR " + fmt(it.rate), m + 325, y, { align: "right" });
      doc.text(isNonGst ? "NA" : fmt(it.gstRate) + "%", m + 395, y, { align: "right" });
      doc.text("INR " + fmt(it.total), m + w - 8, y, { align: "right" });
      y += 26;
    });
    y += 12;
    doc.setDrawColor(217, 230, 251);
    doc.line(m, y, m + w, y);
    y += 18;
    doc.setFontSize(10);
    doc.text("Sub Total: INR " + fmt(subTotal), m + w, y, { align: "right" });
    y += 16;
    doc.text("Total Discount: INR " + fmt(discount), m + w, y, { align: "right" });
    y += 16;
    doc.text("Taxable Value: INR " + fmt(taxable), m + w, y, { align: "right" });
    y += 16;
    if (!isNonGst) {
      if (gstType === "IGST") {
        doc.text("IGST: INR " + fmt(igst), m + w, y, { align: "right" });
        y += 16;
      } else {
        doc.text("CGST: INR " + fmt(cgst), m + w, y, { align: "right" });
        y += 16;
        doc.text("SGST: INR " + fmt(sgst), m + w, y, { align: "right" });
        y += 16;
      }
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Quotation Total: INR " + fmt(total), m + w, y + 6, { align: "right" });
    y += 42;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(15, 74, 137);
    y = wrap("Payment Terms: " + (paymentTerms || "-"), m, y, w, 12);
    y += 8;
    y = wrap("Notes: " + (quoteNotes || "-"), m, y, w, 12);
    y += 14;
    doc.setFont("helvetica", "bold");
    doc.text("Prepared By: " + (preparedBy || "-"), m, y);
    doc.setTextColor(96, 112, 141);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(
      "Generated free at registrationseva.com. Verify all details before official use.",
      m,
      775
    );
    doc.save("quotation-" + (quoteNo || "RegistrationSeva") + ".pdf");
  };

  const totalsRows = (
    <>
      <TotalRow label="Sub Total" value={`INR ${fmt(subTotal)}`} />
      <TotalRow label="Total Discount" value={`INR ${fmt(discount)}`} />
      <TotalRow label="Taxable Value" value={`INR ${fmt(taxable)}`} />
      {!isNonGst && gstType === "IGST" && <TotalRow label="IGST" value={`INR ${fmt(igst)}`} />}
      {!isNonGst && gstType !== "IGST" && (
        <>
          <TotalRow label="CGST" value={`INR ${fmt(cgst)}`} />
          <TotalRow label="SGST" value={`INR ${fmt(sgst)}`} />
        </>
      )}
      <TotalRow label="Quotation Total" value={`INR ${fmt(total)}`} grand />
    </>
  );

  return (
    <ToolCard>
      <h2 className="text-2xl font-bold text-primary mb-2">Create Quotation</h2>
      <p className="text-gray-600 text-sm mb-6">
        Fill the details below, review the live preview and download a
        professional quotation PDF.
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

      <FormSection title="Quotation & Customer Details">
        <FieldGrid>
          <Field label="Quotation Type">
            <select className={selectCls} value={quoteType} onChange={(e) => setQuoteType(e.target.value)}>
              <option>GST Quotation</option>
              <option>Non-GST Quotation</option>
              <option>Proforma Quotation</option>
            </select>
          </Field>
          <Field label="GST Type">
            <select className={selectCls} value={gstType} onChange={(e) => setGstType(e.target.value)}>
              <option>CGST + SGST</option>
              <option>IGST</option>
            </select>
          </Field>
          <Field label="Quotation No.">
            <input className={inputCls} value={quoteNo} onChange={(e) => setQuoteNo(e.target.value)} />
          </Field>
          <Field label="Quotation Date">
            <input type="date" className={inputCls} value={quoteDate} onChange={(e) => setQuoteDate(e.target.value)} />
          </Field>
          <Field label="Valid Until">
            <input type="date" className={inputCls} value={validUntil} onChange={(e) => setValidUntil(e.target.value)} />
          </Field>
          <Field label="Prepared By">
            <input className={inputCls} value={preparedBy} onChange={(e) => setPreparedBy(e.target.value)} />
          </Field>
          <Field label="Customer Name">
            <input className={inputCls} value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
          </Field>
          <Field label="Customer Contact">
            <input className={inputCls} value={customerContact} onChange={(e) => setCustomerContact(e.target.value)} />
          </Field>
          <Field label="Customer Address" full>
            <textarea className={textareaCls} value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Item Table">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse min-w-[720px]">
            <thead>
              <tr className="bg-primary/5 text-primary">
                <th className="p-2 text-left font-semibold">Description</th>
                <th className="p-2 text-left font-semibold">HSN/SAC</th>
                <th className="p-2 font-semibold">Qty</th>
                <th className="p-2 font-semibold">Rate</th>
                <th className="p-2 font-semibold">Discount %</th>
                <th className="p-2 font-semibold">GST %</th>
                <th className="p-2 font-semibold">Total</th>
                <th className="p-2 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, i) => (
                <tr key={i} className="border-b">
                  <td className="p-1">
                    <input className={inputCls} value={it.desc} placeholder="Service/Product" onChange={(e) => updateItem(i, { desc: e.target.value })} />
                  </td>
                  <td className="p-1">
                    <input className={inputCls} value={it.hsn} placeholder="HSN/SAC" onChange={(e) => updateItem(i, { hsn: e.target.value })} />
                  </td>
                  <td className="p-1 w-20">
                    <input type="number" className={inputCls} value={it.qty} onChange={(e) => updateItem(i, { qty: +e.target.value })} />
                  </td>
                  <td className="p-1 w-28">
                    <input type="number" className={inputCls} value={it.rate} onChange={(e) => updateItem(i, { rate: +e.target.value })} />
                  </td>
                  <td className="p-1 w-24">
                    <input type="number" className={inputCls} value={it.disc} onChange={(e) => updateItem(i, { disc: +e.target.value })} />
                  </td>
                  <td className="p-1 w-20">
                    <input type="number" className={inputCls} value={it.gst} onChange={(e) => updateItem(i, { gst: +e.target.value })} />
                  </td>
                  <td className="p-1 text-center whitespace-nowrap">INR {fmt(computed[i].total)}</td>
                  <td className="p-1 text-center">
                    <button type="button" className={btnDanger} onClick={() => setItems((prev) => prev.filter((_, idx) => idx !== i))}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <button type="button" className={btnSecondary} onClick={() => setItems((prev) => [...prev, defaultItem])}>
            Add Item
          </button>
        </div>
        <div className="mt-5 max-w-sm ml-auto">{totalsRows}</div>
      </FormSection>

      <FormSection title="Terms & Notes">
        <FieldGrid>
          <Field label="Payment Terms">
            <textarea className={textareaCls} value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value)} />
          </Field>
          <Field label="Additional Terms / Notes">
            <textarea className={textareaCls} value={quoteNotes} onChange={(e) => setQuoteNotes(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <div className="flex flex-wrap gap-3">
        <button type="button" className={btnPrimary} onClick={downloadPdf}>
          Download Quotation PDF
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
              <h3 className="text-lg font-bold text-primary">{quoteType}</h3>
              <p className="text-gray-600">
                No: {quoteNo || "-"}
                <br />
                Date: {quoteDate || "-"}
                <br />
                Valid Until: {validUntil || "-"}
              </p>
            </div>
          </div>
          <hr className="my-3" />
          <p>
            <b>Quote To:</b>
            <br />
            {customerName}
            <br />
            {customerAddress}
            <br />
            {customerContact}
          </p>
          <table className="w-full mt-3 border-collapse">
            <thead>
              <tr className="bg-primary/5 text-primary">
                <th className="p-1 text-left">#</th>
                <th className="p-1 text-left">Description</th>
                <th className="p-1">Qty</th>
                <th className="p-1">Rate</th>
                <th className="p-1">Disc.</th>
                <th className="p-1">GST</th>
                <th className="p-1 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {computed.map((it, i) => (
                <tr key={i} className="border-b">
                  <td className="p-1">{i + 1}</td>
                  <td className="p-1">
                    {it.desc}
                    <br />
                    <small className="text-gray-500">{it.hsn}</small>
                  </td>
                  <td className="p-1 text-center">{fmt(it.qty)}</td>
                  <td className="p-1 text-center">INR {fmt(it.rate)}</td>
                  <td className="p-1 text-center">{fmt(it.disc)}%</td>
                  <td className="p-1 text-center">{isNonGst ? "NA" : `${fmt(it.gstRate)}%`}</td>
                  <td className="p-1 text-right">INR {fmt(it.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3 max-w-sm ml-auto">{totalsRows}</div>
          <p className="mt-2">
            <b>Payment Terms:</b> {paymentTerms}
          </p>
          <p className="mt-1">
            <b>Notes:</b> {quoteNotes}
          </p>
          <p className="mt-1">
            <b>Prepared By:</b> {preparedBy}
          </p>
        </div>
      </PreviewBox>
    </ToolCard>
  );
}
