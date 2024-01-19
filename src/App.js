import React from "react";
import Header from "./components/header/Header";
import Actions from "./components/action/Actions";
import Details from "./components/details/Details";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { Box } from "@mui/material";


function App() {
  const printRef = React.useRef();
  const headerData = useSelector(s => s.data.header_table)
  const printVoucher = useReactToPrint({
    content:() => printRef.current,
  })
  return (
    <Box ref={printRef}>
      <Header />
     { headerData && <Details/>}
      <Actions printVoucher={printVoucher}/>
    </Box>
  );
}

export default App;
