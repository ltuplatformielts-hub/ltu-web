import { createStore } from "magos";
import { menuBox } from "./boxes/menu.box";
import { userBox } from "./boxes/user.box";
export const store = createStore({
  menu: menuBox,
  user: userBox,
});
