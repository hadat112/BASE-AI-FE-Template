import ApiClient from "@/libs/ApiClient";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const api = new ApiClient(BASE_URL).getInstance();
