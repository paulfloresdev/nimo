import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Transaction {
    id: number;
    concept: string;
    amount: number;
    type: string;
    transaction_date: string;
    accounting_date: string;
    category_icon: string | null;
    card_bank_name: string | null;
    card_numbers: string;
    card_type: string | null;
    card_network_name: string | null;
    card_network: string | null;
    income_relation_count: number;
}

interface TransactionPagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    data: Transaction[];
}

interface MonthTransactionsState {
    transactions: TransactionPagination | null;
    loading: boolean;
    error: string | null;
}

const initialState: MonthTransactionsState = {
    transactions: null,
    loading: false,
    error: null,
};

const monthTransactionsSlice = createSlice({
    name: "month_transactions",
    initialState,
    reducers: {
        getMonthTransactionsRequest: (
            state,
            _action: PayloadAction<{
                year: number;
                month: number;
                data: {
                    concept?: string;
                    amount?: string;
                    category_id?: number;
                    type_id?: number;
                    card_id?: number;
                    order_by: number;
                    per_page?: number;
                    page?: number;
                };
            }>
        ) => {
            state.loading = true;
            state.error = null;
        },
        getMonthTransactionsSuccess: (state, action: PayloadAction<TransactionPagination>) => {
            state.loading = false;
            state.transactions = action.payload;
            console.log(action.payload);
        },
        getMonthTransactionsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    getMonthTransactionsRequest,
    getMonthTransactionsSuccess,
    getMonthTransactionsFailure,
} = monthTransactionsSlice.actions;

export default monthTransactionsSlice.reducer;
export type { MonthTransactionsState };
