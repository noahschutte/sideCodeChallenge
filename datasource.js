const { RESTDataSource } = require('apollo-datasource-rest')

class SimplyRETSAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.simplyrets.com/';
  }

  async getAllListings(filter) {
    const headers = {
      'Authorization': 'Basic c2ltcGx5cmV0czpzaW1wbHlyZXRz'
    }
    let query
    if (filter) {
      query = JSON.parse(filter)
    }
    let params = {}
    if (query && query.city) {
        params.cities = query.city
    }
    const result = await this.get(
        'properties',
        params,
        { headers }
    );
    return result
  }
};

module.exports = SimplyRETSAPI