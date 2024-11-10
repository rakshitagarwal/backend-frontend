import React from 'react';
import {
  Row,
  Card,
  CardBody,
  Badge,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from 'reactstrap';
import { injectIntl } from 'react-intl';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { Separator, Colxx } from 'components/common/CustomBootstrap';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteProduct, getProduct } from 'redux/product/actions.product';
import { useState } from 'react';
import IntlMessages from 'helpers/IntlMessages';
import { NavLink, useHistory } from 'react-router-dom';
import { NotificationManager } from 'components/common/react-notifications';

const ProductDetails = ({
  match,
  intl,
  fetchProduct,
  loading,
  dispatchDeleteProduct,
  successMesage,
  errorMessage,
}) => {
  const {
    params: { productId },
  } = match;
  const history = useHistory();
  const { messages } = intl;
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetchProduct(productId, (res) => {
      setProduct(res.data);
    });
  }, []);

  useEffect(() => {
    if (successMesage) {
      NotificationManager.primary(null, successMesage);
      history.push('/app/product/list');
    } else if (errorMessage) {
      NotificationManager.error(null, errorMessage);
      history.push('/app/product/list');
    }
  }, [successMesage, errorMessage]);

  return loading ? (
    <div className="loading" />
  ) : (
    <>
      <Row>
        <Colxx xxs="12">
          {Object.keys(product).length > 0 ? (
            <>
              <h1>{product.title}</h1>
              {/* TODO: Action to add Delete feature for single product */}
              <div className="text-zero top-right-button-container">
                <UncontrolledDropdown>
                  <DropdownToggle
                    caret
                    color="primary"
                    size="lg"
                    outline
                    className="top-right-button top-right-button-single"
                  >
                    <IntlMessages id="pages.actions" />
                  </DropdownToggle>
                  <DropdownMenu>
                    {/* <DropdownItem header>
                      <IntlMessages id="pages.header" />
                    </DropdownItem>
                    <DropdownItem disabled>
                      <IntlMessages id="pages.delete" />
                    </DropdownItem> */}
                    <DropdownItem
                      onClick={() => {
                        dispatchDeleteProduct(product['_id'], () => {});
                      }}
                    >
                      <IntlMessages id="action.delete" />
                    </DropdownItem>
                    <DropdownItem divider />
                    <NavLink
                      to={`${product['_id']}/edit`}
                      className="p-0 cursor-pointer"
                    >
                      <DropdownItem>
                        <IntlMessages id="action.edit" />
                      </DropdownItem>
                    </NavLink>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>

              <Breadcrumb match={match} />
              <Separator className="mb-5" />

              <Row>
                <Colxx xxs="12" xl="8" className="col-left">
                  <Card className="mb-4">
                    <CardBody style={{ height: '419px' }}>
                      <img
                        src={`${process.env.REACT_APP_NODE_SERVER_API_BASE_URL}/${product.image}`}
                        alt="product"
                        width="100%"
                        height="100%"
                        style={{ borderRadius: '.75rem' }}
                      />
                    </CardBody>
                  </Card>
                </Colxx>

                <Colxx xxs="12" xl="4" className="col-right">
                  <Card className="mb-4">
                    <CardBody>
                      <p className="text-muted text-small mb-2">
                        {messages['product.description']}
                      </p>
                      <p className="mb-3">{product.description}</p>
                      <div>
                        <p className="text-muted text-small mb-2">
                          {messages['product.purchaseprice']}
                        </p>
                        <p className="mb-3">{product.purchasePrice}</p>
                        <p className="text-muted text-small mb-2">
                          {messages['product.sellingprice']}
                        </p>
                        <p className="mb-3">{product.sellingPrice}</p>

                        <p className="text-muted text-small mb-2">
                          {messages['product.overheadcost']}
                        </p>
                        <p className="mb-3">{product.overHeadCost}</p>
                        <p className="text-muted text-small mb-2">
                          {messages['product.quantity']}
                        </p>
                        <p className="mb-3">{product.quantity}</p>
                      </div>
                      <p className="text-muted text-small mb-2">
                        {messages['product.category']}
                      </p>
                      <p className="mb-3">
                        <Badge
                          color="outline-secondary"
                          className="mb-1 mr-1"
                          pill
                        >
                          {product?.ProductCategory?.name}
                        </Badge>
                      </p>
                    </CardBody>
                  </Card>
                </Colxx>
              </Row>
            </>
          ) : (
            <>No Data Found Please Try again later</>
          )}
        </Colxx>
      </Row>
    </>
  );
};
const mapStateToProps = ({ product }) => {
  const { products, metadata, message, loading, successMesage, errorMessage } =
    product;
  return { products, metadata, message, loading, successMesage, errorMessage };
};

const mapActionsToProps = (dispatch) => {
  return {
    fetchProduct: (params, cb) => dispatch(getProduct(params, cb)),
    dispatchDeleteProduct: (params, cb) => dispatch(deleteProduct(params, cb)),
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(injectIntl(ProductDetails));
