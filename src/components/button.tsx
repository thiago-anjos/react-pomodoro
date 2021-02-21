import React from 'react';

type ButtonProps = {
  onClick?: () => void;
  title: string;
  className?: string;
};

function ButtonPomorodo({
  title,
  onClick,
  className,
}: ButtonProps): JSX.Element {
  return (
    <button onClick={onClick} className={className}>
      {title}
    </button>
  );
}

export default ButtonPomorodo;
