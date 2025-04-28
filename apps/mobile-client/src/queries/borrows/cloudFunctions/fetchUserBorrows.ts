import { Borrow } from "pikkukirjasto-types/types/borrow";
import { Api } from "@app/api";
import { apiEndpoints } from "@app/api/apiEndpoints";

/**
 *
 * @param {string} userId User id of the devices beign userd
 * @returns {Promise<Borrow[]>} Promise containing all borrows
 * @throws {Error} Error object containing error message
 */
async function fetchUserBorrows(userId: string): Promise<Borrow[]> {
  const response = await Api<Borrow[]>({
    method: "GET",
    path: apiEndpoints.getUsersBorrows({
      userId,
    }),
  });

  return response;
}

export default fetchUserBorrows;
