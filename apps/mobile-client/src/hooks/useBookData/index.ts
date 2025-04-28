import { random } from "lodash";
import { BookData } from "pikkukirjasto-types/types/book";

const languages = ["🇫🇮", "🇬🇧"];

/**
 * @returns {BookData} A random book data
 * @description Generates random book data
 */
function useBookData(): BookData {
  const numOfPages = random(100, 999);
  const rate = Math.floor(random(0.3, 5, true)).toFixed(1);

  return {
    numOfPages,
    rate,
    language: languages[0],
    isAvaliable: true,
    overview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  };
}

export default useBookData;
