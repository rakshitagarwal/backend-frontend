import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { getCurrentColor } from 'helpers/Utils';
import logo from 'assets/img/logo-light-small.png';
import drakLogo from 'assets/img/thebigdeal-logo.png';
import { forgetpassword } from 'redux/authentication/actions.authentication';
import { NotificationManager } from 'components/common/react-notifications';

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

const ForgotPassword = ({
  loading,
  errorMessage, 
  successMesage,
  forgotPasswordAction,
}) => {
  const [email] = useState('');
  const [colorDark, setColorDark] = useState(false);

  const onForgotPassword = (values) => {
    if (!loading) {
      if (values.email !== '') {
        forgotPasswordAction(values);
      }
    }
  };

  useEffect(()=>{
    if (successMesage) {
      NotificationManager.primary(null, successMesage);
    } else if (errorMessage) {
      NotificationManager.error(null, errorMessage);
    }
  },[successMesage, errorMessage])

  useEffect(()=>{
    const color = getCurrentColor();
    if(color.includes('dark')) setColorDark(true) 
    else setColorDark(false);
  },[])

  const initialValues = { email };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
            <p className="white mb-0">
              Please use your e-mail to reset your password. <br />
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
              <IntlMessages id="user.forgot-password" />
            </CardTitle>

            <Formik initialValues={initialValues} onSubmit={onForgotPassword}>
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

                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/user/login">
                      <IntlMessages id="user.login-title" />
                    </NavLink>
                    <Button
                      color="primary"
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
                        <IntlMessages id="user.reset-password-button" />
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
  const { loading, errorMessage, successMesage } = authentication;
  return { loading, errorMessage, successMesage };
};
const mapActionsToProps = (dispatch) => {
  return {
    forgotPasswordAction: (params) => dispatch(forgetpassword({ ...params })),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(ForgotPassword);
