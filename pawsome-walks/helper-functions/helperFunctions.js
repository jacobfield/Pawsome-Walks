import getDogPalRequestsByReceiverDogId from "./dogPalRequests-table/getDogPalRequestsByReceiverDogId.js";
import postDogPalRequest from "./dogPalRequests-table/postDogPalRequest.js";
import updateDogPalRequest from "./dogPalRequests-table/updateDogPalRequest.js";
import deleteDogPalsByBothIds from "./dogPals-table/deleteDogPalsByBothIds.js";
import getDogPals from "./dogPals-table/getDogPals.js";
import postDogPal from "./dogPals-table/postDogPal.js";
import getDogById from "./dogs-table/getDogById.js";
import deleteDogById from "./dogs-table/deleteDogById.js";
import patchDogById from "./dogs-table/patchDogById.js";
import postDog from "./dogs-table/postDog.js";
import deleteOwnerFavouriteWalksByOwnerId from "./ownerFavouriteWalks-table/deleteOwnerFavouriteWalksByOwnerId.js";
import getOwnerFavouriteWalksByOwnerId from "./ownerFavouriteWalks-table/getOwnerFavouriteWalksByOwnerId.js";
import postOwnerFavouriteWalks from "./ownerFavouriteWalks-table/postOwnerFavouriteWalks.js";
import deleteOwnerById from "./owners-table/deleteOwnerById.js";
import getOwnerById from "./owners-table/getOwnerById.js";
import postOwner from "./owners-table/postOwner.js";
import updateOwnerPassword from "./owners-table/updateOwnerPassword.js";
import deleteOwnersDogsByDogId from "./ownersDogs-table/deleteOwnersDogsByDogId.js";
import getOwnersDogsByOwnersId from "./ownersDogs-table/getOwnersDogsByOwnersId.js";
import postOwnersDogs from "./ownersDogs-table/postOwnersDogs.js";
import deleteWalkCommentById from "./walkComments-table/deleteWalkCommentById.js";
import getWalkCommentByWalkId from "./walkComments-table/getWalkCommentByWalkId.js";
import postWalkComments from "./walkComments-table/postWalkComments.js";
import getWalksById from "./walks-table/getWalksById.js";
import getWalks from "./walks-table/getWalks.js";
import postWalk from "./walks-table/postWalk.js";

export const walks = {
  getWalksById,
  getWalks,
  postWalk,
};

export const walkComments = {
  deleteWalkCommentById,
  getWalkCommentByWalkId,
  postWalkComments,
};

export const ownersDogs = {
  deleteOwnersDogsByDogId,
  getOwnersDogsByOwnersId,
  postOwnersDogs,
};

export const owners = {
  deleteOwnerById,
  getOwnerById,
  postOwner,
  updateOwnerPassword,
};

export const ownerFavouriteWalks = {
  deleteOwnerFavouriteWalksByOwnerId,
  getOwnerFavouriteWalksByOwnerId,
  postOwnerFavouriteWalks,
};

export const dogs = {
  getDogById,
  deleteDogById,
  patchDogById,
  postDog,
};

export const dogPalRequests = {
  getDogPalRequestsByReceiverDogId,
  postDogPalRequest,
  updateDogPalRequest,
};

export const dogPals = {
  deleteDogPalsByBothIds,
  getDogPals,
  postDogPal,
};
