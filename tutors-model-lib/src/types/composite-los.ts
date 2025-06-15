/**
 * Composite learning object types
 */

import type { Properties, IconNavBar, IconType, LearningRecord} from './base-types.ts';
import type { Panels } from './panel-los.ts';
import type { Calendar } from './calendar-types.ts';

/**
 * Core learning object type
 * Represents any content unit in the Tutors system
 */
export type Lo = {
  type: string;
  id: string;
  title: string;
  summary: string;
  contentMd: string;
  frontMatter: Properties;
  contentHtml?: string;
  route: string;
  authLevel: number;

  img: string;
  imgFile: string;
  icon?: IconType;

  video: string;
  videoids: import("./media-types.ts").VideoIdentifiers;

  hide: boolean;

  parentLo?: Lo;
  parentTopic?: Topic;
  parentCourse?: Course;
  breadCrumbs?: Lo[];

  learningRecords?: Map<string, LearningRecord>;
};

/**
 * Collection of course units and sides
 */
export type Units = {
  units: Unit[];
  sides: Side[];
  standardLos: Lo[];
};

/**
 * Composite learning object structure
 */
export type Composite = Lo & {
  toc: Lo[];
  los: Lo[];
  panels: Panels;
  units: Units;
};

/**
 * Topic learning object
 * Groups related content
 */
export type Topic = Composite & {
  type: "topic";
};

/**
 * Unit learning object
 * Major course section
 */
export type Unit = Composite & {
  type: "unit";
};

/**
 * Side learning object
 * Supplementary content
 */
export type Side = Composite & {
  type: "side";
};

/**
 * Course learning object
 * Top-level container for all course content
 */
export type Course = Composite & {
  type: "course";
  courseId: string;
  courseUrl: string;
  topicIndex: Map<string, Topic>;
  loIndex: Map<string, Lo>;
  walls?: Lo[][];
  wallMap?: Map<string, Lo[]>;
  properties: Properties;
  calendar?: Properties;
  enrollment?: string[];
  courseCalendar?: Calendar;
  authLevel: number;
  isPortfolio: boolean;
  isPrivate: boolean;
  llm: number;
  pdfOrientation: string;
  areVideosHidden: boolean;
  areLabStepsAutoNumbered: boolean;
  hasEnrollment: boolean;
  hasCalendar: boolean;
  hasWhiteList: boolean;
  defaultPdfReader: string;
  footer: string;
  ignorePin: string;
  companions: IconNavBar;
  wallBar: IconNavBar;
};
