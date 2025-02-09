import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export default function PortfolioModal() {
  const closeModal = () => {
    const modalContainer = document.querySelector(".portfolio-modal-container");
    const overlay = document.querySelector(".portfolio-modal-container .overlay");
    if (modalContainer && overlay) {
      modalContainer.classList.remove("active");
      overlay.classList.remove("active");
    }
  };

  return (
    <div className="portfolio-modal-container" data-portfolio-modal>
      <div
        className="overlay"
        data-overlay
        onClick={closeModal}
      ></div>

      <section className="portfolio-modal">
        <button
          className="modal-close-btn"
          data-modal-close-btn
          onClick={closeModal}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>

        <div className="modal-img-wrapper">
          <img
            src=""
            alt="Portfolio image"
            className="modal-img"
            data-portfolio-modal-img
          />
        </div>
      </section>
    </div>
  );
}