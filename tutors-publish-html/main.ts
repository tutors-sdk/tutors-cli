import {
  parseCourse,
  generateCourse,
} from "@tutors/tutors-gen-lib";
import { decorateCourseTree } from "@tutors/tutors-model-lib";
import * as fs from "node:fs";
import process from "node:process";
import { emitCourse } from "./src/course-emitter.ts";

const versionStr = `tutors-publish-html: 4.0.29`;

if (!fs.existsSync("course.md")) {
  console.log("Cannot locate course.md. Change to course folder and try again. ");
} else {
  const srcFolder = process.cwd();
  const destFolder = `${srcFolder}/html`;
  const lo = parseCourse(srcFolder);
  generateCourse(lo, destFolder);
  decorateCourseTree(lo);
  
  emitCourse(destFolder, lo);
}
console.log(versionStr);
