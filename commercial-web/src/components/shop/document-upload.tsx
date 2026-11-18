"use client"

import { useRef, useState } from "react";
import { AlertCircle, CheckCircle2, FileText, Upload } from "lucide-react";

type DocumentUploadProps = {
  onFileChange: (file: File | null) => void;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];

export function DocumentUpload({ onFileChange }: DocumentUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  function validate(file: File) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Choose a PDF, JPG, JPEG or PNG file.";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "The selected file is larger than 10 MB.";
    }
    return "";
  }

  function handleFile(file: File | undefined) {
    if (!file) return;
    const message = validate(file);
    setError(message);
    setFileName(message ? "" : file.name);
    onFileChange(message ? null : file);
  }

  return (
    <section aria-labelledby="document-heading">
      <div className="mb-4">
        <p id="document-heading" className="font-semibold">1. Upload document</p>
        <p className="mt-1 text-sm text-muted-foreground">PDF, JPG, JPEG or PNG up to 10 MB.</p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
        className="sr-only"
        onChange={(event) => handleFile(event.target.files?.[0])}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex w-full min-h-32 flex-col items-center justify-center rounded-lg border border-dashed border-input bg-muted/25 px-5 py-6 text-center outline-none transition-colors hover:bg-muted/50 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        {fileName ? (
          <>
            <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary"><FileText className="size-5" aria-hidden="true" /></span>
            <span className="mt-3 max-w-full truncate text-sm font-medium">{fileName}</span>
            <span className="mt-1 text-xs text-muted-foreground">Choose a different file</span>
          </>
        ) : (
          <>
            <span className="grid size-10 place-items-center rounded-lg bg-secondary text-primary"><Upload className="size-5" aria-hidden="true" /></span>
            <span className="mt-3 text-sm font-medium">Choose a document</span>
            <span className="mt-1 text-xs text-muted-foreground">or tap to browse</span>
          </>
        )}
      </button>

      {error && (
        <p className="mt-3 flex items-center gap-2 text-sm text-destructive" role="alert">
          <AlertCircle className="size-4 shrink-0" aria-hidden="true" />{error}
        </p>
      )}
      {fileName && !error && (
        <p className="mt-3 flex items-center gap-2 text-sm text-primary" role="status">
          <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />File ready for order setup
        </p>
      )}
    </section>
  );
}
