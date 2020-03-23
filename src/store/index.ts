import { combineReducers, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { AuthReducer } from "./AuthStore/AuthReducer";
import { FavoriteReducer } from "./FavoriteStore/FavoriteReducer";
import { GlobalReducer } from "./GlobalStore/GlobalReducer";
import { NotificationReducer } from "./NotificationStore/NotificationReducer";
import { PersistedSettingsReducer } from "./SettingsStore/SettingsReducer";
import { ToastReducer } from "./ToastStore/ToastReducer";
import { MapStoreReducer } from "./MapStore/reducer";
import { AdReducer } from "./AdStore/reducer";

const rootReducer = combineReducers({
  authStore: AuthReducer,
  toastStore: ToastReducer,
  favoriteStore: FavoriteReducer,
  globalStore: GlobalReducer,
  notificationStore: NotificationReducer,
  settingsStore: PersistedSettingsReducer,
  mapStore: MapStoreReducer,
  adStore: AdReducer,
});

function createMiddleware() {
  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction) {
    return undefined;
  } else {
    return composeWithDevTools();
  }
}

export type AppState = ReturnType<typeof rootReducer>;

export const initReduxStore = (initialState: AppState): Store<AppState> => {
  return createStore(rootReducer, initialState, createMiddleware());
};
