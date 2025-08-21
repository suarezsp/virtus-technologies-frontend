const images = [
  "https://images.seeklogo.com/logo-png/6/2/hyundai-motor-company-logo-png_seeklogo-69075.png",
  "https://images.seeklogo.com/logo-png/15/2/apple-logo-png_seeklogo-158010.png",
  "https://images.seeklogo.com/logo-png/40/2/windows-11-icon-logo-png_seeklogo-406208.png",
  "https://freepnglogo.com/images/all_img/1715487998amazon-logo-transparent.png",
  "https://cdn.freebiesupply.com/images/large/2x/google-logo-transparent.png",
  "https://images.seeklogo.com/logo-png/42/2/meta-icon-new-facebook-2021-logo-png_seeklogo-424014.png",
  "https://upload.wikimedia.org/wikipedia/commons/2/2e/Coat_of_arms_of_Poland-official.png",
];

export default function InfiniteCarousel() {
  const carouselImages = [...images, ...images]; 

  return (
    <div className="relative w-[960px] h-[100px] overflow-hidden mx-auto">
      <div className="absolute inset-0 bg-virtus-dark z-0" />
      <div className="absolute left-0 top-0 h-full w-[200px] bg-gradient-to-r from-virtus-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-[200px] bg-gradient-to-l from-virtus-dark to-transparent z-10 pointer-events-none" />
      <div className="flex animate-scroll relative z-0">
        {carouselImages.map((src, idx) => (
          <div key={idx} className="flex-shrink-0 w-[250px] h-[100px]">
            <img src={src} alt="" className="w-full h-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}