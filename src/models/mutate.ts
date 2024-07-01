export const receiverId = [0, 1, 2, 3, 4] as const;

export type ReceiverId = (typeof receiverId)[number];

export const mutationStateList = ["ready", "pending", "cancel"] as const;

export type MutationStage = (typeof mutationStateList)[number];
export type MutationState = {
    stage: MutationStage;
    mutatedLength: number;
};
