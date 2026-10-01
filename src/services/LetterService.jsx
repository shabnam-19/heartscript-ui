import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"
});

export async function generateLetter(data) {
    const response = await api.post("/api/v1/letters", data);
    return response.data;
}

export async function getLetterById(id) {
    const response = await api.get(`/api/v1/letters/${id}`);
    return response.data;
}

export async function getAllLetters() {
    const response = await api.get("/api/v1/letters");
    return response.data;
}