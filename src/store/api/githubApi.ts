import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GitHubUser, GitHubSearchResponse } from '../../types/github';

export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com/',
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    searchUsers: builder.query<GitHubSearchResponse, string>({
      query: (searchTerm) => `search/users?q=${encodeURIComponent(searchTerm)}&per_page=30`,
      transformResponse: (response: GitHubSearchResponse) => response,
    }),
    getUserDetails: builder.query<GitHubUser, string>({
      query: (username) => `users/${username}`,
      providesTags: (result, error, username) => [{ type: 'User', id: username }],
    }),
  }),
});

export const { useSearchUsersQuery, useGetUserDetailsQuery, useLazySearchUsersQuery } = githubApi; 