import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from '../../services/ApiGeocoding';
import { RootState } from "../../store";
import { UserType } from "../../types";

const getPosition = async () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export const fetchAddress = createAsyncThunk("user/fetchAddress", async () => {
  // 1) We get the user's geolocation position
  const positionObj: any = await getPosition();

  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in.
  // Payload of the FULFILLED state

  return { position, address };
});

export type UserState = {
  userInfo: UserType;
};

const initialState: UserState = {
  userInfo: {
    username: "",
    status: "idle",
    position: {
      latitude: "",
      longitude: "",
    },
    address: "",
    error: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.userInfo.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.userInfo.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.userInfo.position = action.payload.position;
        state.userInfo.address = action.payload.address;
        state.userInfo.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.userInfo.status = "error";
        state.userInfo.error =
          "There was a problem getting your address. Make sure to fill this field!";
      }),
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;

export const getUser = (state: RootState) => state.user.userInfo;

export const getUsername = (state: RootState) => state.user.userInfo.username;
