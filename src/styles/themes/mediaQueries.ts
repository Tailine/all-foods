import { css, CSSObject, FlattenSimpleInterpolation } from "styled-components";
import { breakpoints } from "./breakpoints";

type BreakPointKey = "xs" | "sm" | "md" | "lg";
type MediaFunc = (
  args: CSSObject | TemplateStringsArray
) => FlattenSimpleInterpolation;
type MediaDictionary = Record<BreakPointKey, MediaFunc>;

export const mediaQueries = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (args: CSSObject | TemplateStringsArray) => css`
    @media (min-width: ${breakpoints[label]}) {
      ${css(args)}
    }
  `;
  return acc;
}, {} as MediaDictionary);
