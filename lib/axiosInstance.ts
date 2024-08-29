// src/utils/apiClient.js
import axios from "axios";
import { getSession } from "next-auth/react";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // API 기본 URL을 환경 변수로 설정
  // timeout: 10000, // 요청 타임아웃 설정 (10초)
  headers: {
    "Content-Type": "application/json",
    // "Authorization": `Bearer ${}`,
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  async (request) => {
    const session = (await getSession()) as any;
    if (session) {
      request.headers["Authorization"] = `Bearer ${session.id_token}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 오류 응답 처리 (예: 오류 메시지 표시)
    return Promise.reject(error);
  }
);

export default apiClient;
