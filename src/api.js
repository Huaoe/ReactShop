import axios from "axios";

export default {
  items: {
    fetchAll: () => axios.get("/api/authgames").then(res => res.data.games),
    fetchById: id =>
      axios.get(`/api/authgames/${id}`).then(res => res.data.game),
    create: game =>
      axios.post("/api/authgames", { game }).then(res => res.data.game),
    update: game =>
      axios
        .put(`/api/authgames/${game._id}`, { game })
        .then(res => res.data.game),
    delete: game => axios.delete(`/api/authgames/${game._id}`)
  },
  publishers: {
    fetchAll: () =>
      axios.get("/api/unsafepublishers").then(res => res.data.publishers),
    create: publisher =>
      axios
        .post("/api/unsafepublishers", { publisher })
        .then(res => res.data.publisher),
    update: publisher =>
      axios
        .put(`/api/unsafepublishers/${publisher._id}`, { publisher })
        .then(res => res.data.publisher),
    delete: publisher => axios.delete(`/api/unsafepublishers/${publisher._id}`)
  },
  users: {
    create: user => axios.post("api/users", { user }),
    login: credentials =>
      axios.post("/api/auth", { credentials }).then(res => res.data.token)
  }
};
