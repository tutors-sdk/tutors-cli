export const icons = {
  'course': 'fluent:notebook-24-filled',
  'topic': 'fluent:bookmark-24-filled',
  'talk': 'fluent:presenter-24-filled',
  'reference': 'fluent:document-copy-24-filled',
  'lab': 'fluent:beaker-24-filled',
  'archive': 'fluent:archive-24-filled',
  'panelvideo': 'fluent:video-clip-24-regular',
  'video': 'fluent:video-clip-24-filled',
  'github': 'fluent:code-circle-20-filled',
  'moduleHome': 'fluent:home-24-filled',
  'web': 'fluent:bookmark-24-regular',
  'unit': 'fluent:dual-screen-group-24-filled',
  'note': 'fluent:notepad-16-regular',
  'panelnote': 'fluent:notepad-16-regular',
  'moodle': 'fluent:hat-graduation-24-filled',
  'slack': 'fluent:chat-24-filled',
  'youtube': 'fluent:video-clip-24-filled',
  'zoom': 'fluent:video-24-filled',
  'teams': 'logos:microsoft-teams'
} as const;

export const colours = {
  'course': '#37919b',
  'topic': '#37919b',
  'talk': '#37919b',
  'reference': '#d27711',
  'lab': '#557927',
  'archive': '#37919b',
  'panelvideo': '#ba5150',
  'video': '#ba5150',
  'github': '#d27711',
  'moduleHome': '#37919b',
  'web': '#ba5150',
  'unit': '#557927',
  'note': '#d27711',
  'panelnote': '#d27711',
  'moodle': '#d27711',
  'slack': '#ba5150',
  'youtube': '#ba5150',
  'zoom': '#37919b',
  'teams': '#fbfbfc'
} as const;

export type IconType = keyof typeof icons;

export function getIconType(type: IconType): string {
  return icons[type];
}

export function getIconColour(type: IconType): string {
  return colours[type];
}
