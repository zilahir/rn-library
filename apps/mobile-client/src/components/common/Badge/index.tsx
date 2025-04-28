import { PropsWithChildren, ReactElement } from "react";
import {
  AllProps,
  VariantProps,
  createRestyleComponent,
} from "@shopify/restyle";
import { Text } from "react-native";
import { Theme, badgeTextVariant, badgeVariant } from "@app/theme";

type BadgeType = VariantProps<Theme, "badgeVariants">["variant"] &
  VariantProps<Theme, "badgeTextVariants">["variant"];

interface IBadge {
  text: string;
  icon?: ReactElement;
  type: BadgeType;
}

type BadgeProps = PropsWithChildren<
  AllProps<Theme> & VariantProps<Theme, "badgeVariants">
>;

type TextProps = PropsWithChildren<
  AllProps<Theme> & VariantProps<Theme, "badgeTextVariants">
>;

const BadgeCard = createRestyleComponent<BadgeProps, Theme>([badgeVariant]);

const BadgeText = createRestyleComponent<TextProps, Theme>(
  [badgeTextVariant],
  Text
);

/**
 *
 * @param {object} root0 - props
 * @param {string} root0.text - text to display
 * @param {BadgeType} root0.type - type of badge
 * @param {ReactElement} root0.icon - icon to render
 * @returns {ReactElement} - react component
 * @description - renders a badge
 */
function Badge({ text, type, icon }: IBadge): ReactElement {
  return (
    <BadgeCard variant={type}>
      {icon && icon}
      <BadgeText variant={type}>{text}</BadgeText>
    </BadgeCard>
  );
}

export default Badge;
