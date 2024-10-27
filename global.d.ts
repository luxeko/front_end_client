import vi from "./messages/vi.json";
import en from "./messages/en.json";

type MessagesEn = typeof en;
type MessagesVi = typeof en;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends MessagesEn, MessagesVi {}
}
