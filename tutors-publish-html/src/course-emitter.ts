import shelljs from "npm:shelljs@^0";
import type { Course, Lo, Talk, Topic, Unit } from "@tutors/tutors-model-lib";
import { fixWallRoutes } from "./utils.ts";
import { publishTemplate, setEngine } from "./template-engine.ts";

function emitTalk(lo: Talk, path: string) {
  const talkPath = `${path}/${lo.id}`;
  publishTemplate(talkPath, "index.html", "Talk", lo);
}

function emitNote(lo: Lo, path: string) {
  const notePath = `${path}/${lo.id}`;
  publishTemplate(notePath, "index.html", "Note", lo);
}

function emitLab(lo: Lo, path: string) {
  const labPath = `${path}/${lo.id}`;
  publishTemplate(labPath, "index.html", "Lab", lo);
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
  if (lo.type == "talk") {
    emitTalk(lo as Talk, `${path}`);
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
  publishTemplate(topicPath, "index.html", "Composite", lo);
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
    const wall = {course: lo, los:los};
    publishTemplate(path, `${type}.html`, "Wall", wall);
  });
}

export function emitCourse(path: string, lo: Course) {
  setEngine("vento");
 //  setEngine("nunchucks");
  shelljs.cd(path);
  lo?.los?.forEach((lo) => {
    emitComposite(lo as Topic, path);
  });
  publishTemplate(path, "index.html", "Course", lo);
  emitWalls(path, lo);
}
