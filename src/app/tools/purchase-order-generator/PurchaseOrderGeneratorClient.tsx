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
  unit: string;
  rate: number;
  disc: number;
  gst: number;
}

const defaultItem: Item = {
  desc: "Office Equipment / Professional Services",
  hsn: "9983",
  qty: 1,
  unit: "Nos",
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

export default function PurchaseOrderGeneratorClient() {
  const [buyerName, setBuyerName] = useState("Demo Services Pvt Ltd");
  const [buyerContact, setBuyerContact] = useState("contact@example.com | +91 9999999999");
  const [buyerGstin, setBuyerGstin] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("New Delhi, India");
  const [poType, setPoType] = useState("GST Purchase Order");
  const [gstType, setGstType] = useState("CGST + SGST");
  const [poNo, setPoNo] = useState("PO-001");
  const [poDate, setPoDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [preparedBy, setPreparedBy] = useState("Authorized Representative");
  const [referenceNo, setReferenceNo] = useState("QTN-001");
  const [deliveryLocation, setDeliveryLocation] = useState("Buyer office / as communicated");
  const [supplierName, setSupplierName] = useState("ABC Enterprises");
  const [supplierContact, setSupplierContact] = useState("vendor@example.com");
  const [supplierGstin, setSupplierGstin] = useState("");
  const [supplierAddress, setSupplierAddress] = useState("Mumbai, Maharashtra");
  const [paymentTerms, setPaymentTerms] = useState(
    "Payment as per agreed terms after delivery and verification of invoice/documents."
  );
  const [poNotes, setPoNotes] = useState(
    "Supplier should mention this PO number on invoice and delivery documents. Final payment is subject to delivery, verification and agreed commercial terms."
  );
  const [items, setItems] = useState<Item[]>([defaultItem]);

  useEffect(() => {
    setPoDate(todayISO());
    setDeliveryDate(plusDaysISO(7));
  }, []);

  const isNonGst = poType === "Non-GST Purchase Order";

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
    setBuyerName("Demo Services Pvt Ltd");
    setBuyerContact("contact@example.com | +91 9999999999");
    setBuyerGstin("");
    setBuyerAddress("New Delhi, India");
    setPoType("GST Purchase Order");
    setGstType("CGST + SGST");
    setPoNo("PO-001");
    setPoDate(todayISO());
    setDeliveryDate(plusDaysISO(7));
    setPreparedBy("Authorized Representative");
    setReferenceNo("QTN-001");
    setDeliveryLocation("Buyer office / as communicated");
    setSupplierName("ABC Enterprises");
    setSupplierContact("vendor@example.com");
    setSupplierGstin("");
    setSupplierAddress("Mumbai, Maharashtra");
    setPaymentTerms(
      "Payment as per agreed terms after delivery and verification of invoice/documents."
    );
    setPoNotes(
      "Supplier should mention this PO number on invoice and delivery documents. Final payment is subject to delivery, verification and agreed commercial terms."
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
    doc.text(buyerName || "Buyer Name", m + 15, y + 24);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.text(
      doc.splitTextToSize(
        (buyerAddress || "") +
          (buyerContact ? " | " + buyerContact : "") +
          (buyerGstin ? " | GSTIN: " + buyerGstin : ""),
        w - 30
      ),
      m + 15,
      y + 43
    );
    y += 88;
    doc.setTextColor(15, 74, 137);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(poType || "Purchase Order", m, y);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(40, 40, 40);
    doc.text("PO No: " + (poNo || "-"), 390, y - 6);
    doc.text("PO Date: " + (poDate || "-"), 390, y + 10);
    doc.text("Delivery Date: " + (deliveryDate || "-"), 390, y + 26);
    y += 36;
    doc.setFont("helvetica", "bold");
    doc.text("Supplier / Vendor:", m, y);
    doc.setFont("helvetica", "normal");
    y = wrap(
      (supplierName || "Supplier") +
        "\n" +
        (supplierAddress || "") +
        (supplierContact ? "\n" + supplierContact : "") +
        (supplierGstin ? "\nGSTIN: " + supplierGstin : ""),
      m,
      y + 15,
      250,
      11
    );
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text("Delivery Location:", m, y);
    doc.setFont("helvetica", "normal");
    y = wrap(deliveryLocation || "-", m + 100, y, 360, 11);
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
      doc.text(fmt(it.qty) + " " + (it.unit || ""), m + 255, y, { align: "right" });
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
    doc.text("PO Total: INR " + fmt(total), m + w, y + 6, { align: "right" });
    y += 42;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(15, 74, 137);
    y = wrap("Payment Terms: " + (paymentTerms || "-"), m, y, w, 12);
    y += 8;
    y = wrap("Terms / Notes: " + (poNotes || "-"), m, y, w, 12);
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
    doc.save("purchase-order-" + (poNo || "RegistrationSeva") + ".pdf");
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
      <TotalRow label="PO Total" value={`INR ${fmt(total)}`} grand />
    </>
  );

  return (
    <ToolCard>
      <h2 className="text-2xl font-bold text-primary mb-2">Create Purchase Order</h2>
      <p className="text-gray-600 text-sm mb-6">
        Fill the details below, review the live preview and download a
        professional purchase order PDF.
      </p>

      <FormSection title="Buyer / Company Details">
        <FieldGrid>
          <Field label="Buyer / Company Name">
            <input className={inputCls} value={buyerName} onChange={(e) => setBuyerName(e.target.value)} />
          </Field>
          <Field label="Email / Phone">
            <input className={inputCls} value={buyerContact} onChange={(e) => setBuyerContact(e.target.value)} />
          </Field>
          <Field label="GSTIN, if any">
            <input className={inputCls} value={buyerGstin} placeholder="Optional" onChange={(e) => setBuyerGstin(e.target.value)} />
          </Field>
          <Field label="Buyer Address">
            <input className={inputCls} value={buyerAddress} onChange={(e) => setBuyerAddress(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Purchase Order Details">
        <FieldGrid>
          <Field label="PO Type">
            <select className={selectCls} value={poType} onChange={(e) => setPoType(e.target.value)}>
              <option>GST Purchase Order</option>
              <option>Non-GST Purchase Order</option>
            </select>
          </Field>
          <Field label="GST Type">
            <select className={selectCls} value={gstType} onChange={(e) => setGstType(e.target.value)}>
              <option>CGST + SGST</option>
              <option>IGST</option>
            </select>
          </Field>
          <Field label="Purchase Order No.">
            <input className={inputCls} value={poNo} onChange={(e) => setPoNo(e.target.value)} />
          </Field>
          <Field label="PO Date">
            <input type="date" className={inputCls} value={poDate} onChange={(e) => setPoDate(e.target.value)} />
          </Field>
          <Field label="Expected Delivery Date">
            <input type="date" className={inputCls} value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} />
          </Field>
          <Field label="Prepared By">
            <input className={inputCls} value={preparedBy} onChange={(e) => setPreparedBy(e.target.value)} />
          </Field>
          <Field label="Reference / Quotation No.">
            <input className={inputCls} value={referenceNo} placeholder="Optional" onChange={(e) => setReferenceNo(e.target.value)} />
          </Field>
          <Field label="Delivery Location">
            <input className={inputCls} value={deliveryLocation} onChange={(e) => setDeliveryLocation(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Supplier / Vendor Details">
        <FieldGrid>
          <Field label="Supplier Name">
            <input className={inputCls} value={supplierName} onChange={(e) => setSupplierName(e.target.value)} />
          </Field>
          <Field label="Supplier Contact">
            <input className={inputCls} value={supplierContact} onChange={(e) => setSupplierContact(e.target.value)} />
          </Field>
          <Field label="Supplier GSTIN, if any">
            <input className={inputCls} value={supplierGstin} placeholder="Optional" onChange={(e) => setSupplierGstin(e.target.value)} />
          </Field>
          <Field label="Supplier Address" full>
            <textarea className={textareaCls} value={supplierAddress} onChange={(e) => setSupplierAddress(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Item Table">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-primary/5 text-primary">
                <th className="p-2 text-left font-semibold">Description</th>
                <th className="p-2 text-left font-semibold">HSN/SAC</th>
                <th className="p-2 font-semibold">Qty</th>
                <th className="p-2 font-semibold">Unit</th>
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
                    <input className={inputCls} value={it.desc} placeholder="Goods/Service" onChange={(e) => updateItem(i, { desc: e.target.value })} />
                  </td>
                  <td className="p-1">
                    <input className={inputCls} value={it.hsn} placeholder="HSN/SAC" onChange={(e) => updateItem(i, { hsn: e.target.value })} />
                  </td>
                  <td className="p-1 w-20">
                    <input type="number" className={inputCls} value={it.qty} onChange={(e) => updateItem(i, { qty: +e.target.value })} />
                  </td>
                  <td className="p-1 w-20">
                    <input className={inputCls} value={it.unit} onChange={(e) => updateItem(i, { unit: e.target.value })} />
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
          <Field label="Delivery / Other Terms">
            <textarea className={textareaCls} value={poNotes} onChange={(e) => setPoNotes(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <div className="flex flex-wrap gap-3">
        <button type="button" className={btnPrimary} onClick={downloadPdf}>
          Download PO PDF
        </button>
        <button type="button" className={btnOutline} onClick={reset}>
          Reset Form
        </button>
      </div>

      <PreviewBox>
        <div className="max-w-[820px] mx-auto border bg-white p-5 text-sm">
          <div className="flex justify-between gap-4 flex-wrap">
            <div>
              <h3 className="text-lg font-bold text-primary">{buyerName || "Buyer Name"}</h3>
              <p className="text-gray-600">
                {buyerAddress}
                <br />
                {buyerContact}
                {buyerGstin && (
                  <>
                    <br />
                    GSTIN: {buyerGstin}
                  </>
                )}
              </p>
            </div>
            <div className="text-right">
              <h3 className="text-lg font-bold text-primary">{poType}</h3>
              <p className="text-gray-600">
                No: {poNo || "-"}
                <br />
                Date: {poDate || "-"}
                <br />
                Delivery: {deliveryDate || "-"}
              </p>
            </div>
          </div>
          <hr className="my-3" />
          <p>
            <b>Supplier:</b>
            <br />
            {supplierName}
            <br />
            {supplierAddress}
            <br />
            {supplierContact}
            {supplierGstin && (
              <>
                <br />
                GSTIN: {supplierGstin}
              </>
            )}
          </p>
          <p className="mt-2">
            <b>Delivery Location:</b> {deliveryLocation}
            <br />
            <b>Reference:</b> {referenceNo || "-"}
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
                  <td className="p-1 text-center">
                    {fmt(it.qty)} {it.unit}
                  </td>
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
            <b>Terms / Notes:</b> {poNotes}
          </p>
          <p className="mt-1">
            <b>Prepared By:</b> {preparedBy}
          </p>
        </div>
      </PreviewBox>
    </ToolCard>
  );
}
