const ErrorUI: React.FC<{ message: string }> = ({ message }) => {
  return (
    <section>
      <p>{message}</p>
    </section>
  );
};

export default ErrorUI;
