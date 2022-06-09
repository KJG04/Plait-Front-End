import { makeVar } from "@apollo/client";
import { FloatingEmojiType } from "@types";

const initalState: FloatingEmojiType[] = [];

export const floatingEmojisVar = makeVar<FloatingEmojiType[]>(initalState);
