const bookQueryKeyFactory = {
  all: ["book"] as const,
  getBookById: (id: string) => [...bookQueryKeyFactory.all, id] as const,
  getBookByIsbn: (isbn: string) => [...bookQueryKeyFactory.all, isbn] as const,
};

export default bookQueryKeyFactory;
