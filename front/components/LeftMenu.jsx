import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { menus } from "./clientMenus";
import { WholeWrapper, Wrapper, Text, RsWrapper } from "./commonComponents";
import styled from "styled-components";
import Theme from "./Theme";
import Link from "next/link";
import useWidth from "../hooks/useWidth";

const Menu = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => (props.isActive ? Theme.basicTheme_C : Theme.grey_C)};
  margin: 0 65px 0 0;
  font-weight: ${(props) => (props.isActive ? `600` : `300`)};
  display: ${(props) => props.display};

  @media (max-width < 900) {
    font-size: 16px;
  }
  &:last-child {
    margin: 0;
  }

  &:hover {
    cursor: pointer;
    color: ${Theme.basicTheme_C};
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
              <Menu isActive key={value}>
                {value}
              </Menu>
            );
          } else {
            return (
              <Menu display={width < 700 ? `none` : `block`} key={value}>
                <Link href={currentAllLinks && currentAllLinks[idx]}>
                  <a>{value} </a>
                </Link>
              </Menu>
            );
          }
        })}
      </Wrapper>
    </WholeWrapper>
  );
};

export default LeftMenu;
