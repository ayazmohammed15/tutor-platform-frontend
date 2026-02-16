const Card = ({ children, className = '', onClick, hover = false }) => {
  const hoverClass = hover ? 'hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer' : '';

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow-md p-6 ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
