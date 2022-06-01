import axios from "axios";

interface GetYoutubeContentDetail {
  items: YoutubueContentItem[];
}

interface ThumbnailValue {
  url: string;
  width: number;
  height: number;
}

interface YoutubueContentItem {
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Record<string, ThumbnailValue>;
    channelTitle: string;
    tags: [string];
    categoryId: string;
  };
}

const getYoutubeContentDetail = async (id: string) => {
  return await axios.get<GetYoutubeContentDetail>(
    "https://www.googleapis.com/youtube/v3/videos",
    {
      params: {
        part: "id,snippet",
        key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
        id,
      },
    },
  );
};

export { getYoutubeContentDetail };
