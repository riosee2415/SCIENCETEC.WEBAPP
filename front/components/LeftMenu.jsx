import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { menus } from "./clientMenus";
import { WholeWrapper, Wrapper, Text } from "./commonComponents";
import styled from "styled-components";
import Theme from "./Theme";
import Link from "next/link";
import useWidth from "../hooks/useWidth";

const Title = styled.h1`
  font-size: 26px;
  font-weight: bold;
  color: ${(props) => props.theme.basicTheme_C};
  z-index: 1;
  font-family: "NanumSquare Neo", sans-serif;
  margin: 0;

  @media (max-width: 700px) {
    font-size: 20px;
  }
`;

const LeftMenu = () => {
  const [parentMenuName, setParentMenuName] = useState(``);
  const [currentMenuName, setCurrentMenuName] = useState(``);
  const [currentAllMenus, setCurrentAllMenus] = useState([]);
  const [currentAllLinks, setCurrentAllLinks] = useState([]);

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

        setCurrentAllMenus(tempArr);
        setCurrentAllLinks(tempArrLink);
      }
    });
  }, []);

  return (
    <WholeWrapper
      width={width < 1100 ? `100%` : `280px`}
      padding={width < 1100 ? `0` : `0 40px 0 0`}
      margin={`40px 0 0`}
      position={width < 1100 ? `` : `sticky`}
      top={`150px`}
      left={`0`}
    >
      <Wrapper
        width={`100%`}
        radius={`10px`}
        bgColor={Theme.lightGrey_C}
        height={width < 900 ? `60px` : `85px`}
      >
        <Title>{parentMenuName} </Title>
      </Wrapper>

      <Wrapper
        dr={width < 1100 ? `row` : ``}
        ju={width < 1100 ? `space-around` : `center`}
        al={`flex-start`}
        fontSize={width < 900 ? `15px` : `18px`}
        padding={`15px 16px 0`}
      >
        {currentAllMenus.map((value, idx) => {
          if (value === currentMenuName) {
            return (
              <Text
                isNeo
                height={`50px`}
                lineHeight={`50px`}
                fontWeight={`bold`}
                color={Theme.basicTheme_C}
                key={value}
              >
                {value}
              </Text>
            );
          } else {
            return (
              <Link href={currentAllLinks && currentAllLinks[idx]} key={value}>
                <a>
                  <Text
                    isHover
                    height={`50px`}
                    lineHeight={`50px`}
                    isNeo
                    cursor={`pointer`}
                  >
                    {value}
                  </Text>
                </a>
              </Link>
            );
          }
        })}
      </Wrapper>
    </WholeWrapper>
  );
};

export default LeftMenu;
