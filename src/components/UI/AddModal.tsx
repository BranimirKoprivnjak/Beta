import ReactDOM from 'react-dom';
import { useCustomDispatch } from '../../hooks/hooks';
import { modalActions } from '../../store/modal';
import AddCrypto from '../AddCrypto/AddCrypto';
import classes from './AddModal.module.css';

const Backdrop: React.FC = () => {
  const dispatch = useCustomDispatch();
  return (
    <div
      className={classes.backdrop}
      onClick={dispatch.bind(null, modalActions.toggleAddModal())}
    ></div>
  );
};

const AddModalOverlay: React.FC = () => {
  return (
    <div className={classes.modal}>
      <AddCrypto />
    </div>
  );
};

const portalElement = document.getElementById('overlays') as Element;

const AddModal: React.FC = () => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(<AddModalOverlay />, portalElement)}
    </>
  );
};

export default AddModal;
