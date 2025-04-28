import { Text, View } from "react-native";
import { ReactTestRendererJSON } from "react-test-renderer";
import LocalizationProvider from "@app/LocalizationProvider";

import wrapper from "./utils/wrapper";

describe("<LocalizationProvider />", () => {
  it("should render children", () => {
    const tree = wrapper(
      <LocalizationProvider>
        <View>
          <Text>hello world</Text>
        </View>
      </LocalizationProvider>
    ).toJSON() as ReactTestRendererJSON;

    expect(tree.children?.length).toBe(1);
  });
});
