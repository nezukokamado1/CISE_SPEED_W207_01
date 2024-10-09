import React from 'react';
import ReactStars from 'react-rating-stars-component';

interface StarRatingProps {
  value: number;
  onChange: (newRating: number) => void;
  count?: number;
  size?: number;
  activeColor?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  value,
  onChange,
  count = 5,
  size = 36,
  activeColor = "#ffd700"
}) => {
  return (
    <ReactStars
      count={count}
      value={value}
      onChange={onChange}
      size={size}
      activeColor={activeColor}
      isHalf={true}
    />
  );
};

export default StarRating;