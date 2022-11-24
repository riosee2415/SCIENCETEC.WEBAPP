import { createGlobalStyle, css } from "styled-components";

const fontStyle = css`
  /* 관리자 폰트 입니다. 건들지 마세요. */
  @font-face {
    font-family: "GmarketSansMedium";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  /*  */
`;

const GlobalStyles = createGlobalStyle`
  ${fontStyle}

  body {
    font-family: "pretendard", sans-serif;
  }

  .whole__admin__wrapper {
    font-family: "GmarketSansMedium", sans-serif !important;
  }

  a {
    color : inherit;
    text-decoration : none;
  }

  textarea {
    resize: none;
    outline: none;
  }

  input {
    outline: none;
  }
  
  a:hover {
    color : inherit;
  }
  
  @media (max-width : 576px) {
    html { 
      font-size : 14px;
    }
  }
`;

export default GlobalStyles;
