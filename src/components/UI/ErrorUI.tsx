import Button from './Button';
import classes from './ErrorUI.module.css';

const ErrorUI: React.FC<{ message: string }> = props => {
  return (
    <section className={classes.error}>
      <p>{props.message}</p>
    </section>
  );
};

export default ErrorUI;
