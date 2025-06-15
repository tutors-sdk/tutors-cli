/**
 * Core type definitions for the Tutors learning object system
 */

/**
 * Navigation icon with link and tooltip
 */
export type IconNav = {
  link: string;
  type: string;
  tip: string;
  target: string;
};

/**
 * Collection of navigation icons
 */
export type IconNavBar = {
  show: boolean;
  bar: IconNav[];
};

/**
 * Dynamic property collection for learning objects
 */
export class Properties {
  [key: string]: string;
}

/**
 * Icon definition with type and color
 */
export type IconType = {
  type: string;
  color: string;
};

/**
 * Student interaction tracking for learning objects
 */
export interface LearningRecord {
  date: Date;
  pageLoads: number;
  timeActive: number;
}

/**
 * Base structure for learning resources
 */
export type LearningResource = {
  courseRoot: string;
  route: string;
  id: string;
  lrs: LearningResource[];
  files: Array<string>;
  type: string;
};


