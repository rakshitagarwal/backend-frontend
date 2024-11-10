/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  CustomInput,
} from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import Switch from 'rc-switch';
import ReactSelect from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import { injectIntl } from 'react-intl';
// import { useParams } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';

const today = new Date();
today.setHours(0, 0, 0, 0);

const SignupSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter title'),
  bannerImage: Yup.string().required('Please select banner image'),
  bannerVideo: Yup.string().required('Please select banner video'),
  quantity: Yup.number()
    .positive('Must be more than 0')
    .integer('Must be number')
    .required('Please enter quantity'),
  openingPrice: Yup.number()
    .positive('Must be more than 0')
    .required('Please enter opening price'),
  botMaxPrice: Yup.number()
    .positive('Must be more than 0')
    .required('Please set bot max price'),
  numberOfPlays: Yup.number()
    .positive('Must be more than 0')
    .required('Please enter number of plays'),
  bidIncrement: Yup.number()
    .positive('Must be more than 0')
    .required('Please enter bid increment'),
  startDate: Yup.date().min(today, "Date cannot be in the past").required('Please select Date'),
  endDate: Yup.date().min(Yup.ref('startDate'), "Must be greater than Start date").required('Please select Date'),
  Product: Yup.object().required('Please select product'),
  AuctionCategory: Yup.object().required('Please select category'),
  state: Yup.object().required('Please select state'),
  registerationStatus: Yup.boolean().optional(),
  prestartDate: Yup.date().when('registerationStatus', {
    is: true,
    then: Yup.date().min(today, "Date cannot be in the past").required("Please select Date")
  }),
  preendDate: Yup.date().when('registerationStatus', {
    is: true,
    then: Yup.date().min(Yup.ref('prestartDate'), "Must be greater than Start date").required("Please select Date")
  }),
  preparticipantCount: Yup.number().when('registerationStatus', {
    is: true,
    then: Yup.number().positive('Must be more than 0').required('Please set participant count')
  }),
  preparticipantFees: Yup.number().when('registerationStatus', {
    is: true,
    then: Yup.number().positive('Must be more than 0').required('Please set participant fees')
  }),
  postparticipantFees: Yup.number().when('registerationStatus', {
    is: true,
    then: Yup.number().positive('Must be more than 0').required('Please set post fees')
  }),
});
const AuctionAddForm = (props) => {
  const { onSubmitHandel, formData, intl, auctioncategories, products, dispatchUploadAuctionImage } = props;
  const { messages } = intl;
  const [checkedSecondaryInverse, setCheckedSecondaryInverse] = useState();

  const [auctioncategoryOptions, setAuctionCategoryOptions] = useState([]);
  const [productcategoryOptions, setProductCategoryOptions] = useState([]);

  useEffect(() => {
    const options = auctioncategories.map((category) => ({
      label: category.name,
      value: category['_id'],
    }));
    setAuctionCategoryOptions([...options]);
  }, [auctioncategories]);

  useEffect(()=>{
    setCheckedSecondaryInverse(formData.registerationStatus)
  },[formData])

  useEffect(() => {
    const options = products.map((category) => ({
      label: category.title,
      value: category['_id'],
    }));
    setProductCategoryOptions([...options]);
  }, [products]);

  const params = useParams();
  const state = [
    {
      value: 'Active',
      label: 'Active',
    },
    {
      value: 'Publish',
      label: 'Publish',
    },
  ];

  const handleImageFile = async (event, setFieldValue) => {
    event.preventDefault();
    if (event.target.value) {
      const data = new FormData();
      data.append('name', event.target.files[0].name);
      data.append('file', event.target.files[0], event.target.files[0].name);
      dispatchUploadAuctionImage(data, (res) => {
        if (res.success) {
          setFieldValue('bannerImage', res.data?.path);
        } else {
          console.log(res, 'error<----');
        }
      });
      // setFieldValue('bannerImage', event.target.files[0].name);
    }
  };

  const handleVideoFile = async (event, setFieldValue) => {
    event.preventDefault();
    if (event.target.value) {
      const data = new FormData();
      data.append('name', event.target.files[0].name);
      data.append('file', event.target.files[0], event.target.files[0].name);
      console.log(data);
      setFieldValue('bannerVideo', event.target.files[0].name);
    }
  };

  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <h6 className="mb-4">Add Auction</h6>

            <Formik
              initialValues={formData}
              validationSchema={SignupSchema}
              onSubmit={onSubmitHandel}
              enableReinitialize
            >
              {({
                handleSubmit,
                setFieldValue,
                setFieldTouched,
                values,
                errors,
                touched,
                isSubmitting,
              }) => (
                <form
                  className="av-tooltip tooltip-label-right"
                  onSubmit={handleSubmit}
                >
                  <div className="d-flex flex-wrap">
                    <div className="d-flex flex-wrap flex-sm-nowrap gap-40 w-100 mb-2">
                      <div className="w-100">
                        <FormGroup className="error-l-75">
                          <Label>Title *</Label>
                          <Field className="form-control" name="title" />
                          {errors.title && touched.title ? (
                            <div className="position-absolute field-error">
                              {errors.title}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>

                      <div className="w-100">
                        <FormGroup>
                          <Label>Auction image *</Label>
                          <input
                            type="file"
                            className="form-control"
                            name="bannerImage"
                            accept="image/jpeg,image/png"
                            onChange={(e) => {
                              handleImageFile(e, setFieldValue);
                              if (!touched.bannerImage)
                                setFieldTouched('bannerImage', true);
                            }}
                          />
                          {errors.bannerImage && touched.bannerImage ? (
                            <div className="position-absolute field-error">
                              {errors.bannerImage}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>

                      <div className="w-100">
                        <FormGroup>
                          <Label>Auction video *</Label>
                          <input
                            type="file"
                            className="form-control"
                            name="bannerVideo"
                            accept=""
                            onChange={(e) => {
                              handleVideoFile(e, setFieldValue);
                              if (!touched.bannerVideo)
                                setFieldTouched('bannerVideo', true);
                            }}
                          />
                          {errors.bannerVideo && touched.bannerVideo ? (
                            <div className="position-absolute field-error">
                              {errors.bannerVideo}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap flex-sm-nowrap gap-40 w-100 mb-2">
                      <div className="w-100">
                        <FormGroup>
                          <Label>Quantity *</Label>
                          <Field
                            className="form-control"
                            name="quantity"
                            type="number"
                          />
                          {errors.quantity && touched.quantity ? (
                            <div className="position-absolute field-error">
                              {errors.quantity}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <div className="w-100">
                        <FormGroup>
                          <Label>Opening price *</Label>
                          <Field
                            className="form-control"
                            name="openingPrice"
                            type="number"
                          />
                          {errors.openingPrice && touched.openingPrice ? (
                            <div className="position-absolute field-error">
                              {errors.openingPrice}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <div className="w-100">
                        <FormGroup>
                          <Label>Bot max price *</Label>
                          <Field
                            className="form-control"
                            name="botMaxPrice"
                            type="number"
                          />
                          {errors.botMaxPrice && touched.botMaxPrice ? (
                            <div className="position-absolute field-error">
                              {errors.botMaxPrice}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <div className="w-100">
                        <FormGroup>
                          <Label>Bid value *</Label>
                          <Field
                            className="form-control"
                            name="numberOfPlays"
                            type="number"
                          />
                          {errors.numberOfPlays && touched.numberOfPlays ? (
                            <div className="position-absolute field-error">
                              {errors.numberOfPlays}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap flex-sm-nowrap gap-40 w-100 mb-2">
                      <div className="w-100">
                        <FormGroup>
                          <Label>Bid increment *</Label>
                          <Field
                            className="form-control"
                            name="bidIncrement"
                            type="number"
                          />
                          {errors.bidIncrement && touched.bidIncrement ? (
                            <div className="position-absolute field-error">
                              {errors.bidIncrement}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>

                      <div className="w-100 mb-5">
                        <FormGroup>
                          <Label>Start date *</Label>
                          <DatePicker
                            selected={values.startDate}
                            name="startDate"
                            placeholderText={messages['forms.date']}
                            onChange={(e) => {
                              setFieldValue('startDate', e)}}
                          />
                          {errors.startDate && touched.startDate ? (
                            <div className="position-absolute field-error">
                              {errors.startDate}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>

                      <div className="w-100 mb-5">
                        <FormGroup className="error-l-75">
                          <Label>End date *</Label>
                          <DatePicker
                            name="endDate"
                            selected={values.endDate}
                            placeholderText={messages['forms.date']}
                            onChange={(e) => setFieldValue('endDate', e)}
                          />
                          {errors.endDate && touched.endDate ? (
                            <div className="position-absolute field-error">
                              {errors.endDate}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </div>

                    <div className="d-flex flex-wrap flex-sm-nowrap gap-40 w-100 mb-2">
                      <div className="w-100">
                        <FormGroup className="error-l-75">
                          <Label>Product *</Label>
                          <ReactSelect
                            // components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="Product"
                            value={values.Product}
                            onChange={(e) => {
                              setFieldValue('Product', e);
                            }}
                            options={
                              productcategoryOptions.length
                                ? productcategoryOptions
                                : [
                                    {
                                      label: 'No data available',
                                      value: null,
                                    },
                                  ]
                            }
                            // defaultValue={Roles[0]}
                          />
                          {errors.Product && touched.Product ? (
                            <div className="position-absolute field-error">
                              {errors.Product}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <div className="w-100">
                        <FormGroup className="error-l-75">
                          <Label>Auction category *</Label>
                          <ReactSelect
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="AuctionCategory"
                            value={values.AuctionCategory}
                            onChange={(e) => {
                              setFieldValue('AuctionCategory', e);
                            }}
                            options={
                              auctioncategoryOptions.length
                                ? auctioncategoryOptions
                                : [
                                    {
                                      label: 'No data available',
                                      value: null,
                                    },
                                  ]
                            }
                          />
                          {errors.AuctionCategory && touched.AuctionCategory ? (
                            <div className="position-absolute field-error">
                              {errors.AuctionCategory}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <div className="w-100">
                        <FormGroup className="error-l-75">
                          <Label>Auction state *</Label>
                          <ReactSelect
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="state"
                            value={values.state}
                            onChange={(e) => {
                              setFieldValue('state', e);
                            }}
                            options={
                              state.length
                                ? state
                                : [
                                    {
                                      label: 'No data available',
                                      value: null,
                                    },
                                  ]
                            }
                          />
                          {errors.state && touched.state ? (
                            <div className="position-absolute field-error">
                              {errors.state}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </div>

                    <div className="d-flex flex-wrap flex-sm-nowrap gap-40 w-100 mb-2">
                      <FormGroup className="error-l-75">
                        <Label for='registerationStatus' >Pre registration &nbsp;</Label>
                        <Switch
                          name="registerationStatus"
                          checked={checkedSecondaryInverse}
                          onChange={(secondaryInverse) => {
                            setCheckedSecondaryInverse(secondaryInverse);
                            setFieldValue(
                              'registerationStatus',
                              secondaryInverse
                            );
                          }}
                        />

                        {errors.registerationStatus &&
                        touched.registerationStatus ? (
                          <div className="position-absolute field-error">
                            {errors.registerationStatus}
                          </div>
                        ) : null}
                      </FormGroup>
                    </div>

                    {
                      checkedSecondaryInverse ?     
                    <div className="d-flex flex-wrap flex-sm-nowrap gap-40 w-100 mb-2">
                      <div className="w-100 mb-5">
                        <FormGroup>
                          <Label>Start date *</Label>
                          <DatePicker
                            name="prestartDate"
                            placeholderText={messages['forms.date']}
                            selected={values.prestartDate}
                            onChange={(e) => setFieldValue('prestartDate', e)}
                          />
                          {errors.prestartDate && touched.prestartDate ? (
                            <div className="position-absolute field-error">
                              {errors.prestartDate}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>

                      <div className="w-100 mb-5">
                        <FormGroup className="error-l-75">
                          <Label>End date *</Label>
                          <DatePicker
                            name="preendDate"
                            placeholderText={messages['forms.date']}
                            selected={values.preendDate}
                            onChange={(e) => setFieldValue('preendDate', e)}
                          />
                          {errors.preendDate && touched.preendDate ? (
                            <div className="position-absolute field-error">
                              {errors.preendDate}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <div className="w-100">
                        <FormGroup>
                          <Label>Participant count *</Label>
                          <Field
                            className="form-control"
                            name="preparticipantCount"
                            type="number"
                          />
                          {errors.preparticipantCount &&
                          touched.preparticipantCount ? (
                            <div className="position-absolute field-error">
                              {errors.preparticipantCount}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <div className="w-100">
                        <FormGroup>
                          <Label>Pre participant fees *</Label>
                          <Field
                            className="form-control"
                            name="preparticipantFees"
                            type="number"
                          />
                          {errors.preparticipantFees &&
                          touched.preparticipantFees ? (
                            <div className="position-absolute field-error">
                              {errors.preparticipantFees}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <div className="w-100">
                        <FormGroup>
                          <Label>Post participant fees *</Label>
                          <Field
                            className="form-control"
                            name="postparticipantFees"
                            type="number"
                          />
                          {errors.postparticipantFees &&
                          touched.postparticipantFees ? (
                            <div className="position-absolute field-error">
                              {errors.postparticipantFees}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </div> :
                    <div className="w-100">{null}</div>
                    }

                  </div>

                  <Button color="primary" type="submit">
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>

                    {params?.auctionId ? (
                      <span className="label"> Update Auction</span>
                    ) : (
                      <span className="label">+ Add Auction</span>
                    )}

                  </Button>
                </form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};

export default injectIntl(AuctionAddForm);
