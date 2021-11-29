import ReactDOM from 'react-dom';
import AddCrypto from '../AddCrypto/AddCrypto';
import classes from './Modal.module.css';

const Backdrop: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return <div className={classes.backdrop} onClick={onClose}></div>;
};

const ModalOverlay = () => {
  return (
    <div className={classes.modal}>
      <AddCrypto />
    </div>
  );
};

const portalElement = document.getElementById('overlays') as Element;

const Modal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay />, portalElement)}
    </>
  );
};

export default Modal;
