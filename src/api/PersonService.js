import api from "./httpClient";

class PersonService {
  async getPersons(page, filterBy, filter) {
    let url = `/character?page=${page}`
    if (filterBy) {
      url += `&${filterBy}=${filter}`
    }
    const { data } = await api.get(url)
    return {
      data: data.results,
      pages: data.info.pages
    }
  }
}

const personService = new PersonService()
export default personService