import { createGlobalStyle } from "styled-components";
import { colors } from "./themes/colors";
import { fonts } from "./themes/fonts";

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Sriracha&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: ${fonts.roboto};
    color: ${colors.darkestGray}
  }
`;
