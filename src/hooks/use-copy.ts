import { useState } from "react";
import { toast } from "sonner";

export const useCopy = () => {
  const [copied, setCopied] = useState(false);

  const copy = async (html: string) => {
    if (navigator.clipboard && (navigator.clipboard as any).write) {
      try {
        const blob = new Blob([html], { type: "text/html" });
        const data = [new ClipboardItem({ "text/html": blob })];
        await (navigator.clipboard as any).write(data);
        setCopied(true);
        toast.success("Message copied to clipboard.");
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Clipboard write failed, fallback to plain text", err);
        navigator.clipboard.writeText(html.replace(/<[^>]+>/g, "")); // fallback: strip HTML
      }
    } else {
      // fallback for older browsers
      navigator.clipboard.writeText(html.replace(/<[^>]+>/g, ""));
    }
  };

  return { copied, copy };
};
