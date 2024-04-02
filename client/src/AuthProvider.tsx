import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { BACKEND_URL } from "./constants";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Routes } from "./routes";

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
}

interface DecodedToken extends AuthUser {
  sub: string;
  exp: number;
}

interface AuthContextProps {
  user: AuthUser | undefined;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<AuthUser | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    toast.loading("Logging in...");
    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      const decoded = jwtDecode(data.access_token) as DecodedToken;

      Cookies.set("access_token", data.access_token, {
        expires: new Date(decoded.exp * 1000),
      });

      setUser({
        id: decoded.sub,
        email: decoded.email,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        photo: decoded.photo,
      });

      console.log("[AuthProvider] Login successful:", data);
      toast.dismiss();
      toast.success("Logged in successfully!");
      router.push(Routes.HOME);
    } else {
      console.error("[AuthProvider] Login failed:", data.message);
      toast.dismiss();
      toast.error(`Could not log in - ${data.message}`);
    }
  };

  const logout = () => {
    Cookies.remove("access_token");
    setUser(undefined);
    console.log("[AuthProvider] Logged out");
    toast.success("Logged out successfully!");
    router.push(Routes.HOME);
  };

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    toast.loading("Registering...");
    const response = await fetch(`${BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log("[AuthProvider] Register successful:", data);
      toast.dismiss();
      toast.success("Registered successfully!");
      router.push(Routes.LOGIN);
    } else {
      console.error("[AuthProvider] Register failed:", data.message);
      toast.dismiss();
      toast.error(`Could not register - ${data.message}`);
    }
  };

  const contextValue = useMemo<AuthContextProps>(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
    }),
    [user, loading, login, logout]
  );

  useEffect(() => {
    setLoading(true);
    const token = Cookies.get("access_token");
    if (token) {
      try {
        const decoded = jwtDecode(token) as DecodedToken;
        setUser({
          id: decoded.sub,
          email: decoded.email,
          firstName: decoded.firstName,
          lastName: decoded.lastName,
          photo: decoded.photo,
        });
      } catch (error) {
        console.error("[AuthProvider] Failed to decode JWT", error);
      }
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
