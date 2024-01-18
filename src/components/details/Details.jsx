import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Stack, Typography } from "@mui/material";
import AddRowDialog from "./AddRowDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  editRowInDetailsTable,
  removeRowFromDetailsTable,
  setDataToEditToRow,
  setDetailsData,
} from "../../redux/reducers/dataSlice";
import EditRowDialog from "./EditRowDialog";

const Details = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const rows = useSelector((s) => s.data.details_table);
  const onSubmit = (payload, { resetForm }) => {
    dispatch(setDetailsData(payload));
    resetForm();
    handleChange();
  };

  const onSaveEdit = (payload, { resetForm }) => {
    dispatch(editRowInDetailsTable(payload));
    resetForm();
    setEdit(s => !s)
  };

  const handleChange = () => setOpen((s) => !s);

  const columns = React.useMemo(
    () => [
      { field: "vr_no", headerName: "Vr No", flex: 1 },
      { field: "sr_no", headerName: "Sr No", flex: 1 },
      { field: "item_code", headerName: "Item Code", flex: 1 },
      { field: "item_name", headerName: "Item Name", flex: 1 },
      { field: "description", headerName: "Description", flex: 1 },
      { field: "qty", headerName: "Qty", flex: 1 },
      { field: "rate", headerName: "Rate", flex: 1 },
      {
        field: "action",
        headerName: "Action",
        flex: 1,
        renderCell: (params) => (
          <div>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleEdit(params.row.id)}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const handleEdit = (id) => {
    setEdit((s) => !s);
    dispatch(setDataToEditToRow(id));
  };

  const handleDelete = (id) => {
    dispatch(removeRowFromDetailsTable(id));
  };

  return (
    <Box mt={2} style={{ height: 400, width: "100%" }}>
      <Stack
        py={2}
        display={"flex"}
        alignItems={"center"}
        justifyItems={"center"}
        width={"100"}
        position={"relative"}
      >
        <Typography
          variant="h5"
          component={"h5"}
          sx={{ textTransform: "uppercase" }}
        >
          Details
        </Typography>
        <Button
          onClick={handleChange}
          sx={{ position: "absolute", right: 17 }}
          variant="text"
        >
          Add row
        </Button>
      </Stack>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
      />
      {open && (
        <AddRowDialog open={open} onClose={handleChange} onSubmit={onSubmit} />
      )}
      {edit && (
        <EditRowDialog
          edit={edit}
          onClose={() => setEdit((s) => !s)}
          onSubmit={onSaveEdit}
        />
      )}
    </Box>
  );
};

export default Details;
