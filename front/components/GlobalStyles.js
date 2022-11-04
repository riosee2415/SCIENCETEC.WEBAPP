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

  @font-face {
    font-family: "paybooc-Bold";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/paybooc-Bold.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "InkLipquid";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/InkLipquid.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "NanumBarunGothic";
    font-style: normal;
    font-weight: 400;
    src: url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot");
    src: url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot?#iefix")
        format("embedded-opentype"),
      url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.woff")
        format("woff"),
      url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.ttf")
        format("truetype");
  }
`;

const GlobalStyles = createGlobalStyle`
  ${fontStyle}

  body {
    font-family: "NanumBarunGothic", sans-serif;
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
