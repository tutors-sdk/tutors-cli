import * as fs from "node:fs";
import * as nunjucks from "npm:nunjucks@3";
import type { Lo } from "@tutors/tutors-model-lib";
import vento from "https://deno.land/x/vento@v1.13.0/mod.ts";
import { getIconColour, getIconType } from "./vento/components/iconography/styles.ts";

let env = vento();

export let templateEngine = "nunchucks";

export function setEngine(engine: string): void {
  templateEngine = engine;
  const root = new URL('.', import.meta.url).pathname;
  if (engine === "nunchucks") {
    nunjucks.configure(root + "/nunchucks", { autoescape: false });
    nunjucks.installJinjaCompat(); 
  } else if (engine === "vento") {
     env = vento({
      dataVarname: "it",
      autoDataVarname: true,
      includes: root + "vento",
      autoescape: false,
    });
    env.filters.iconType = getIconType;
    env.filters.iconColour = getIconColour;
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

export async function publishTemplate(path: string, file: string, template: string, lo: Lo) {
  if (templateEngine === "nunchucks") {
    writeFile(path, file, nunjucks.render(`${template}.njk`, { lo: lo }));
  } else if (templateEngine === "vento") {
    const result = await env.run(`${template}.vto`, { lo: lo });
    writeFile(path, file, result.content);
  } else {
    throw new Error(`Unknown template engine: ${templateEngine}`);
  }
}