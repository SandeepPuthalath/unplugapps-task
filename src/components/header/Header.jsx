import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import constants from "../../forms/constants";
import { headerTableValidationSchema } from "../../forms/validations";
import { useDispatch, useSelector } from "react-redux";
import { setHeaderData } from "../../redux/reducers/dataSlice";

const Header = () => {
  const dispatch = useDispatch();
  const headerData = useSelector((s) => s.data.header_table);
  const onSubmit = (payloads) => {
    dispatch(setHeaderData(payloads));
  };

  const formik = useFormik({
    initialValues: constants.HEADER_FORM_DEFAULT_VALUES,
    validationSchema: headerTableValidationSchema,
    onSubmit,
  });

  return (
    <Box px={{ xs: 2, md: 5 }}>
      <Stack
        py={2}
        display={"flex"}
        alignItems={"center"}
        justifyItems={"center"}
        width={"100"}
      >
        <Typography
          variant="h5"
          component={"h5"}
          sx={{ textTransform: "uppercase" }}
        >
          Header
        </Typography>
      </Stack>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              disabled={headerData ? true : false}
              fullWidth
              label="Vr No"
              type="number"
              variant="outlined"
              {...formik.getFieldProps("vr_no")}
              error={formik.touched.vr_no && Boolean(formik.errors.vr_no)}
              helperText={formik.touched.vr_no && formik.errors.vr_no}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              disabled={headerData ? true : false}
              fullWidth
              label="Vr Date"
              type="date"
              variant="outlined"
              {...formik.getFieldProps("vr_date")}
              error={formik.touched.vr_date && Boolean(formik.errors.vr_date)}
              helperText={formik.touched.vr_date && formik.errors.vr_date}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Status"
              disabled
              fullWidth
              value="A"
              variant="outlined"
              {...formik.getFieldProps("status")}
              error={formik.touched.status && Boolean(formik.errors.status)}
              helperText={formik.touched.status && formik.errors.status}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              disabled={headerData ? true : false}
              fullWidth
              label="Ac Name"
              type="text"
              variant="outlined"
              {...formik.getFieldProps("ac_name")}
              error={formik.touched.ac_name && Boolean(formik.errors.ac_name)}
              helperText={formik.touched.ac_name && formik.errors.ac_name}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              disabled
              label="Ac Amt"
              type="number"
              fullWidth
              variant="outlined"
              value={headerData?.ac_amt ?? 0}
            />
          </Grid>
        </Grid>
        <Stack mt={2} display={"flex"} direction={"row-reverse"}>
          <Button
            variant="contained"
            disabled={headerData ? true : false}
            type="submit"
          >
            Save
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Header;
