import React from "react";
import PropTypes from "prop-types";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import { WholeWrapper } from "./commonComponents";
import useWidth from "../hooks/useWidth";

const ClientLayout = ({ children }) => {
  const width = useWidth();
  return (
    <section>
      {/* HEADER */}
      <AppHeader />

      {/* content */}
      <WholeWrapper>{children}</WholeWrapper>

      {/* Footer */}

      <AppFooter />
    </section>
  );
};

ClientLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ClientLayout;
