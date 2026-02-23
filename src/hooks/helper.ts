import { skillIconMap } from "../utils/skillIconMap";

export const getSkillIcon = (name: string): string => {
  return skillIconMap[name] || skillIconMap.Default;
};


export const stringToPastelColor = (str: string) => {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = hash % 360;

  return `hsl(${hue}, 70%, 80%)`; 
};

