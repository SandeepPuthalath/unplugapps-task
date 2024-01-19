import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import constants from "../../forms/constants";
import { detailsTableValidationSchema } from "../../forms/validations";
import { Autocomplete, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchItems } from "../../redux/reducers/dataSlice";

const AddRowDialog = ({ open, onClose, onSubmit }) => {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.data.items);
  const formik = useFormik({
    initialValues: constants.DETAILS_FORM_DEFAULT_VALUES,
    validationSchema: detailsTableValidationSchema,
    onSubmit: onSubmit,
  });

  React.useEffect(() => {
    dispatch(handleFetchItems());
  }, [dispatch]);


   const handleItemCodeChange = (event, newValue) => {
     formik.setFieldValue("item_code", newValue);
     const selectedItem = items.find((item) => item.item_code === newValue);
     if (selectedItem) {
       formik.setFieldValue("item_name", selectedItem.item_name);
     } else {
       formik.setFieldValue("item_name", "");
     }
   };

   const handleItemNameChange = (event, newValue) => {
     formik.setFieldValue("item_name", newValue);
     const selectedItem = items.find((item) => item.item_name === newValue);
     if (selectedItem) {
       formik.setFieldValue("item_code", selectedItem.item_code);
     } else {
       formik.setFieldValue("item_code", "");
     }
   };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Enter Data</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container mt={1} spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Id"
                type="number"
                variant="outlined"
                {...formik.getFieldProps("id")}
                error={formik.touched.id && Boolean(formik.errors.id)}
                helperText={formik.touched.id && formik.errors.id}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Vr no"
                type="number"
                variant="outlined"
                {...formik.getFieldProps("vr_no")}
                error={formik.touched.vr_no && Boolean(formik.errors.vr_no)}
                helperText={formik.touched.vr_no && formik.errors.vr_no}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Sr No"
                fullWidth
                value="A"
                variant="outlined"
                {...formik.getFieldProps("sr_no")}
                error={formik.touched.sr_no && Boolean(formik.errors.sr_no)}
                helperText={formik.touched.sr_no && formik.errors.sr_no}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                value={formik.values.item_code}
                onChange={handleItemCodeChange}
                onInputChange={(event, newValue) =>
                  formik.setFieldValue("item_code", newValue)
                }
                onBlur={formik.handleBlur("item_code")}
                options={items?.map((item) => item.item_code)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Item Code"
                    variant="outlined"
                    error={
                      formik.touched.item_code &&
                      Boolean(formik.errors.item_code)
                    }
                    helperText={
                      formik.touched.item_code && formik.errors.item_code
                    }
                  />
                )}
                isOptionEqualToValue={(option, value) => option === value}
                freeSolo
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                value={formik.values.item_name}
                onChange={handleItemNameChange}
                onInputChange={(event, newValue) =>
                  formik.setFieldValue("item_name", newValue)
                }
                onBlur={formik.handleBlur("item_name")}
                options={items?.map((item) => item.item_name)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Item Name"
                    variant="outlined"
                    error={
                      formik.touched.item_name &&
                      Boolean(formik.errors.item_name)
                    }
                    helperText={
                      formik.touched.item_name && formik.errors.item_name
                    }
                  />
                )}
                isOptionEqualToValue={(option, value) => option === value}
                freeSolo
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Description"
                type="text"
                variant="outlined"
                {...formik.getFieldProps("description")}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Qty"
                type="number"
                fullWidth
                variant="outlined"
                {...formik.getFieldProps("qty")}
                error={formik.touched.qty && Boolean(formik.errors.qty)}
                helperText={formik.touched.qty && formik.errors.qty}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Rate"
                type="number"
                fullWidth
                variant="outlined"
                {...formik.getFieldProps("rate")}
                error={formik.touched.rate && Boolean(formik.errors.rate)}
                helperText={formik.touched.rate && formik.errors.rate}
              />
            </Grid>
            <Grid item xs={12} md={12} container justifyContent={"flex-end"}>
              <Button type="submit" color="primary" variant="outlined">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRowDialog;
