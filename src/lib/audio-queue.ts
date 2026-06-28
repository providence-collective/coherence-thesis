export type AudioQueueItem = {
  sectionId: string;
  title: string;
  text: string;
};

type AudioSection = {
  sectionId: string;
  title: string;
  text: string;
};

export type AudioVoicePreference = {
  voiceURI: string | null;
  rate: number;
  pitch: number;
};

export const defaultVoicePreference: AudioVoicePreference = {
  voiceURI: null,
  rate: 1,
  pitch: 1,
};

export function queueFromSection(section: AudioSection): AudioQueueItem[] {
  return [
    {
      sectionId: section.sectionId,
      title: section.title,
      text: section.text,
    },
  ];
}

export function queueFromSections(sections: AudioSection[]): AudioQueueItem[] {
  return sections.map((section) => ({
    sectionId: section.sectionId,
    title: section.title,
    text: section.text,
  }));
}
