export const emojiEventName = "emoji";

export class EmojiEvent extends Event {
  emoji: string;
  name: string;
  color: string;
  x: number;
  y: number;

  constructor(
    emoji: string,
    name: string,
    color: string,
    x: number,
    y: number,
  ) {
    super(emojiEventName);
    this.emoji = emoji;
    this.name = name;
    this.color = color;
    this.x = x;
    this.y = y;
  }
}
