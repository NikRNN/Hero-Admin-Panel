import { v4 as uuidv4 } from "uuid";

export const useHttp = () => {
  const request = async (
    url,
    method = "GET",
    body = null,
    headers = { "Content-Type": "application/json" }
  ) => {
    try {
      const response = await fetch(url, { method, body, headers });

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = await response.json();

      if (url === "http://localhost:3001/filters") {
        return data.map((item) => ({ ...item, id: uuidv4() }));
      }

      return data;
    } catch (e) {
      throw e;
    }
  };

  return {
    request,
  };
};
