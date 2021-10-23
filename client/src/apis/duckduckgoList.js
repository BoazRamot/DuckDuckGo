import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const BASE_URL = 'http://localhost:5000/api/duckduckgo';

export const getDuckduckgoList = createAsyncThunk(
  'duckduckgo/getDuckduckgoList',
  async (q) => {
    const data = await axios({
      method: 'get',
      url: `${BASE_URL}/getList`,
      params: { q },
    });
    return data.data;
  },
);

export const getDuckduckgoPersistList = createAsyncThunk(
  'duckduckgo/getDuckduckgoPersistList',
  async (q) => {
    const data = await axios({
      method: 'post',
      url: `${BASE_URL}/persist`,
      data: { q },
    });
    return { data: data.data, query: q };
  },
);

export const getDuckduckgoQueriesList = createAsyncThunk(
  'duckduckgo/getDuckduckgoQueriesList',
  async () => {
    const data = await axios({
      method: 'get',
      url: `${BASE_URL}/getPersistList`,
    });
    return data.data.toString().split('*@*');
  },
);
