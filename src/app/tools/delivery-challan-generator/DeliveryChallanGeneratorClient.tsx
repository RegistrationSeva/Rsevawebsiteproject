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
}

const defaultItem: Item = {
  desc: "Office supplies / goods",
  hsn: "",
  qty: 1,
  unit: "Nos",
  rate: 1000,
};

const fmt = (n: number) =>
  (Number(n) || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const todayISO = () => new Date().toISOString().slice(0, 10);

export default function DeliveryChallanGeneratorClient() {
  const [fromName, setFromName] = useState("Demo Services Pvt Ltd");
  const [fromContact, setFromContact] = useState("contact@example.com | +91 9999999999");
  const [fromGstin, setFromGstin] = useState("");
  const [fromState, setFromState] = useState("Delhi");
  const [fromAddress, setFromAddress] = useState("New Delhi, India");
  const [toName, setToName] = useState("ABC Customer");
  const [toContact, setToContact] = useState("customer@example.com");
  const [toGstin, setToGstin] = useState("");
  const [toState, setToState] = useState("Haryana");
  const [toAddress, setToAddress] = useState("Gurugram, Haryana");
  const [challanNo, setChallanNo] = useState("DC-001");
  const [challanDate, setChallanDate] = useState("");
  const [purpose, setPurpose] = useState("Delivery of Goods");
  const [refNo, setRefNo] = useState("PO-001");
  const [dispatchFrom, setDispatchFrom] = useState("Main office / warehouse");
  const [deliveryTo, setDeliveryTo] = useState("Customer site");
  const [transportMode, setTransportMode] = useState("By Road");
  const [vehicleNo, setVehicleNo] = useState("");
  const [transporter, setTransporter] = useState("");
  const [placeSupply, setPlaceSupply] = useState("Haryana");
  const [notes, setNotes] = useState(
    "Goods are sent as per agreed terms. This delivery challan is not a tax invoice."
  );
  const [preparedBy, setPreparedBy] = useState("Authorized Representative");
  const [signatory, setSignatory] = useState("Authorized Signatory");
  const [items, setItems] = useState<Item[]>([defaultItem]);

  useEffect(() => {
    setChallanDate(todayISO());
  }, []);

  const computed = items.map((it) => ({
    ...it,
    value: (it.qty || 0) * (it.rate || 0),
  }));
  const totalQty = computed.reduce((a, b) => a + (b.qty || 0), 0);
  const totalValue = computed.reduce((a, b) => a + b.value, 0);

  const updateItem = (i: number, patch: Partial<Item>) =>
    setItems((prev) => prev.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));

  const reset = () => {
    setFromName("Demo Services Pvt Ltd");
    setFromContact("contact@example.com | +91 9999999999");
    setFromGstin("");
    setFromState("Delhi");
    setFromAddress("New Delhi, India");
    setToName("ABC Customer");
    setToContact("customer@example.com");
    setToGstin("");
    setToState("Haryana");
    setToAddress("Gurugram, Haryana");
    setChallanNo("DC-001");
    setChallanDate(todayISO());
    setPurpose("Delivery of Goods");
    setRefNo("PO-001");
    setDispatchFrom("Main office / warehouse");
    setDeliveryTo("Customer site");
    setTransportMode("By Road");
    setVehicleNo("");
    setTransporter("");
    setPlaceSupply("Haryana");
    setNotes("Goods are sent as per agreed terms. This delivery challan is not a tax invoice.");
    setPreparedBy("Authorized Representative");
    setSignatory("Authorized Signatory");
    setItems([defaultItem]);
  };

  const downloadPdf = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const m = 42;
    const w = 511;
    let y = 42;
    const wrap = (text: string, x: number, yy: number, width: number, lineGap: number) => {
      const lines = doc.splitTextToSize(String(text || ""), width);
      doc.text(lines, x, yy);
      return yy + lines.length * lineGap;
    };
    doc.setFillColor(15, 74, 137);
    doc.roundedRect(m, y, w, 54, 10, 10, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("DELIVERY CHALLAN", m + 18, y + 34);
    doc.setFontSize(10);
    doc.text("Generated via Registration Seva", m + w - 18, y + 32, { align: "right" });
    y += 76;
    doc.setTextColor(15, 74, 137);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(fromName || "-", m, y);
    doc.setTextColor(40, 40, 40);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    y = wrap(
      (fromAddress || "") +
        "\nGSTIN: " +
        (fromGstin || "N/A") +
        " | Contact: " +
        (fromContact || "-"),
      m,
      y + 14,
      235,
      11
    );
    doc.setFont("helvetica", "bold");
    doc.text("Challan No.: " + (challanNo || "-"), m + 310, 118);
    doc.text("Date: " + (challanDate || "-"), m + 310, 134);
    doc.text("Purpose: " + (purpose || "-"), m + 310, 150);
    doc.text("Reference: " + (refNo || "-"), m + 310, 166);
    y = 190;
    doc.setDrawColor(217, 230, 251);
    doc.roundedRect(m, y, w, 74, 8, 8);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("CONSIGNEE / RECIPIENT", m + 12, y + 18);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(
      doc.splitTextToSize(
        (toName || "-") +
          "\n" +
          (toAddress || "") +
          "\nGSTIN: " +
          (toGstin || "N/A") +
          " | Contact: " +
          (toContact || "-"),
        235
      ),
      m + 12,
      y + 34
    );
    doc.setFont("helvetica", "bold");
    doc.text("DISPATCH / TRANSPORT", m + 275, y + 18);
    doc.setFont("helvetica", "normal");
    doc.text(
      doc.splitTextToSize(
        "From: " +
          (dispatchFrom || "-") +
          "\nTo: " +
          (deliveryTo || "-") +
          "\nMode: " +
          (transportMode || "-") +
          " | Vehicle/LR/AWB: " +
          (vehicleNo || "-") +
          "\nTransporter: " +
          (transporter || "-"),
        220
      ),
      m + 275,
      y + 34
    );
    y += 98;
    doc.setFillColor(243, 164, 4);
    doc.roundedRect(m, y, w, 28, 6, 6, "F");
    doc.setTextColor(32, 32, 32);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Description", m + 8, y + 18);
    doc.text("HSN/SAC", m + 220, y + 18);
    doc.text("Qty", m + 290, y + 18, { align: "right" });
    doc.text("Unit", m + 345, y + 18, { align: "right" });
    doc.text("Rate", m + 425, y + 18, { align: "right" });
    doc.text("Value", m + w - 8, y + 18, { align: "right" });
    y += 40;
    doc.setFont("helvetica", "normal");
    computed.forEach((it) => {
      if (y > 690) {
        doc.addPage();
        y = 50;
      }
      doc.text(doc.splitTextToSize(it.desc || "-", 190), m + 8, y);
      doc.text(it.hsn || "-", m + 220, y);
      doc.text(fmt(it.qty), m + 290, y, { align: "right" });
      doc.text(it.unit || "-", m + 345, y, { align: "right" });
      doc.text("INR " + fmt(it.rate), m + 425, y, { align: "right" });
      doc.text("INR " + fmt(it.value), m + w - 8, y, { align: "right" });
      y += 24;
    });
    y += 12;
    doc.line(m, y, m + w, y);
    y += 22;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Total Quantity: " + fmt(totalQty), m, y);
    doc.text("Total Value: INR " + fmt(totalValue), m + w, y, { align: "right" });
    y += 34;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    y = wrap("Notes: " + (notes || "-"), m, y, w, 12);
    y += 18;
    doc.setFont("helvetica", "bold");
    doc.text("Prepared By: " + (preparedBy || "-"), m, y);
    doc.text("Authorized Signatory: " + (signatory || "-"), m + 275, y);
    doc.setTextColor(96, 112, 141);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(
      "Generated free at registrationseva.com. Verify all details before official use.",
      m,
      775
    );
    doc.save("delivery-challan-" + (challanNo || "RegistrationSeva") + ".pdf");
  };

  return (
    <ToolCard>
      <h2 className="text-2xl font-bold text-primary mb-2">Create Delivery Challan</h2>
      <p className="text-gray-600 text-sm mb-6">
        Enter delivery challan details below. The preview and totals update
        automatically.
      </p>

      <FormSection title="Consignor / Business Details">
        <FieldGrid>
          <Field label="Business / Consignor Name">
            <input className={inputCls} value={fromName} onChange={(e) => setFromName(e.target.value)} />
          </Field>
          <Field label="Contact / Email">
            <input className={inputCls} value={fromContact} onChange={(e) => setFromContact(e.target.value)} />
          </Field>
          <Field label="GSTIN, if any">
            <input className={inputCls} value={fromGstin} placeholder="GSTIN optional" onChange={(e) => setFromGstin(e.target.value)} />
          </Field>
          <Field label="State">
            <input className={inputCls} value={fromState} onChange={(e) => setFromState(e.target.value)} />
          </Field>
          <Field label="Consignor Address" full>
            <textarea className={textareaCls} value={fromAddress} onChange={(e) => setFromAddress(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Consignee / Recipient Details">
        <FieldGrid>
          <Field label="Recipient / Consignee Name">
            <input className={inputCls} value={toName} onChange={(e) => setToName(e.target.value)} />
          </Field>
          <Field label="Contact / Email">
            <input className={inputCls} value={toContact} onChange={(e) => setToContact(e.target.value)} />
          </Field>
          <Field label="GSTIN, if any">
            <input className={inputCls} value={toGstin} placeholder="GSTIN optional" onChange={(e) => setToGstin(e.target.value)} />
          </Field>
          <Field label="State">
            <input className={inputCls} value={toState} onChange={(e) => setToState(e.target.value)} />
          </Field>
          <Field label="Consignee Address" full>
            <textarea className={textareaCls} value={toAddress} onChange={(e) => setToAddress(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Challan & Dispatch Details">
        <FieldGrid>
          <Field label="Challan Number">
            <input className={inputCls} value={challanNo} onChange={(e) => setChallanNo(e.target.value)} />
          </Field>
          <Field label="Challan Date">
            <input type="date" className={inputCls} value={challanDate} onChange={(e) => setChallanDate(e.target.value)} />
          </Field>
          <Field label="Purpose / Reason">
            <select className={selectCls} value={purpose} onChange={(e) => setPurpose(e.target.value)}>
              <option>Delivery of Goods</option>
              <option>Job Work</option>
              <option>Supply on Approval</option>
              <option>Stock Transfer</option>
              <option>Goods Sent for Repair</option>
              <option>Sale Return</option>
              <option>Other</option>
            </select>
          </Field>
          <Field label="Reference Number">
            <input className={inputCls} value={refNo} placeholder="Invoice/PO/Order reference" onChange={(e) => setRefNo(e.target.value)} />
          </Field>
          <Field label="Dispatch From">
            <input className={inputCls} value={dispatchFrom} onChange={(e) => setDispatchFrom(e.target.value)} />
          </Field>
          <Field label="Delivery To">
            <input className={inputCls} value={deliveryTo} onChange={(e) => setDeliveryTo(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Transport Details">
        <FieldGrid>
          <Field label="Transport Mode">
            <select className={selectCls} value={transportMode} onChange={(e) => setTransportMode(e.target.value)}>
              <option>By Road</option>
              <option>By Courier</option>
              <option>By Rail</option>
              <option>By Air</option>
              <option>Hand Delivery</option>
              <option>Other</option>
            </select>
          </Field>
          <Field label="Vehicle / LR / AWB No.">
            <input className={inputCls} value={vehicleNo} placeholder="Vehicle no. / docket no." onChange={(e) => setVehicleNo(e.target.value)} />
          </Field>
          <Field label="Transporter Name">
            <input className={inputCls} value={transporter} placeholder="Transporter / courier" onChange={(e) => setTransporter(e.target.value)} />
          </Field>
          <Field label="Place of Supply / Delivery State">
            <input className={inputCls} value={placeSupply} onChange={(e) => setPlaceSupply(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection title="Items">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse min-w-[720px]">
            <thead>
              <tr className="bg-primary/5 text-primary">
                <th className="p-2 text-left font-semibold">Description</th>
                <th className="p-2 text-left font-semibold">HSN/SAC</th>
                <th className="p-2 font-semibold">Qty</th>
                <th className="p-2 font-semibold">Unit</th>
                <th className="p-2 font-semibold">Rate</th>
                <th className="p-2 font-semibold">Value</th>
                <th className="p-2 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, i) => (
                <tr key={i} className="border-b">
                  <td className="p-1">
                    <input className={inputCls} value={it.desc} placeholder="Goods description" onChange={(e) => updateItem(i, { desc: e.target.value })} />
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
                  <td className="p-1 text-center whitespace-nowrap">INR {fmt(computed[i].value)}</td>
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
        <div className="mt-5 max-w-sm ml-auto">
          <TotalRow label="Total Qty" value={fmt(totalQty)} />
          <TotalRow label="Items" value={String(items.length)} />
          <TotalRow label="Purpose" value={purpose || "-"} />
          <TotalRow label="Total Value" value={`INR ${fmt(totalValue)}`} grand />
        </div>
      </FormSection>

      <FormSection title="Terms & Signatory">
        <FieldGrid>
          <Field label="Terms / Notes" full>
            <textarea className={textareaCls} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </Field>
          <Field label="Prepared By">
            <input className={inputCls} value={preparedBy} onChange={(e) => setPreparedBy(e.target.value)} />
          </Field>
          <Field label="Authorized Signatory">
            <input className={inputCls} value={signatory} placeholder="Name / designation" onChange={(e) => setSignatory(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <div className="flex flex-wrap gap-3">
        <button type="button" className={btnPrimary} onClick={downloadPdf}>
          Download Challan PDF
        </button>
        <button type="button" className={btnOutline} onClick={reset}>
          Reset Form
        </button>
      </div>

      <PreviewBox>
        <div className="max-w-[820px] mx-auto border bg-white p-5 text-sm">
          <div className="flex justify-between gap-4 flex-wrap border-b-2 border-primary pb-3 mb-3">
            <div>
              <h3 className="text-lg font-bold text-primary">DELIVERY CHALLAN</h3>
              <p className="text-gray-600">
                {fromName || "-"}
                <br />
                {fromAddress}
                <br />
                GSTIN: {fromGstin || "N/A"}
              </p>
            </div>
            <div className="text-right text-gray-600">
              <p>
                <b>No.:</b> {challanNo || "-"}
                <br />
                <b>Date:</b> {challanDate || "-"}
                <br />
                <b>Purpose:</b> {purpose || "-"}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div>
              <b>Consignee</b>
              <p className="text-gray-600">
                {toName || "-"}
                <br />
                {toAddress}
                <br />
                GSTIN: {toGstin || "N/A"}
              </p>
            </div>
            <div>
              <b>Transport Details</b>
              <p className="text-gray-600">
                Mode: {transportMode || "-"}
                <br />
                Vehicle/LR/AWB: {vehicleNo || "-"}
                <br />
                Transporter: {transporter || "-"}
              </p>
            </div>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary/5 text-primary">
                <th className="p-1 text-left">Description</th>
                <th className="p-1 text-left">HSN/SAC</th>
                <th className="p-1">Qty</th>
                <th className="p-1">Unit</th>
                <th className="p-1">Rate</th>
                <th className="p-1 text-right">Value</th>
              </tr>
            </thead>
            <tbody>
              {computed.map((it, i) => (
                <tr key={i} className="border-b">
                  <td className="p-1">{it.desc || "-"}</td>
                  <td className="p-1">{it.hsn || "-"}</td>
                  <td className="p-1 text-center">{fmt(it.qty)}</td>
                  <td className="p-1 text-center">{it.unit || "-"}</td>
                  <td className="p-1 text-center">INR {fmt(it.rate)}</td>
                  <td className="p-1 text-right">INR {fmt(it.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 className="text-right font-bold text-primary mt-3">
            Total Value: INR {fmt(totalValue)}
          </h3>
          <p className="mt-2 text-gray-600">
            <b>Notes:</b> {notes || "-"}
          </p>
          <p className="mt-1">
            <b>Prepared By:</b> {preparedBy || "-"} · <b>Authorized Signatory:</b>{" "}
            {signatory || "-"}
          </p>
        </div>
      </PreviewBox>
    </ToolCard>
  );
}
