/* eslint-disable class-methods-use-this */
import http from 'http-common';

class CountryDataService {
  getAll() {
    return http.get('/countries');
  }

  get(id) {
    return http.get(`/countries/${id}`);
  }

  create(data) {
    return http.post('/countries', data);
  }

  update(id, data) {
    return http.put(`/countries/${id}`, data);
  }

  delete(id) {
    return http.delete(`/countries/${id}`);
  }

  deleteAll() {
    return http.delete('/countries');
  }

  findByTitle(title) {
    return http.get(`/countries?title=${title}`);
  }
}

export default new CountryDataService();
