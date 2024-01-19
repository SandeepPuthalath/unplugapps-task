import React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import { useDispatch, useSelector } from "react-redux";
import { handleSaveDataToDB, resetData } from "../../redux/reducers/dataSlice";


const Actions = ({printVoucher}) => {
  const dispatch = useDispatch();
  const header_table = useSelector(s => s.data.header_table);
  const detail_table = useSelector(s => s.data.details_table);

  const saveToDB = () => {
   dispatch(handleSaveDataToDB({header_table, detail_table}))
   console.log("Data saved to db successfully")
  }

  const actions = [
    { icon: <FileCopyIcon />, name: "New", onClick: () => dispatch(resetData()) },
    { icon: <SaveIcon />, name: "Save to Database", onClick: saveToDB },
    { icon: <PrintIcon />, name: "Print", onClick: printVoucher},
  ];


  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: "absolute", bottom: 10, right: 10 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.onClick}
        />
      ))}
    </SpeedDial>
  );
};

export default Actions;
