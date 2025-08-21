import virtusLogo from "../assets/virtusLogoLight.png"

function FooterComp(){
    return (
      <header className="w-full bg-virtus-dark text-virtus-light sticky top-0 z-50 h-auto">
  <div className="mx-auto w-full max-w-screen-xl">
    <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
      <div>
        <h2 className="mb-6 text-base font-semibold uppercase">Company</h2>
        <ul className="font-medium">
          <li className="mb-4"><a href="#" className="hover:text-virtus-blue">About</a></li>
          <li className="mb-4"><a href="#" className="hover:text-virtus-blue">Careers</a></li>
        </ul>
      </div>
      <div>
        <h2 className="mb-6 text-base font-semibold uppercase">Help center</h2>
        <ul className="font-medium">
          <li className="mb-4"><a href="#" className="hover:text-virtus-blue">Contact</a></li>
        </ul>
      </div>
      <div>
        <h2 className="mb-6 text-base font-semibold uppercase">Legal</h2>
        <ul className="font-medium">
          <li className="mb-4"><a href="#" className="hover:text-virtus-blue">Privacy Policy</a></li>
        </ul>
      </div>
      <div>
        <h2 className="mb-4 text-base font-semibold uppercase">Products</h2>
        <ul className="font-medium">
          <li className="mb-2"><a href="#" className="hover:text-virtus-blue">HAWK AI Assistant</a></li>
          <li className="mb-2"><a href="#" className="hover:text-virtus-blue">Legacy CRM</a></li>
          <li className="mb-2"><a href="#" className="hover:text-virtus-blue">Crypto & Stock Predictor</a></li>
          <li className="mb-2 pointer-events-none">And more...</li>
        </ul>
      </div>
    </div>

    <div className="px-4 py-4 bg-virtus-dark flex flex-col md:flex-row md:items-center md:justify-between">
      <span className="text-sm text-virtus-light sm:text-center">
        © 2025 Virtus Technologies™. All Rights Reserved.
      </span>
      <div className="relative flex mb-5 w-20 sm:justify-center md:mt-0 space-x-5">
        <img src={virtusLogo}/>
      </div>
    </div>
  </div>
</header>
    )
}

export default FooterComp;