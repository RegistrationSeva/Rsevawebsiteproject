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

const presets = [
  {
    value: "194C-individual",
    label: "194C Contractor - Individual/HUF - 1%",
    rate: 1,
    note: "Contractor payment to individual/HUF - verify threshold and applicability.",
  },
  {
    value: "194C-other",
    label: "194C Contractor - Others - 2%",
    rate: 2,
    note: "Contractor payment to other deductees - verify threshold and applicability.",
  },
  {
    value: "194J-professional",
    label: "194J Professional Fees - 10%",
    rate: 10,
    note: "Professional fees - verify threshold, section and deductee status.",
  },
  {
    value: "194J-technical",
    label: "194J Technical Fees - 2%",
    rate: 2,
    note: "Technical services/certain 194J cases - verify exact applicability.",
  },
  {
    value: "194I-building",
    label: "194I Rent Land/Building - 10%",
    rate: 10,
    note: "Rent for land/building/furniture/fittings - verify threshold and applicability.",
  },
  {
    value: "194I-plant",
    label: "194I Rent Plant/Machinery - 2%",
    rate: 2,
    note: "Rent for plant/machinery/equipment - verify threshold and applicability.",
  },
  {
    value: "194H",
    label: "194H Commission/Brokerage - 5%",
    rate: 5,
    note: "Commission or brokerage - verify threshold and applicability.",
  },
  {
    value: "194A",
    label: "194A Interest - 10%",
    rate: 10,
    note: "Interest other than securities - verify threshold and deductor category.",
  },
  {
    value: "194Q",
    label: "194Q Purchase of Goods - 0.1%",
    rate: 0.1,
    note: "Purchase of goods - verify turnover, threshold and applicability.",
  },
  {
    value: "custom",
    label: "Custom Rate",
    rate: 10,
    note: "Custom rate selected. Verify section, threshold and rate before official use.",
  },
];

