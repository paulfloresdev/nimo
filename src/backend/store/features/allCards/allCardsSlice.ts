import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CardType {
    id: number;
    type: string;
}

interface CardBank {
    id: number;
    name: string;
    img_path: string;
    type: string;
}

interface CardNetwork {
    id: number;
    name: string;
    lastname: string;
    phone: string;
    email: string;
}

interface Card {
    id: number;
    numbers: string;
    color: string;
    type: CardType;
    bank: CardBank;
    network: CardNetwork;
}

interface CardGroup {
    debit: Card[];
    credit: Card[];
}

interface allCardsState {
    cards: CardGroup | null;
    loading: boolean;
    error: string | null;
}

const initialState: allCardsState = {
    cards : null,
    loading : false,
    error : null,
};

const allCardsSlice = createSlice({
    name: "all_cards",
    initialState,
    reducers: {
        getAllCardsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        getAllCardsSuccess: (state, action: PayloadAction<CardGroup>) => {
            state.loading = false;
            state.cards = action.payload;
        },
        getAllCardsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {
    getAllCardsRequest,
    getAllCardsSuccess,
    getAllCardsFailure
} = allCardsSlice.actions;

export default allCardsSlice.reducer;
export type { allCardsState }