import { Metadata } from 'next';
import { Banquet } from '@/views/Banquet';

export const metadata: Metadata = {
  title: "Elegant Banquet Halls | Shyam Hotel & Restaurant Prayagraj",
  description: "Celebrate your special moments in our 4 distinctive banquet venues. Perfect for weddings, corporate events, and grand celebrations in Prayagraj.",
};

export default function BanquetPage() {
  return <Banquet />
}
