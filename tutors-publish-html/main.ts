import {
  parseCourse,
  generateCourse,
} from "@tutors/tutors-gen-lib";
import { decorateCourseTree } from "@tutors/tutors-model-lib";
import * as fs from "node:fs";
import process from "node:process";
import { emitCourse } from "./src/course-emitter.ts";
import { downloadAllFiles } from "./src/template-downloader.ts";

const versionStr = `tutors-publish-html: 0.0.52`;

if (!fs.existsSync("course.md")) {
  console.log("Cannot locate course.md. Change to course folder and try again. ");
} else {
  const srcFolder = process.cwd();
  const destFolder = `${srcFolder}/html`;
  const lo = parseCourse(srcFolder);
  generateCourse(lo, destFolder);
  decorateCourseTree(lo);
  await downloadAllFiles();
  emitCourse(destFolder, lo);
}
console.log(versionStr);
