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
  fmtINR,
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
  desc: "Consulting Service",
  hsn: "9983",
  qty: 1,
  rate: 10000,
  disc: 0,
  gst: 18,
};

export default function InvoiceGeneratorClient() {
  const [sellerName, setSellerName] = useState("Demo Services Pvt Ltd");
  const [sellerGstin, setSellerGstin] = useState("07ABCDE1234F1Z5");
  const [sellerAddress, setSellerAddress] = useState("New Delhi, India");
  const [invoiceType, setInvoiceType] = useState("GST Invoice");
  const [gstType, setGstType] = useState("CGST + SGST");
  const [invoiceNo, setInvoiceNo] = useState("INV-001");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [customerName, setCustomerName] = useState("ABC Enterprises");
  const [customerGstin, setCustomerGstin] = useState("27ABCDE1234F1Z2");
  const [customerAddress, setCustomerAddress] = useState("Mumbai, Maharashtra");
  const [bankDetails, setBankDetails] = useState(
    "Bank: Demo Bank | A/c: 0000000000 | IFSC: DEMO0001234"
  );
  const [terms, setTerms] = useState("Payment due within 15 days.");
  const [items, setItems] = useState<Item[]>([defaultItem]);

  useEffect(() => {
    setInvoiceDate(new Date().toISOString().slice(0, 10));
  }, []);

  const isNonGst = invoiceType === "Non-GST Invoice";

  const computed = items.map((it) => {
    const base = (it.qty || 0) * (it.rate || 0);
    const taxable = base - (base * (it.disc || 0)) / 100;
    const gstAmt = isNonGst ? 0 : (taxable * (it.gst || 0)) / 100;
    return { ...it, taxable, gstAmt, total: taxable + gstAmt };
  });
  const taxable = computed.reduce((a, b) => a + b.taxable, 0);
  const gst = computed.reduce((a, b) => a + b.gstAmt, 0);
  const total = taxable + gst;

  const updateItem = (i: number, patch: Partial<Item>) =>
    setItems((prev) => prev.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));

  const reset = () => {
    setSellerName("");
    setSellerGstin("");
    setSellerAddress("");
    setInvoiceNo("");
    setCustomerName("");
    setCustomerGstin("");
    setCustomerAddress("");
    setBankDetails("");
    setTerms("");
    setItems([defaultItem]);
  };

  const downloadPdf = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF("p", "pt", "a4");
    doc.setFillColor(15, 74, 137);
    doc.rect(40, 40, 515, 55, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text(sellerName || "Seller Business", 55, 70);
    doc.setFontSize(9);
    doc.text(`${sellerAddress} GSTIN: ${sellerGstin || "-"}`, 55, 88);
    doc.setTextColor(15, 74, 137);
    doc.setFontSize(18);
    doc.text(invoiceType, 40, 125);
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    doc.text(`Invoice No: ${invoiceNo || "-"}`, 380, 120);
    doc.text(`Date: ${invoiceDate || "-"}`, 380, 138);
    doc.text(`Bill To: ${customerName || "Customer"}`, 40, 165);
    doc.text(customerAddress || "", 40, 182);
    let y = 225;
    doc.setFillColor(243, 164, 4);
    doc.rect(40, y, 515, 24, "F");
    doc.setTextColor(32, 32, 32);
    doc.text("Item", 48, y + 16);
    doc.text("Qty", 270, y + 16);
    doc.text("Rate", 320, y + 16);
    doc.text("GST", 395, y + 16);
    doc.text("Total", 520, y + 16, { align: "right" });
    y += 42;
    computed.forEach((it) => {
      doc.text((it.desc || "-").slice(0, 32), 48, y);
      doc.text(String(it.qty), 280, y, { align: "right" });
      doc.text("Rs. " + fmtINR(it.rate), 355, y, { align: "right" });
      doc.text(isNonGst ? "NA" : `${it.gst}%`, 410, y, { align: "right" });
      doc.text("Rs. " + fmtINR(it.total), 520, y, { align: "right" });
      y += 24;
    });
    y += 18;
    doc.text("Taxable Value: Rs. " + fmtINR(taxable), 520, y, { align: "right" });
    y += 20;
    doc.text("Total GST: Rs. " + fmtINR(gst), 520, y, { align: "right" });
    y += 26;
    doc.setFontSize(15);
    doc.text("Grand Total: Rs. " + fmtINR(total), 520, y, { align: "right" });
    y += 40;
    doc.setFontSize(10);
    doc.text("Payment Details: " + (bankDetails || "-"), 40, y, { maxWidth: 500 });
    y += 44;
    doc.text("Terms: " + (terms || "-"), 40, y, { maxWidth: 500 });
    doc.setFontSize(9);
    doc.setTextColor(96, 112, 141);
    doc.text(
      "Generated free at registrationseva.com. Verify all details before official use.",
      40,
      760
    );
    doc.save(`Invoice-${invoiceNo || "RegistrationSeva"}.pdf`);
  };

  return (
    <ToolCard>
      <h2 className="text-2xl font-bold text-primary mb-2">Generate Invoice</h2>
      <p className="text-gray-600 text-sm mb-6">
        Fill seller details, customer details, invoice information and item
        details to generate a professional invoice PDF.
      </p>

      <FormSection title="Seller / Business Details">
        <FieldGrid>
          <Field label="Business Name">
            <input className={inputCls} value={sellerName} onChange={(e) => setSellerName(e.target.value)} />
          </Field>
          <Field label="GSTIN">
            <input className={inputCls} value={sellerGstin} onChange={(e) => setSellerGstin(e.target.value)} />
          </Field>
          <Field label="Seller Address" full>
            <textarea className={textareaCls} value={sellerAddress} onChange={(e) => setSellerAddress(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Invoice & Customer Details">
        <FieldGrid>
          <Field label="Invoice Type">
            <select className={selectCls} value={invoiceType} onChange={(e) => setInvoiceType(e.target.value)}>
              <option>GST Invoice</option>
              <option>Non-GST Invoice</option>
              <option>Proforma Invoice</option>
            </select>
          </Field>
          <Field label="GST Type">
            <select className={selectCls} value={gstType} onChange={(e) => setGstType(e.target.value)}>
              <option>CGST + SGST</option>
              <option>IGST</option>
            </select>
          </Field>
          <Field label="Invoice No.">
            <input className={inputCls} value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
          </Field>
          <Field label="Invoice Date">
            <input type="date" className={inputCls} value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
          </Field>
          <Field label="Customer Name">
            <input className={inputCls} value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
          </Field>
          <Field label="Customer GSTIN">
            <input className={inputCls} value={customerGstin} onChange={(e) => setCustomerGstin(e.target.value)} />
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
                  <td className="p-1 text-center whitespace-nowrap">₹{fmtINR(computed[i].total)}</td>
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
          <button type="button" className={btnSecondary} onClick={() => setItems((prev) => [...prev, { desc: "", hsn: "", qty: 1, rate: 0, disc: 0, gst: 18 }])}>
            Add Item
          </button>
        </div>
        <div className="mt-5 max-w-sm ml-auto">
          <TotalRow label="Taxable Value" value={`₹${fmtINR(taxable)}`} />
          <TotalRow label="Total GST" value={`₹${fmtINR(gst)}`} />
          <TotalRow label="Grand Total" value={`₹${fmtINR(total)}`} grand />
        </div>
      </FormSection>

      <FormSection title="Payment Details & Terms">
        <FieldGrid>
          <Field label="Bank / Payment Details">
            <textarea className={textareaCls} value={bankDetails} onChange={(e) => setBankDetails(e.target.value)} />
          </Field>
          <Field label="Terms & Notes">
            <textarea className={textareaCls} value={terms} onChange={(e) => setTerms(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <div className="flex flex-wrap gap-3">
        <button type="button" className={btnPrimary} onClick={downloadPdf}>
          Download Invoice PDF
        </button>
        <button type="button" className={btnOutline} onClick={reset}>
          Reset Form
        </button>
      </div>

      <PreviewBox>
        <div className="max-w-[820px] mx-auto border bg-white p-5 text-sm">
          <div className="flex justify-between gap-4 flex-wrap">
            <div>
              <h3 className="text-lg font-bold text-primary">{sellerName || "Seller Business"}</h3>
              <p className="text-gray-600">
                {sellerAddress || "Seller address"}
                <br />
                GSTIN: {sellerGstin || "-"}
              </p>
            </div>
            <div className="text-right">
              <h3 className="text-lg font-bold text-primary">{invoiceType}</h3>
              <p className="text-gray-600">
                No: {invoiceNo || "-"}
                <br />
                Date: {invoiceDate || "-"}
              </p>
            </div>
          </div>
          <hr className="my-3" />
          <p>
            <b>Bill To:</b> {customerName || "Customer"} · GSTIN: {customerGstin || "-"}
            <br />
            {customerAddress}
          </p>
          <table className="w-full mt-3 border-collapse">
            <thead>
              <tr className="bg-primary/5 text-primary">
                <th className="p-1 text-left">Item</th>
                <th className="p-1">Qty</th>
                <th className="p-1">Rate</th>
                <th className="p-1">GST</th>
                <th className="p-1 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {computed.map((it, i) => (
                <tr key={i} className="border-b">
                  <td className="p-1">
                    {it.desc}
                    <br />
                    <small className="text-gray-500">{it.hsn}</small>
                  </td>
                  <td className="p-1 text-center">{it.qty}</td>
                  <td className="p-1 text-center">₹{fmtINR(it.rate)}</td>
                  <td className="p-1 text-center">{isNonGst ? "NA" : `${it.gst}%`}</td>
                  <td className="p-1 text-right">₹{fmtINR(it.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 className="text-right font-bold text-primary mt-3">
            Grand Total: ₹{fmtINR(total)}
          </h3>
          <p className="mt-2">
            <b>Payment Details:</b>
            <br />
            {bankDetails}
          </p>
          <p className="mt-1">
            <b>Terms:</b> {terms}
          </p>
          <p className="text-center text-xs text-gray-500 mt-3">
            This is a system generated invoice.
          </p>
        </div>
      </PreviewBox>
    </ToolCard>
  );
}
