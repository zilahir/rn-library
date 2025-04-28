import { ReactElement } from "react";
import { I18nextProvider } from "react-i18next";

import i18n from "../i18n";

interface ILocalizationProvider {
  children: ReactElement;
}

const LocalizationProvider = ({
  children,
}: ILocalizationProvider): ReactElement => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);

export default LocalizationProvider;
