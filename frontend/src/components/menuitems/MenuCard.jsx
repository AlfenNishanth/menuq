import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Star, 
  ListPlus 
} from 'lucide-react';

function MenuCard({ item }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const {
    name,
    price,
    description,
    imageUrl,
    tags,
    prepTime,
    rating,
    ratingCount,
    available,
    spiceLevel
  } = item;

  const FireIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );

  return (
    <div 
      className={`relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white border-0 flex max-w-4xl mx-auto ${!available ? 'opacity-60' : ''}`}
    >
      <div className="w-44 flex-shrink-0 relative group">
        <img 
          className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
          src={imageUrl}
          alt={name} 
          loading="lazy"
        />
        <div className="absolute bottom-2 left-2">
          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full flex items-center">
            <FireIcon />
            <span className="ml-1">{spiceLevel}</span>
          </span>
        </div>
      </div>

      <div className="flex-grow flex flex-col">
        <div className="p-6 pb-0">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-grow pr-4">
              <h2 className="text-xl font-serif tracking-wide">{name}</h2>
              <div className="flex items-center mt-1">
                <Star className="w-4 h-4 text-amber-500 mr-1" />
                <span className="text-sm text-gray-600">
                  {rating} ({ratingCount} reviews)
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-medium text-amber-700 block">₹{price}</span>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
          
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 text-xs bg-amber-50 text-amber-800 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className={`mt-2 text-sm font-medium ${available ? 'text-green-600' : 'text-red-600'}`}>
            {available ? 'Available' : 'Currently Unavailable'}
          </div>
        </div>

        <button 
          onClick={toggleExpand}
          className="mt-4 flex items-center justify-center w-full py-2 text-amber-700 hover:text-amber-900 transition-colors duration-200 font-medium"
        >
          {expanded ? (
            <>Show Less <ChevronUp className="ml-1 w-4 h-4" /></>
          ) : (
            <>View Details <ChevronDown className="ml-1 w-4 h-4" /></>
          )}
        </button>
        
        {expanded && (
          <div className="p-6 pt-0">
            <div className="border-t border-gray-100 pt-4 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">About the Dish</h3>
                <p className="text-gray-600">{longDescription}</p>
              </div>

              <div className="flex items-center">
                <Clock className="w-5 h-5 text-amber-600 mr-2" />
                <div>
                  <span className="text-xs text-gray-500 block">Prep Time</span>
                  <span className="text-sm font-medium">{prepTime}</span>
                </div>
              </div>
              
              <div className="mt-4">
                {available ? (
                  <div className="flex space-x-2">
                    <button className="flex-grow bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 rounded-md transition-colors duration-200 flex items-center justify-center">
                      <ListPlus className="w-5 h-5 mr-2" />
                      Add to Order
                    </button>
                  </div>
                ) : (
                  <div className="bg-red-100 text-red-600 py-2 text-center text-sm rounded-md">
                    Sorry, this item is currently unavailable
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MenuCard;