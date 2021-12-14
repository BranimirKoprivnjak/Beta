import ReactDOM from 'react-dom';

import classes from './ChartModal.module.css';
import Detail from '../ChartOverlay/ChartOverlay';

const Backdrop: React.FC<{ onClose: () => void }> = props => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

export const ChartModalOverlay: React.FC<{ id: string }> = props => {
  return (
    <div className={classes.modal}>
      <Detail id={props.id} />
    </div>
  );
};

const portalElement = document.getElementById('overlays') as Element;

const ChartModal: React.FC<{ id: string; onClose: () => void }> = ({
  id,
  onClose,
}) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(<ChartModalOverlay id={id} />, portalElement)}
    </>
  );
};

export default ChartModal;
