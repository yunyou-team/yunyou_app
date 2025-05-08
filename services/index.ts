import request from "@/utils/request";

interface IExampleInfo {
  info: string;
}

export async function fetchExampleInfo(): Promise<IExampleInfo> {
  const { data } = await request.post<IExampleInfo>("/example/info", {});
  return data;
}
