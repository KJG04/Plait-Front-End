import { ContentType } from "@types";

export interface Content {
  uuid: string;
  contentId: string;
  contentType: ContentType;
  user: {
    name: string;
  };
}
