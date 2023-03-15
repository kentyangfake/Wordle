import React from 'react';
import Box from './Box';

enum Status {
  Active,
  Gray,
  Yellow,
  Green,
  Blank,
}
interface BoxType {
  status: Status;
  letter: string;
}

interface RowProps {
  rowContent: BoxType[];
}

const Row: React.FC<RowProps> = ({ rowContent }) => {
  return (
    <div className="flex justify-center gap-1.5">
      {rowContent.map((box: BoxType, index) => (
        <Box key={index} boxContent={box} />
      ))}
    </div>
  );
};

export default Row;
