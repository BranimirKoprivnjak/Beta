import { useCustomDispatch, useCustomSelector } from './hooks/hooks';
import { SUPPORTED_CURRENCIES } from './config/config';
import Container from './components/CryptoTracker/Container';
import AddModal from './components/UI/AddModal';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { modalActions } from './store/modal';
import { fiatActions } from './store/fiat-currency';
import classes from './App.module.css';

const App: React.FC = () => {
  const {
    crypto: { cryptocurrencies },
    modal: { addModalIsShown },
  } = useCustomSelector(state => state);
  const dispatch = useCustomDispatch();

  const currencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(fiatActions.setFiatCurrency(event.currentTarget.value));
  };

  const toggleModalHandler = () => {
    dispatch(modalActions.toggleAddModal());
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {addModalIsShown && <AddModal />}
      <div className={classes.toolbar}>
        <p>My cryptocurrencies({cryptocurrencies.length})</p>
        <div className={classes.utility}>
          <label>
            <select onChange={currencyChange} className={classes.dropdown}>
              {SUPPORTED_CURRENCIES.map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <a className={classes.button} onClick={toggleModalHandler}>
            +Add a cryptocurrency
          </a>
        </div>
      </div>
      <Container />
    </DndProvider>
  );
};

export default App;
