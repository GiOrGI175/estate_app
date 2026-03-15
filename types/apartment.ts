export type Agent = {
  name: string;
  role: string;
  avatar: string;
};

export type Apartment = {
  id: number;
  title: string;
  type: string;
  rating: number;
  reviews: number;
  price: number;
  address: string;
  beds: number;
  bath: number;
  sqft: number;
  overview: string;
  image: string;
  gallery: string[];
  agent: Agent;
  facilities: string[];
};
