import { Metadata } from 'next';
import { Restaurant } from '@/views/Restaurant';

export const metadata: Metadata = {
  title: "Fine Dining Restaurant | Shyam Hotel & Restaurant Prayagraj",
  description: "Savor exquisite flavors at our fine dining restaurant in Civil Lines. Blending tradition and innovation for an unforgettable culinary experience.",
};

export default function RestaurantPage() {
  return <Restaurant />
}
