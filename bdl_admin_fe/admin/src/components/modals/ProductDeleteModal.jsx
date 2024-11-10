import IntlMessages from 'helpers/IntlMessages'
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { connect } from 'react-redux'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { deleteProduct, getProducts } from 'redux/product/actions.product'
// eslint-disable-next-line no-unused-vars
const DeleteModal = ({
    id, 
    setModalDelete, 
    modalDelete, 
    dispatchDeleteproduct, 
    fetchProducts, 
    setCurrentPage,
    selectedPageSize}) => {

  return (
    <Modal
        isOpen={modalDelete}
        toggle={() => setModalDelete(!modalDelete)}
    >
        <ModalHeader>
            <IntlMessages id="deletemodal.title" />
        </ModalHeader>
        <ModalBody>
            <IntlMessages id="deletemodal.body" />
        </ModalBody>
        <ModalFooter>
            <Button
                color="danger"
                onClick={() => {
                    dispatchDeleteproduct(id, () => {
                        fetchProducts({
                            limit: selectedPageSize,
                            page: 0,
                        });
                        setCurrentPage(1);
                    })
                    setModalDelete(false)
                }}
            >
                <IntlMessages id="deletemodal.delete" />
            </Button>{' '}
            <Button
                color="secondary"
                onClick={() => setModalDelete(false)}
            >
            <IntlMessages id="deletemodal.cancel" />
            </Button>
        </ModalFooter>
    </Modal>
  )
}

const mapStateToProps = ({ product }) => {
    const { successMesage, errorMessage  } = product;
    return { successMesage, errorMessage };
  };
  
  const mapActionsToProps = (dispatch) => {
    return {
      fetchProducts: (params) => dispatch(getProducts({ ...params })),
      dispatchDeleteproduct: (params, cb) => dispatch(deleteProduct(params, cb)),
    };
  };
  
  export default connect(mapStateToProps , mapActionsToProps)(DeleteModal);