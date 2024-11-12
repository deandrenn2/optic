import { create } from 'zustand';
import { TokenModel, UserResponseModel } from '../../routes/Login/LoginModel';
import { persist } from 'zustand/middleware';
import { BusinessResponseModel } from '../../routes/Businesses/BusinessModel';

interface UserContext {
   token: TokenModel | null;
   user: UserResponseModel | null;
   business: BusinessResponseModel | null;
   isAuthenticated: boolean;
   setIsAuthenticated: (isAuthenticated: boolean) => void;
   setUser: (user: UserResponseModel) => void;
   setToken: (token: TokenModel) => void;
   setBusiness: (business: BusinessResponseModel) => void;
}

const useUserContext = create(
   persist<UserContext>(
      (set) => ({
         user: null,
         token: null,
         business: null,
         isAuthenticated: false,
         setIsAuthenticated: (isAuthenticated: boolean) => set((state) => ({ ...state, isAuthenticated })),
         setToken: (token: TokenModel) => set((state) => ({ ...state, token })),
         setBusiness: (business: BusinessResponseModel) => set((state) => ({ ...state, business })),
         setUser: (user: UserResponseModel) => set((state) => ({ ...state, user })),
      }),
      {
         name: 'Auth',
      },
   ),
);

export default useUserContext;
