import db from '../lib/db.json';

import featuredDB from '../lib/featuredDB.json';

export const fetchApartaments = async () => {
  return db;
};

export const fetchFeatured = async () => {
  return featuredDB;
};

export const fetchApartamentId = async (id: number) => {
  const apartment = db.find((item) => item.id === id);
  return apartment ?? null;
};
