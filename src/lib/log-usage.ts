import fs from "fs";
import path from "path";

const LOG_FILE = path.join(process.cwd(), "logs", "usage.json");

export function logUsage(type: "visit" | "copy", language: string) {
  const entry = {
    type,
    language,
    timestamp: new Date().toISOString(),
  };

  try {
    if (!fs.existsSync(LOG_FILE)) {
      fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
      fs.writeFileSync(LOG_FILE, JSON.stringify([entry], null, 2));
      return;
    }

    const data = JSON.parse(fs.readFileSync(LOG_FILE, "utf-8"));
    data.push(entry);

    fs.writeFileSync(LOG_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error logging usage:", err);
  }
}
