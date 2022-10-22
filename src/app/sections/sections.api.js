export default class SectionsAPI {
  static async getAll() {
    const resp = await fetch("http://localhost:3000/sections", {
      method: "GET",
    });

    const data = await resp.json();

    return data;
  }
}
