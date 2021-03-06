import React, { useState, useEffect } from 'react';
import { searchItemsType } from 'types/definedType';
import List from './components/List';


//Main Page for my assessment
//User info page

const AllUser = () => {

  const searchData: (searchItemsType | searchItemsType[])[] = [

    [
      {
        label: 'ID',
        keyName: 'id',
      },

    ],

  ];

  return <List searchData={searchData} subURL="users/" />;
};

export default AllUser;
