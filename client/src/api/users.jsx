import axios from "axios";

const url = "http://localhost:8080/api";

export default class UsersApi {
  ///new Login
  static async login(data) {
    try {
      const res = await axios.post(`${url}/user/admin/login`, data);
      return res.data;
    } catch (error) {
      console.error(error);
      return "Error";
    }
  }
  static async data(i) {
    try {
      const res = await axios.get(`${url}${i}`);
      return res.data;
    } catch (error) {
      console.error(error);
      return "Error";
    }
  }
  static async post(i, data) {
    try {
      const res = await axios.post(`${url}${i}`, data);
      return res.data;
    } catch (error) {
      console.log(error);
      return "Error";
    }
  }
}
