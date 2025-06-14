import {
  parseCourse,
  generateCourse,
} from "@tutors/tutors-gen-lib";
import * as fs from "node:fs";
import process from "node:process";

function getVersionInfo(): string {
  const modelLibVersion = "0.0.6";
  const genLibVersion = "0.0.14";
  const version = "0.0.6";
  return `tutors models: \n- tutors-model-lib: ${modelLibVersion}\n- tutors-gen-lib: ${genLibVersion}\n- tutors-publish: ${version}`;
}

if (!fs.existsSync("course.md")) {
  console.log(
    "Cannot locate course.md. Please change to course folder and try again. "
  );
} else {
  const srcFolder = process.cwd();
  const destFolder = `${srcFolder}/json`;
  const lo = parseCourse(srcFolder);
  generateCourse(lo, destFolder);
}

console.log(getVersionInfo());