import React, { createContext, useContext, useEffect, useReducer } from 'react';

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'init':
      return action.payload || [];
    case 'add': {
      const existing = state.find((i) => i.id === action.payload.id);
      if (existing) {
        // replace quantity with payload.qty (we keep it fixed at 5)
        return state.map((i) => i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i);
      }
      return [...state, action.payload];
    }
    case 'update':
      return state.map((i) => i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i);
    case 'remove':
      return state.filter((i) => i.id !== action.payload.id);
    case 'clear':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    const raw = localStorage.getItem('cart');
    if (raw) dispatch({ type: 'init', payload: JSON.parse(raw) });
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const addItem = (item) => dispatch({ type: 'add', payload: item });
  const updateItem = (id, qty) => dispatch({ type: 'update', payload: { id, qty } });
  const removeItem = (id) => dispatch({ type: 'remove', payload: { id } });
  const clear = () => dispatch({ type: 'clear' });

  return (
    <CartContext.Provider value={{ items: state, addItem, updateItem, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}

export default CartContext;
