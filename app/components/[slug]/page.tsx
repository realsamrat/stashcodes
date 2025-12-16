import { notFound } from "next/navigation";
import { fetchComponentBySlug } from "@/lib/registry";
import { ComponentDetailClient } from "@/components/preview/ComponentDetailClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ComponentDetail({ params }: Props) {
  const { slug } = await params;
  const item = await fetchComponentBySlug(slug);

  if (!item) return notFound();

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <ComponentDetailClient item={item} />
    </main>
  );
}

