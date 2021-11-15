import { Box } from "@chakra-ui/react";
import React from "react";

// import Footer from "../components/Footer";
// import Header from "../components/Header.js";

const GeneralLayout: React.FC = (props) => {
  return (
    <Box width="100%">
      {/* <Header /> */}
      {props.children}
      {/* <Footer /> */}
    </Box>
  );
};

export default GeneralLayout;
