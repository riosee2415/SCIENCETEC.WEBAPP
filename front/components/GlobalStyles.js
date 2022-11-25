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

  //ant select
  .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector{
    border-color: ${(props) => props.theme.basicTheme_C};
    box-shadow: 0 0 0 2px ${(props) => props.theme.lightGrey2_C};
  }

  //ant radio
  .ant-radio-checked .ant-radio-inner, .ant-radio:hover .ant-radio-inner{
    border-color: ${(props) => props.theme.basicTheme_C};
  }

  .ant-radio-inner::after{
    background-color: ${(props) => props.theme.basicTheme_C};
  }

  .ant-radio-checked::after{
    border: 1px solid ${(props) => props.theme.basicTheme_C};
  }

  //ant checkbox
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: ${(props) => props.theme.basicTheme_C};
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${(props) => props.theme.basicTheme_C};
    border: 1px solid ${(props) => props.theme.basicTheme_C};
  }

  .ant-checkbox + span{
    font-size:16px;
  }

  .ant-checkbox-wrapper:hover {
    .ant-checkbox-inner,
    .ant-checkbox-checked::after {
      border-color: ${(props) => props.theme.basicTheme_C} !important;
      border: 1px solid ${(props) => props.theme.basicTheme_C};
    }
  }

  //ant picker
  .ant-picker:hover,
  .ant-picker-focused {
    border-color: ${(props) => props.theme.basicTheme_C};
    box-shadow: 0 0 0 2px ${(props) => props.theme.lightGrey2_C};
  }

  .ant-picker-range .ant-picker-active-bar, 
  .ant-picker-cell-in-view.ant-picker-cell-selected .ant-picker-cell-inner, 
  .ant-picker-cell-in-view.ant-picker-cell-range-start .ant-picker-cell-inner, 
  .ant-picker-cell-in-view.ant-picker-cell-range-end .ant-picker-cell-inner{
    background: ${(props) => props.theme.basicTheme_C};
  }

  .ant-picker-cell-in-view.ant-picker-cell-today .ant-picker-cell-inner::before{
    border: 1px solid ${(props) => props.theme.basicTheme_C};
  }

  .ant-btn:focus{
    color: ${(props) => props.theme.black_C};
    border-color: ${(props) => props.theme.basicTheme_C};
  }
  
  @media (max-width : 576px) {
    html { 
      font-size : 14px;
    }
  }

  .customoverlay {
    position: relative;
    bottom: 55px;
    border-radius: 6px;
    border: 1px solid  ${(props) => props.theme.lightGrey_C};
    border-bottom: 2px solid ${(props) => props.theme.lightGrey_C};
    float: left;
  }
  .customoverlay:nth-of-type(n) {
    border: 0; 
    box-shadow: 0px 1px 2px ${(props) => props.theme.grey3_C};
  }
  .customoverlay a {
    display: block;
    text-decoration: none;
    color: #000;
    text-align: center;
    border-radius: 6px;
    font-size: 14px;
    font-weight: bold;
    overflow: hidden;
    background: ${(props) => props.theme.basicTheme_C};
    background: ${(props) =>
      props.theme
        .basicTheme_C} url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png') no-repeat right 14px center;
  }
  .customoverlay .title {
    display: block;
    text-align: center;
    background: #fff;
    margin-right: 35px;
    padding: 10px 15px;
    font-size: 14px;
    font-weight: bold;
  }
  .customoverlay:after {
    content:'';
    position:absolute;
    margin-left:-12px;
    left:50%;
    bottom:-12px;
    width:22px;
    height:12px;
    background:url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')
  }
`;

export default GlobalStyles;
