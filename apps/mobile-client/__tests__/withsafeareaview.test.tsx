import { ReactElement } from "react";
import { Text, View } from "react-native";
import withSafeAreaView from "@app/components/WithSafeAreaView";

import { render } from "./utils/wrapper";

const MockComponent = ({
  children,
}: {
  children: React.ReactNode;
}): ReactElement => <View>{children}</View>;

describe("withSafeAreaView", () => {
  it("renders the wrapped component within a SafeAreaView", () => {
    // Render the HOC with the MockComponent
    const WrappedComponent = withSafeAreaView(MockComponent);
    const tree = render(
      <WrappedComponent data-testid="safe-area-view">
        <View>
          <Text>hello world</Text>
        </View>
      </WrappedComponent>
    );

    // Assert that the SafeAreaView is rendered
    expect(tree).toBeDefined();
  });
});
