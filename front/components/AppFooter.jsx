import React, { useCallback, useEffect } from "react";
import {
  Wrapper,
  Text,
  Image,
  WholeWrapper,
  RsWrapper,
} from "./commonComponents";
import Theme from "./Theme";
import useWidth from "../hooks/useWidth";
import { useSelector, useDispatch } from "react-redux";
import { COMPANY_GET_REQUEST } from "../reducers/company";
import { message } from "antd";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowUpOutlined } from "@ant-design/icons";
import { LOGO_GET_REQUEST } from "../reducers/logo";

const CompanyWrapper = styled(Wrapper)`
  color: ${Theme.grey_C};
`;

const AppFooter = () => {
  const width = useWidth();

  const dispatch = useDispatch();
  const router = useRouter();

  const {
    companys,
    //
    st_companyError,
  } = useSelector((state) => state.company);
  const { logos } = useSelector((state) => state.logo);

  useEffect(() => {
    dispatch({
      type: COMPANY_GET_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (st_companyError) {
      return message.error(st_companyError);
    }
  }, [st_companyError]);

  useEffect(() => {
    dispatch({
      type: LOGO_GET_REQUEST,
    });
  }, []);

  const moveScroll = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  return (
    <WholeWrapper padding={`50px 0`} bgColor={Theme.darkGrey2_C}>
      <RsWrapper
        dr={width < 800 ? `column` : `row`}
        ju={width < 800 ? `flex-start` : `space-between`}
        al={`flex-start`}
        position={`relative`}
      >
        <Wrapper width={width < 900 ? `100%` : `208px`} al={`flex-start`}>
          {logos && logos.find((data) => data.typeOf === "F") && (
            <Image
              width={`120px`}
              src={logos.find((data) => data.typeOf === "F").imageURL}
              alt="logo"
            />
          )}
        </Wrapper>
        <Wrapper width={width < 900 ? `100%` : `calc(100% - 208px)`}>
          <Wrapper
            width={`46px`}
            height={`46px`}
            fontSize={`20px`}
            cursor={`pointer`}
            onClick={() => moveScroll()}
            border={`1px solid ${Theme.white_C}`}
            color={Theme.white_C}
            position={`absolute`}
            top={`0`}
            right={`0`}
          >
            <ArrowUpOutlined />
          </Wrapper>
          <Wrapper al={`flex-start`}>
            <Text
              fontSize={`16px`}
              fontWeight={`bold`}
              color={Theme.white_C}
              margin={width < 900 ? `15px 0` : `0 0 18px`}
            >
              기관형 과학기술인 협동조합 교류회
            </Text>
            <Text fontWeight={`bold`} color={Theme.grey_C}>
              대전광역시 유성구 테크노9로 35 대전테크노파크 어울림플라자 204-1호
            </Text>
            {companys && (
              <CompanyWrapper dr={`row`} ju={`flex-start`} margin={`0 0 5px`}>
                {companys[0] && (
                  <Text
                    lineHeight={width < 900 && `2`}
                  >{`${companys[0].name} ${companys[0].value}`}</Text>
                )}

                {companys[1] && (
                  <Text lineHeight={width < 900 && `2`} margin={`0 20px`}>
                    {`${companys[1].name} ${companys[1].value}`}
                  </Text>
                )}

                {companys[2] && (
                  <Text
                    lineHeight={width < 900 && `2`}
                  >{`${companys[2].name} ${companys[2].value}`}</Text>
                )}
              </CompanyWrapper>
            )}
            <Text margin={`5px 0 0`} color={Theme.grey2_C}>
              Copyright 2022 iCAST. all rights reserved.
            </Text>
          </Wrapper>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default AppFooter;
