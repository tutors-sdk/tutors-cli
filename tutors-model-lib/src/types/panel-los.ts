/**
 * Panel-specific learning object types
 */

import type { Lo } from './composite-los.ts';
import type { Talk } from './simple-los.ts';

/**
 * Panel-style note learning object
 */
export type PanelNote = Lo & {
  type: "panelnote";
};

/**
 * Panel-style talk learning object
 */
export type PanelTalk = Talk & {
  type: "paneltalk";
};

/**
 * Panel-style video learning object
 */
export type PanelVideo = Lo & {
  type: "panelvideo";
};

/**
 * Collection of panel-style learning objects
 */
export type Panels = {
  panelVideos: PanelVideo[];
  panelTalks: PanelTalk[];
  panelNotes: PanelNote[];
};
