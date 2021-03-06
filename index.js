const axiosData = (axios, httpMethod) => async (...params) => {
  const response = await axios[httpMethod](...params);
  return response.data;
};

const setHeader = (axios) => (property, data) => {
  axios.defaults.headers.common[property] = data;
};

const setBaseURL = (axios) => (baseURL) => {
  axios.defaults.baseURL = baseURL;
};

const setToken = (axios) => (token, type = null) => {
  switch (type) {
    case "Paymentez":
      return (axios.defaults.headers.common["Auth-Token"] = token);

    case "Bearer":
      return (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`);

    default:
      return (axios.defaults.headers.common["Authorization"] = token);
  }
};

const axiosHelpers = (axios) => {
  const httpMethods = ["post", "get", "delete", "patch", "put"];

  httpMethods.forEach((httpMethod) => {
    axios[`$${httpMethod}`] = axiosData(axios, httpMethod);
  });

  axios.setHeader = setHeader(axios);
  axios.setBaseURL = setBaseURL(axios);
  axios.setToken = setToken(axios);

  return axios;
};

module.exports = axiosHelpers;
