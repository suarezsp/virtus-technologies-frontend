import { useSearchParams } from "react-router-dom";
import AiSection from "../components/AI-Section";

function ServicesPage() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Our Services</h1>

      {!type && <p className="text-gray-600">Select a service.</p>}

      {type === "ai" && <AiSection />}
      {type === "fullstack" && <p>🚀 Aquí irá tu sección de Full-stack Development</p>}
      {type === "counseling" && <p>🧑‍🏫 Aquí irá tu sección de Professional Counseling</p>}
      {type === "software" && <p>📱 Aquí irá tu sección de VIRTUS Software</p>}

      {type && !["ai", "fullstack", "counseling", "software"].includes(type) && (
        <p className="text-red-500">⚠️ What you are looking for, its not here...</p>
      )}
    </div>
  );
}

export default ServicesPage;