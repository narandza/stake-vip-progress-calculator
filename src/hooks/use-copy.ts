import { stripHtml } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

export const useCopy = () => {
  const [copied, setCopied] = useState(false);

  const copy = async (html: string) => {
    const clipboard = navigator.clipboard as Clipboard & {
      write?: (data: ClipboardItem[]) => Promise<void>;
    };

    if (clipboard.write) {
      try {
        const blob = new Blob([html], { type: "text/html" });
        const data = [new ClipboardItem({ "text/html": blob })];
        await clipboard.write(data);
        setCopied(true);
        toast.success("Message copied to clipboard.");
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Clipboard write failed, fallback to plain text", err);
        await clipboard.writeText(stripHtml(html));
        setCopied(true);
        toast.success("Message copied to clipboard.");
        setTimeout(() => setCopied(false), 2000);
      }
    } else {
      await clipboard.writeText(stripHtml(html));
      setCopied(true);
      toast.success("Message copied to clipboard.");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return { copied, copy };
};
