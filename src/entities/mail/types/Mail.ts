export interface Mail {
  gmailId: string;
  title: string;
  from: string;
  to: string;
  subject: string;
  preview?: string;
  date: string;
  isRead: boolean;
  labels: string[];
  body?: string;
  summary: string | null;
}
