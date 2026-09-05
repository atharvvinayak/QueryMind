import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export async function uploadDataset(file: File) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    "/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

export async function askQuestion(
  datasetId: string,
  question: string
) {
  const response = await api.post("/ask", {
    dataset_id: datasetId,
    question,
  });

  return response.data;
}