import React, { useEffect, useState } from 'react';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import ReactSelect from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import { useParams } from 'react-router-dom';

const SignupSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Title is too short!')
    .max(20, 'Title is too long!')
    .matches(
      /^(?! )[A-Za-z0-9 ]*(?<! )$/,
      'No leading or trailing spaces allowed'
    )
    .required('Please enter Title'),
  description: Yup.string()
    .min(2, 'Description is too short!')
    .max(1000, 'Description is too long!')
    .matches(
      /^(?! )[A-Za-z0-9 ]*(?<! )$/,
      'No leading or trailing spaces allowed'
    )
    .required('Please enter Description'),
  quantity: Yup.number()
    .positive('Must be more than zero')
    .integer('Must be a number')
    .max(2 * 10 ** 20, 'Upper limit reached')
    .required('Please enter quantity'),
  image: Yup.string().required('Please select an image'),
  purchasePrice: Yup.number()
    .positive('Must be more than zero')
    .max(2 * 10 ** 20, 'Upper limit reached')
    .required('Please enter purchase price'),
  sellingPrice: Yup.number()
    .required('Please enter selling price')
    .max(2 * 10 ** 20, 'Upper limit reached')
    .positive('Must be more than zero'),
  overHeadCost: Yup.number()
    .required('Please enter overhead cost')
    .max(2 * 10 ** 20, 'Upper limit reached')
    .positive('Must be more than zero'),
  ProductCategory: Yup.object().required('Please select Product Category'),
  vendor: Yup.string().required("Please enter vendor name"),
});

const ProductAddForm = (props) => {
  const {
    onSubmit,
    categories,
    dispatchUploadProductImage,
    loading,
    formData,
  } = props;
  const [categoryOptions, setCategoryOptions] = useState([]);
  const params = useParams();
  useEffect(() => {
    const options = categories.map((category) => ({
      label: category.name,
      value: category['_id'],
    }));
    setCategoryOptions([...options]);
  }, [categories]);

  const handleImageFile = async (event, setFieldValue) => {
    event.preventDefault();
    if (event.target.value) {
      const data = new FormData();
      data.append('name', event.target.files[0].name);
      data.append('file', event.target.files[0], event.target.files[0].name);
      dispatchUploadProductImage(data, (res) => {
        if (res.success) {
          setFieldValue('image', res.data?.path);
        } else {
          console.log(res, 'error<----');
        }
      });
    }
  };

  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <h6 className="mb-4">Add Product</h6>

            <Formik
              initialValues={formData}
              validationSchema={SignupSchema}
              onSubmit={onSubmit}
              enableReinitialize
            >
              {({
                handleSubmit,
                setFieldValue,
                setFieldTouched,
                values,
                errors,
                touched,
              }) => (
                <Form
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
                        <FormGroup className="error-l-75">
                          <Label>Product Category *</Label>
                          <ReactSelect
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="ProductCategory"
                            value={values.ProductCategory || ''}
                            onChange={(e) =>
                              setFieldValue('ProductCategory', e)
                            }
                            onBlur={() => {
                              if (!touched.ProductCategory)
                                setFieldTouched('ProductCategory');
                            }}
                            options={
                              categoryOptions.length
                                ? categoryOptions
                                : [{ label: 'No data available', value: null }]
                            }
                          />
                          {errors.ProductCategory && touched.ProductCategory ? (
                            <div className="position-absolute field-error">
                              {errors.ProductCategory}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </div>

                    <div className="d-flex flex-wrap flex-sm-nowrap gap-40 w-100 mb-2">
                      <div className="w-100">
                        <FormGroup>
                          <Label>Description *</Label>
                          <Field
                            className="form-control"
                            name="description"
                            component="textarea"
                            rows={3}
                          />
                          {errors.description && touched.description ? (
                            <div className="position-absolute field-error">
                              {errors.description}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </div>

                    <div className="d-flex flex-wrap flex-md-nowrap gap-40 w-100 mb-2">
                      <div className="d-flex flex-wrap flex-sm-nowrap gap-40 w-100">
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
                            <Label>Purchase Price *</Label>
                            <Field
                              className="form-control"
                              name="purchasePrice"
                              type="number"
                            />
                            {errors.purchasePrice && touched.purchasePrice ? (
                              <div className="position-absolute field-error">
                                {errors.purchasePrice}
                              </div>
                            ) : null}
                          </FormGroup>
                        </div>
                      </div>
                      <div className="d-flex flex-wrap flex-sm-nowrap gap-40 w-100 mb-2">
                        <div className="w-100">
                          <FormGroup>
                            <Label>Selling Price *</Label>
                            <Field
                              className="form-control"
                              name="sellingPrice"
                              type="number"
                            />
                            {errors.sellingPrice && touched.sellingPrice ? (
                              <div className="position-absolute field-error">
                                {errors.sellingPrice}
                              </div>
                            ) : null}
                          </FormGroup>
                        </div>
                        <div className="w-100">
                          <FormGroup>
                            <Label>Overhead Cost *</Label>
                            <Field
                              className="form-control"
                              name="overHeadCost"
                              type="number"
                            />
                            {errors.overHeadCost && touched.overHeadCost ? (
                              <div className="position-absolute field-error">
                                {errors.overHeadCost}
                              </div>
                            ) : null}
                          </FormGroup>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap flex-md-nowrap gap-40 w-100 mb-2">
                      <div className="w-100">
                        <FormGroup>
                          <Label>Product Image *</Label>
                          <input
                            type="file"
                            className="form-control"
                            name="image"
                            accept="image/jpeg,image/png"
                            onChange={(e) => {
                              handleImageFile(e, setFieldValue);
                              if (!touched.image)
                                setFieldTouched('image', true);
                            }}
                          />
                          {errors.image && touched.image ? (
                            <div className="position-absolute field-error">
                              {errors.image}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <div className="w-100">
                        <FormGroup>
                          <Label>Vendor Name *</Label>
                          <Field className="form-control" name="vendor" />
                          {errors.vendor && touched.vendor ? (
                            <div className="position-absolute field-error">
                              {errors.vendor}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </div>
                  </div>

                  <Button
                    className={`btn-multiple-state  ${
                      loading ? 'show-spinner' : ''
                    }`}
                    disabled={loading}
                    color="primary"
                    type="submit"
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    {params?.productId ? (
                      <span className="label"> Update Product</span>
                    ) : (
                      <span className="label">+ Add Product</span>
                    )}
                  </Button>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};

export default ProductAddForm;
