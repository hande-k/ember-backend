// src/api/adminApi.ts
import { apiFetch } from "./fetchClient";

export const adminApi = {
  books: {
    list: () => apiFetch("/book/all"),
    get: (id: number) => apiFetch(`/book/${id}`),
    create: (data: any) => apiFetch("/book/create", { method: "POST", body: JSON.stringify(data) }),
    update: (id: number, data: any) => apiFetch(`/book/update/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    delete: (id: number) => apiFetch(`/book/delete/${id}`, { method: "DELETE" }),
  },
  genres: {
    list: () => apiFetch("/genre/all"),
    get: (id: number) => apiFetch(`/genre/${id}`),
    create: (data: { genreName: string }) => apiFetch("/genre/create", { method: "POST", body: JSON.stringify(data) }),
    delete: (id: number) => apiFetch(`/genre/delete/${id}`, { method: "DELETE" }),
  },
  bookGenres: {
    link: (data: { bookId: number, genreId: number, type: string }) =>
      apiFetch("/bookgenre/link", { method: "POST", body: JSON.stringify(data) }),
  },
  // ... analog für users, interactions, bookGenres
  users: {
    list: () => apiFetch("/user/all"),
    get: (id: number) => apiFetch(`/user/${id}`),
    create: (data: any) => apiFetch("/user/create", { method: "POST", body: JSON.stringify(data) }),
    update: (id: number, data: any) => apiFetch(`/user/update/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    delete: (id: number) => apiFetch(`/user/delete/${id}`, { method: "DELETE" }),
  },
  interactions: {
    list: () => apiFetch("/interaction/all"),
    delete: (id: number) => apiFetch(`/interaction/delete/${id}`, { method: "DELETE" }),
  },
  bookGenres: {
    list: () => apiFetch("/bookgenre/all"),
    link: (data: any) => apiFetch("/bookgenre/link", data),
    unlink: (id: number) => apiFetch(`/bookgenre/unlink/${id}`, { method: "DELETE" }),
  },
}
