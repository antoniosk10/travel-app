/* eslint-disable class-methods-use-this */
import http from 'http-common';

class PlaceDataService {
  getAll() {
    return http.get('/places');
  }

  get(id) {
    return http.get(`/places/${id}`);
  }

  create(data) {
    return http.post('/places', data);
  }

  update(id, data) {
    return http.put(`/places/${id}`, data);
  }

  delete(id) {
    return http.delete(`/places/${id}`);
  }

  deleteAll() {
    return http.delete('/places');
  }

  findByTitle(title) {
    return http.get(`/places?title=${title}`);
  }
}

export default new PlaceDataService();
