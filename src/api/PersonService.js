import api from "./httpClient";

class PersonService {
  async getPersons(page, filterBy, filter) {
    try {
      let url = `/character?page=${page}`
      if (filterBy) {
        url += `&${filterBy}=${filter}`
      }
      const { data } = await api.get(url)
      return {
        data: data.results,
        pages: data.info.pages
      }
    } catch(e) {
      return {
        data: [],
        pages: 1
      }
    }  
  }
}

const personService = new PersonService()
export default personService