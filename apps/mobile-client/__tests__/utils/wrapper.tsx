import { ThemeProvider } from "@shopify/restyle";
import { render as testingRender } from "@testing-library/react-native";
import { ReactElement } from "react";
import { create } from "react-test-renderer";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import theme from "@app/theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = (component: ReactElement): ReturnType<typeof create> => {
  return create(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

export const render = (
  component: ReactElement
): ReturnType<typeof testingRender> =>
  testingRender(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

export default wrapper;

export const withQueryProvider = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => (
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </ThemeProvider>
);

/**
 *
 * @param ui
 */
export function renderNavigator(
  ui: ReactElement
): ReturnType<typeof testingRender> {
  return render(
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>{ui}</NavigationContainer>
    </QueryClientProvider>
  );
}
