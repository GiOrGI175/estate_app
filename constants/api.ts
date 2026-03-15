import db from '../lib/db.json';

import featuredDB from '../lib/featuredDB.json';

export const fetchApartaments = async () => {
  return db;
};

export const fetchFeatured = async () => {
  return featuredDB;
};
