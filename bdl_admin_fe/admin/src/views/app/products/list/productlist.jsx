import React, { useState, useEffect } from 'react';
import useMousetrap from 'hooks/use-mousetrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { connect } from 'react-redux';
import {
  deleteProduct,
  getProducts,
  updateProduct,
} from 'redux/product/actions.product';
import Breadcrumb from 'containers/navs/Breadcrumb';
import IntlMessages from 'helpers/IntlMessages';
import { DataListIcon, ThumbListIcon, ImageListIcon } from 'components/svg';
import {
  Row,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { NavLink as RouterLink, useHistory } from 'react-router-dom';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import Switch from 'rc-switch';
import { getCurrentColor, getFullDate } from 'helpers/Utils';
import { NotificationManager } from 'components/common/react-notifications';
import { adminRoot } from 'constants/defaultValues';
import ProductDeleteModal from 'components/modals/ProductDeleteModal';
import AddProductModal from './addProductModal';

const orderOptions = [
  { column: 'title', label: 'Product Name' },
  { column: 'category', label: 'Category' },
  { column: 'status', label: 'Status' },
];
const pageSizes = [4, 8, 12, 20];

const categories = [
  { label: 'Cakes', value: 'Cakes', key: 0 },
  { label: 'Cupcakes', value: 'Cupcakes', key: 1 },
  { label: 'Desserts', value: 'Desserts', key: 2 },
];

const ProductList = ({
  match,
  fetchProducts,
  products,
  metadata,
  // dispatchDeleteProduct,
  successMesage,
  errorMessage,
  loading,
  changeStatusProduct,
}) => {
  const numberLimit = 5;
  const firstIsActive = true;
  const lastIsActive = true;
  let startPoint = 1;
  let endPoint = numberLimit;

  // TODO: Change loading logic for table i have change this to fix some problem
  // const [isLoaded, setIsLoaded] = useState(true);
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(4);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'title',
    label: 'Product Name',
  });
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [darktheme, setDarkTheme] = useState(false);
  const history = useHistory();
  const [modalDelete, setModalDelete] = useState(false);
  const [id, setId] = useState('');
  const [initalloading, setIndtialLoading] = useState(false);

  useEffect(()=>{
    setIndtialLoading(true)
  },[])

  // Fetch Data over here
  useEffect(() => {
    const color = getCurrentColor();
    if (color.includes('dark')) setDarkTheme(true);
    else setDarkTheme(false);
    fetchProducts({ limit: selectedPageSize, page: currentPage - 1 });
    setSelectedItems([]);
  }, [selectedPageSize, currentPage, selectedOrderOption, search, pageSizes]);

  useEffect(() => {
    if (initalloading) {
      if (successMesage) NotificationManager.primary(null, successMesage);
      else if (errorMessage) NotificationManager.error(null, errorMessage);
    }
  }, [successMesage, errorMessage]);

  useEffect(() => {
    setTotalPage(metadata.totalPages);
    // TODO: Activate List of the big deal
    setItems(products);
    setTotalItemCount(metadata.recordCount);
    // setIsLoaded(false);
  }, [products]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption]);

  const changeOrderBy = (column) => {
    setSelectedOrderOption(orderOptions.find((x) => x.column === column));
  };

  const handleChangeSelectAll = (isToggle) => {
    if (selectedItems.length >= items.length) {
      if (isToggle) {
        setSelectedItems([]);
      }
    } else {
      setSelectedItems(items.map((x) => x['_id']));
    }
    document.activeElement.blur();
    return false;
  };

  const onContextMenuClick = (e, data) => {
    // params : (e,data,target)
    console.log('onContextMenuClick - selected items', selectedItems);
    console.log('onContextMenuClick - action : ', data.action);
  };

  const onContextMenu = (e, data) => {
    const clickedProductId = data.data;
    if (!selectedItems.includes(clickedProductId)) {
      setSelectedItems([clickedProductId]);
    }
    return true;
  };

  useMousetrap(['ctrl+a', 'command+a'], () => {
    handleChangeSelectAll(false);
  });

  useMousetrap(['ctrl+d', 'command+d'], () => {
    setSelectedItems([]);
    return false;
  });

  const onSearchKey = (e) => {
    if (e.key === 'Enter') {
      setSearch(e.target.value.toLowerCase());
    }
  };
  // const [checkedSecondaryInverse, setCheckedSecondaryInverse] = useState(false);
  const firstPageButtonClassName = currentPage <= 1 ? 'disabled' : '';
  const lastPageButtonClassName = currentPage >= totalPage ? 'disabled' : '';
  const prevPageButtonClassName = currentPage <= 1 ? 'disabled' : '';
  const nextPageButtonClassName = currentPage >= totalPage ? 'disabled' : '';

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  if (numberLimit > totalPage) {
    startPoint = 1;
    endPoint = totalPage;
  } else if (currentPage <= parseInt(numberLimit / 2, 10)) {
    startPoint = 1;
    endPoint = numberLimit;
  } else if (currentPage + parseInt(numberLimit / 2, 10) <= totalPage) {
    startPoint = currentPage - parseInt(numberLimit / 2, 10);
    endPoint = currentPage + parseInt(numberLimit / 2, 10);
  } else {
    startPoint = totalPage - (numberLimit - 1);
    endPoint = totalPage;
  }
  startPoint = startPoint === 0 ? 1 : startPoint;
  const points = [];
  for (let i = startPoint; i <= endPoint; i += 1) {
    points.push(i);
  }

  return loading ? (
    <div className="loading" />
  ) : (
    <>
     {modalDelete && <ProductDeleteModal from="auction" id={id} setModalDelete={setModalDelete} modalDelete={modalDelete} setCurrentPage={setCurrentPage} selectedPageSize={selectedPageSize} currentPage={currentPage}/> }
      <div className="disable-text-selection">
        {/* List Heading starts */}
        <Row>
          <Colxx xxs="12">
            <div className="mb-2">
              <h1>
                <IntlMessages id="menu.list" />
              </h1>

              <div className="text-zero top-right-button-container">
                <Button
                  color="primary"
                  size="lg"
                  className="top-right-button"
                  // TODO: add modal
                  // onClick={() => toggleModal()}
                  onClick={() => history.push('add')}
                >
                  <IntlMessages id="pages.add-new" />
                </Button>
              </div>
              <Breadcrumb match={match} />
            </div>

            <div className="mb-2">
              <Button
                color="empty"
                className="pt-0 pl-0 d-inline-block d-md-none"
                onClick={() => setDisplayOptionsIsOpen(!displayOptionsIsOpen)}
              >
                <IntlMessages id="pages.display-options" />{' '}
                <i className="simple-icon-arrow-down align-middle" />
              </Button>
              <Collapse
                isOpen={displayOptionsIsOpen}
                className="d-md-block"
                id="displayOptions"
              >
                <span className="mr-3 d-inline-block float-md-left">
                  <a
                    href="#/"
                    className={`mr-2 view-icon ${
                      displayMode === 'list' ? 'active' : ''
                    }`}
                    onClick={() => setDisplayMode('list')}
                  >
                    <DataListIcon />
                  </a>
                  <a
                    href="#/"
                    className={`mr-2 view-icon ${
                      displayMode === 'thumblist' ? 'active' : ''
                    }`}
                    onClick={() => setDisplayMode('thumblist')}
                  >
                    <ThumbListIcon />
                  </a>
                  <a
                    href="#/"
                    className={`mr-2 view-icon ${
                      displayMode === 'imagelist' ? 'active' : ''
                    }`}
                    onClick={() => setDisplayMode('imagelist')}
                  >
                    <ImageListIcon />
                  </a>
                </span>

                <div className="d-block d-md-inline-block pt-1">
                  <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                    <DropdownToggle caret color="outline-dark" size="xs">
                      <IntlMessages id="pages.orderby" />
                      {selectedOrderOption.label}
                    </DropdownToggle>
                    <DropdownMenu>
                      {orderOptions.map((order, index) => {
                        return (
                          <DropdownItem
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            onClick={() => changeOrderBy(order.column)}
                          >
                            {order.label}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                    <input
                      type="text"
                      name="keyword"
                      id="search"
                      placeholder="search" // TODO: provide intl props
                      onKeyPress={(e) => onSearchKey(e)}
                    />
                  </div>
                </div>
                <div className="float-md-right pt-1">
                  <span className="text-muted text-small mr-1">
                    <IntlMessages id="pages.viewing" />
                    {startIndex + 1}-
                    {totalItemCount >= endIndex ? endIndex : totalItemCount}
                    {` | `}
                    <IntlMessages id="pages.total" />
                    {totalItemCount}
                  </span>
                  <UncontrolledDropdown className="d-inline-block">
                    <DropdownToggle caret color="outline-dark" size="xs">
                      {selectedPageSize}
                    </DropdownToggle>
                    <DropdownMenu right>
                      {pageSizes.map((size, index) => {
                        return (
                          <DropdownItem
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            onClick={() => setSelectedPageSize(size)}
                          >
                            {size}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </Collapse>
            </div>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        {/* List heading ends */}
        <AddProductModal
          modalOpen={modalOpen}
          toggleModal={() => setModalOpen(!modalOpen)}
          categories={categories}
        />
        <div className="responsive w-100 overflow-x">
          <table
            className={`w-100 custom-table ${
              !darktheme ? 'lighttheme' : 'darktheme'
            }`}
          >
            <thead>
              <tr>
                <th style={{ width: '100px' }}>Image</th>
                <th>Title</th>
                <th>Purchase price</th>
                <th>Selling price</th>
                <th>Quantity</th>
                <th>Overhead Coast</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.length ? (
                items.map((product) => {
                  // TODO: Have to add different views
                  // if (displayMode === 'thumblist') {
                  return (
                    <tr key={product['_id']}>
                      <td className="text-align-end">
                        <RouterLink
                          to={`${adminRoot}/product/${product['_id']}`}
                          className="p-0 cursor-pointer"
                        >
                          <img
                            alt="iphone"
                            src={`${process.env.REACT_APP_NODE_SERVER_API_BASE_URL}/${product.image}`}
                            className="min-max-150 list-thumbnail responsive border-0 card-img-left"
                          />
                        </RouterLink>
                      </td>
                      <td>
                        <RouterLink
                          to={`${adminRoot}/product/${product['_id']}`}
                          className="p-0 cursor-pointer"
                        >
                          {product.title}
                        </RouterLink>
                      </td>
                      <td>{product.purchasePrice}</td>
                      <td>{product.sellingPrice}</td>
                      <td>{product.quantity}</td>
                      <td>{product.overHeadCost}</td>
                      <td>{getFullDate(product.updatedAt)}</td>
                      <td>
                        <div className="d-flex justify-content-center min-max-150 w-10 w-sm-100">
                          <Switch
                            className="custom-switch custom-switch-secondary-inverse"
                            checked={product.status}
                            onChange={() =>{
                              changeStatusProduct(product['_id'] , { 
                              "title": product.title,
                              "description": product.description,
                              "image": product.image,
                              "purchasePrice": product.purchasePrice,
                              "sellingPrice": product.sellingPrice,
                              "overHeadCost": product.overHeadCost,
                              status: !product.status,
                              "vendor": product.vendor,
                              "quantity": product.quantity, 
                              ProductCategory: product?.ProductCategory?.name}, (res)=>{
                                console.log(res, "result cbb");
                              })
                            }
                            }
                          />
                        </div>
                      </td>
                      <td>
                        <div className="custom-control custom-checkbox pl-1 align-self-center d-flex justify-content-center align-items-center font-20 gap-20">
                          <div
                            className="simple-icon-trash text-danger cursor-pointer"
                            role="button"
                            tabIndex={0}
                            onClick={() => {
                              setId(product['_id']);
                              setModalDelete(true);
                            }}
                            onKeyPress={(e) => console.log(e)}
                          />
                          <RouterLink
                            to={`${adminRoot}/product/${product['_id']}/edit`}
                            className="p-0 cursor-pointer"
                          >
                            <div
                              tabIndex={0}
                              className="iconsminds-file-edit text-success cursor-pointer"
                              role="button"
                              onClick={() => {
                                console.log('e');
                              }}
                              onKeyPress={(e) => console.log(e)}
                            />
                          </RouterLink>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="9">No Data Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Row>
          {/* Pagination starts here */}
          {totalPage > 1 ? (
            <Colxx xxs="12" className="mt-3 mb-3">
              <Nav className="pagination justify-content-center">
                {firstIsActive && (
                  <NavItem className={`page-item ${firstPageButtonClassName}`}>
                    <NavLink
                      className="page-link first c-pointer"
                      onClick={() => setCurrentPage(1)}
                    >
                      <i className="simple-icon-control-start" />
                    </NavLink>
                  </NavItem>
                )}

                <NavItem className={`page-item ${prevPageButtonClassName}`}>
                  <NavLink
                    className="page-link prev c-pointer"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    <i className="simple-icon-arrow-left" />
                  </NavLink>
                </NavItem>
                {points.map((i) => {
                  return (
                    <NavItem
                      key={i}
                      className={`page-item ${currentPage === i && 'active'}`}
                    >
                      <NavLink
                        className="page-link c-pointer"
                        onClick={() => setCurrentPage(i)}
                      >
                        {i}
                      </NavLink>
                    </NavItem>
                  );
                })}
                <NavItem className={`page-item ${nextPageButtonClassName}`}>
                  <NavLink
                    className="page-link next c-pointer"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    <i className="simple-icon-arrow-right" />
                  </NavLink>
                </NavItem>
                {lastIsActive && (
                  <NavItem className={`page-item ${lastPageButtonClassName}`}>
                    <NavLink
                      className="page-link last c-pointer"
                      onClick={() => setCurrentPage(totalPage)}
                    >
                      <i className="simple-icon-control-end" />
                    </NavLink>
                  </NavItem>
                )}
              </Nav>
            </Colxx>
          ) : (
            <Colxx xxs="12" className="mt-2" />
          )}

          {/* End Pagination */}

          {/* Context Menu */}
          <ContextMenu
            id="menu_id"
            onShow={(e) => onContextMenu(e, e.detail.data)}
          >
            <MenuItem onClick={onContextMenuClick} data={{ action: 'copy' }}>
              <i className="simple-icon-docs" /> <span>Copy</span>
            </MenuItem>
            <MenuItem onClick={onContextMenuClick} data={{ action: 'move' }}>
              <i className="simple-icon-drawer" /> <span>Move to archive</span>
            </MenuItem>
            <MenuItem onClick={onContextMenuClick} data={{ action: 'delete' }}>
              <i className="simple-icon-trash" /> <span>Delete</span>
            </MenuItem>
          </ContextMenu>
        </Row>
        {/* List view ends */}
      </div>
    </>
  );
};

const mapStateToProps = ({ product }) => {
  const { products, metadata, message, successMesage, errorMessage, loading } =
    product;
  return { products, metadata, message, successMesage, errorMessage, loading };
};

const mapActionsToProps = (dispatch) => {
  return {
    fetchProducts: (params) => dispatch(getProducts({ ...params })),
    dispatchDeleteProduct: (params, cb) => dispatch(deleteProduct(params, cb)),
    changeStatusProduct: (pathParam, data, cb) =>
      dispatch(updateProduct(pathParam, data, cb)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(ProductList);
