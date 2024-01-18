import * as Yup from "yup"



export const headerTableValidationSchema = Yup.object().shape({
    vr_no: Yup.number().required('vr_no should not be empty'),
    vr_date: Yup.date().required('vr_date should not be empty'),
    ac_name: Yup.string().required('ac_name should not be empty'),
    ac_amt: Yup.number().required('ac_amt should not be empty'),
    status: Yup.string().required('status should be A')
})

export const detailsTableValidationSchema = Yup.object().shape({
    id: Yup.number().required('id should not be empty'),
    vr_no: Yup.number().required('vr_no should not be empty'),
    sr_no: Yup.number().required('sr_no should not be empty'),
    item_code: Yup.string().required('item_code should not be empty'),
    item_name: Yup.string().required('item_name should not be empty'),
    description: Yup.string().required('description should not be empty'),
    qty: Yup.number().required('qty should not be empty'),
    rate: Yup.number().required('rate should not be empty'),
})