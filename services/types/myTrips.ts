interface ITripItem {
  tripId: number;
  tripName: string;
  location: Array<string>;
  coverImage: null;
  creatorId: number;
  createdAt: number;
  updatedAt: number;
}

interface IParticipants {
  uid: number;
  avatar: string;
}

interface ITrips {
  trip: ITripItem;
  participants: IParticipants[];
}
