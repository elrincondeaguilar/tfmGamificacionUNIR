export default function Modal({ id, title, children, open, onClose }) {
  return (
    <div
      id={id}
      className={`modal ${open ? "open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
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
