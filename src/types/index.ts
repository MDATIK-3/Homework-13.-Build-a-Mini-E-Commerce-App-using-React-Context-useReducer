export type Theme = "light" | "dark";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
};

export type User = {
  username: string;
  email: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
};

export type CartState = {
  items: CartItem[];
};

export type ThemeState = {
  theme: Theme;
};

export type AuthAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" };

export type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" };

export type ThemeAction = { type: "TOGGLE_THEME" };

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: { rate: number; count: number };
};
