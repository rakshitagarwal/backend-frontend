import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthGuardActive } from 'constants/defaultValues';
import { connect } from 'react-redux';
import { getCurrentUser } from './Utils';

const ProtectedRoute = ({
  component: Component,
  permission,
  // roles = undefined,
  ...rest
}) => {
  const setComponent = (props) => {
    if (isAuthGuardActive) {
      const currentUser = getCurrentUser();
      // console.log(currentUser, "authHealper");
      if (currentUser) {
        if (permission.length) {
          console.log("Component", Component);
        //   if (roles.includes(1)) {
            return <Component {...props} permission={permission}/>;
        //   }
        //   return (
        //     <Redirect
        //       to={{
        //         pathname: '/unauthorized',
        //         state: { from: props.location },
        //       }}
        //     />
        //   );
        }
      return <Component {...props} />;
      }
      return (
        <Redirect
          to={{
            pathname: '/user/login',
            state: { from: props.location },
          }}
        />
      );
    }
    return <Component {...props} />;
  };

  return <Route {...rest} render={setComponent} />;
};

const mapStateToProps = ({ authentication }) => {
  // console.log(authentication, ": authentication");
  const { loading, errorMessage, permission} = authentication;
  return {
    loading,
    errorMessage,
    permission
  };
};
// eslint-disable-next-line import/prefer-default-export
// export { ProtectedRoute };
export default connect(mapStateToProps, {})(ProtectedRoute);