import { LanguageType } from "@/modules/constants/language";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

const LOG_FILE = path.join(process.cwd(), "usage-log.json");

export async function POST(req: Request) {
  const { language } = await req.json();

  let logs: { language: LanguageType; timestamp: string }[] = [];

  try {
    const data = await fs.readFile(LOG_FILE, "utf-8");
    logs = JSON.parse(data);
  } catch {}

  logs.push({
    language,
    timestamp: new Date().toISOString(),
  });

  await fs.writeFile(LOG_FILE, JSON.stringify(logs, null, 2));

  return NextResponse.json({ success: true });
}
