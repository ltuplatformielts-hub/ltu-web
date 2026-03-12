import type { User } from "#/@types/user.type";
import { createBox } from "magos";

interface UserState {
  loading: "idle" | "loading" | "success" | "fail";
  message: string;
  user: User;
}

const initialState = {
  message: "",
  loading: "idle",
  user: {
    wpUserId: null,
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    role: "STUDENT",
    img: null,
    username: "",
    id: null,
    createdAt: "",
    updatedAt: "",
    fullName: "",
  },
} satisfies UserState as UserState;

export const userBox = createBox(initialState, (set) => ({
  setUser: (data: UserState) => set((prev) => ({ ...prev, ...data })),
  setLoading: (state: UserState["loading"]) =>
    set((prev) => ({ ...prev, loading: state })),
}));
