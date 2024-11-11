import { create } from 'zustand';
import { TokenModel, UserResponseModel } from '../../routes/Login/LoginModel';
import { persist } from 'zustand/middleware';

interface UserContext {
   token: TokenModel | null;
   user: UserResponseModel | null;
   business: UserResponseModel | null;
   setUser: (user: UserResponseModel) => void;
   setToken: (token: TokenModel) => void;
   setBusiness: (business: UserResponseModel) => void;
}

const useUserContext = create(
   persist<UserContext>(
      (set) => ({
         user: null,
         token: null,
         business: null,
         setToken: (token: TokenModel) => set((state) => ({ ...state, token })),
         setBusiness: (business: UserResponseModel) => set((state) => ({ ...state, business })),
         setUser: (user: UserResponseModel) => set((state) => ({ ...state, user })),
      }),
      {
         name: 'Auth',
      },
   ),
);

export default useUserContext;
