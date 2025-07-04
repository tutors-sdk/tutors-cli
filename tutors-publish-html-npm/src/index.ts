#!/usr/bin/env node
import { existsSync } from "fs";
import { parseCourse, generateStaticCourse } from "@tutors/tutors-gen-lib";

const versionStr = `tutors-publish-html-npm: 4.0.20`;

if (!existsSync("course.md")) { 
  console.log(
    "Cannot locate course.md. Please Change to course folder and try again. "
  );
} else {
  const srcFolder = process.cwd();
  const destFolder = `${srcFolder}/html`;
  const lo = parseCourse(srcFolder);
  generateStaticCourse(lo, destFolder);
}
console.log(versionStr);
