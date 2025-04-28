import { template } from "lodash";

export const apiEndpoints = {
  getAllBooks: "/books",
  gegBookByIsb: template("/books/isbn/${isbn}"),
  authUser: "/auth",
  getUsersBorrows: template("/user/borrows/${userId}"),
} as const;

export type ApiEndpoint = keyof typeof apiEndpoints;
