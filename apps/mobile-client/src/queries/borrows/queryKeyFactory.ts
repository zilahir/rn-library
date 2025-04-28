const borrowsQueryKeyFactory = {
  all: ["book"] as const,
  getBorrosByUser: (userId: string) =>
    [...borrowsQueryKeyFactory.all, userId] as const,
};

export default borrowsQueryKeyFactory;
