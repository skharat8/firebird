const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  home: () => [...postKeys.lists(), "home"] as const,
  profile: (userId?: string) =>
    [...postKeys.lists(), "profile", userId ?? "me"] as const,
  details: () => [...postKeys.all, "detail"] as const,
  detail: (id: string) => [...postKeys.details(), id] as const,
};

export { postKeys };
