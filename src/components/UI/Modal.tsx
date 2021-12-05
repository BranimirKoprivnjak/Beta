import ReactDOM from 'react-dom';
import AddCrypto from '../AddCrypto/AddCrypto';
import { OnClose } from '../../models/models';

import classes from './Modal.module.css';

const Backdrop: React.FC<OnClose> = ({ onClose }) => {
  return <div className={classes.backdrop} onClick={onClose}></div>;
};

const ModalOverlay: React.FC<OnClose> = ({ onClose }) => {
  return (
    <div className={classes.modal}>
      <AddCrypto onClose={onClose} />
    </div>
  );
};

const portalElement = document.getElementById('overlays') as Element;

const Modal: React.FC<OnClose> = ({ onClose }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay onClose={onClose} />, portalElement)}
    </>
  );
};

export default Modal;
