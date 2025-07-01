import * as fs from "node:fs";
import { getIconColour, getIconType } from "./vento/components/iconography/styles.ts";
import vento from "@vento/vento";

const templateRoot = new URL('./vento/', import.meta.url);
const env = vento({
  dataVarname: "it",
  autoDataVarname: true,
  includes: templateRoot.pathname,
  autoescape: false
});
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