import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const createActor = async (formData) => {
  // console.log(formData)
  const token = getToken();
  try {
    const { data } = await client.post("/actor/create", formData, {
      headers: {
        token: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const updateActor = async (id, formData) => {
  const token = getToken();
  try {
    const { data } = await client.post("/actor/update/" + id, formData, {
      headers: {
        token: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};
export const deleteActor = async (id) => {
  const token = getToken();
  try {
    const { data } = await client.delete("/actor/" + id, {
      headers: {
        token: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const searchActor = async (query) => {
  const token = getToken();
  try {
    const { data } = await client(`/actor/search?name=${query}`, {
      headers: {
        token: "Bearer " + token,
      },
    });
    // console.log(data);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const getActors = async (pageNo, limit) => {
  const token = getToken();
  try {
    const { data } = await client(
      `/actor/actors?pageNo=${pageNo}&limit=${limit}`,
      {
        headers: {
          token: "Bearer " + token,
          "content-type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const getActorProfile = async (id) => {
  try {
    const { data } = await client(`/actor/single/${id}`);
    return data;
  } catch (error) {
    return catchError(error);
  }
};
