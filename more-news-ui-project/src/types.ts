export type FeedType = "top" | "new" | "best" | "ask" | "show" | "jobs" | "polls";
export type SortType = "newest" | "oldest" | "score" | "comments";

export interface PollOption {
  id: number;
  text?: string;
  score: number;
}

export interface MNItem {
  id: number;
  type?: string;
  title?: string;
  url?: string;
  score?: number;
  by?: string;
  descendants?: number;
  time?: number;
  text?: string;
  kids?: number[];
  parts?: number[];
  poll?: number;
  deleted?: boolean;
  dead?: boolean;
  pollOptions?: PollOption[];
}
