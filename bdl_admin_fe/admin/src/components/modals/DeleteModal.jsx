import IntlMessages from 'helpers/IntlMessages'
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { deleteAuction, getAuctions } from 'redux/auction/actions.auction'
// eslint-disable-next-line no-unused-vars
const DeleteModal = ({
    id, 
    setModalDelete, 
    modalDelete, 
    dispatchDeleteauction, 
    fetchAuctions, 
    setCurrentPage,
    currentPage, 
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
                    dispatchDeleteauction(id, () => {
                        fetchAuctions({
                            limit: selectedPageSize,
                            page: currentPage - 1,
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

const mapStateToProps = ({ auction }) => {
    const { auctions, metadata, message, successMesage, errorMessage, loading } = auction;
    return { auctions, metadata, message, successMesage, errorMessage, loading };
  };
  
  const mapActionsToProps = (dispatch) => {
    return {
      fetchAuctions: (params) => dispatch(getAuctions({ ...params })),
      dispatchDeleteauction: (params, cb) => dispatch(deleteAuction(params, cb)),
    };
  };
  
  export default connect(mapStateToProps , mapActionsToProps)(DeleteModal);