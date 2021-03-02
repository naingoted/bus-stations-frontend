import axios from "axios";

export const getUpDownApi = async (setData, setServerError, setLoading) => {
  var data = JSON.stringify({
    api_key: process.env.NEXT_PUBLIC_ENV_UTR,
    format: "json",
    limit: "5",
    offset: "5",
  });

  var config = {
    method: "post",
    url: "https://api.uptimerobot.com/v2/getMonitors",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    setLoading(true);
    const response = await axios(config);
    if (response.data.stat == "fail") {
      setServerError(response.data.error.message);
    } else {
      setData(response.data);
    }
    setLoading(false);
  } catch {
    setLoading(false);
    setServerError("Server Error");
  }
  // END: Challenge #5: Server Error
};

export const doLogin = async (setData, setServerError, setLoading) => {
  
}

// default export for mocking convenience
export default {
  getUpDownApi,
};
