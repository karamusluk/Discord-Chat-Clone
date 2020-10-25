import appReducer from '../features/appSlice';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
  },
});
