import FontAwesomeConfig from "@/pages/fontawesome";
import About from "../about";
import Blog from "../blog";
import Contact from "../contact";
import Footer from "../footer";
import Navbar from "../navbar";
import Portfolio from "../portfolio";
import Resume from "../resume";
import Sidebar from "../sidebar";
import Script from "next/script";

type AppShellProps = {
    children: React.ReactNode;
}

const AppShell = (props : AppShellProps) => {
    const { children } = props;
    return (
        <div>
            <main>
                <Sidebar />
                    <div className="main-content" data-main>
                        {children}
                        <Navbar/>
                        <About/>
                        <Resume/>
                        <Portfolio />
                        <Blog />
                        <Contact />
                    </div>
            </main>
            {/* script js */}
            <Script type="module" src="/script.js"/>
            <Script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"/>
            <Script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"/>
            <Footer/>
            <FontAwesomeConfig/>
        </div>
        

    );
}

export default AppShell;
