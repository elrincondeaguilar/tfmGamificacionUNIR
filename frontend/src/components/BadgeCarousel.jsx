import React, { useEffect, useState } from "react";
import Modal from "./Modal";

export default function BadgeCarousel({
  open,
  onClose,
  fullscreen,
  badgeCards,
}) {
  const [selectedBadge, setSelectedBadge] = useState(null);

  useEffect(() => {
    if (!open) {
      setSelectedBadge(null);
    }
  }, [open]);

  function closeZoom() {
    setSelectedBadge(null);
  }

  return (
    <>
      <Modal
        id="badgeCarouselModal"
        title="Insignias"
        open={open}
        onClose={onClose}
        className={`modal-box--gallery ${
          fullscreen ? "modal-box--gallery-fullscreen" : ""
        }`.trim()}
        headerActions={
          <div className="modal-box__actions">
            <button
              className="modal-icon-btn"
              type="button"
              onClick={onClose}
              aria-label="Cerrar modal"
              title="Cerrar"
            >
              ×
            </button>
          </div>
        }
      >
        {badgeCards.length > 0 ? (
          <div
            className={`badge-grid ${fullscreen ? "badge-grid--fullscreen" : ""}`.trim()}
          >
            {badgeCards.map((badgeCard) => (
              <button
                className="badge-grid__item badge-grid__item--button"
                key={badgeCard.src}
                type="button"
                onClick={() => setSelectedBadge(badgeCard)}
                aria-label={`Ver ${badgeCard.title} en zoom`}
                title={`Ver ${badgeCard.title} en zoom`}
              >
                <div className="badge-grid__image-wrap">
                  <img
                    className="badge-grid__image"
                    src={badgeCard.src}
                    alt={badgeCard.alt}
                  />
                </div>
                <div className="badge-grid__caption">
                  <strong>{badgeCard.title}</strong>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <p className="video-modal__hint">No hay tarjetas cargadas todavía.</p>
        )}
      </Modal>

      <Modal
        id="badgeZoomModal"
        title={selectedBadge?.title ?? "Vista ampliada"}
        open={Boolean(selectedBadge)}
        onClose={closeZoom}
        className="modal-box--zoom"
      >
        {selectedBadge ? (
          <div className="badge-zoom">
            <div className="badge-zoom__frame">
              <img
                className="badge-zoom__image"
                src={selectedBadge.src}
                alt={selectedBadge.alt}
              />
            </div>
            <p className="badge-zoom__text">Haz click fuera o en la X para cerrar.</p>
          </div>
        ) : null}
      </Modal>
    </>
  );
}
