export const mutationStateList = ["ready", "pending", "cancel"] as const;

export type mutationStage = (typeof mutationStateList)[number];
export type mutationState = {
    stage: mutationStage;
    mutatedLength: number;
};
