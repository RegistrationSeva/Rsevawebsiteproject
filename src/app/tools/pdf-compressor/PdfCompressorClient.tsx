"use client";
import React, { useRef, useState } from "react";
import {
  ToolCard,
  Field,
  inputCls,
  selectCls,
  btnPrimary,
  btnSecondary,
  btnOutline,
} from "@/components/tools/fields";

const PDFJS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
const PDFJS_WORKER_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

/* pdf.js is loaded from CDN at runtime (no npm dependency), mirroring the
   source page. The script tag is injected once on demand. */
let pdfjsPromise: Promise<any> | null = null;
function loadPdfJs(): Promise<any> {
  if (!pdfjsPromise) {
    pdfjsPromise = new Promise((resolve, reject) => {
      const existing = (window as any).pdfjsLib;
      if (existing) {
        existing.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
        resolve(existing);
        return;
      }
      const script = document.createElement("script");
      script.src = PDFJS_URL;
      script.onload = () => {
        const lib = (window as any).pdfjsLib;
        if (!lib) {
          reject(new Error("pdf.js failed to initialise."));
          return;
        }
        lib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
        resolve(lib);
      };
      script.onerror = () => {
        pdfjsPromise = null; // allow retry
        reject(
          new Error(
            "Could not load the PDF engine. Check your internet connection and try again."
          )
        );
      };
      document.head.appendChild(script);
    });
  }
  return pdfjsPromise;
}

const formatBytes = (bytes: number | null) => {
  if (bytes === null || bytes === undefined) return "-";
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let i = 0;
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024;
    i++;
  }
  return (size >= 10 ? size.toFixed(1) : size.toFixed(2)) + " " + units[i];
};

const pctReduction = (original: number | null, compressed: number | null) => {
  if (!original || !compressed) return "-";
  const r = ((original - compressed) / original) * 100;
  return (r >= 0 ? "-" : "+") + Math.abs(r).toFixed(1) + "%";
};

function settings(level: string, mode: string) {
  let quality = 0.65;
  let scale = 1.25;
  if (level === "low") {
    quality = 0.82;
    scale = 1.45;
  }
  if (level === "medium") {
    quality = 0.62;
    scale = 1.2;
  }
  if (level === "high") {
    quality = 0.42;
    scale = 0.95;
  }
  if (mode === "sharp") {
    scale += 0.25;
    quality = Math.min(0.88, quality + 0.1);
  }
  if (mode === "small") {
    scale = Math.max(0.7, scale - 0.18);
    quality = Math.max(0.32, quality - 0.1);
  }
  return { quality, scale };
}

