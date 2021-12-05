import classes from './Button.module.css';

const Button: React.FC<{ onClick: () => void; cssClass: string | null }> =
  props => {
    return (
      <button
        className={`${classes.button} ${props.cssClass}`}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    );
  };

export default Button;
