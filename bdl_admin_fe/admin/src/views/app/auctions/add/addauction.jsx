import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { NotificationManager } from 'components/common/react-notifications';
import { getFullDate } from 'helpers/Utils';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Row } from 'reactstrap';
import {
  addAuction,
  getAuction,
  getAuctionCategory,
  updateAuction,
  uploadAuctionImage,
} from 'redux/auction/actions.auction';
import { getProducts } from 'redux/product/actions.product';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import AuctionAddForm from './auctionform';

const PAGE_HEADING = {
  ADD_AUCTION: 'auction.add',
  EDIT_AUCTION: 'auction.edit',
};

const initialValues = {
  title: '',
  bannerImage: '',
  bannerVideo: '',
  quantity: '',
  openingPrice: '',
  botMaxPrice: '',
  numberOfPlays: '',
  bidIncrement: '',
  startDate: '',
  endDate: '',
  Product: '',
  AuctionCategory: '',
  state: '',
  registerationStatus: false,
  prestartDate: '',
  preendDate: '',
  preparticipantCount: '',
  preparticipantFees: '',
  postparticipantFees: '',
};

const AuctionAdd = ({
  match,
  errorMessage,
  successMesage,
  dispatchAuctionGetCategory,
  auctioncategories,
  dispatchProductGetCategory,
  products,
  dispatchAddAuction,
  dispatchUpdateAuction,
  dispatchGetAuction,
  dispatchUploadAuctionImage,
}) => {
  const params = useParams();
  const history = useHistory();
/*eslint-disable */
  const [heading, setHeading] = useState(PAGE_HEADING.ADD_PRODUCT);
  const [formData, setFormData] = useState(initialValues);
  const [initalloading, setIndtialLoading] = useState(false);

  useEffect(()=>{
    setIndtialLoading(true)
  },[])
  useEffect(() => {
    if (params.auctionId) {
      setHeading(PAGE_HEADING.EDIT_AUCTION);
    } else {
      setHeading(PAGE_HEADING.ADD_AUCTION);
      setFormData(initialValues);
    }
  }, [params.auctionId]);

  useEffect(() => {
    if (initalloading) {
      if (successMesage) NotificationManager.error(null, successMesage);
      else if (errorMessage) NotificationManager.error(null, errorMessage);
    }
  }, [successMesage, errorMessage]);

  const updateFormData = (res) => {
    const {
      title,
      bannerImage,
      bannerVideo,
      quantity,
      openingPrice,
      bot,
      botMaxPrice,
      noOfPlayConsumed,
      bidIncrement,
      noNewBidderLimit,
      autoStart,
      startDate,
      endDate,
      registerationStatus,
      auctionPreRegister,
      auctionPostRegister,
      state,
      status,
      Product,
      AuctionCategory,
    } = res.data[0];
    if(registerationStatus){
      setFormData({
        title,
        bannerImage,
        bannerVideo,
        quantity,
        openingPrice,
        bot,
        botMaxPrice,
        "numberOfPlays": noOfPlayConsumed,
        bidIncrement,
        noNewBidderLimit,
        autoStart,
        "startDate": new Date(startDate), 
        "endDate": new Date(endDate),
        registerationStatus,
        "preparticipantFees": new Date(auctionPreRegister?.participantFees) || '',
        "postparticipantFees": new Date(auctionPostRegister?.participantFees) || '',
        "preparticipantCount": new Date(auctionPreRegister?.participantCount) || '',
        "preendDate" : new Date(auctionPreRegister?.endDate) || '',
        "prestartDate" : new Date(auctionPreRegister?.startDate) || '',
        "state": {
          value: state,
          label: state,
        },
        status,
        Product: {
          label: Product.title,
          value: Product['_id'],
        },
        AuctionCategory: {
          label: AuctionCategory.name,
          value: AuctionCategory['_id'],
        },
      });
    }else{
      setFormData({
        title,
        bannerImage,
        bannerVideo,
        quantity,
        openingPrice,
        bot,
        botMaxPrice,
        "numberOfPlays": noOfPlayConsumed,
        bidIncrement,
        noNewBidderLimit,
        autoStart,
        "startDate": new Date(startDate), 
        "endDate": new Date(endDate),
        registerationStatus,
        // "preparticipantFees": auctionPreRegister?.participantFees || '',
        // "postparticipantFees": auctionPostRegister?.participantFees || '',
        // "preparticipantCount": auctionPreRegister?.participantCount || '',
        // "preendDate" : new Date(auctionPreRegister?.endDate) || '',
        // "prestartDate" : new Date(auctionPreRegister?.startDate) || '',
        "state": {
          value: state,
          label: state,
        },
        status,
        Product: {
          label: Product.title,
          value: Product['_id'],
        },
        AuctionCategory: {
          label: AuctionCategory.name,
          value: AuctionCategory['_id'],
        },
      });
    }

  };

  useEffect(() => {
    dispatchAuctionGetCategory();
    dispatchProductGetCategory();
    if (params?.auctionId) {
      dispatchGetAuction(params.auctionId, updateFormData);
    }
  }, []);

  const onSubmitHandel = (values) => {
    let data;
    if (values.registerationStatus) {
      data = {
        title: values.title,
        bannerImage: values.bannerImage,
        bannerVideo: values.bannerVideo,
        quantity: values.quantity,
        openingPrice: values.openingPrice,
        botMaxPrice: values.botMaxPrice,
        bidIncrement: values.bidIncrement,
        registerationStatus: values.registerationStatus,
        startDate: getFullDate(values.startDate),
        endDate: getFullDate(values.endDate),
        AuctionCategory: values.AuctionCategory.value,
        Product: values.Product.value,
        state: values.state.value,
        noOfPlayConsumed: values.numberOfPlays,
        noNewBidderLimit: 10,
        autoStart: false,
        bot: false,
        auctionPreRegister: {
          startDate: getFullDate(values.prestartDate),
          endDate: getFullDate(values.preendDate),
          participantCount: values.preparticipantCount,
          participantFees: values.preparticipantFees,
        },
        auctionPostRegister: {
          participantFees: values.postparticipantFees,
        },
      };
    } else {
      data = {
        title: values.title,
        bannerImage: values.bannerImage,
        bannerVideo: values.bannerVideo,
        quantity: values.quantity,
        openingPrice: values.openingPrice,
        botMaxPrice: values.botMaxPrice,
        bidIncrement: values.bidIncrement,
        registerationStatus: values.registerationStatus,
        startDate: getFullDate(values.startDate),
        endDate: getFullDate(values.endDate),
        AuctionCategory: values.AuctionCategory.value,
        Product: values.Product.value,
        state: values.state.value,
        noOfPlayConsumed: values.numberOfPlays,
        noNewBidderLimit: 10,
        autoStart: false,
        bot: false,
      };
    }

    if (params?.auctionId) {
      dispatchUpdateAuction(params?.auctionId, data, () => {
        history.push('/app/auctions/list');
      });
    } else
      dispatchAddAuction(data, () => {
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
      <AuctionAddForm
        onSubmitHandel={onSubmitHandel}
        formData={formData}
        dispatchUploadAuctionImage={dispatchUploadAuctionImage}
        auctioncategories={auctioncategories}
        products={products}
      />
    </>
  );
};

const mapStateToProps = ({ auction, product }) => {
  const { loading, auctioncategories, successMesage, errorMessage } = auction;
  const { products } = product;
  return {
    loading,
    auctioncategories,
    products,
    successMesage,
    errorMessage,
  };
};
const mapActionsToProps = (dispatch) => {
  return {
    dispatchAddAuction: (data, cb) => dispatch(addAuction({ ...data }, cb)),
    dispatchUpdateAuction: (pathParam, data, cb) => dispatch(updateAuction(pathParam, { ...data }, cb)),
    dispatchAuctionGetCategory: () => dispatch(getAuctionCategory()),
    dispatchGetAuction: (pathParam, cb) => dispatch(getAuction(pathParam, cb)),
    dispatchProductGetCategory: () => dispatch(getProducts()),
    dispatchUploadAuctionImage: (data, cb) => dispatch(uploadAuctionImage(data, cb)),
  };
};
export default connect(mapStateToProps, mapActionsToProps)(AuctionAdd);
