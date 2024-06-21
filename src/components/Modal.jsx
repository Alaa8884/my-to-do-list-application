function Modal({ onConfirmDelete, onCloseModal }) {
  return (
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <h3>Warning</h3>
      <p>All tasks will be permanently deleted, Do you agree to this?</p>
      <div className="modal-btns">
        <button className="confirm" value="yes" onClick={onConfirmDelete}>
          YES
        </button>
        <button className="cancel" value="cancel" onClick={onCloseModal}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Modal
