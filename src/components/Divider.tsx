import React from 'react';

interface DividerProps {
  text?: string;
}

const Divider: React.FC<DividerProps> = ({ text = 'OR' }) => {
  return (
    <div className="flex items-center">
      <div className="flex-grow border-t border-custom-black-300"></div>
      <span className="flex-shrink bg-white inline-block rounded-full px-4 py-2 border border-solid border-custom-black-300 text-custom-text-body">{text}</span>
      <div className="flex-grow border-t border-custom-black-300"></div>
    </div>
  );
};

export default Divider;