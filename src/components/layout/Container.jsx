// Container for UI and Sections elements
const Container = ({ children, classes = "" }) => {
  return <div className={`container px-2 mx-auto ${classes}`}>{children}</div>;
};

export default Container;
