import { buildCourse } from "./services/course-builder.ts";
import { decorateCourseTree } from "@tutors/tutors-model-lib";
import type { Course, Lo } from "@tutors/tutors-model-lib";
import { resourceBuilder } from "./services/resource-builder.ts";
import { writeFile } from "./utils/file-utils.ts";
import { generateNetlifyToml } from "./utils/netlify.ts";
import { generateLlms } from "./utils/llms.ts";

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
