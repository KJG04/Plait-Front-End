export const emojiEventName = "emoji";

export class EmojiEvent extends Event {
  emoji: string;
  name: string;
  color: string;
  xPercent: number;
  yPercent: number;

  constructor(
    emoji: string,
    name: string,
    color: string,
    xPercent: number,
    yPercent: number,
  ) {
    super(emojiEventName);
    this.emoji = emoji;
    this.name = name;
    this.color = color;
    this.xPercent = xPercent;
    this.yPercent = yPercent;
  }
}
