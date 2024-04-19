import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { yellow } from '@mui/material/colors';

export default function RatingStars({ rating }) {
  const renderRating = () => {
    const fullStars = Math.floor(rating);
    const remainingStars = 5 - fullStars;

    const stars = [];

    // Render full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={`star-${i}`} sx={{ color: yellow[600] }} />);
    }

    // Render border stars for the remaining slots
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<StarBorderIcon key={`star-border-${i}`} htmlColor="yellow" />);
    }

    return stars;
  };

  return <div className="mb-1">{renderRating()}</div>;
}
