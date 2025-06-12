import { buildCourse } from "./generator/course-builder.ts";
import { decorateCourseTree } from "./models/lo-tree.ts";
import type { Course, Lo } from "./models/lo-types.ts";
import { resourceBuilder } from "./generator/resource-builder.ts";
import { writeFile } from "./generator/file-utils.ts";
import { generateNetlifyToml } from "./generator/netlify.ts";
import { generateLlms } from "./generator/llms.ts";

export const version = "3.4.7";

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
