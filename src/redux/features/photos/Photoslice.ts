import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../store";

export interface PhotoState {
  photos: object[];
  loading: boolean;
  errors: string;
}

const initialState: PhotoState = {
  photos: [],
  loading: false,
  errors: "",
};

const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },

    setErrors: (state, { payload }: PayloadAction<string>) => {
      state.errors = payload;
    },

    setPhotos: (state, { payload }: PayloadAction<object[]>) => {
      state.photos = payload;
    },
  },
});

export const { setLoading, setErrors, setPhotos } = photosSlice.actions;

export default photosSlice.reducer;

export const photoSelector = (state: { photosStore: PhotoState }) =>
  state.photosStore;


