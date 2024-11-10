import { ADD_AUCTION, ADD_AUCTION_ERROR, ADD_AUCTION_SUCCESS, DELETE_AUCTION, DELETE_AUCTION_ERROR, DELETE_AUCTION_SUCCESS, GET_AUCTION, GET_AUCTIONS, GET_AUCTIONS_ERROR, GET_AUCTIONS_SUCCESS, GET_AUCTION_CATEGORY, GET_AUCTION_CATEGORY_ERROR, GET_AUCTION_CATEGORY_SUCCESS, GET_AUCTION_ERROR, GET_AUCTION_SUCCESS, UPDATE_AUCTION, UPDATE_AUCTION_ERROR, UPDATE_AUCTION_SUCCESS, UPLOAD_AUCTION_IMAGE, UPLOAD_AUCTION_IMAGE_ERROR, UPLOAD_AUCTION_IMAGE_SUCCESS } from './constants.auction';

export const getAuctions = (params) => {
  return {
    type: GET_AUCTIONS,
    payload: { ...params },
  };
};
export const getAuctionsSuccess = (data) => ({
  type: GET_AUCTIONS_SUCCESS,
  payload: { ...data },
});
export const getAuctionsError = (message) => ({
  type: GET_AUCTIONS_ERROR,
  payload: message,
});

export const addAuction = (data, cb) => {
  return {
    type: ADD_AUCTION,
    payload: { data, cb },
  };
};
export const addAuctionSuccess = (data) => ({
  type: ADD_AUCTION_SUCCESS,
  payload: { ...data },
});
export const addAuctionError = (message) => ({
  type: ADD_AUCTION_ERROR,
  payload: message,
});

export const deleteAuction = (auctionId, cb) => {
  return {
    type: DELETE_AUCTION,
    payload: { auctionId, cb },
  };
};
export const deleteAuctionSuccess = (data) => {
  return {
    type: DELETE_AUCTION_SUCCESS,
    payload: { data },
  };
};
export const deleteAuctionError = (data) => {
  return {
    type: DELETE_AUCTION_ERROR,
    payload: { data },
  };
};

export const updateAuction = (pathParam, data, cb) => {
  return {
    type: UPDATE_AUCTION,
    payload: { pathParam, data, cb },
  };
};
export const updateAuctionSuccess = (data) => ({
  type: UPDATE_AUCTION_SUCCESS,
  payload: { ...data },
});
export const updateAuctionError = (message) => ({
  type: UPDATE_AUCTION_ERROR,
  payload: message,
});

export const getAuction = (pathParam, cb) => {
  return {
    type: GET_AUCTION,
    payload: { pathParam, cb },
  };
};
export const getAuctionSuccess = (data) => ({
  type: GET_AUCTION_SUCCESS,
  payload: { ...data },
});
export const getAuctionError = (message) => ({
  type: GET_AUCTION_ERROR,
  payload: message,
});

export const getAuctionCategory = () => {
  return {
    type: GET_AUCTION_CATEGORY,
  };
};
export const getAuctionCategorySuccess = (data) => ({
  type: GET_AUCTION_CATEGORY_SUCCESS,
  payload: { ...data },
});
export const getAuctionCategoryError = (message) => ({
  type: GET_AUCTION_CATEGORY_ERROR,
  payload: message,
});

export const uploadAuctionImage = (data, cb) => {
  return {
    type: UPLOAD_AUCTION_IMAGE,
    payload: { data, cb },
  };
};
export const uploadAuctionImageSuccess = (data) => ({
  type: UPLOAD_AUCTION_IMAGE_SUCCESS,
  payload: { ...data },
});
export const uploadAuctionImageError = (message) => ({
  type: UPLOAD_AUCTION_IMAGE_ERROR,
  payload: message,
});
