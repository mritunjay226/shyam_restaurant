import { Metadata } from 'next';
import { Rooms } from '@/views/Rooms';

export const metadata: Metadata = {
  title: "Luxury Rooms & Suites | Shyam Hotel & Restaurant Prayagraj",
  description: "Book our premium rooms and suites in Lukerganj, Prayagraj. 17 meticulously designed spaces with modern amenities and 5-star hospitality.",
};

export default function RoomsPage() {
  return <Rooms />
}
