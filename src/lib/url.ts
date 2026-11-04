// Build a link that works whatever folder the site is deployed in.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const u = (p = '') => `${BASE}/${p.replace(/^\//, '')}`;
