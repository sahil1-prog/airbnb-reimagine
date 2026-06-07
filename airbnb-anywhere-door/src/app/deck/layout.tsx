import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Airbnb Reimagined — Strategy Deck | OP'26",
  description: "6-slide strategy presentation: Reimagining Airbnb with Generative AI — the Anywhere Door.",
};

export default function DeckLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
