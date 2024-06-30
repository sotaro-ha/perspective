import { breakChar } from "@/utils";

export type StreamerText = string;
export type ReceiverText = string[];

export type SocketMessage = {
    text: StreamerText;
    cursorPosition: number;
};

export const convertText = (streamerText: StreamerText): ReceiverText => {
    return streamerText.split(breakChar);
};
