import React, { useEffect, useState } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { Formik, Form, Field } from 'formik';
import { NotificationManager } from 'components/common/react-notifications';

import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
// import { loginUser } from 'redux/actions';
import { login } from 'redux/authentication/actions.authentication';
import { adminRoot } from 'constants/defaultValues';
import { getCurrentColor, getCurrentUser } from 'helpers/Utils';
// import { setCurrentUser } from 'helpers/Utils';
import logo from 'assets/img/logo-light-small.png';
import drakLogo from 'assets/img/thebigdeal-logo.png';

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your password';
  } else if (value.length < 4) {
    error = 'Value must be longer than 3 characters';
  }
  return error;
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

const Login = ({ loading, checkLogin, successMesage, errorMessage }) => {
  const [colorDark, setColorDark] = useState(false);
  const history = useHistory();

  useEffect(()=>{
    const color = getCurrentColor();
    if(color.includes('dark')) setColorDark(true) 
    else setColorDark(false);
  },[])

  useEffect(() => {
    if (successMesage) {
      const ls = getCurrentUser();
      if (ls?.userToken) {
        history.push(adminRoot);
        NotificationManager.primary(null, successMesage);
      }
    } else if (errorMessage) {
      NotificationManager.error(null, errorMessage);
    }
  }, [successMesage, errorMessage]);

  const onUserLogin = (values) => {
    if (!loading) {
      if (values.email !== '' && values.password !== '') {
        checkLogin(values);
      }
    }
  };

  const initialValues = { email: '', password: '' };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
            <p className="white mb-0">
              Please use your credentials to login.
              <br />
              If you are not a member, please{' '}
              <NavLink to="/user/register" className="white">
                register
              </NavLink>
              .
            </p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <img
                src={colorDark ? logo : drakLogo} 
                alt="TBD"
                width="90px"
                className='mb-5'
              />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.login-title" />
            </CardTitle>

            <Formik initialValues={initialValues} onSubmit={onUserLogin}>
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.email" />
                    </Label>
                    <Field
                      className="form-control"
                      name="email"
                      validate={validateEmail}
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.password" />
                    </Label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      validate={validatePassword}
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/user/forgot-password">
                      <IntlMessages id="user.forgot-password-question" />
                    </NavLink>
                    <Button
                      color="primary"
                      type="submit"
                      className={`btn-shadow btn-multiple-state ${
                        loading ? 'show-spinner' : ''
                      }`}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        <IntlMessages id="user.login-button" />
                      </span>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = ({ authentication }) => {
  const { loading, successMesage, errorMessage } = authentication;
  return { loading, successMesage, errorMessage };
};
const mapActionsToProps = (dispatch) => {
  return {
    checkLogin: (params) => dispatch(login({ ...params })),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
