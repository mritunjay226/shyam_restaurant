import { Metadata } from 'next';
import { Cafe } from '@/views/Cafe';

export const metadata: Metadata = {
  title: "Artisanal Cafe | Shyam Hotel & Restaurant Prayagraj",
  description: "Enjoy artisanal coffee and freshly baked pastries at our thematic cafe. The perfect spot for cozy meetings and relaxed afternoons in Civil Lines.",
};

export default function CafePage() {
  return <Cafe />
}
