import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "../monthTransactions/monthTransactionsSlice";
import { Contact } from "../allContacts/allContactsSlice";

export interface IncomeRelations {
    id: number | null;
    amount: number | null;
    contact: Contact | null;
    from_transaction: Transaction | null;
    to_transaction: Transaction | null;
}

interface IncomeRelationsPagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface IncomeRelationsState {
    data: IncomeRelations[] | null;
    pagination: IncomeRelationsPagination | null;
    loading: boolean;
    error: string | null;
}

const initialState: IncomeRelationsState = {
    data: null,
    pagination: null,
    loading: false,
    error: null,
};

const incomeRelationsSlice = createSlice({
    name: "income_relations",
    initialState,
    reducers: {
        getIncomeRelationsRequest: (
            state,
            _action: PayloadAction<{
                contact_id?: number;
                to_id?: number;
                from_id?: number;
                page?: number;
                year?: number;
                month?: number;
            }>
        ) => {
            state.loading = true;
            state.error = null;
        },
        getIncomeRelationsSuccess: (
            state,
            action: PayloadAction<IncomeRelationsState>
        ) => {
            state.loading = false;
            state.pagination = action.payload.pagination;
            state.data = action.payload.data;
        },
        getIncomeRelationsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    getIncomeRelationsRequest,
    getIncomeRelationsSuccess,
    getIncomeRelationsFailure,
} = incomeRelationsSlice.actions;

export default incomeRelationsSlice.reducer;
export type { IncomeRelationsState };