import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Contact {
    id: number;
    alias: string | null;
    updated_at: string;
}

interface ContactPagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    data: Contact[];
}

interface AllContactsState {
    contacts: ContactPagination | null;
    loading: boolean;
    error: string | null;
}

const initialState: AllContactsState = {
    contacts: null,
    loading: false,
    error: null,
};

const allContactsSlice = createSlice({
    name: "all_contacts",
    initialState,
    reducers: {
        getAllContactsRequest: (
            state,
            _action: PayloadAction<{
                page?: number;
            }>
        ) => {
            state.loading = true;
            state.error = null;
        },
        getAllContactsSuccess: (state, action: PayloadAction<ContactPagination>) => {
            state.contacts = action.payload;
            state.loading = false;
        },
        getAllContactsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    getAllContactsRequest,
    getAllContactsSuccess,
    getAllContactsFailure,
} = allContactsSlice.actions;

export default allContactsSlice.reducer;
export type { AllContactsState }