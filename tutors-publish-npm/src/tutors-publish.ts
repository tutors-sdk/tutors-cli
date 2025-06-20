#!/usr/bin/env node
import * as fs from "fs";
import { parseCourse, generateCourse } from "@tutors/tutors-gen-lib";

const versionStr = `tutors-publish: 4.0.0`;
console.log(versionStr);

if (!fs.existsSync("course.md")) {
  console.log("Cannot locate course.md. Please Change to course folder and try again. ");
} else {
  const srcFolder = process.cwd();
  const destFolder = `${srcFolder}/json`;
  const lo = parseCourse(srcFolder);
  generateCourse(lo, destFolder);
}
console.log(versionStr);
