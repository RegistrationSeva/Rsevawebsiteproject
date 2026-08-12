import React from "react";
import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import PdfCompressorClient from "./PdfCompressorClient";

export const metadata: Metadata = {
  title: "Free PDF Compressor Online - Registration SEVA",
  description:
    "Compress PDF files online in your browser. Choose low, medium or high compression and download a smaller PDF. Best for scanned or image-heavy PDFs.",
  alternates: {
    canonical: "https://www.registrationseva.com/tools/pdf-compressor",
  },
  openGraph: {
    title: "Free PDF Compressor Online - Registration SEVA",
    description:
      "Compress PDF files online in your browser. No server upload. Best for scanned or image-heavy PDFs.",
    type: "website",
    url: "https://www.registrationseva.com/tools/pdf-compressor",
  },
};

export default function PdfCompressorPage() {
  return (
    <ToolPageShell
      badge="PDF & File Tool"
      title="Free PDF Compressor Online"
      intro="Compress PDF files directly in your browser. Choose quality level and download a smaller PDF. Best for scanned documents, image-heavy PDFs, agreements, KYC documents and portal uploads."
      chips={["Browser Processing", "No Server Upload", "PDF Download", "Image-heavy PDFs"]}
      faqs={[
        {
          q: "Is my PDF uploaded to the server?",
          a: "No. This tool processes the PDF in your browser. The file is not uploaded to Registration Seva server.",
        },
        {
          q: "Which PDFs compress best?",
          a: "Scanned PDFs and image-heavy PDFs usually compress better. Text-only PDFs may not reduce significantly.",
        },
        {
          q: "Will the compressed PDF remain searchable?",
          a: "This tool may convert pages into compressed images, so selectable/searchable text may be lost. Use it when smaller file size is more important than text searchability.",
        },
        {
          q: "Why did my PDF size increase?",
          a: "Some already-optimized or text-based PDFs may not compress well. Try a different compression level or keep the original PDF.",
        },
      ]}
    >
      <PdfCompressorClient />
    </ToolPageShell>
  );
}
