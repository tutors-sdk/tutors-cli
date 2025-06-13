import { buildCourse } from "./generator/course-builder.ts";
import { decorateCourseTree } from "jsr:@tutors/tutors-model-lib@^0.0.2";
import type { Course, Lo } from "jsr:@tutors/tutors-model-lib@^0.0.2";
import { resourceBuilder } from "./generator/resource-builder.ts";
import { writeFile } from "./generator/file-utils.ts";
import { generateNetlifyToml } from "./generator/netlify.ts";
import { generateLlms } from "./generator/llms.ts";

export function parseCourse(folder: string): Course {
  resourceBuilder.buildTree(folder);
  const course = buildCourse(resourceBuilder.lr);
  return course;
}

export function generateCourse(lo: Lo, folder: string) {
  resourceBuilder.copyAssets(folder);
  writeFile(folder, "tutors.json", JSON.stringify(lo));
  generateNetlifyToml(folder);
  generateLlms(lo as Course, folder);
}

export function decorateCourse(course: Course) {
  decorateCourseTree(course);
}
