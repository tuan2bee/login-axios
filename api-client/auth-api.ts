import { LoginPayload, ProductPayload } from "@/models";
import axiosClient from "./axios-client";

export const authApi = {
  login(payload: LoginPayload) {
    return axiosClient.post("/login", payload);
  },

  addProduct(payload: ProductPayload) {
    return axiosClient.post("/products", payload);
  },

  editProduct(payload: ProductPayload, id: string) {
    return axiosClient.put("/products/" + id, payload);
  },

  deleteProduct(id: string) {
    return axiosClient.delete("/products/" + id);
  },

  logout() {
    return axiosClient.post("/logout");
  },

  getProfile(tabSelect: string) {
    return axiosClient.get("/products?category=" + tabSelect);
  },
};