export default function TdsCalculatorClient() {
  const [calcMode, setCalcMode] = useState("gross");
  const [amount, setAmount] = useState("100000");
  const [preset, setPreset] = useState("194C-individual");
  const [tdsRate, setTdsRate] = useState("1");
  const [panAvailable, setPanAvailable] = useState("yes");
  const [roundMode, setRoundMode] = useState("yes");
  const [partyName, setPartyName] = useState("ABC Enterprises");
  const [description, setDescription] = useState("Professional / business payment");

  const selected = presets.find((p) => p.value === preset) || presets[0];
  const sectionText = selected.label;
  const note = selected.note;

  const amt = parseFloat(amount) || 0;
  const rate = parseFloat(tdsRate) || 0;
  const noPan = panAvailable === "no";
  const effectiveRate = noPan ? Math.max(rate, 20) : rate;
  const decimal = effectiveRate / 100;
  const round = roundMode === "yes";
  let gross: number;
  let tds: number;
  let net: number;
  if (calcMode === "gross") {
    gross = amt;
    tds = gross * decimal;
    if (round) tds = Math.round(tds);
    net = gross - tds;
  } else {
    net = amt;
    gross = decimal >= 1 ? net : net / (1 - decimal);
    tds = gross - net;
    if (round) {
      tds = Math.round(tds);
      gross = net + tds;
    }
  }

  const handlePresetChange = (value: string) => {
    setPreset(value);
    if (value !== "custom") {
      const p = presets.find((x) => x.value === value);
      if (p) setTdsRate(String(p.rate));
    }
  };

  const reset = () => {
    setCalcMode("gross");
    setAmount("100000");
    setPreset("194C-individual");
    setTdsRate("1");
    setPanAvailable("yes");
    setRoundMode("yes");
    setPartyName("ABC Enterprises");
    setDescription("Professional / business payment");
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
    doc.text("Registration Seva TDS Calculation Summary", margin + 6, y + 9);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Generated using Registration Seva TDS Calculator", margin + 6, y + 16);
    y += 32;

    // Details box
    doc.setDrawColor(217, 230, 251);
    doc.setFillColor(247, 251, 255);
    doc.roundedRect(margin, y, pageW - margin * 2, 38, 3, 3, "FD");
    doc.setTextColor(15, 74, 137);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Calculation Details", margin + 6, y + 8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 96, 125);
    doc.text("Party: " + (partyName || "-"), margin + 6, y + 15);
    doc.text("Description: " + (description || "-"), margin + 6, y + 21);
    doc.text("Payment Type: " + sectionText.substring(0, 78), margin + 6, y + 27);
    doc.text("PAN Available: " + (noPan ? "No / Invalid PAN" : "Yes"), margin + 6, y + 33);
    y += 50;

    // Result table
    const tableX = margin;
    const tableW = pageW - margin * 2;
    const rowH = 10;
    const labelW = 112;
    const rows: [string, string][] = [
      ["Base TDS Rate", rate.toFixed(2) + "%"],
      ["Effective TDS Rate", effectiveRate.toFixed(2) + "%"],
      ["Gross / Invoice Amount", pdfMoney(gross)],
      ["TDS Amount", pdfMoney(tds)],
      ["Net Payable", pdfMoney(net)],
    ];

    doc.setFillColor(15, 74, 137);
    doc.roundedRect(tableX, y, tableW, rowH, 2, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Particulars", tableX + 5, y + 6.7);
    doc.text("Value", tableX + labelW + 5, y + 6.7);
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
    doc.setFontSize(11);
    doc.text("Net Payable After TDS", tableX + 5, y + 9);
    doc.text(pdfMoney(net), tableX + labelW + 5, y + 9);
    y += 24;

    // Verification note
    doc.setTextColor(96, 112, 141);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const verifyNote =
      "Important: This calculation is for general utility only. Verify TDS section, rate, threshold, PAN treatment, deductee status and current law before official deduction or filing. " +
      note;
    doc.text(doc.splitTextToSize(verifyNote, tableW), margin, y);

    doc.text(
      "Generated free at registrationseva.com. Verify all details before official use.",
      margin,
      285
    );
    doc.save("tds-calculation-RegistrationSeva.pdf");
  };

  return (
    <ToolCard>
      <h2 className="text-2xl font-bold text-primary mb-2">Calculate TDS</h2>
      <p className="text-gray-600 text-sm mb-6">
        Select a payment type or enter a custom TDS rate. This calculator is
        for quick estimation and should be verified before official deduction
        or return filing.
      </p>

      <FormSection title="Payment Details">
        <FieldGrid>
          <Field label="Calculation Mode">
            <select className={selectCls} value={calcMode} onChange={(e) => setCalcMode(e.target.value)}>
              <option value="gross">Calculate TDS from gross payment</option>
              <option value="net">Reverse calculate gross from net payable</option>
            </select>
          </Field>
          <Field label={calcMode === "gross" ? "Gross / Invoice Amount" : "Net Payable Amount"}>
            <input type="number" min={0} step={0.01} className={inputCls} value={amount} onChange={(e) => setAmount(e.target.value)} />
          </Field>
          <Field label="Payment Type / TDS Section Preset">
            <select className={selectCls} value={preset} onChange={(e) => handlePresetChange(e.target.value)}>
              {presets.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="TDS Rate %">
            <input type="number" min={0} step={0.01} className={inputCls} value={tdsRate} onChange={(e) => setTdsRate(e.target.value)} />
          </Field>
          <Field label="PAN Available?">
            <select className={selectCls} value={panAvailable} onChange={(e) => setPanAvailable(e.target.value)}>
              <option value="yes">Yes</option>
              <option value="no">No / Invalid PAN</option>
            </select>
          </Field>
          <Field label="Round TDS Amount?">
            <select className={selectCls} value={roundMode} onChange={(e) => setRoundMode(e.target.value)}>
              <option value="yes">Yes, nearest rupee</option>
              <option value="no">No, show decimals</option>
            </select>
          </Field>
          <Field label="Deductee / Party Name">
            <input className={inputCls} value={partyName} onChange={(e) => setPartyName(e.target.value)} />
          </Field>
          <Field label="Payment Description">
            <input className={inputCls} value={description} onChange={(e) => setDescription(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormSection>

      <div className="mt-5 max-w-md ml-auto">
        <TotalRow label="Payment Type" value={sectionText} />
        <TotalRow label="Base TDS Rate" value={`${rate.toFixed(2)}%`} />
        <TotalRow label="Effective TDS Rate" value={`${effectiveRate.toFixed(2)}%`} />
        <TotalRow label="Gross / Invoice Amount" value={money(gross)} />
        <TotalRow label="TDS Amount" value={money(tds)} />
        <TotalRow label="Net Payable" value={money(net)} grand />
      </div>

      <div className="flex flex-wrap gap-3 mt-6">
        <button type="button" className={btnPrimary} onClick={downloadPdf}>
          Download Calculation PDF
        </button>
        <button type="button" className={btnOutline} onClick={reset}>
          Reset
        </button>
      </div>

      <PreviewBox>
        <div className="max-w-[760px] mx-auto border bg-white p-5 rounded-lg text-sm">
          <h3 className="text-lg font-bold text-primary mb-2">
            TDS Calculation Summary
          </h3>
          <p>
            <b>Party:</b> {partyName || "-"}
            <br />
            <b>Description:</b> {description || "-"}
            <br />
            <b>Payment Type:</b> {sectionText}
            <br />
            <b>PAN Available:</b> {noPan ? "No / Invalid PAN" : "Yes"}
          </p>
          <hr className="my-3" />
          <p>
            <b>Gross Amount:</b> {money(gross)}
            <br />
            <b>Effective TDS Rate:</b> {effectiveRate.toFixed(2)}%
            <br />
            <b>TDS Amount:</b> {money(tds)}
            <br />
            <b>Net Payable:</b> {money(net)}
          </p>
          <p className="text-xs text-gray-500 mt-2">{note}</p>
        </div>
      </PreviewBox>
    </ToolCard>
  );
}
