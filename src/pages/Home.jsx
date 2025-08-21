import HeaderComponent from "../components/Header";
import CompaniesComponent from "../components/Companies";
import ServicesComponent from "../components/Services";
import AboutUsComponent from "../components/AboutUsComp";
import CTAComponent from "../components/CTA";
import ContactComp from "../components/ContactUsComp";
import FooterComp from "../components/Footer";

function HomePage(){
    return (
        <div>
            <div
                className="w-full h-full flex items-center relative justify-center border-pulse-bottom"
            >
                <HeaderComponent/>
            </div>
            
            <div className="bg-virtus-dark w-full h-full">
                <div className="w-full flex items-center justify-center relative border-pulse-bottom">
                    <CompaniesComponent />
                </div>
                <div className="w-full h-full flex items-center justify-center relative border-pulse-bottom">
                    <ServicesComponent/>
                </div>
                <div className="flex items-center justify-center relative border-pulse-bottom">
                    <AboutUsComponent/>
                </div>
                <div className="flex items-center justify-center relative border-pulse-bottom">
                    <CTAComponent/>
                </div>
                <div className="w-full h-screen flex items-center justify-center relative border-pulse-bottom">
                    <ContactComp/>
                </div>
                <div className="flex items-center justify-center relative border-pulse-bottom">
                    <FooterComp/>
                </div>

            </div>

            
        </div>
        
    )

}

export default HomePage;