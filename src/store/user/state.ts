export interface UserStateStore {
  isLogged: boolean;
  userInfo: Record<string, any> | null;
}

export const userStateStore: UserStateStore = {
  isLogged: true,
  userInfo: null
};
