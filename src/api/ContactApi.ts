import axios from "axios";
import { ok } from "neverthrow";
import { ConctactDTO } from "../models/Contact";
import { AppResult, extractApiError } from "../utils/ErrorUtil";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.csgonades.com"
    : "http://localhost:5000";

export class ContactApi {
  static async sendMessage(message: ConctactDTO): AppResult<boolean> {
    try {
      await axios.post(`${BASE_URL}/contact`, message);
      return ok(true);
    } catch (error) {
      return extractApiError(error);
    }
  }
}
