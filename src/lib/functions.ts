// Modules
import { Location } from "react-router-dom";

export function getDestination(page: string, location: Location) {
  const next = location.pathname;
  const query = location.search.substring(1, location.search.length);
  let destination = page + "?next=" + encodeURIComponent(next);
  if (query.length > 0) {
    destination += "&query=" + encodeURIComponent(query);
  }
  return destination;
}
