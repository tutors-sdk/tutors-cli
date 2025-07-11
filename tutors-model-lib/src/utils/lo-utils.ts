import {
  type Archive,
  type Composite,
  type IconType,
  isCompositeLo,
  type Lab,
  type Lo,
  type LoType,
  type PanelNote,
  type Panels,
  type PanelTalk,
  type PanelVideo,
  type Side,
  type Talk,
  type Unit,
  type Units,
  type VideoIdentifier,
} from "../types/index.ts";

export function flattenLos(los: Lo[]): Lo[] {
  let result: Lo[] = [];
  los.forEach((lo) => {
    result.push(lo);
    if ("los" in lo) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      result = result.concat(flattenLos(lo.los));
    }
  });
  return result;
}

export function filterByType(list: Lo[], type: LoType): Lo[] {
  const los = flattenLos(list);
  return los.filter((lo) => lo.type === type);
}

function filterLos<T>(los: Lo[], type: string): T[] {
  const talks: T[] = [];
  los.forEach((lo) => {
    if (lo.type === type) talks.push(lo as T);
  });
  return talks;
}

export function fixRoutePaths(lo: Lo) {
  if (lo.route && lo.route[0] === "#") {
    lo.route = "/" + lo.route.slice(1);
  }
  if (lo.video && lo.video[0] === "#") {
    lo.video = "/" + lo.video.slice(1);
  }
  if (lo.route.endsWith("md") && lo.video) {
    lo.route = lo.video;
  }
}

export function injectCourseUrl(los: Lo[], id: string, url: string) {
  los.forEach((lo) => {
    if (lo.type === "archive") {
      const archive: Archive = lo as Archive;
      archive.route = `https://${
        lo.route?.replace(
          "/archive/{{COURSEURL}}",
          url,
        )
      }/${archive.archiveFile}`;
    } else {
      lo.route = lo.route?.replace("{{COURSEURL}}", id);
    }

    lo.img = lo.img?.replace("{{COURSEURL}}", url);
    lo.video = lo.video?.replace("{{COURSEURL}}", id);
    if (lo.type == "talk" || lo.type == "paneltalk") {
      const talk = lo as Talk;
      talk.pdf = talk.pdf?.replace("{{COURSEURL}}", url);
    }
    if (lo.type == "lab") {
      const lab = lo as Lab;
      lab.pdf = lab.pdf?.replace("{{COURSEURL}}", url);
    }

    // legacy version of generator included hash based routes;
    // remove these now:
    fixRoutePaths(lo);
  });
}

export function removeUnknownLos(los: Lo[]) {
  los.forEach((lo, index) => {
    if (lo.type === "unknown") {
      los.splice(index, 1);
    }
  });
}

export function allVideoLos(los: Lo[]): Lo[] {
  const allVideoLos: Lo[] = [];
  for (const lo of los) {
    if (lo.video) {
      allVideoLos.push(lo);
    }
  }
  return allVideoLos;
}

export function removeLeadingHashes(str: string): string {
  const hashIndex = str.lastIndexOf("#");
  return hashIndex >= 0 ? str.substring(hashIndex + 1) : str;
}

export function getPanels(los: Lo[]): Panels {
  return {
    panelVideos: filterLos<PanelVideo>(los, "panelvideo"),
    panelTalks: filterLos<PanelTalk>(los, "paneltalk"),
    panelNotes: filterLos<PanelNote>(los, "panelnote"),
  };
}

export function getUnits(los: Lo[]): Units {
  let standardLos = los?.filter(
    (lo) =>
      lo.type !== "unit" &&
      lo.type !== "panelvideo" &&
      lo.type !== "paneltalk" &&
      lo.type !== "panelnote" &&
      lo.type !== "side",
  );
  standardLos = sortLos(standardLos);
  return {
    units: los?.filter((lo) => lo.type === "unit") as Unit[],
    sides: los?.filter((lo) => lo.type === "side") as Side[],
    standardLos: standardLos,
  };
}

export function sortLos(los: Array<Lo>): Lo[] {
  const orderedLos = los.filter((lo) => lo.frontMatter?.order);
  const unOrderedLos = los.filter((lo) => !lo.frontMatter?.order);
  orderedLos.sort(
    (a: any, b: any) => a.frontMatter.order - b.frontMatter.order,
  );
  return orderedLos.concat(unOrderedLos);
}

export function loadIcon(lo: Lo): IconType | undefined {
  if (lo.frontMatter && lo.frontMatter.icon) {
    return {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      type: lo.frontMatter.icon["type"],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      color: lo.frontMatter.icon["color"],
    };
  }
  return undefined;
}

export function crumbs(lo: Lo | undefined, los: Lo[]) {
  if (lo) {
    if (lo.route.endsWith("/")) {
      lo.route = lo.route.slice(0, -1);
    }
    crumbs(lo.parentLo, los);
    los.push(lo);
  }
}

export function setShowHide(lo: Lo, status: boolean) {
  lo.hide = status;
  if (isCompositeLo(lo)) {
    const compositeLo = lo as Composite;
    for (const childLo of compositeLo.los) {
      //if (compositeLo.los) {
      setShowHide(childLo, status);
      // }
    }
  }
}

export function getVideoConfig(lo: Lo): VideoIdentifier {
  const config: VideoIdentifier = { service: "youtube", id: "" };
  if (lo.videoids?.videoIds?.length > 0) {
    const lastVideo = lo.videoids.videoIds[lo.videoids.videoIds.length - 1];
    if (lastVideo.service === "heanet" || lastVideo.service === "vimp") {
      config.service = lastVideo.service;
      config.id = lastVideo.id;
    } else {
      const parts = lo.video?.split("/") || [];
      const id = parts.pop() || parts.pop() || "";
      config.id = id;
    }
  }
  if (config.service === "heanet") {
    config.url = `https://media.heanet.ie/player/${config.id}`;
  } else if (config.service === "vimp") {
    config.url = `https://vimp.oth-regensburg.de/media/embed?key=${config.id}&autoplay=false&controls=true`;
  } else if (config.service === "youtube") {
    config.url = `https://www.youtube.com/embed/${config.id}`;
    config.externalUrl = `https://www.youtube.com/watch?v=${config.id}`;
  }
  return config;
}
