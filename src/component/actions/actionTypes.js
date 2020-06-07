import { NOTIFY_USER } from "./action";

export const notifyUser = (message, messageType) => {
  return {
    type: NOTIFY_USER,
    message,
    messageType,
  };
};
