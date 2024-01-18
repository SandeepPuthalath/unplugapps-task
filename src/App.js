import React from "react";
import Header from "./components/header/Header";
import Actions from "./components/action/Actions";
import Details from "./components/details/Details";
import { useSelector } from "react-redux";


function App() {
  const headerData = useSelector(s => s.data.header_table)

  return (
    <>
      <Header />
     { headerData && <Details/>}
      <Actions/>
    </>
  );
}

export default App;
