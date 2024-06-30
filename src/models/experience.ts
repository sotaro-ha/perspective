export const experienceStateList = ["init", "active", "finish"] as const;
export const experienceOptionList = [
    { label: "本の下心", key: "book", value: "study" },
    { label: "りんごの夢", key: "apple", value: "apple" },
    { label: "ブラシの逆襲", key: "brush", value: "art" },
    { label: "鉛筆の本音", key: "pencil", value: "pencil" },
] as const;

export type ExperienseStage = (typeof experienceStateList)[number];
export type ExperienceOption = (typeof experienceOptionList)[number] | null;

export type ExperenceState = {
    stage: ExperienseStage;
    option: ExperienceOption;
};
