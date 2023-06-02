import client from "./client";

export const uploadTrailer = async (formData, onUploadProgress) => {
  const token = localStorage.getItem("auth-token");
  // console.log(token);
  try {
    const { data } = await client.post("/movie/upload-trailer", formData, {
      headers: {
        token: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
      onUploadProgress: ({ loaded, total }) => {
        // axios property to tell the progress
        if (onUploadProgress)
          onUploadProgress(Math.floor((loaded / total) * 100)); // this will give int
      },
    });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};
