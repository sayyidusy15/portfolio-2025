import { useEffect, useState } from "react";
import supabase from "@/utils/supabaseClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import PortfolioModal from "../portfoliomodal";

export default function Portfolio() {
  const [data, setData] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase
        .from("portofolio")
        .select()
        .order("id", { ascending: true });
      if (data) {
        setData(data);
      }
    };

    getData();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handlePortfolioClick = (portfolio_data: any) => {
    const modalContainer = document.querySelector(".portfolio-modal-container");
    const modalImg = document.querySelector(
      "[data-portfolio-modal-img]"
    ) as HTMLImageElement;
    const modalTitle = document.querySelector("[data-portfolio-modal-title]");
    const modalCategory = document.querySelector(
      "[data-portfolio-modal-category]"
    );
    const overlay = document.querySelector(
      ".portfolio-modal-container .overlay"
    );

    if (modalContainer && modalImg && modalTitle && modalCategory && overlay) {
      modalImg.src = portfolio_data.image;
      modalImg.alt = portfolio_data.title;
      modalTitle.textContent = portfolio_data.title;
      modalCategory.textContent = portfolio_data.category;
      modalContainer.classList.add("active");
      overlay.classList.add("active");
    }
  };
  const filteredData =
    selectedCategory === "All"
      ? data
      : data.filter(
          (portfolio_data) => portfolio_data.category === selectedCategory
        );

  return (
    <article className="portfolio" data-page="portfolio">
      <header>
        <h2 className="h2 article-title">Portfolio</h2>
      </header>

      <section className="projects">
        <ul className="filter-list">
          <li className="filter-item">
            <button
              className={selectedCategory === "All" ? "active" : ""}
              onClick={() => handleCategoryChange("All")}
            >
              All
            </button>
          </li>
          <li className="filter-item">
            <button
              className={selectedCategory === "Design Branding" ? "active" : ""}
              onClick={() => handleCategoryChange("Design Branding")}
            >
              Design Branding
            </button>
          </li>
          <li className="filter-item">
            <button
              className={selectedCategory === "UX Design" ? "active" : ""}
              onClick={() => handleCategoryChange("UX Design")}
            >
              UX Design
            </button>
          </li>
          <li className="filter-item">
            <button
              className={selectedCategory === "Web development" ? "active" : ""}
              onClick={() => handleCategoryChange("Web development")}
            >
              Web development
            </button>
          </li>
        </ul>

        <ul className="project-list">
          {filteredData.map((portfolio_data, index) => (
            <li
              key={index}
              className="project-item active"
              data-filter-item
              data-category={portfolio_data.category}
            >
              <div onClick={() => handlePortfolioClick(portfolio_data)}>
                {" "}
                {/* Kirim seluruh data portfolio */}
                <figure className="project-img">
                  <div className="project-item-icon-box">
                    <FontAwesomeIcon icon={faEye} />
                  </div>
                  <img
                    src={portfolio_data.image}
                    alt={portfolio_data.title}
                    loading="lazy"
                  />
                </figure>
                <p className="project-category">{portfolio_data.category}</p>
                <h3 className="project-title">{portfolio_data.title}</h3>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <PortfolioModal />
    </article>
  );
}
