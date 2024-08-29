import axiosInstance from "@/lib/axiosInstance";

export const createUser = async (params: any) => {
  const response = await axiosInstance.post("users/", params);
  return response.data;
};

export const updateUser = async (userId: string, params: any) => {
  const response = await axiosInstance.put("users/" + userId, params);
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axiosInstance.delete("users/" + userId);
  return response.data;
};
