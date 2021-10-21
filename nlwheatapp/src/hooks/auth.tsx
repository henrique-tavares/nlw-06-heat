import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as AuthSessions from 'expo-auth-session';
import { api } from "../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLIENT_ID = '27f81c67321d70bd8086';
const SCOPE = 'read:user';
const USER_STORAGE = '@nlwheat:user';
const TOKEN_STORAGE = '@nlwheat:token';

type User = {
  id: string,
  avatar_url: string,
  name: string,
  login: string;
};

type AuthContextData = {
  user: User | null;
  isSigningIn: boolean,
  signIn: () => Promise<void>,
  signOut: () => Promise<void>;
};

type AuthResponse = {
  token: string,
  user: User;
};

type AuthorizationResponse = {
  params: {
    code?: string;
    error?: string;
  };
  type?: string;
};

const AuthContext = createContext({} as AuthContextData);

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {

  const [ user, setUser ] = useState<User | null>(null);
  const [ isSigningIn, setIsSigningIn ] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(USER_STORAGE).then(response => {
      if (response) {
        setUser(JSON.parse(response));
      }
    });

    AsyncStorage.getItem(TOKEN_STORAGE).then(response => {
      if (response) {
        api.defaults.headers.common[ 'Authorization' ] = `Bearer ${response}`;
      }
    });
  }, []);

  async function signIn() {
    try {
      setIsSigningIn(true);

      const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;

      const authSessionResponse = await AuthSessions.startAsync({ authUrl }) as AuthorizationResponse;

      if (authSessionResponse.type === 'success' && authSessionResponse.params.error !== 'access_denied') {
        const authResponse = await api.post<AuthResponse>('authenticate', { code: authSessionResponse.params.code });
        const { token, user } = authResponse.data;

        api.defaults.headers.common[ 'Authorization' ] = `Bearer ${token}`;
        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
        await AsyncStorage.setItem(TOKEN_STORAGE, token);

        setUser(user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSigningIn(false);
    }
  }

  async function signOut() {
    setUser(null);
    await AsyncStorage.removeItem(USER_STORAGE);
    await AsyncStorage.removeItem(TOKEN_STORAGE);
  }

  return (
    <AuthContext.Provider value={ {
      user,
      isSigningIn,
      signIn,
      signOut
    } }>
      { children }
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}