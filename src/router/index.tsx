import NavBar from "../component/navbar/navbar";
import MyOffer from "../component/myoffer"
import AllOffer from "../component/alloffer"
import Footer from "../component/footer/footer"
import ShowOffer from '../component/showoffer/showoffer';
import Admin from "../component/adminpage";
import History from "../component/history/index"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { OfferContextProvide } from "../contexts/offerContext";

function ProjectRouter() {

    return (
        <div className='flex flex-col min-h-screen items-center justify-between'
            style={{
                "background": "url('./img/background.png')",
                "backgroundRepeat": "no-repeat",
                "backgroundSize": "cover"
            }}
        >
            <Router>
                <NavBar />
                <OfferContextProvide>
                    <Routes>
                        <Route path="/" element={<AllOffer />} />
                        <Route path="/myoffer" element={<MyOffer />} />
                        <Route path="/history" element={<History />} />
                        <Route path="/showoffer" element={<ShowOffer />} />
                        <Route path="/admin" element={<Admin />} />
                    </Routes>
                </OfferContextProvide>

                <Footer />
            </Router>
        </div>
    )
}
export default ProjectRouter