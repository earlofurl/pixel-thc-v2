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
    return apiClient.get("/customers/facilities");
  },
  getFacility(id) {
    return apiClient.get(`/customers/facilities/${id}`);
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
    console.log("postLineItems being called within PostOrder apiService");
    for (let item in order.lineItems) {
      console.log(`Item #${item} is: ${order.lineItems[item]}`);
      await this.postLineItems(order.lineItems[item]).then(res => {
        console.log(res);
        order.lineItems[item] = res.data;
      });
    }
    // console.log(order.lineItems[0]); // TODO: going to need to deal with Array programmatically

    // // console.log("This is the order being posted: ");
    // // console.log(order);
    return apiClient.post("/orders", order);
  },
  async postLineItems(lineItems) {
    let newItem = await apiClient.post("/lineItems", lineItems);
    console.log(newItem);
    return newItem;
  },
  // putStock is incomplete. Most likely replace with patch
  putStock(stockUpdate) {
    return apiClient.put(`/stock/${stockUpdate.id}/update`, stockUpdate);
  }
};
