import React from 'react';


const AllUser = React.lazy(() => import('./views/assessmentMenu/AllUser'));


interface Routes {
  path?: string;
  name?: string;
  depth?: any[];
  title?: string;
  exact?: boolean;
  component?: any;
  flag?: boolean;
}




//routing for pages above
const routes: Routes[] = [
   
{
  path: '/',
  exact: true,
  name: 'main',
  component: AllUser,
},
  {
    path: '/allUser',
    name: 'User List',
    title: 'Awair Menu',
    depth: [
      {
        path: '/allUser',
        subtitle: 'assessment',
      },
     
    ],
    component: AllUser,
    flag: true,
  },

  

  
];

export default routes;
