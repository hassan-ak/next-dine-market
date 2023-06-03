'use client';

import React, { SetStateAction, useState } from 'react';
import { createContext } from 'react';

export type DineMarket = {
  cartItems: number;
};

type DineMarketContextType = {
  cartItems: number;
  incCartItems: (params: number) => void;
  decCartItems: (params: number) => void;
  setCartItems: React.Dispatch<React.SetStateAction<number>>;
  nbFetchCompleted: boolean;
  setNbFetchCompleted: React.Dispatch<React.SetStateAction<boolean>>;
};

type DineMarketContextProviderProps = {
  children: React.ReactNode;
};

export const DineMarketContext = createContext<DineMarketContextType | null>(
  {} as DineMarketContextType
);

export const DineMarketContextProvider = ({
  children,
}: DineMarketContextProviderProps) => {
  const [cartItems, setCartItems] = useState(0);
  const [nbFetchCompleted, setNbFetchCompleted] = useState(false);

  function incCartItems(params: number) {
    let prev: number = Number(cartItems);
    setCartItems(prev + params);
  }

  function decCartItems(params: number) {
    let prev: number = Number(cartItems);
    setCartItems(prev - params);
  }

  return (
    <DineMarketContext.Provider
      value={{
        cartItems,
        incCartItems,
        setCartItems,
        decCartItems,
        nbFetchCompleted,
        setNbFetchCompleted,
      }}
    >
      {children}
    </DineMarketContext.Provider>
  );
};
