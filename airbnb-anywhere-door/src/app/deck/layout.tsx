import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Airbnb Odyssey — Strategy Deck | OP'26",
  description: "6-slide strategy presentation: Reimagining Airbnb with Generative AI — Airbnb Odyssey.",
};

export default function DeckLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
