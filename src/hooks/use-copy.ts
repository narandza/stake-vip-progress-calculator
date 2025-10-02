import { useState } from "react";
import { toast } from "sonner";

export const useCopy = () => {
  const [copied, setCopied] = useState(false);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Message copied to clipboard.");
    setTimeout(() => setCopied(false), 2000);
  };

  return { copied, copy };
};
