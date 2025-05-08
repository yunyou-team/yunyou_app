import request from "@/utils/request";

interface ITripItem {
  tripId: number;
  tripName: string;
  location: Array<string>;
  coverImage: null;
  creatorId: number;
  createdAt: number;
  updatedAt: number;
  tripStartTime: number;
  tripEndTime: number;
}

interface IParticipants {
  uid: number;
  avatar: string;
}

export interface ITrips {
  trip: ITripItem;
  participants: IParticipants[];
}

export async function fetchMyTrip(): Promise<ITrips[]> {
  const { data } = await request.post<ITrips[]>("/trips/user", {});
  return data;
}
