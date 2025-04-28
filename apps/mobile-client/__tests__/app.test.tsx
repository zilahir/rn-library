import { ReactTestRendererJSON, create } from "react-test-renderer";
import { Text, View } from "react-native";
import { ThemeProvider } from "@shopify/restyle";
import theme from "@app/theme";
import MainLayout from "@app/layouts/MainLayout";

describe("<App />", () => {
  it("has 1 child", () => {
    const tree = create(
      <ThemeProvider theme={theme}>
        <MainLayout>
          <View>
            <Text>hello</Text>
          </View>
        </MainLayout>
      </ThemeProvider>
    ).toJSON() as ReactTestRendererJSON;
    expect(tree.children?.length).toBe(1);
  });
});
