import axios from "axios";

export const fetchAnalysisData = async serviceData => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/api/data`,
    serviceData
  );
  return data;
};
