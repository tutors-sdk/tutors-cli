  /**
 * Simple learning object types
 */

import type { Lo } from './composite-los.ts';

/**
 * Lab step definition
 * Represents a single step in a lab
 */
export type LabStep = {
  title: string;
  shortTitle: string;
  contentMd: string;
  contentHtml?: string;
  route: string;
  id: string;
  parentLo?: Lab;
  type: string;
};

/**
 * Lab learning object
 * Contains multiple ordered steps
 */
export type Lab = Lo & {
  type: "lab";
  los: LabStep[];
  pdf: string;
  pdfFile: string;
};

/**
 * Talk learning object
 * Represents a presentation or lecture
 */
export type Talk = Lo & {
  type: "talk";
  pdf: string;
  pdfFile: string;
};

/**
 * Archive learning object
 * Represents downloadable content
 */
export type Archive = Lo & {
  type: "archive";
  archiveFile?: string;
};

/**
 * Web resource learning object
 */
export type Web = Lo & {
  type: "web";
};

/**
 * GitHub repository learning object
 */
export type Github = Lo & {
  type: "github";
};

/**
 * Note learning object
 * Simple text content
 */
export type Note = Lo & {
  type: "note";
};
