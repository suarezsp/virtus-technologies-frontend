import { useEffect, useState } from "react";
import InfiniteCarousel from "../effects/InfiniteCarousel";

function CompaniesComponent() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("companies-section");
      const rect = element.getBoundingClientRect();
      setShowText(rect.top < window.innerHeight && rect.bottom > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="companies-section"
      className="w-[72.5vw] min-h-[37vh] bg-virtus-dark flex flex-col items-center justify-start py-8 px-4"
    >
        <div
            className={`transition-all duration-700 ease-out transform ${
                showText ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            }`}
            >
            <h1 className="text-5xl font-extrabold text-virtus-light text-center mb-1">
                Our clients
            </h1>
            <p className="text-xl text-virtus-light text-center max-w-3xl mb-12">
                Creating great projects for great companies
            </p>
        </div>

      <div className="w-full mt-8">
        <InfiniteCarousel />
      </div>
    </div>
  );
}

export default CompaniesComponent;