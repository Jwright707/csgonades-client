import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.csgonades.com"
    : "http://localhost:5000";

type TokenRes = {
  accessToken: string;
};

export class TokenApi {
  static async refreshToken(): Promise<string> {
    const res = await axios.get<TokenRes>(`${BASE_URL}/auth/refresh`, {
      withCredentials: true
    });
    return res.data.accessToken;
  }

  static async setSessionCookie(): Promise<void> {
    await axios.post(`${BASE_URL}/initSession`, {}, { withCredentials: true });
  }
}
