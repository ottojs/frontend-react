import axios, { CanceledError } from "axios";
import { ApiRequest } from "../types";

// https://github.com/axios/axios
axios.defaults.withCredentials = true;
const apiClient = axios.create({
  // We set this later on to allow flexibility
  // baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000,
  // method: "POST",
  headers: {
    Accept: "application/json",
    // Authorization: "token",
  },
});

// Axios Response object has:
// config, data, headers, request, status, statusText
class HttpService {
  baseURL: string;
  endpoint: string;

  constructor(endpoint: string, baseURL: string) {
    this.baseURL = baseURL;
    this.endpoint = endpoint;
  }

  // <T extends ApiRequest>
  create<T>(entity: T) {
    const controller = new AbortController();
    const request = apiClient.post(this.endpoint, entity, {
      signal: controller.signal,
      baseURL: this.baseURL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  list<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T>(this.endpoint, {
      signal: controller.signal,
      baseURL: this.baseURL,
      headers: {
        Accept: "application/json",
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  read<T extends ApiRequest>(entity: T) {
    const controller = new AbortController();
    const request = apiClient.get(this.endpoint + "/" + entity.id, {
      signal: controller.signal,
      baseURL: this.baseURL,
      headers: {
        Accept: "application/json",
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  patch<T extends ApiRequest>(entity: T) {
    const controller = new AbortController();
    const request = apiClient.patch(this.endpoint + "/" + entity.id, entity, {
      signal: controller.signal,
      baseURL: this.baseURL,
      headers: {
        Accept: "application/json",
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  delete<T extends ApiRequest>(entity: T) {
    const controller = new AbortController();
    const request = apiClient.delete(this.endpoint + "/" + entity.id, {
      signal: controller.signal,
      baseURL: this.baseURL,
      headers: {
        Accept: "application/json",
      },
    });
    return { request, cancel: () => controller.abort() };
  }
}

function create(
  endpoint: string,
  baseURL: string = import.meta.env.VITE_API_URL,
) {
  return new HttpService(endpoint, baseURL);
}

// Services
const userService = create("/v0/users");
const sessionService = create("/v0/sessions");
const accountService = create("/v0/accounts");
const taskService = create("/v0/tasks");

// Exports
export {
  CanceledError,
  userService,
  sessionService,
  accountService,
  taskService,
};
