import { Header } from "@/components/ui/Header";
import { ComponentList } from "@/components/ui/ComponentList";
import { fetchComponents } from "@/lib/registry";

export default async function Home() {
  const components = await fetchComponents();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />
      <section className="mx-auto flex max-w-5xl flex-col gap-12 px-8 pb-16 pt-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="font-instrument-italic text-3xl text-white md:text-4xl">
            A growing library of thoughtfully designed UI components
          </h1>
          <p className="max-w-3xl text-sm text-white/60 md:text-base">
            You won&apos;t find these in standard kits. Explore interactive previews,
            test every state and variation, then copy the code or fork from GitHub.
            Built for developers who care about the craft.
          </p>
        </div>

        <ComponentList components={components} />
      </section>
    </main>
  );
}
