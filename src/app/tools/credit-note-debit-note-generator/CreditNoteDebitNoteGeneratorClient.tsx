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
  desc: "Invoice adjustment item",
  hsn: "",
  qty: 1,
  rate: 10000,
  disc: 0,
  gst: 18,
};

const fmt = (n: number) =>
  Number(n || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
const money = (n: number) => "INR " + fmt(n);

export default function CreditNoteDebitNoteGeneratorClient() {
  const [docType, setDocType] = useState("Credit Note");
  const [noteNo, setNoteNo] = useState("CN/2026-27/001");
  const [noteDate, setNoteDate] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [reason, setReason] = useState("Sales Return");
  const [sellerName, setSellerName] = useState("");
  const [sellerGstin, setSellerGstin] = useState("");
  const [sellerContact, setSellerContact] = useState("");
  const [sellerAddress, setSellerAddress] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [buyerGstin, setBuyerGstin] = useState("");
  const [placeSupply, setPlaceSupply] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");
  const [taxMode, setTaxMode] = useState("gst");
  const [gstType, setGstType] = useState("cgst");
  const [roundOff, setRoundOff] = useState("no");
  const [narration, setNarration] = useState("");
  const [signatory, setSignatory] = useState("");
  const [extraNote, setExtraNote] = useState("");
  const [items, setItems] = useState<Item[]>([defaultItem]);

  useEffect(() => {
    setNoteDate(new Date().toISOString().slice(0, 10));
  }, []);

  const isGst = taxMode === "gst";

  const computed = items.map((it) => {
    const gross = (it.qty || 0) * (it.rate || 0);
    const discount = (gross * (it.disc || 0)) / 100;
    const taxable = Math.max(0, gross - discount);
    const gstRate = isGst ? it.gst || 0 : 0;
    const gstAmt = (taxable * gstRate) / 100;
    return { ...it, gstRate, taxable, gstAmt, total: taxable + gstAmt };
  });
  const taxable = computed.reduce((s, i) => s + i.taxable, 0);
  const gst = computed.reduce((s, i) => s + i.gstAmt, 0);
  const total = taxable + gst;
  const rounded = roundOff === "yes" ? Math.round(total) : total;
  const roundDiff = rounded - total;
  const half = gst / 2;

  const updateItem = (i: number, patch: Partial<Item>) =>
    setItems((prev) => prev.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));

  const reset = () => {
    setDocType("Credit Note");
    setNoteNo("");
    setNoteDate(new Date().toISOString().slice(0, 10));
    setInvoiceNo("");
    setInvoiceDate("");
    setReason("Sales Return");
    setSellerName("");
    setSellerGstin("");
    setSellerContact("");
    setSellerAddress("");
    setBuyerName("");
    setBuyerGstin("");
    setPlaceSupply("");
    setBuyerAddress("");
    setTaxMode("gst");
    setGstType("cgst");
    setRoundOff("no");
    setNarration("");
    setSignatory("");
    setExtraNote("");
    setItems([defaultItem]);
  };

  const downloadPdf = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    let y = 16;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(docType.toUpperCase(), 105, y, { align: "center" });
    y += 10;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`No: ${noteNo || "-"}    Date: ${noteDate || "-"}`, 14, y);
    y += 6;
    doc.text(`Original Invoice: ${invoiceNo || "-"}    Invoice Date: ${invoiceDate || "-"}`, 14, y);
    y += 8;
    doc.setFont("helvetica", "bold");
    doc.text(sellerName || "Business Name", 14, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.text((sellerAddress || "").split("\n"), 14, y);
    y += 12;
    if (sellerGstin) {
      doc.text("GSTIN: " + sellerGstin, 14, y);
      y += 6;
    }
    doc.text(`Recipient: ${buyerName || "-"}`, 14, y);
    y += 6;
    if (buyerGstin) {
      doc.text("Recipient GSTIN: " + buyerGstin, 14, y);
      y += 6;
    }
    doc.text(`Reason: ${reason}`, 14, y);
    y += 8;
    doc.setDrawColor(15, 74, 137);
    doc.line(14, y, 196, y);
    y += 7;
    doc.setFont("helvetica", "bold");
    doc.text("Description", 14, y);
    doc.text("Taxable", 110, y);
    doc.text("GST", 145, y);
    doc.text("Total", 175, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    computed.forEach((i) => {
      if (y > 260) {
        doc.addPage();
        y = 16;
      }
      doc.text((i.desc || "-").slice(0, 42), 14, y);
      doc.text(fmt(i.taxable), 110, y);
      doc.text(fmt(i.gstAmt), 145, y);
      doc.text(fmt(i.total), 175, y);
      y += 7;
    });
    y += 4;
    doc.line(14, y, 196, y);
    y += 8;
    doc.setFont("helvetica", "bold");
    doc.text("Taxable Value:", 120, y);
    doc.text("INR " + fmt(taxable), 170, y, { align: "right" });
    y += 7;
    doc.text("GST Adjustment:", 120, y);
    doc.text("INR " + fmt(gst), 170, y, { align: "right" });
    y += 7;
    doc.setFontSize(12);
    doc.text(`${docType} Value:`, 120, y);
    doc.text("INR " + fmt(rounded), 190, y, { align: "right" });
    y += 14;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Note: Verify GST treatment, time limits, return reporting and all details before official use.",
      14,
      y
    );
    y += 6;
    doc.setTextColor(96, 112, 141);
    doc.text(
      "Generated free at registrationseva.com. Verify all details before official use.",
      14,
      y
    );
    doc.save(`${(docType || "note").toLowerCase().replace(/\s+/g, "-")}-${noteNo || "draft"}.pdf`);
  };

  return (
    <ToolCard>
      <h2 className="text-2xl font-bold text-primary mb-2">
        Create Credit / Debit Note
      </h2>
      <p className="text-gray-600 text-sm mb-6">
        Fill note details, supplier and recipient details, tax settings and
        item-wise adjustment to generate a professional credit or debit note
        PDF.
      </p>

      <FormSection title="Note Type & Reference">
        <FieldGrid>
          <Field label="Document Type">
            <select className={selectCls} value={docType} onChange={(e) => setDocType(e.target.value)}>
              <option>Credit Note</option>
              <option>Debit Note</option>
            </select>
          </Field>
          <Field label="Note Number">
            <input className={inputCls} value={noteNo} onChange={(e) => setNoteNo(e.target.value)} />
          </Field>
          <Field label="Note Date">
            <input type="date" className={inputCls} value={noteDate} onChange={(e) => setNoteDate(e.target.value)} />
          </Field>
          <Field label="Original Invoice Number">
            <input className={inputCls} value={invoiceNo} placeholder="INV/2026-27/001" onChange={(e) => setInvoiceNo(e.target.value)} />
          </Field>
          <Field label="Original Invoice Date">
            <input type="date" className={inputCls} value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
          </Field>
          <Field label="Reason">
            <select className={selectCls} value={reason} onChange={(e) => setReason(e.target.value)}>
              <option>Sales Return</option>
              <option>Post-sale Discount</option>
              <option>Rate Difference</option>
              <option>Quantity Difference</option>
              <option>Tax Adjustment</option>
              <option>Additional Charge</option>
              <option>Invoice Correction</option>
              <option>Other</option>
            </select>
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Supplier / Issuer Details">
        <FieldGrid>
          <Field label="Business Name">
            <input className={inputCls} value={sellerName} placeholder="Your Business Name" onChange={(e) => setSellerName(e.target.value)} />
          </Field>
          <Field label="GSTIN">
            <input className={inputCls} value={sellerGstin} placeholder="GSTIN, if applicable" onChange={(e) => setSellerGstin(e.target.value)} />
          </Field>
          <Field label="Email / Phone">
            <input className={inputCls} value={sellerContact} placeholder="Contact details" onChange={(e) => setSellerContact(e.target.value)} />
          </Field>
          <Field label="Business Address" full>
            <textarea className={textareaCls} value={sellerAddress} placeholder="Registered / billing address" onChange={(e) => setSellerAddress(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Recipient Details">
        <FieldGrid>
          <Field label="Customer / Recipient Name">
            <input className={inputCls} value={buyerName} placeholder="Customer Name" onChange={(e) => setBuyerName(e.target.value)} />
          </Field>
          <Field label="Customer GSTIN">
            <input className={inputCls} value={buyerGstin} placeholder="GSTIN, if applicable" onChange={(e) => setBuyerGstin(e.target.value)} />
          </Field>
          <Field label="Place of Supply">
            <input className={inputCls} value={placeSupply} placeholder="State" onChange={(e) => setPlaceSupply(e.target.value)} />
          </Field>
          <Field label="Recipient Address" full>
            <textarea className={textareaCls} value={buyerAddress} placeholder="Customer address" onChange={(e) => setBuyerAddress(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Tax Setting">
        <FieldGrid>
          <Field label="Tax Mode">
            <select className={selectCls} value={taxMode} onChange={(e) => setTaxMode(e.target.value)}>
              <option value="gst">GST Note</option>
              <option value="nogst">Non-GST Note</option>
            </select>
          </Field>
          <Field label="GST Type">
            <select className={selectCls} value={gstType} onChange={(e) => setGstType(e.target.value)}>
              <option value="cgst">CGST + SGST</option>
              <option value="igst">IGST</option>
            </select>
          </Field>
          <Field label="Round Off">
            <select className={selectCls} value={roundOff} onChange={(e) => setRoundOff(e.target.value)}>
              <option value="no">No</option>
              <option value="yes">Yes, round grand total</option>
            </select>
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Item-wise Adjustment">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse min-w-[860px]">
            <thead>
              <tr className="bg-primary/5 text-primary">
                <th className="p-2 text-left font-semibold">Description</th>
                <th className="p-2 text-left font-semibold">HSN/SAC</th>
                <th className="p-2 font-semibold">Qty</th>
                <th className="p-2 font-semibold">Rate</th>
                <th className="p-2 font-semibold">Discount %</th>
                <th className="p-2 font-semibold">GST %</th>
                <th className="p-2 font-semibold">Taxable</th>
                <th className="p-2 font-semibold">GST</th>
                <th className="p-2 font-semibold">Total</th>
                <th className="p-2 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, i) => (
                <tr key={i} className="border-b">
                  <td className="p-1">
                    <input className={inputCls} value={it.desc} placeholder="Item / service" onChange={(e) => updateItem(i, { desc: e.target.value })} />
                  </td>
                  <td className="p-1 w-28">
                    <input className={inputCls} value={it.hsn} placeholder="HSN/SAC" onChange={(e) => updateItem(i, { hsn: e.target.value })} />
                  </td>
                  <td className="p-1 w-20">
                    <input type="number" step="0.01" className={inputCls} value={it.qty} onChange={(e) => updateItem(i, { qty: +e.target.value })} />
                  </td>
                  <td className="p-1 w-28">
                    <input type="number" step="0.01" className={inputCls} value={it.rate} onChange={(e) => updateItem(i, { rate: +e.target.value })} />
                  </td>
                  <td className="p-1 w-24">
                    <input type="number" step="0.01" className={inputCls} value={it.disc} onChange={(e) => updateItem(i, { disc: +e.target.value })} />
                  </td>
                  <td className="p-1 w-20">
                    <input type="number" step="0.01" className={inputCls} value={it.gst} onChange={(e) => updateItem(i, { gst: +e.target.value })} />
                  </td>
                  <td className="p-1 text-center whitespace-nowrap">{fmt(computed[i].taxable)}</td>
                  <td className="p-1 text-center whitespace-nowrap">{fmt(computed[i].gstAmt)}</td>
                  <td className="p-1 text-center whitespace-nowrap">{fmt(computed[i].total)}</td>
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
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" className={btnSecondary} onClick={() => setItems((prev) => [...prev, { desc: "", hsn: "", qty: 1, rate: 0, disc: 0, gst: 18 }])}>
            Add Item
          </button>
          <button type="button" className={btnPrimary} onClick={downloadPdf}>
            Download PDF
          </button>
          <button type="button" className={btnOutline} onClick={reset}>
            Reset
          </button>
        </div>
      </FormSection>

      <FormSection title="Terms / Notes">
        <FieldGrid>
          <Field label="Narration / Adjustment Note">
            <textarea className={textareaCls} value={narration} placeholder="Reason and accounting narration for this note." onChange={(e) => setNarration(e.target.value)} />
          </Field>
          <div>
            <Field label="Authorized Signatory">
              <input className={inputCls} value={signatory} placeholder="Name / Designation" onChange={(e) => setSignatory(e.target.value)} />
            </Field>
            <div className="mt-3">
              <Field label="Additional Note">
                <textarea className={textareaCls} value={extraNote} placeholder="This is a system-generated note." onChange={(e) => setExtraNote(e.target.value)} />
              </Field>
            </div>
          </div>
        </FieldGrid>
      </FormSection>

      <PreviewBox>
        <div className="max-w-[850px] mx-auto border bg-white p-5 text-sm">
          <div className="flex justify-between gap-5 flex-wrap border-b-[3px] border-primary pb-4 mb-4">
            <div>
              <div className="text-2xl font-extrabold text-primary">{docType.toUpperCase()}</div>
              <div>{sellerName || "Business Name"}</div>
              <div className="whitespace-pre-line text-gray-500">{sellerAddress}</div>
              {sellerGstin && <div>GSTIN: {sellerGstin}</div>}
            </div>
            <div className="text-right">
              <b>No:</b> {noteNo || "-"}
              <br />
              <b>Date:</b> {noteDate || "-"}
              <br />
              <b>Original Invoice:</b> {invoiceNo || "-"}
              <br />
              <b>Invoice Date:</b> {invoiceDate || "-"}
            </div>
          </div>
          <div className="bg-gray-50 border rounded-lg p-3 mb-3">
            <b>Recipient:</b> {buyerName || "-"}
            <br />
            {buyerGstin && (
              <>
                GSTIN: {buyerGstin}
                <br />
              </>
            )}
            <span className="whitespace-pre-line">{buyerAddress}</span>
            {placeSupply && (
              <>
                <br />
                Place of Supply: {placeSupply}
              </>
            )}
          </div>
          <div className="bg-gray-50 border rounded-lg p-3 mb-3">
            <b>Reason:</b> {reason}
            {narration && (
              <>
                <br />
                <b>Narration:</b> {narration}
              </>
            )}
          </div>
          <table className="w-full border-collapse my-4">
            <thead>
              <tr className="bg-primary text-white">
                <th className="p-2 text-left text-xs">Description</th>
                <th className="p-2 text-left text-xs">HSN/SAC</th>
                <th className="p-2 text-left text-xs">Qty</th>
                <th className="p-2 text-left text-xs">Rate</th>
                <th className="p-2 text-left text-xs">Taxable</th>
                <th className="p-2 text-left text-xs">GST</th>
                <th className="p-2 text-left text-xs">Total</th>
              </tr>
            </thead>
            <tbody>
              {computed.map((i, idx) => (
                <tr key={idx}>
                  <td className="border p-2 text-xs">{i.desc || "-"}</td>
                  <td className="border p-2 text-xs">{i.hsn || "-"}</td>
                  <td className="border p-2 text-xs">{i.qty}</td>
                  <td className="border p-2 text-xs">{money(i.rate)}</td>
                  <td className="border p-2 text-xs">{money(i.taxable)}</td>
                  <td className="border p-2 text-xs">{isGst ? `${i.gstRate}% / ${money(i.gstAmt)}` : "-"}</td>
                  <td className="border p-2 text-xs">{money(i.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right bg-gray-50 border rounded-lg p-4">
            <div className="flex justify-end gap-8 my-1">
              <span>Taxable Value</span>
              <b>{money(taxable)}</b>
            </div>
            {isGst && gstType === "cgst" && (
              <>
                <div className="flex justify-end gap-8 my-1">
                  <span>CGST</span>
                  <b>{money(half)}</b>
                </div>
                <div className="flex justify-end gap-8 my-1">
                  <span>SGST</span>
                  <b>{money(half)}</b>
                </div>
              </>
            )}
            {isGst && gstType === "igst" && (
              <div className="flex justify-end gap-8 my-1">
                <span>IGST</span>
                <b>{money(gst)}</b>
              </div>
            )}
            {roundOff === "yes" && (
              <div className="flex justify-end gap-8 my-1">
                <span>Round Off</span>
                <b>{money(roundDiff)}</b>
              </div>
            )}
            <div className="flex justify-end gap-8 text-lg font-extrabold text-primary border-t pt-2 mt-2">
              <span>{docType} Value</span>
              <b>{money(rounded)}</b>
            </div>
          </div>
          <p className="mt-4">{extraNote || "This is a system-generated document."}</p>
          <p className="text-right mt-7 font-bold">{signatory || "Authorized Signatory"}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <div className="bg-white border rounded-lg p-3 text-sm">
            Taxable Value
            <strong className="block text-lg text-primary mt-1">{money(taxable)}</strong>
          </div>
          <div className="bg-white border rounded-lg p-3 text-sm">
            GST Adjustment
            <strong className="block text-lg text-primary mt-1">{money(gst)}</strong>
          </div>
          <div className="bg-white border rounded-lg p-3 text-sm">
            Document Value
            <strong className="block text-lg text-primary mt-1">{money(rounded)}</strong>
          </div>
          <div className="bg-white border rounded-lg p-3 text-sm">
            Type
            <strong className="block text-lg text-primary mt-1">{docType}</strong>
          </div>
        </div>
      </PreviewBox>

      <p className="mt-6 text-xs text-gray-500">
        <strong>Important Disclaimer:</strong> This tool is for general document
        preparation and calculation support only. Credit note, debit note, GST
        adjustment, return reporting, time limits, invoice correction and tax
        treatment may vary based on facts, law and professional advice. Verify
        all details before official use.
      </p>
    </ToolCard>
  );
}
