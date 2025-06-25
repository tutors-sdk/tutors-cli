import shelljs from "npm:shelljs@^0";
import type { Course, Lo, Topic, Unit } from "@tutors/tutors-model-lib";
import { fixWallRoutes, publishTemplate } from "./utils.ts";

function emitNote(lo: Lo, path: string) {
  const notePath = `${path}/${lo.id}`;
  publishTemplate(notePath, "index.html", "Note.njk", lo);
}

function emitLab(lo: Lo, path: string) {
  const labPath = `${path}/${lo.id}`;
  publishTemplate(labPath, "index.html", "Lab.njk", lo);
}

function emitLoPage(lo: Lo, path: string) {
  if (lo.type == "lab") {
    emitLab(lo as Lo, path);
  }
  if (lo.type == "note" || lo.type == "panelnote") {
    emitNote(lo as Lo, path);
  }
  if (lo.type == "topic") {
    emitComposite(lo as Topic, `${path}`);
  }
}

function emitUnit(lo: Unit, path: string) {
  lo.los.forEach((lo) => {
    emitLoPage(lo as Lo, path);
  });
}

function emitLo(lo: Lo, path: string) {
  if (lo.type == "unit" || lo.type == "side") {
    const unitPath = `${path}/${lo.id}`;
    emitUnit(lo as Unit, unitPath);
  } else {
    emitLoPage(lo, path);
  }
}

function emitComposite(lo: Topic, path: string) {
  shelljs.cd(lo.id);
  const topicPath = `${path}/${lo.id}`;
  lo?.los?.forEach((lo) => {
    emitLo(lo as Lo, topicPath);
  });
  publishTemplate(topicPath, "index.html", "Composite.njk", lo);
  shelljs.cd("..");
}

export function emitWalls(path: string, lo: Course) {
  lo.walls?.forEach((los) => {
    const type = los[0].type;
    lo.los = los;
    if (lo.properties) {
      lo.properties["credits"] = `All ${type}'s in course`;
    }
    fixWallRoutes(lo.los);
    publishTemplate(path, `${type}.html`, "Wall.njk", lo);
  });
}

export function emitCourse(path: string, lo: Course) {
  shelljs.cd(path);
  lo?.los?.forEach((lo) => {
    emitComposite(lo as Topic, path);
  });
  publishTemplate(path, "index.html", "Course.njk", lo);
  emitWalls(path, lo);
}
