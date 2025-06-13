import {
  parseCourse,
  generateCourse,
  version,
} from "jsr:@tutors/tutors-gen-lib";
import * as fs from "node:fs";
import process from "node:process";

const versionStr = `tutors-publish: ${version}`;
console.log(versionStr);

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
console.log(versionStr);
