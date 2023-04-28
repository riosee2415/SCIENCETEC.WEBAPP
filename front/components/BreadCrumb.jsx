import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { menus } from "./clientMenus";
import { Wrapper, Text, Image, SpanText } from "./commonComponents";
import styled from "styled-components";
import Theme from "./Theme";
import useWidth from "../hooks/useWidth";
import { RightOutlined } from "@ant-design/icons";

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  z-index: 1;
  font-family: "NanumSquare Neo", sans-serif;
  margin: 0;

  @media (max-width: 700px) {
    font-size: 18px;
  }
`;

const BreadCrumb = () => {
  const [parentMenuName, setParentMenuName] = useState(``);
  const [currentMenuName, setCurrentMenuName] = useState(``);

  const router = useRouter();
  const width = useWidth();

  useEffect(() => {
    let tempArr = [];
    let tempArrLink = [];

    menus.map((menu) => {
      if (menu.menuLink.split("/")[1] === router.pathname.split("/")[1]) {
        setParentMenuName(menu.menuName);

        menu.subMenus.map((childMenu) => {
          tempArr.push(childMenu.subMenuName);
          tempArrLink.push(childMenu.subMenuLink);

          if (childMenu.subMenuLink === router.pathname) {
            setCurrentMenuName(childMenu.subMenuName);
          }
        });
      }
    });
  }, []);

  return (
    <Wrapper margin={width < 700 ? `20px 0 40px` : `20px 0 80px`}>
      <Wrapper
        dr={`row`}
        ju={`flex-start`}
        fontSize={`16px`}
        color={Theme.white_C}
      >
        <Image
          alt="home icon"
          src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sciencetec/assets/images/icon/home-W.png`}
          width={`16px`}
          margin={`0 4px 0 0`}
        />
        HOME
        <SpanText margin={`0 8px`} fontSize={`12px`}>
          <RightOutlined />
        </SpanText>
        {parentMenuName}
        <SpanText margin={`0 8px`} fontSize={`12px`}>
          <RightOutlined />
        </SpanText>
        {currentMenuName}
      </Wrapper>
    </Wrapper>
  );
};

export default BreadCrumb;
