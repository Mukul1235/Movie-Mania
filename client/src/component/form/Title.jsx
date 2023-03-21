const Title = ({ children }) => {
  return (
    <div>
      <h1 className="text-xl dark:text-white text-secondary font-semibold text-center">
        {children}
      </h1>
    </div>
  );
};

export default Title;
