import axios from "axios";
import { baseURL } from "../utils/utils";

export const publicAPI = axios.create({ baseURL });
