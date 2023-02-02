import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8800/api" }),
  endpoints: (build) => ({
    fetchAllUsers: build.query({
      query: () => ({
        url: "users",
        method: "GET",
      }),
    }),
    fetchCountGames: build.query({
      query: () => ({
        url: "games",
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchAllUsersQuery, useFetchCountGamesQuery } = userApi;
