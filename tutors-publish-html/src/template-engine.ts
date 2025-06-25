import * as fs from "node:fs";
import * as nunjucks from "npm:nunjucks@3";
import type { Lo } from "@tutors/tutors-model-lib";

export let templateEngine = "nunchucks";

export function setEngine(engine: string): void {
  templateEngine = engine;
  if (engine === "nunchucks") {
    const root = new URL('.', import.meta.url).pathname;
    nunjucks.configure(root + "/views", { autoescape: false });
    nunjucks.installJinjaCompat(); 
  }
}

function writeFile(
    folder: string,
    filename: string,
    contents: string,
  ): void {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
    return fs.writeFileSync(folder + "/" + filename, contents);
  }

export function publishTemplate(path: string, file: string, template: string, lo: Lo): void {
  if (templateEngine === "nunchucks") {
    writeFile(path, file, nunjucks.render(`${template}.njk`, { lo: lo }));
  } else {
    throw new Error(`Unknown template engine: ${templateEngine}`);
  }
}