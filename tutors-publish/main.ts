import {
  parseCourse,
  generateCourse,
} from "@tutors/tutors-gen-lib";
import * as fs from "node:fs";
import process from "node:process";

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

console.log("Tutors Generator v0.0.17");