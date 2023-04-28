import React, { useEffect, useState } from "react";
import { Wrapper, WholeWrapper, RsWrapper } from "./commonComponents";
import Theme from "./Theme";
import useWidth from "../hooks/useWidth";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useRouter } from "next/router";
import { menus } from "./clientMenus";
import Link from "next/dist/client/link";
import BreadCrumb from "./BreadCrumb";
import Fade from "react-reveal/Fade";

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 0;
  color: ${Theme.white_C};
  line-height: 57px;

  @media (max-width: 900px) {
    font-size: 30px;
    line-height: 50px;
  }
`;

const Menu = styled.h3`
  font-size: 20px;
  color: ${(props) => (props.isActive ? Theme.basicTheme_C : Theme.darkGrey_C)};
  margin: 0 34px;
  font-weight: 600;
  display: ${(props) => props.display};
  position: relative;
  line-height: 1;

  &:first-child {
    margin: 0 34px 0 0;
  }

  &:last-child {
    margin: 0 0 0 34px;

    &:before {
      display: none;
    }
  }

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    right: -34px;
    width: 1px;
    height: 10px;
    background: ${Theme.lightGrey2_C};
    margin: -5px 0 0;
  }

  &:hover {
    cursor: pointer;
    color: ${Theme.basicTheme_C};
  }

  @media (max-width: 700px) {
    &:first-child {
      margin: 0;
    }
    margin: 0;

    &:before {
      display: none;
    }
  }
`;

const SubBanner = ({ bgImg }) => {
  const [parentMenuName, setParentMenuName] = useState(``);
  const [currentMenuName, setCurrentMenuName] = useState(``);
  const [currentMenuDesc, setCurrentMenuDesc] = useState(``);
  const [currentAllMenus, setCurrentAllMenus] = useState([]);
  const [currentAllLinks, setCurrentAllLinks] = useState([]);
  const [currentImagePath, setCurrentImagePath] = useState("");

  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    let tempArr = [];
    let tempSubArr = [];
    let tempArrLink = [];

    menus.map((menu) => {
      if (menu.menuLink.split("/")[1] === router.pathname.split("/")[1]) {
        setParentMenuName(menu.menuName);

        menu.subMenus.map((childMenu) => {
          tempArr.push(childMenu.subMenuName);
          tempSubArr.push(childMenu.subMenuDesc);
          tempArrLink.push(childMenu.subMenuLink);

          if (childMenu.subMenuLink === router.pathname) {
            setCurrentMenuName(childMenu.subMenuName);
            setCurrentMenuDesc(childMenu.subMenuDesc);
            setCurrentImagePath(childMenu.subBannerImagePath);
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
        height={width < 900 ? `300px` : `400px`}
        bgImg={`url("${currentImagePath ? currentImagePath : bgImg}")`}
      >
        <RsWrapper ju={`flex-end`} al={`flex-start`}>
          <Fade bottom>
            <Title>{parentMenuName}</Title>
          </Fade>
          <BreadCrumb />
        </RsWrapper>
      </Wrapper>
      {currentAllMenus.length === 1 ? null : (
        <Wrapper
          height={`86px`}
          borderBottom={`1px solid ${Theme.lightGrey2_C}`}
        >
          <RsWrapper dr={`row`}>
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
          </RsWrapper>
        </Wrapper>
      )}
    </WholeWrapper>
  );
};

export default SubBanner;
