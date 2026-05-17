export default function Modal({ id, title, children, open, onClose }) {
  if (!open) {
    return null;
  }

  return (
    <div
      id={id}
      className={`modal ${open ? "open" : ""}`}
      role="dialog"
      aria-modal="true"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal-box glass">
        <h3 className="title-font">{title}</h3>
        {children}
      </div>
    </div>
  );
}
