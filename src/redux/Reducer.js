import * as types from "./actionTypes";

const initialState = {
  appointments: [],
  sliderImage: [],
  aboutInfo: [],
};

const appointmentReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case types.GET_APPOINTMENTS:
      return {
        ...state,
        appointments: payload,
      };
    case types.GET_SLIDERIMAGE:
      return {
        ...state,
        sliderImage: payload,
      };
    case types.DELETE_SLIDERIMAGE:
      let newSLider = [...state.sliderImage];
      const index = state.sliderImage.findIndex((item) => item._id === payload);
      if (index > -1) {
        newSLider.splice(index, 1);
      }
      return {
        ...state,
        sliderImage: newSLider,
      };
    case types.ADD_SLIDERIMAGE:
      let addedImage = [...state.sliderImage, payload];

      return {
        ...state,
        sliderImage: addedImage,
      };
    case types.GET_ABOUTINFO:
      return {
        ...state,
        aboutInfo: payload,
      };
    case types.ADD_ABOUTINFO:
      const newInfo = [...state.aboutInfo,payload]
      return {
        ...state,
        aboutInfo: newInfo,
      };

    default:
      return state;
  }
};

export default appointmentReducer;
