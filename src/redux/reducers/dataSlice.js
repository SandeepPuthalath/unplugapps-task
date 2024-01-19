import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config";


export const handleSaveDataToDB = createAsyncThunk("saveData", async (payload) => {
    try {
        const response = await axios.post(config.INSERT_DATA, {...payload});
        return response.data;
    } catch (error) {
        console.log(error.message)
        return Promise.reject(error.message)
    }
})

export const handleFetchItems = createAsyncThunk("fetchItems", async () => {
    try {
        const response = await axios.get(config.ITEM_MASTER);
        return response.data;
    } catch (error) {
        return Promise.reject(error.message)
    }
})



const dataSlice = createSlice({
    name: "header_details",
    initialState: {
        loading: false,
        error: null,
        successMessage: "",
        items: [],
        header_table: null,
        details_table: [],
        row: null,
    },
    reducers: {
        setHeaderData: (state, action) => {
            state.header_table = action.payload || {}
        },
        setDetailsData: (state, action) => {
            state.details_table = [
                ...state.details_table,
                action.payload
            ];
            state.header_table.ac_amt = state.details_table.reduce((acc, curr) => acc += curr.rate * curr.qty, 0)
        },
        resetData: (state) => {
            state.loading = false
            state.error = null
            state.header_table = null;
            state.details_table = [];
        },
        removeRowFromDetailsTable: (state, action) => {
            state.details_table = state.details_table.filter((row) => row.id !== action.payload);
        },
        setDataToEditToRow: (state, action) => {
            state.row = state.details_table.find(row => row.id === action.payload)
        },
        editRowInDetailsTable: (state, action) => {
            state.details_table = state.details_table.map((row) => {
                if (row.id === action.payload.id) {
                    row = action.payload
                }
                return row;
            })
            state.header_table.ac_amt = state.details_table.reduce((acc, curr) => acc += curr.rate * curr.qty, 0);
            state.row =  null;
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(handleFetchItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(handleFetchItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = [...action.payload];
            })
            .addCase(handleFetchItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
            .addCase(handleSaveDataToDB.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(handleSaveDataToDB.fulfilled, (state, action) => {
                console.log(action.payload)
                state.loading = false;
            })
            .addCase(handleSaveDataToDB.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    }
})

export const { setDetailsData, setHeaderData, resetData, removeRowFromDetailsTable, setDataToEditToRow, editRowInDetailsTable } = dataSlice.actions;
export default dataSlice.reducer;