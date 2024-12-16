import { BeachApartmentForm } from "@/components/beach-apartment-form";
import { EclipseBackground } from "@/components/eclipse-background";


export default function CreateHouse() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <EclipseBackground />
      <BeachApartmentForm />
    </main>
  );
}