import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const token = await refreshToken(
          localStorage.getItem("refreshToken") as string
        );
        localStorage.setItem("accessToken", token?.data?.access?.token);
        localStorage.setItem("refreshToken", token?.data?.refresh?.token);
        localStorage.setItem("expirationTime", token?.data?.access?.expires);
        originalRequest.headers.Authorization = `Bearer ${token?.data?.access?.token}`;
        return axios(originalRequest);
      } catch (error) {
        console.error("Token refresh failed:", error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/";
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export const refreshToken = (refreshToken: string) => {
  return axios.post(
    `${api_url}/v1/auth/refresh`,
    { refreshToken },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const loginUserDetails = (userDetails: any) => {
  return axios.post(`${api_url}/v1/auth/login`, userDetails);
};

export const getCreatorStats = (accessToken: string) => {
  return axios.get(`${api_url}/v1/creator/stats`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

export const logout = (accessToken: string) => {
  return axios.get(`${api_url}/v1/auth/logout`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

export const getWalletHoldingsData = (
  accessToken: string,
  interval: number
) => {
  return axios.get(
    `${api_url}/v1/creator/users-ton-balance-series?days=${interval}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const getCreatorGroupsData = (accessToken: string) => {
  return axios.get(`${api_url}/v1/creator/groups`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

export const getTransactionData = (
  accessToken: string,
  filter: string,
  page: number
) => {
  let url = `${api_url}/v1/creator/transactions?page=${page}&limit=10`;
  if (filter && filter !== "All") {
    url = `${api_url}/v1/creator/transactions?currency=${filter}&page=${page}&limit=10`;
  }
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

export const getTransactionBreakdownData = (accessToken: string) => {
  return axios.get(
    `${api_url}/v1/creator/transaction-breakdown-series?days=7`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const getPreLoginStats = () => {
  return axios.get(`${api_url}/v1/stats`);
};
