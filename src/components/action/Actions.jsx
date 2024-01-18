import React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import { useDispatch } from "react-redux";
import { resetData } from "../../redux/reducers/dataSlice";

const Actions = () => {
  const dispatch = useDispatch();
  const actions = [
    { icon: <FileCopyIcon />, name: "New", onClick: () => dispatch(resetData()) },
    { icon: <SaveIcon />, name: "Save to Database" },
    { icon: <PrintIcon />, name: "Print" },
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
