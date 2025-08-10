// import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import userReducer from './user/userSlice'
// import { persistReducer, persistStore } from 'redux-persist'
// import { version } from 'mongoose'
// import storage from 'redux-persist/lib/storage';



// const rootReducer = combineReducers({
//     user: userReducer
// })

// const persistedReducer = persistReducer(persistConfig, rootReducer)


// const persistConfig = {
//     key: 'root',
//     storage,
//     version: 1,
// }

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
//     serializableCheck: false,
//   })
// })


// export const persistor = persistStore(store);


// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import userReducer from './user/userSlice';
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// // ✅ Define persistConfig first
// const persistConfig = {
//   key: 'root',
//   storage,
//   version: 1,
// };

// // Combine reducers
// const rootReducer = combineReducers({
//   user: userReducer,
// });

// // Apply persist reducer after persistConfig exists
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// export const persistor = persistStore(store);



import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/userSlice';

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
