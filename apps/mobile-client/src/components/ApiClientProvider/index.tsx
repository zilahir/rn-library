import { QueryClientProvider } from "@tanstack/react-query";
import { ReactElement } from "react";
import queryClient from "@app/api/queryClient";

interface IApiClientProviderProps {
  children: ReactElement;
}

/**
 *
 * @param {object} root0 - props
 * @param {ReactElement} root0.children ReactElement to be wrapped by the provider
 * @returns {ReactElement} ReactElement wrapped by the provider
 */
function ApiClientProvider({
  children,
}: IApiClientProviderProps): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default ApiClientProvider;
