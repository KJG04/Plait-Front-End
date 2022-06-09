interface Color {
  grayscale: {
    black: string;
    darkGray: string;
    gray: string;
    lightGray: string;
    darkWhite: string;
    white: string;
  };
  primary: string;
  error: string;
}

interface Font {
  heading1: string;
  heading2: string;
  heading3: string;
  subtitle: string;
  body1: string;
  body2: string;
  description: string;
}

export interface Theme {
  colors: Color;
  fonts: Font;
}

export const theme: Theme = {
  colors: {
    grayscale: {
      black: "#303030",
      darkGray: "#3F3F3F",
      gray: "#575757",
      lightGray: "#777777",
      darkWhite: "#AFAFAF",
      white: "#FFFFFF",
    },
    primary: "#5EF090",
    error: "#FF5656",
  },
  fonts: {
    heading1: `bold 2.25rem 'Noto Sans KR', 'sans-serif'`,
    heading2: `bold 1.75rem 'Noto Sans KR', 'sans-serif'`,
    heading3: `500 1.375rem 'Noto Sans KR', 'sans-serif'`,
    subtitle: `500 1.125rem 'Noto Sans KR', 'sans-serif'`,
    body1: `bold 1rem 'Noto Sans KR', 'sans-serif'`,
    body2: `400 1rem 'Noto Sans KR', 'sans-serif'`,
    description: `400 0.875rem 'Noto Sans KR', 'sans-serif'`,
  },
};
