import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { menus } from "./clientMenus";
import { WholeWrapper, Wrapper, Text, RsWrapper } from "./commonComponents";
import styled from "styled-components";
import Theme from "./Theme";
import Link from "next/link";
import useWidth from "../hooks/useWidth";

const Menu = styled.h3`
  height: 100%;
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => (props.isActive ? Theme.basicTheme_C : Theme.darkGrey_C)};
  font-weight: ${(props) => (props.isActive ? `600` : `300`)};
  display: ${(props) => props.display};

  &:last-child {
    margin: 0;
  }

  &:hover {
    cursor: pointer;
    color: ${Theme.basicTheme_C};
    border-bottom: 2px solid ${Theme.basicTheme_C};
  }
`;
const MenuBox = styled(Wrapper)`
  position: relative;
  width: 10%;
  height: 100%;

  &:before {
    content: "";
    width: 1px;
    height: 10px;
    background: ${Theme.lightGrey2_C};
    position: absolute;
    right: 0;
    top: 14%;
  }

  &:last-child:before {
    display: none;
  }

  @media (max-width: 900px) {
    width: 20%;
    height: 50%;
    font-size: 16px;
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
    <WholeWrapper>
      <Wrapper
        dr={`row`}
        height={`70px`}
        borderBottom={`1px solid ${Theme.lightGrey2_C}`}
      >
        {currentAllMenus.map((value, idx) => {
          if (value === currentMenuName) {
            return (
              <MenuBox>
                <Menu isActive key={value}>
                  {value}
                </Menu>
              </MenuBox>
            );
          } else {
            return (
              <MenuBox>
                <Menu key={value}>
                  <Link href={currentAllLinks && currentAllLinks[idx]}>
                    <a>{value} </a>
                  </Link>
                </Menu>
              </MenuBox>
            );
          }
        })}
      </Wrapper>
    </WholeWrapper>
  );
};

export default LeftMenu;
