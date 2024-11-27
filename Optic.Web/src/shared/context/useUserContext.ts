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
   setUser: (user: UserResponseModel | null) => void;
   setToken: (token: TokenModel | null) => void;
   setBusiness: (business: BusinessResponseModel | null) => void;
}

const useUserContext = create(
   persist<UserContext>(
      (set) => ({
         user: null,
         token: null,
         business: null,
         isAuthenticated: false,
         setIsAuthenticated: (isAuthenticated: boolean) => set((state) => ({ ...state, isAuthenticated })),
         setToken: (token: TokenModel | null) => set((state) => ({ ...state, token })),
         setBusiness: (business: BusinessResponseModel | null) => set((state) => ({ ...state, business })),
         setUser: (user: UserResponseModel | null) => set((state) => ({ ...state, user })),
      }),
      {
         name: 'Auth',
      },
   ),
);

export default useUserContext;
