import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  historySelector,
  setHistoryData,
} from 'redux/features/queryHistory/historySlice';


export const useHistorySave = () => {
  const { historyData } = useSelector(historySelector);
  const dispatch = useDispatch();

  const setSearchData = (data: object) => {
    dispatch(setHistoryData(data));
  };

  return [historyData, setSearchData] as const;
};
