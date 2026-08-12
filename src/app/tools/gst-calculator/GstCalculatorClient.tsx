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
  btnPrimary,
  btnOutline,
} from "@/components/tools/fields";

const money = (n: number) =>
  "₹" +
  Number(n || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
const pdfMoney = (n: number) =>
  "INR " +
  Number(n || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function GstCalculatorClient() {
  const [calcMode, setCalcMode] = useState("exclusive");
  const [amount, setAmount] = useState("10000");
  const [gstRate, setGstRate] = useState("18");
  const [customRate, setCustomRate] = useState("18");
  const [gstType, setGstType] = useState("cgst-sgst");
  const [note, setNote] = useState("GST calculation");

  const amt = parseFloat(amount) || 0;
  const rate =
    gstRate === "custom" ? parseFloat(customRate) || 0 : parseFloat(gstRate) || 0;

  let taxable = 0;
  let gst = 0;
  let total = 0;
  if (calcMode === "exclusive") {
    taxable = amt;
    gst = (taxable * rate) / 100;
    total = taxable + gst;
  } else {
    total = amt;
    taxable = rate ? (total * 100) / (100 + rate) : total;
    gst = total - taxable;
  }
  const half = gst / 2;

  const modeLabel =
    calcMode === "exclusive"
      ? "Add GST to taxable amount"
      : "Remove GST from GST-inclusive amount";
  const typeLabel = gstType === "cgst-sgst" ? "CGST + SGST" : "IGST";

  const reset = () => {
    setCalcMode("exclusive");
    setAmount("10000");
    setGstRate("18");
    setCustomRate("18");
    setGstType("cgst-sgst");
    setNote("GST calculation");
  };

  const downloadPdf = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageW = 210;
    const margin = 16;
    let y = 18;

    // Header
    doc.setFillColor(15, 74, 137);
    doc.roundedRect(margin, y, pageW - margin * 2, 22, 3, 3, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Registration Seva GST Calculation Summary", margin + 6, y + 9);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Generated using Registration Seva GST Calculator", margin + 6, y + 16);
    y += 32;

    // Details box
    doc.setDrawColor(217, 230, 251);
    doc.setFillColor(247, 251, 255);
    doc.roundedRect(margin, y, pageW - margin * 2, 30, 3, 3, "FD");
    doc.setTextColor(15, 74, 137);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Calculation Details", margin + 6, y + 8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 96, 125);
    doc.text("Note: " + (note || "GST calculation"), margin + 6, y + 15);
    doc.text("Mode: " + modeLabel, margin + 6, y + 21);
    doc.text("GST Type: " + typeLabel, margin + 6, y + 27);
    y += 42;

    // Result table
    const tableX = margin;
    const tableW = pageW - margin * 2;
    const rowH = 10;
    const labelW = 112;
    const rows: [string, string][] = [
      ["Taxable Value", pdfMoney(taxable)],
      ["Total GST @ " + rate.toFixed(2) + "%", pdfMoney(gst)],
    ];
    if (gstType === "cgst-sgst") {
      rows.push(["CGST @ " + (rate / 2).toFixed(2) + "%", pdfMoney(gst / 2)]);
      rows.push(["SGST @ " + (rate / 2).toFixed(2) + "%", pdfMoney(gst / 2)]);
    } else {
      rows.push(["IGST @ " + rate.toFixed(2) + "%", pdfMoney(gst)]);
    }

    doc.setFillColor(15, 74, 137);
    doc.roundedRect(tableX, y, tableW, rowH, 2, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Particulars", tableX + 5, y + 6.7);
    doc.text("Amount", tableX + labelW + 5, y + 6.7);
    y += rowH;

    doc.setFont("helvetica", "normal");
    rows.forEach((row, idx) => {
      doc.setFillColor(idx % 2 === 0 ? 255 : 247, idx % 2 === 0 ? 255 : 251, idx % 2 === 0 ? 255 : 255);
      doc.setDrawColor(217, 230, 251);
      doc.rect(tableX, y, tableW, rowH, "FD");
      doc.setTextColor(15, 74, 137);
      doc.text(row[0], tableX + 5, y + 6.7);
      doc.setFont("helvetica", "bold");
      doc.text(row[1], tableX + labelW + 5, y + 6.7);
      doc.setFont("helvetica", "normal");
      y += rowH;
    });

    // Grand total
    y += 4;
    doc.setFillColor(243, 164, 4);
    doc.roundedRect(tableX, y, tableW, 14, 3, 3, "F");
    doc.setTextColor(32, 32, 32);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Total Invoice Value", tableX + 5, y + 9);
    doc.text(pdfMoney(total), tableX + labelW + 5, y + 9);
    y += 24;

    // Verification note
    doc.setTextColor(96, 112, 141);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const verifyNote =
      "Important: This calculation is for general utility only. Verify GST rate, taxable value, place of supply and tax treatment before official use.";
    doc.text(doc.splitTextToSize(verifyNote, tableW), margin, y);

    doc.text(
      "Generated free at registrationseva.com. Verify all details before official use.",
      margin,
      285
    );
    doc.save("gst-calculation-RegistrationSeva.pdf");
  };

  return (
    <ToolCard>
      <h2 className="text-2xl font-bold text-primary mb-2">Enter GST details</h2>
      <p className="text-gray-600 text-sm mb-6">
        Choose mode, amount, rate and tax type. The result updates
        automatically.
      </p>

      <FormSection title="Calculation Details">
        <FieldGrid>
          <Field label="Calculation Mode">
            <select className={selectCls} value={calcMode} onChange={(e) => setCalcMode(e.target.value)}>
              <option value="exclusive">Add GST to taxable amount</option>
              <option value="inclusive">Remove GST from GST-inclusive amount</option>
            </select>
          </Field>
          <Field label="Amount">
            <input type="number" min={0} step={0.01} inputMode="decimal" className={inputCls} value={amount} onChange={(e) => setAmount(e.target.value)} />
          </Field>
          <Field label="GST Rate">
            <select className={selectCls} value={gstRate} onChange={(e) => setGstRate(e.target.value)}>
              <option value="0">0%</option>
              <option value="5">5%</option>
              <option value="12">12%</option>
              <option value="18">18%</option>
              <option value="28">28%</option>
              <option value="custom">Custom Rate</option>
            </select>
          </Field>
          {gstRate === "custom" && (
            <Field label="Custom GST Rate %">
              <input type="number" min={0} step={0.01} inputMode="decimal" className={inputCls} value={customRate} onChange={(e) => setCustomRate(e.target.value)} />
            </Field>
          )}
          <Field label="GST Type">
            <select className={selectCls} value={gstType} onChange={(e) => setGstType(e.target.value)}>
              <option value="cgst-sgst">CGST + SGST</option>
              <option value="igst">IGST</option>
            </select>
          </Field>
          <Field label="Description / Note">
            <input className={inputCls} value={note} onChange={(e) => setNote(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <div className="mt-5 max-w-sm ml-auto">
        <TotalRow label="Taxable Value" value={money(taxable)} />
        <TotalRow label={`Total GST @ ${rate.toFixed(2)}%`} value={money(gst)} />
        {gstType === "cgst-sgst" ? (
          <>
            <TotalRow label={`CGST @ ${(rate / 2).toFixed(2)}%`} value={money(half)} />
            <TotalRow label={`SGST @ ${(rate / 2).toFixed(2)}%`} value={money(half)} />
          </>
        ) : (
          <TotalRow label={`IGST @ ${rate.toFixed(2)}%`} value={money(gst)} />
        )}
        <TotalRow label="Total Invoice Value" value={money(total)} grand />
      </div>

      <div className="flex flex-wrap gap-3 mt-6">
        <button type="button" className={btnPrimary} onClick={downloadPdf}>
          Download PDF
        </button>
        <button type="button" className={btnOutline} onClick={reset}>
          Reset
        </button>
      </div>

      <PreviewBox>
        <div className="max-w-[760px] mx-auto border bg-white p-5 rounded-lg text-sm">
          <h3 className="text-lg font-bold text-primary mb-2">
            GST Calculation Summary
          </h3>
          <p>
            <b>Note:</b> {note || "GST calculation"}
            <br />
            <b>Mode:</b> {modeLabel}
            <br />
            <b>GST Type:</b> {typeLabel}
          </p>
          <hr className="my-3" />
          <p>
            <b>Taxable Value:</b> {money(taxable)}
            <br />
            <b>GST Amount:</b> {money(gst)}
            <br />
            <b>Total Invoice Value:</b> {money(total)}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Verify rate, place of supply and tax treatment before official use.
          </p>
        </div>
      </PreviewBox>
    </ToolCard>
  );
}
