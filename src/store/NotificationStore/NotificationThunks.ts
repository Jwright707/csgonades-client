import { ReduxThunkAction } from "../StoreUtils/ThunkActionType";
import {
  addNotificationAction,
  AppNotificationCreate,
  removeNotificationAction,
  seenToolTip
} from "./NotificationActions";

export const addNotificationActionThunk = (
  notification: AppNotificationCreate
): ReduxThunkAction => {
  return async dispatch => {
    const addAction = addNotificationAction(notification);
    const removeAction = removeNotificationAction(addAction.notification.id);
    dispatch(addAction);
    await notificationDeleteDelay(notification.durationSeconds);
    dispatch(removeAction);
  };
};

export const displayToolTipThunk = (): ReduxThunkAction => {
  return async dispatch => {
    dispatch(
      addNotificationActionThunk({
        title: "Favorite nades",
        message:
          "Click on the star in the top right corner to favorite this nade.\nFirst you need to sign in.",
        severity: "info",
        durationSeconds: 20
      })
    );
    dispatch(seenToolTip("seenFavoriteTip"));
  };
};

const notificationDeleteDelay = (seconds?: number) => {
  const time = seconds ? seconds * 1000 : 8 * 1000;
  return new Promise(resolve => setTimeout(() => resolve(), time));
};
