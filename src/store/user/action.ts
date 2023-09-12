import { create } from "zustand";
import { UserStateStore, userStateStore } from "./state";

export interface UserActionStore {
  login: () => void;
}

export const useUserStore = create<UserStateStore & UserActionStore>()(() => ({
  ...userStateStore,
  login: () => {
    console.log("login");
  }
}));
