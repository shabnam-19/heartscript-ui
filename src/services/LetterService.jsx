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

export async function sendLetterByEmail(token, recipientEmail) {
    const response = await api.post(`/api/v1/letters/share/${encodeURIComponent(token)}/email`, {
        recipientEmail: recipientEmail.trim()
    });
    return response.data;
}

export function extractShareToken(shareUrl) {
    if (!shareUrl || typeof shareUrl !== "string") return "";
    try {
        const trimmed = shareUrl.trim();
        const cleanUrl = trimmed.split("?")[0].split("#")[0].replace(/\/+$/, "");
        const segments = cleanUrl.split("/").filter(Boolean);
        const letterIndex = segments.lastIndexOf("letter");
        if (letterIndex !== -1 && segments[letterIndex + 1]) {
            return segments[letterIndex + 1];
        }
        return segments[segments.length - 1] || "";
    } catch {
        return "";
    }
}