export default function PdfCompressorClient() {
  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState("medium");
  const [pageMode, setPageMode] = useState("balanced");
  const [outputName, setOutputName] = useState("compressed-pdf.pdf");
  const [status, setStatus] = useState("Select a PDF file to begin.");
  const [progress, setProgress] = useState<number | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [dragover, setDragover] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const modeNote =
    level === "low"
      ? "Low compression keeps better visual quality but may reduce file size less."
      : level === "high"
      ? "High compression creates a smaller file but may reduce clarity. Review the PDF before official use."
      : "Medium compression gives a balanced result for most scanned PDFs.";

  const loadFile = (f: File) => {
    if (f.type !== "application/pdf" && !f.name.toLowerCase().endsWith(".pdf")) {
      setError("Please select a PDF file.");
      return;
    }
    setFile(f);
    setCompressedBlob(null);
    setPageCount(null);
    setSuccess("");
    setError("");
    setProgress(null);
    setStatus("PDF selected. Choose compression level and click Compress PDF.");
  };

  const clearFile = () => {
    setFile(null);
    setCompressedBlob(null);
    setPageCount(null);
    setSuccess("");
    setError("");
    setProgress(null);
    if (inputRef.current) inputRef.current.value = "";
    setStatus("Select a PDF file to begin.");
  };

  const compressPdf = async () => {
    if (!file) {
      setError("Please choose a PDF file first.");
      return;
    }
    try {
      setCompressedBlob(null);
      setSuccess("");
      setError("");
      setStatus("Reading PDF...");
      setProgress(3);
      const pdfjsLib = await loadPdfJs();
      const { jsPDF } = await import("jspdf");
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      setPageCount(pdf.numPages);
      const s = settings(level, pageMode);
      let out: InstanceType<typeof jsPDF> | null = null;
      for (let i = 1; i <= pdf.numPages; i++) {
        setStatus(`Compressing page ${i} of ${pdf.numPages}...`);
        const page = await pdf.getPage(i);
        const baseViewport = page.getViewport({ scale: 1 });
        const renderViewport = page.getViewport({ scale: s.scale });
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) throw new Error("Could not create canvas context.");
        canvas.width = Math.floor(renderViewport.width);
        canvas.height = Math.floor(renderViewport.height);
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport: renderViewport })
          .promise;
        const imgData = canvas.toDataURL("image/jpeg", s.quality);
        const orientation =
          baseViewport.width > baseViewport.height ? "landscape" : "portrait";
        if (!out) {
          out = new jsPDF({
            orientation,
            unit: "pt",
            format: [baseViewport.width, baseViewport.height],
            compress: true,
          });
        } else {
          out.addPage([baseViewport.width, baseViewport.height], orientation);
        }
        out.addImage(
          imgData,
          "JPEG",
          0,
          0,
          baseViewport.width,
          baseViewport.height,
          undefined,
          "FAST"
        );
        canvas.width = 1;
        canvas.height = 1;
        setProgress(5 + (i / pdf.numPages) * 88);
      }
      if (!out) throw new Error("PDF has no pages.");
      setStatus("Preparing compressed PDF...");
      const blob = out.output("blob");
      setCompressedBlob(blob);
      setSuccess(
        `Compression complete. Original: ${formatBytes(file.size)} | Compressed: ${formatBytes(blob.size)} | Change: ${pctReduction(file.size, blob.size)}. Review the downloaded PDF before official use.`
      );
      setProgress(100);
      setStatus("Compression completed. You can download the compressed PDF.");
    } catch (err) {
      console.error(err);
      setStatus(
        "Unable to compress this PDF in browser. The file may be protected, too large, damaged, or not supported."
      );
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Unable to compress this PDF. Please try another file or lower compression settings."
      );
    }
  };

  const downloadCompressed = () => {
    if (!compressedBlob) return;
    let name = outputName.trim() || "compressed-pdf.pdf";
    if (!name.toLowerCase().endsWith(".pdf")) name += ".pdf";
    const url = URL.createObjectURL(compressedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolCard>
      <h2 className="text-2xl font-bold text-primary mb-2">Compress PDF File</h2>
      <p className="text-gray-600 text-sm mb-6">
        Upload a PDF, choose compression level and download the compressed file.
      </p>

      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragover ? "border-primary bg-primary/5" : "border-primary/30 bg-gray-50"
        }`}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragover(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragover(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragover(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDragover(false);
          const f = e.dataTransfer.files[0];
          if (f) loadFile(f);
        }}
      >
        <div className="text-lg font-bold text-primary mb-1">
          Drop PDF here or choose file
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Your PDF is processed in your browser. It is not uploaded to
          Registration Seva server.
        </p>
        <label className={`${btnPrimary} cursor-pointer`} htmlFor="pdfFile">
          Choose PDF
        </label>
        <input
          ref={inputRef}
          id="pdfFile"
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) loadFile(f);
          }}
        />
      </div>

      {file && (
        <div className="flex flex-wrap justify-between items-center gap-3 border rounded-lg p-4 mt-4">
          <div>
            <div className="font-semibold text-primary">{file.name}</div>
            <div className="text-gray-500 text-xs">
              Original size: {formatBytes(file.size)}
            </div>
          </div>
          <button type="button" className={btnOutline} onClick={clearFile}>
            Remove File
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        <Field label="Compression Level">
          <select className={selectCls} value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="low">Low Compression - Better Quality</option>
            <option value="medium">Medium Compression - Balanced</option>
            <option value="high">High Compression - Smaller File</option>
          </select>
        </Field>
        <Field label="Output Page Quality">
          <select className={selectCls} value={pageMode} onChange={(e) => setPageMode(e.target.value)}>
            <option value="balanced">Balanced</option>
            <option value="sharp">Sharper Text / Larger Size</option>
            <option value="small">Smaller Size / Lower Quality</option>
          </select>
        </Field>
        <Field label="Output File Name">
          <input className={inputCls} value={outputName} onChange={(e) => setOutputName(e.target.value)} />
        </Field>
      </div>

      <div className="flex flex-wrap gap-3 mt-5">
        <button type="button" className={btnPrimary} onClick={compressPdf}>
          Compress PDF
        </button>
        {compressedBlob && (
          <button type="button" className={btnSecondary} onClick={downloadCompressed}>
            Download Compressed PDF
          </button>
        )}
        <button type="button" className={btnOutline} onClick={clearFile}>
          Reset
        </button>
      </div>

      {progress !== null && (
        <div className="mt-4 h-3 rounded-full bg-primary/10 overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
          />
        </div>
      )}

      <div className="mt-4 rounded-lg border bg-gray-50 p-4 text-sm text-gray-700">
        {status}
      </div>
      {success && (
        <div className="mt-4 rounded-lg border border-green-300 bg-green-50 p-4 text-sm text-green-800">
          {success}
        </div>
      )}
      {error && (
        <div className="mt-4 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
        {[
          ["Original Size", formatBytes(file ? file.size : null)],
          ["Compressed Size", formatBytes(compressedBlob ? compressedBlob.size : null)],
          [
            "Reduction",
            pctReduction(file ? file.size : null, compressedBlob ? compressedBlob.size : null),
          ],
          ["Pages", pageCount === null ? "-" : String(pageCount)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border bg-gray-50 p-4">
            <div className="text-xs font-semibold text-gray-600 mb-1">{label}</div>
            <div className="text-lg font-bold text-primary">{value}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-secondary/40 bg-secondary/10 p-4 text-sm text-gray-700">
        {modeNote}
      </div>
      <div className="mt-4 rounded-lg border border-secondary/40 bg-secondary/10 p-4 text-sm text-gray-700">
        <strong className="text-primary">Important:</strong> This browser-based
        compressor works best for scanned or image-heavy PDFs. For text-based
        PDFs, compression may be limited. This tool may rasterize pages, so
        searchable/selectable text may not remain searchable after compression.
      </div>
    </ToolCard>
  );
}
