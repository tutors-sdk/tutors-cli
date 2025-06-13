import {
  parseCourse,
  generateCourse,
} from "jsr:@tutors/tutors-gen-lib@^0.0.13";
import * as fs from "node:fs";
import process from "node:process";

function getVersionInfo(): string {
  const denoJsonPath = new URL("./deno.json", import.meta.url).pathname;
  const denoJson = JSON.parse(fs.readFileSync(denoJsonPath, 'utf-8'));
  const version = denoJson.version;
  const genLibVersion = denoJson.imports["@tutors/tutors-gen-lib"].replace("jsr:@tutors/tutors-gen-lib@^", "");
  const modelLibVersion = denoJson.imports["@tutors/tutors-model-lib"].replace("jsr:@tutors/tutors-model-lib@^" , "");

  return `tutors models: \n- tutors-model-lib: ${modelLibVersion}\n- tutors-gen-lib: ${genLibVersion}\n- tutors-publish: ${version}`;
}



if (!fs.existsSync("course.md")) {
  console.log(
    "Cannot locate course.md. Please Change to course folder and try again. "
  );
} else {
  const srcFolder = process.cwd();
  const destFolder = `${srcFolder}/json`;
  const lo = parseCourse(srcFolder);
  generateCourse(lo, destFolder);
}

console.log(getVersionInfo());