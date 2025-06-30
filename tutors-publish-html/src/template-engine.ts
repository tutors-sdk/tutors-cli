import * as fs from "node:fs";
import vento from "https://deno.land/x/vento@v1.13.0/mod.ts";
import { getIconColour, getIconType } from "./vento/components/iconography/styles.ts";
import autoTrim from "https://deno.land/x/vento@v1.13.0/plugins/auto_trim.ts";

const root = new URL('.', import.meta.url).pathname;
const env = vento({
  dataVarname: "it",
  autoDataVarname: true,
  includes: root + "vento",
  autoescape: false,
});
env.use(autoTrim());
env.filters.iconType = getIconType;
env.filters.iconColour = getIconColour;

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

export async function publishTemplate(path: string, file: string, template: string, lo: any) {
  const result = await env.run(`${template}.vto`, { lo: lo });
  writeFile(path, file, result.content);
}