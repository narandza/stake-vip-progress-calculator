import { NextRequest, NextResponse } from "next/server";
import { logUsage } from "@/lib/logUsage";
import { LanguageType } from "@/modules/constants/language";

export async function POST(req: NextRequest) {
  const { type, language } = (await req.json()) as {
    type: "visit" | "calculate" | "copy";
    language: LanguageType;
  };

  await logUsage(type, language);

  return NextResponse.json({ ok: true });
}
