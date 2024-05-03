import axios from "axios";
import { BaseUrl } from "@/utils/api-routes";
import { getToken } from "./localStorage";

const httpService = () => {
  const token = getToken();
  let headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods":
      "GET, POST, HEAD, OPTIONS, PUT, DELETE, PATCH",
    "Access-Control-Allow-Headers":
      "Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token, Origin",
    "ngrok-skip-browser-warning": true,
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return axios.create({
    baseURL: BaseUrl,
    headers,
  });
};

export const get = async (url) => {
  const response = await httpService().get(url);
  return response.data;
};

export const post = async (url, body) => {
  const response = await httpService().post(url, body);
  return response.data;
};

export const put = async (url, body) => {
  const response = await httpService().put(url, body);
  return response.data;
};

export const patch = async (url, body) => {
  const response = await httpService().patch(url, body);
  return response.data;
};

export const del = async (url, body) => {
  const response = await httpService().delete(url, body);
  return response.data;
};
