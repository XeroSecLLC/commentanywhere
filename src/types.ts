// Define interfaces for type safety
export type CommentMessage = {
  action: 'submitComment' | 'getComments';
  comment: string;
  url?: string;
}

// Define types for our messages and responses
export type CommentResponse = {
  comments: string[];
}

export type _Comment = {
  id: string;
  text: string;
  timestamp: string;
  // Add other fields as needed
}
