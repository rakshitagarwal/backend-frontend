/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import {
  addProduct,
  getCategory,
  getProduct,
  updateProduct,
  uploadProductImage,
} from 'redux/product/actions.product';
import { NotificationManager } from 'components/common/react-notifications';
import Breadcrumb from 'containers/navs/Breadcrumb';
import ProductAddForm from './productform';

const PAGE_HEADING = {
  ADD_PRODUCT: 'product.add',
  EDIT_PRODUCT: 'product.edit',
};

const initialValues = {
  title: '',
  description: '',
  vendor: '',
  ProductCategory: '',
  image: '',
  purchasePrice: '',
  sellingPrice: '',
  overHeadCost: '',
  quantity: '',
};

const ProductAdd = (props) => {
  const {
    dispatchGetCategory,
    match,
    dispatchAddProduct,
    loading,
    categories,
    dispatchUploadProductImage,
    successMesage,
    errorMessage,
    dispatchGetProduct,
    dispatchUpdateProduct,
  } = props;
  const params = useParams();
  const history = useHistory();
  const [heading, setHeading] = useState(PAGE_HEADING.ADD_PRODUCT);
  const [formData, setFormData] = useState(initialValues);
  const [initalloading, setIndtialLoading] = useState(false);

  useEffect(()=>{
    setIndtialLoading(true)
  },[])

  useEffect(() => {
    if (params.productId) {
      setHeading(PAGE_HEADING.EDIT_PRODUCT);
    } else {
      setHeading(PAGE_HEADING.ADD_PRODUCT);
      setFormData(initialValues);
    }
  }, [params.productId]);

  useEffect(() => {
    if (initalloading) {
      if (successMesage) NotificationManager.primary(null, successMesage);
      else if (errorMessage) NotificationManager.error(null, errorMessage);
    }
  }, [successMesage, errorMessage]);

  const updateFormData = (res) => {
    const {
      title,
      description,
      ProductCategory,
      image,
      purchasePrice,
      sellingPrice,
      overHeadCost,
      quantity,
      vendor,
    } = res.data;
    setFormData({
      title,
      description,
      ProductCategory: {
        label: ProductCategory.name,
        value: ProductCategory['_id'],
      },
      image,
      purchasePrice,
      sellingPrice,
      overHeadCost,
      quantity,
      vendor,
    });
  };

  useEffect(() => {
    dispatchGetCategory();
    if (params?.productId) {
      dispatchGetProduct(params.productId, updateFormData);
    }
  }, []);

  const onSubmit = (values) => {
    const data = {
      ...values,
      ProductCategory: values.ProductCategory.value,
    };
    if (params?.productId)
      dispatchUpdateProduct(params?.productId, data, () => {
        // window.location.href = `${window.location.origin}/app/product/list`;
        history.push('/app/product/list');
      });
    else
      dispatchAddProduct(data, () => {
        history.push('list');
      });
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading={heading} match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <ProductAddForm
        onSubmit={onSubmit}
        formData={formData}
        categories={categories}
        dispatchUploadProductImage={dispatchUploadProductImage}
        loading={loading}
      />
    </>
  );
};

const mapStateToProps = ({ product }) => {
  const { loading, categories, successMesage, errorMessage } = product;
  return {
    loading,
    categories,
    successMesage,
    errorMessage,
  };
};
const mapActionsToProps = (dispatch) => {
  return {
    dispatchAddProduct: (data, cb) => dispatch(addProduct({ ...data }, cb)),
    dispatchUpdateProduct: (pathParam, data, cb) =>
      dispatch(updateProduct(pathParam, { ...data }, cb)),
    dispatchGetCategory: () => dispatch(getCategory()),
    dispatchGetProduct: (pathParam, cb) => dispatch(getProduct(pathParam, cb)),
    dispatchUploadProductImage: (data, cb) =>
      dispatch(uploadProductImage(data, cb)),
  };
};
export default connect(mapStateToProps, mapActionsToProps)(ProductAdd);
