// TODO: Refactor apiService function into files separated by module

import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.API,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  getLabResults() {
    return apiClient.get("/lab");
  },
  getPackages() {
    return apiClient.get("/packages");
  },
  getStock() {
    return apiClient.get("/stock");
  },
  getOrders() {
    return apiClient.get("/orders");
  },
  getOrder(id) {
    return apiClient.get(`/orders/${id}`);
  },
  getCustomers() {
    return apiClient.get("/customers");
  },
  getCustomer(id) {
    return apiClient.get(`/customers/${id}`);
  },
  getFacilities() {
    return apiClient.get("/facilities");
  },
  getFacility(id) {
    return apiClient.get(`/customers/facilities/${id}`);
  },
  getFacilitiesByCustomer(id) {
    return apiClient.get(`/customers/${id}/facilities`);
  },
  getLineItems(ids) {
    return apiClient.get(`/line-items?${ids}`);
  },
  getLineItem(id) {
    return apiClient.get(`/line-items/${id}`);
  },
  postCustomer(customer) {
    console.log("postCustomer is being called within apiService");
    console.log(customer);
    return apiClient.post("/customers", customer);
  },
  postFacility(facility) {
    return apiClient.post("/customers/facilities", facility);
  },
  getStockById(id) {
    return apiClient.get(`/stock/${id}`);
  },
  postStock(stock) {
    return apiClient.post("/stock", stock);
  },

  async postOrder(order) {
    console.log("postOrder is being called within apiService");
    console.log(order);
    return apiClient.post("/orders", order);
  },

  async postLineItems(lineItems) {
    let newItem = await apiClient.post("/line-items", lineItems);
    console.log(newItem);
    return newItem;
  },
  // // putStock is incomplete. Most likely replace with patch
  // putStock(stockUpdate) {
  //   return apiClient.put(`/stock/${stockUpdate.id}/update`, stockUpdate);
  // },

  patchStock(stockPatch) {
    return apiClient.patch(`/stock/${stockPatch.id}/update`, stockPatch);
  },

  async getLineItemsByOrderId(orderId) {
    let lineItems = await apiClient.get(`/line-items/order/${orderId}`);
    return lineItems;
  },

  async changeLineItemStatus(id, status) {
    console.log(status);
    let statusChange = await apiClient.patch(
      `/line-items/${id}/update`,
      status
    );
    console.log(statusChange);
    return statusChange;
  },

  async patchOrderStatus(id, status) {
    let statusChange = await apiClient.patch(`/orders/${id}/update`, status);
    console.log("statusChange " + statusChange);
    return statusChange;
  },

  async deleteOrder(id) {
    await apiClient.delete(`orders/${id}`).then(response => {
      console.log(response);
      return response;
    });
  }
};
