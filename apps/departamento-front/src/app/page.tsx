import { PageRent } from "@/components";
import { EclipseBackground } from "@/components/eclipse-background";

export default function Home() {
  return (
    <main className="p-2 relative overflow-hidden">
    <EclipseBackground />
    <EclipseBackground />
    <PageRent />
    <EclipseBackground />
    <EclipseBackground />
    </main>
  );
}
