import { NextRequest, NextResponse } from "next/server";

import { logUsage } from "@/lib/logUsage";
import { LanguageType } from "@/modules/constants/language";
import { LOG_TYPE } from "@/modules/constants/constants";

export async function POST(req: NextRequest) {
  const { type, language } = (await req.json()) as {
    type: LOG_TYPE;
    language: LanguageType;
  };

  await logUsage(type, language);

  return NextResponse.json({ ok: true });
}
