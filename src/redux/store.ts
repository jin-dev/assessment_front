import React from 'react';
import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { PhotoState } from './features/photos/Photoslice';
import PhotosSliceReducer from './features/photos/Photoslice';
import flagSlicerReducer from './features/flags/flagsSlice';

import historySlicerReducer from './features/queryHistory/historySlice';


export type AppThunk = ThunkAction<void, PhotoState, unknown, Action<string>>;

const store = configureStore({
  reducer: {
    photosStore: PhotosSliceReducer,
    
    // anyOtherStore: anyOtherSlice,
    //
    history: historySlicerReducer,
    flag: flagSlicerReducer,
    //
  },
});

export { store };
