import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  flagSelector,
  setButtonClicked,
} from 'redux/features/flags/flagsSlice';

export const useFlag = () => {
  const { isButtonClicked } = useSelector(flagSelector);
  const dispatch = useDispatch();

  const setIsButtonClicked = (check: boolean) => {
    dispatch(setButtonClicked(check));
  };

  return [isButtonClicked, setIsButtonClicked] as const;
};
