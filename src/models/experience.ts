export const experienceDataList = [
    {
        mode: "Diary",
        stages: ["init", "experience", "finish"],
        label: "体験",
    },
    {
        mode: "Demo",
        stages: ["init", "select", "experience"],
        label: "デモ",
    },
] as const;

export const demoSelectionList = [
    { label: "本の下心", key: "book", value: "study" },
    { label: "りんごの夢", key: "apple", value: "apple" },
    { label: "ブラシの逆襲", key: "brush", value: "art" },
    { label: "鉛筆の本音", key: "pencil", value: "pencil" },
] as const;

export type ExperienceMode = (typeof experienceDataList)[number]["mode"];
export type ExperienceStages = {
    [K in ExperienceMode]: Extract<
        (typeof experienceDataList)[number],
        { mode: K }
    >["stages"][number];
};

// 条件付き型を使用して、modeに応じたstage型を決定
type ModeToStage<M extends ExperienceMode> = ExperienceStages[M];

export type ExperienceModeState<M extends ExperienceMode | null> = {
    mode: M;
    stage: M extends null ? "init" : ModeToStage<NonNullable<M>>;
    selection?: DemoSelection;
};

export type DemoSelection = (typeof demoSelectionList)[number];

export type ExperienceState =
    | {
          [M in ExperienceMode]: ExperienceModeState<M>;
      }[ExperienceMode]
    | ExperienceModeState<null>;
