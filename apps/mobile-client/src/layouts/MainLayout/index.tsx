import { ReactElement } from "react";
import Card from "@app/components/common/Card";

interface IMainLayout {
  children: ReactElement[] | ReactElement;
}

/**
 *
 * @param {object} root0 - props
 * @param {ReactElement} root0.children ReactElement to be wrapped by the provider
 * @returns {ReactElement} ReactElement wrapped by the provider
 * @description MainLayout is a layout component that wraps the main content of the app
 */
function MainLayout({ children }: IMainLayout): ReactElement {
  return <Card variant="mainLayout">{children}</Card>;
}

export default MainLayout;
