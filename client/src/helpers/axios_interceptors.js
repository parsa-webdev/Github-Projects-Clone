import axios from "axios";

const refreshToken = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.get("api/auth/refreshtoken");
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

export default function createAxiosResponseInterceptor() {
  const interceptor = axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.log(
        `message: ${error.response.data.error.message}, status: ${error.response.status}`
      );
      if (
        error.response.status === 401 &&
        error.response.data.error.message === "jwt expired"
      ) {
        axios.interceptors.response.eject(interceptor);

        try {
          await refreshToken();
          return axios(error.config);
        } catch (err) {
          return Promise.reject(error);
        }
      } else {
        return Promise.reject(error);
      }
    }
  );
}
