import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const getAppInfo = async () => {
  try {
    const token = getToken();
    const { data } = await client("/admin/app-info", {
      headers: {
        token: "Bearer " + token,
      },
    });

    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getMostRatedMovies = async () => {
  try {
    const token = getToken();
    const { data } = await client("/admin/most-rated", {
      headers: {
        token: "Bearer " + token,
      },
    });

    return data;
  } catch (error) {
    return catchError(error);
  }
};
