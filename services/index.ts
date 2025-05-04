import request from "@/utils/request";

interface IExampleInfo {
  info: string;
}

export async function fetchExampleInfo(): Promise<IExampleInfo> {
  const { data } = await request.post<IExampleInfo>("/example/info", {});
  return data;
}

export async function fetchMyTrip(): Promise<ITrips[]> {
  const { data } = await request.post<ITrips[]>("/trips/user", {});
  return data;
}
