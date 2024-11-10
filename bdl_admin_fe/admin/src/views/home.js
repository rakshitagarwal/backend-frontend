/* eslint-disable react/no-array-index-key, react/no-danger */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { getCurrentUser } from 'helpers/Utils';
import { adminRoot } from 'constants/defaultValues';

const Home = () => {
  // logged in user check
  // will check user is already logged or not
  const currentUser = getCurrentUser();
  // if  not logged in then Redirect to login page
  if (currentUser === null) {
    return (
      <Redirect
        to={{
          pathname: '/user/login',
        }}
      />
    );
  }
  // if logged in then React to dashboard
  return (
    <Redirect
      to={{
        pathname: adminRoot,
      }}
    />
  );
};

export default Home;
