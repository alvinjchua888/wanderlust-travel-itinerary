import restaurant1 from "@assets/stock_images/elegant_restaurant_d_415ce9f8.jpg";
import restaurant2 from "@assets/stock_images/elegant_restaurant_d_8c0ac66d.jpg";
import restaurant3 from "@assets/stock_images/elegant_restaurant_d_059275d3.jpg";
import attraction1 from "@assets/stock_images/tourist_attraction_l_1c90c7b6.jpg";
import attraction2 from "@assets/stock_images/tourist_attraction_l_8cab4aa7.jpg";
import attraction3 from "@assets/stock_images/tourist_attraction_l_f2e44dba.jpg";

const restaurantImages = [restaurant1, restaurant2, restaurant3];
const attractionImages = [attraction1, attraction2, attraction3];

export function getLocationImage(type: "restaurant" | "attraction" | "transport", id: string): string | undefined {
  if (type === "transport") {
    return undefined;
  }
  const images = type === "restaurant" ? restaurantImages : attractionImages;
  const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return images[hash % images.length];
}
