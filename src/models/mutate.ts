export const mutationStateList = ["ready", "pending", "update"];

export type mutationState = (typeof mutationStateList)[number];
