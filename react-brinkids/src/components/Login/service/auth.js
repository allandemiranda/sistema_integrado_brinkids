import jwt from 'jsonwebtoken';
import axios from 'axios';
import config from './config';

export const TOKEN_KEY = "@airbnb-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token =>
    localStorage.setItem(TOKEN_KEY, token);

export const logout = () =>
    localStorage.removeItem(TOKEN_KEY);

