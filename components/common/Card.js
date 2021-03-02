const Card = (props) => {
  // merge classname on props
  return (
    <div className="card" {...props}>
      {props.children}
    </div>
  );
};

export default Card;
