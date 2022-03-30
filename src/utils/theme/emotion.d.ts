import "@emotion/react";
import { Theme as ThemeType } from "./index";

declare module "@emotion/react" {
  export interface Theme extends ThemeType {}
}
