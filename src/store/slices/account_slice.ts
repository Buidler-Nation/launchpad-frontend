import {createSelector, createSlice} from "@reduxjs/toolkit";
import {RootState} from "@reduxjs/toolkit/dist/query/core/apiState";
import {setAll} from "../../helpers/set_all";

export interface IAccountSlice {
    stakedTokenBalance: number;
    loading: boolean;
}

const initialState: IAccountSlice = {
    stakedTokenBalance: 0,
    loading: true,
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        fetchAccountSuccess(state, action) {
            setAll(state, action.payload);
        },
    }
});

export default accountSlice.reducer;

export const { fetchAccountSuccess } = accountSlice.actions;

// const baseInfo = (state: RootState) => state.account;
//
// export const getAccountState = createSelector(baseInfo, account => account);