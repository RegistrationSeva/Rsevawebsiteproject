import React from "react";
import { cn } from "@/lib/utils";

/* Shared building blocks for tool pages. Tool clients use native
   inputs/selects with these classes so form state stays plain React. */

export const inputCls =
  "w-full h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-primary";
export const selectCls = inputCls;
export const textareaCls =
  "w-full min-h-[60px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-primary";

export const btnPrimary =
  "inline-flex items-center justify-center rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white shadow hover:bg-primary/90 transition-colors";
export const btnSecondary =
  "inline-flex items-center justify-center rounded-md bg-secondary px-5 py-2 text-sm font-semibold text-[#202020] shadow hover:bg-secondary/80 transition-colors";
export const btnOutline =
  "inline-flex items-center justify-center rounded-md border border-primary/30 bg-white px-5 py-2 text-sm font-semibold text-primary shadow-sm hover:bg-primary/5 transition-colors";
export const btnDanger =
  "inline-flex items-center justify-center rounded-md bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow hover:bg-red-500 transition-colors";

export function ToolCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border shadow-lg p-5 md:p-8 max-w-5xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

export function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-primary mb-3">{title}</h3>
      {children}
    </div>
  );
}

export function FieldGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>;
}

export function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "md:col-span-2" : undefined}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}

export function TotalRow({
  label,
  value,
  grand,
}: {
  label: string;
  value: string;
  grand?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex justify-between items-center py-2 border-b last:border-b-0",
        grand && "text-primary font-bold text-lg border-t-2 border-primary/20"
      )}
    >
      <span className={grand ? undefined : "text-gray-600 text-sm"}>
        {label}
      </span>
      <b>{value}</b>
    </div>
  );
}

export function PreviewBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-lg border border-dashed border-primary/30 bg-gray-50 p-4 overflow-x-auto">
      {children}
    </div>
  );
}

export const fmtINR = (n: number | string) =>
  Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 });
