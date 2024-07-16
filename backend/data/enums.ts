const enum StatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  NOT_MODIFIED = 304,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

enum NotificationType {
  FOLLOW = "follow",
  LIKE = "like",
  RETWEET = "retweet",
}

export { StatusCode, NotificationType };
