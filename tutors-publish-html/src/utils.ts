import type { Lo, Talk } from "@tutors/tutors-model-lib";
import * as fs from "node:fs";
import * as nunjucks from "npm:nunjucks@3";

const root = new URL('.', import.meta.url).pathname;
nunjucks.configure(root + "/views", { autoescape: false });
nunjucks.installJinjaCompat();

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
  writeFile(path, file, nunjucks.render(template, { lo: lo }));
}

export function fixWallRoutes(los: Lo[]): void {
  los.forEach((lo) => {
    if (lo.img) {
      lo.img = lo.img.substring(lo.img.indexOf('///') + 3);
    }
    switch (lo.type) {
      case "web":
      case "github": {
        lo.route += ' target="_blank"';
        break;
      }
      case "archive": {
        lo.route = lo.route.substring(lo.route.indexOf('///') + 3);
        break;
      }
      case "talk": {
        lo.route = lo.route.substring(lo.route.indexOf('//') + 2);
        const talk = lo as Talk;
        talk.route = `${talk.route}/${talk.pdfFile} target="_blank"`;
        break;
      }
      case "lab":
      case "note": {
        lo.route = lo.route.substring(lo.route.indexOf('//') + 2);
        lo.route += '/index.html';
        break;
      }
      default: {
        if (lo.route.includes('//')) {
          lo.route = lo.route.substring(lo.route.indexOf('//') + 2);
        }
      }
    }
  });
}
