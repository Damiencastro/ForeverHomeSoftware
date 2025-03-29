// AnimalImage.js
// This component fetches breed-specific images from the Dog API
import React, { useState, useEffect } from 'react';

// Map of breed names to standardized Dog API breed paths
const breedMap = {
  'coon hound': 'hound',
  'puggle': 'puggle', 
  'greyhound': 'greyhound',
  'labrador': 'labrador',
  'golden retriever': 'retriever/golden',
  'beagle': 'beagle',
  'german shepherd': 'germanshepherd',
  'boxer': 'boxer',
  'poodle': 'poodle',
  'bulldog': 'bulldog',
  'chihuahua': 'chihuahua',
  'husky': 'husky',
  'terrier': 'terrier',
  'pit bull': 'pitbull',
  // Default to a common breed if no match
  'default': 'retriever/golden'
};

const AnimalImage = ({ animal, className }) => {
  const [imageSrc, setImageSrc] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Keep track of whether the component is mounted
    let isMounted = true;
    
    const fetchBreedImage = async (breed) => {
      try {
        // Normalize the breed name
        const breedLower = breed.toLowerCase();
        let apiBreed = 'retriever/golden'; // Default breed
        
        // Find the matching breed in our map
        for (const [key, value] of Object.entries(breedMap)) {
          if (breedLower.includes(key)) {
            apiBreed = value;
            break;
          }
        }
        
        // Fetch a list of images for this breed
        const response = await fetch(`https://dog.ceo/api/breed/${apiBreed}/images`);
        const data = await response.json();
        
        if (data.status === 'success' && data.message && data.message.length > 0) {
          // Pick a random image from the returned list
          const randomIndex = Math.floor(Math.random() * data.message.length);
          // Only update state if the component is still mounted
          if (isMounted) {
            setImageSrc(data.message[randomIndex]);
          }
        } else {
          throw new Error('No images found for this breed');
        }
      } catch (error) {
        console.error('Error fetching breed image:', error);
        if (isMounted) {
          // Try the default breed if the specific one fails
          try {
            const fallbackResponse = await fetch(`https://dog.ceo/api/breed/${breedMap.default}/images`);
            const fallbackData = await fallbackResponse.json();
            if (fallbackData.status === 'success' && fallbackData.message && fallbackData.message.length > 0) {
              const randomIndex = Math.floor(Math.random() * fallbackData.message.length);
              if (isMounted) {
                setImageSrc(fallbackData.message[randomIndex]);
              }
            } else {
              throw new Error('Fallback failed too');
            }
          } catch (fallbackError) {
            console.error('Fallback image error:', fallbackError);
            if (isMounted) {
              // Last resort placeholder
              setImageSrc('https://images.dog.ceo/breeds/retriever-golden/n02099601_2253.jpg');
            }
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    const loadImage = async () => {
      if (typeof animal === 'object' && animal !== null && animal.breed) {
        await fetchBreedImage(animal.breed);
      } else if (typeof animal === 'string') {
        // If a direct URL was provided (unlikely in this use case)
        setImageSrc(animal);
        setLoading(false);
      } else {
        // No breed or direct URL provided, use default
        await fetchBreedImage('default');
      }
    };
    
    loadImage();
    
    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [animal]);

  if (loading) {
    return (
      <div className={`image-loading ${className || ''}`}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <img 
      src={imageSrc} 
      alt={animal && animal.name ? animal.name : 'Animal'} 
      className={className || ''}
      onError={(e) => {
        console.log('Image failed to load, using placeholder');
        e.target.src = 'https://images.dog.ceo/breeds/retriever-golden/n02099601_2253.jpg';
      }}
    />
  );
};

export default AnimalImage;