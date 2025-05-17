import { useState, useEffect, useRef } from "react";
import { FaMapMarkerAlt, FaCrosshairs } from "react-icons/fa";

const LocationSelector = ({ onLocationSelect }) => {
  const [address, setAddress] = useState("");
  const [sessionToken, setSessionToken] = useState("");
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Generate a new session token when component mounts
  useEffect(() => {
    if (window.google && window.google.maps) {
      const token = new window.google.maps.places.AutocompleteSessionToken();
      setSessionToken(token);
    }
  }, []);

  // Load Google Maps API script
  useEffect(() => {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDZm_LAsWcNI17-N9P8Ax76fRFSO6o9mM8&libraries=places`;
    googleMapScript.async = true;
    googleMapScript.defer = true;
    
    googleMapScript.onload = () => {
      // Initialize autocomplete functionality
      initAutocomplete();
    };
    
    document.head.appendChild(googleMapScript);
    
    return () => {
      // Clean up script when component unmounts
      document.head.removeChild(googleMapScript);
    };
  }, []);

  // Handle clicks outside suggestions dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const initAutocomplete = () => {
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      console.error("Google Maps API not loaded");
      return;
    }

    const token = new window.google.maps.places.AutocompleteSessionToken();
    setSessionToken(token);

    autocompleteRef.current = new window.google.maps.places.AutocompleteService();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    
    // Clear suggestions if input is empty
    if (!value.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    if (autocompleteRef.current && sessionToken) {
      setIsLoading(true);
      
      autocompleteRef.current.getPlacePredictions(
        {
          input: value,
          sessionToken: sessionToken,
          types: ["establishment", "geocode"],
          componentRestrictions: { country: "in" }, // Restrict to India
        },
        (predictions, status) => {
          setIsLoading(false);
          
          if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
            setSuggestions(predictions);
            setShowSuggestions(true);
          } else {
            setSuggestions([]);
            setShowSuggestions(false);
          }
        }
      );
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setAddress(suggestion.description);
    setShowSuggestions(false);
    
    // Get place details to extract coordinates
    const placesService = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    
    placesService.getDetails(
      {
        placeId: suggestion.place_id,
        fields: ["geometry", "formatted_address"],
        sessionToken: sessionToken,
      },
      (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const newLocation = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            address: place.formatted_address
          };
          
          setLocation(newLocation);
          
          // Create a new session token for the next request
          const newToken = new window.google.maps.places.AutocompleteSessionToken();
          setSessionToken(newToken);
          
          // Pass location data back to parent component
          onLocationSelect({
            address: place.formatted_address,
            coordinates: [place.geometry.location.lng(), place.geometry.location.lat()],
            placeId: suggestion.place_id
          });
        }
      }
    );
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Reverse geocode to get address from coordinates
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode(
            { location: { lat: latitude, lng: longitude } },
            (results, status) => {
              setIsLoading(false);
              
              if (status === "OK" && results[0]) {
                setAddress(results[0].formatted_address);
                setLocation({ lat: latitude, lng: longitude });
                
                // Pass location data back to parent component
                onLocationSelect({
                  address: results[0].formatted_address,
                  coordinates: [longitude, latitude],
                  placeId: results[0].place_id
                });
              } else {
                console.error("Geocode failed:", status);
              }
            }
          );
        },
        (error) => {
          setIsLoading(false);
          console.error("Geolocation error:", error);
          // Show user-friendly error
          alert("Could not get your location. Please check your browser permissions.");
        },
        { enableHighAccuracy: true }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        <div className="relative flex-grow">
          <div className="absolute left-3 top-3 text-gray-500">
            <FaMapMarkerAlt />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={address}
            onChange={handleInputChange}
            placeholder="Restaurant Location"
            className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 transition bg-gray-200 border-gray-300 text-gray-900"
            required
            aria-label="Restaurant Location"
          />
          {isLoading && (
            <div className="absolute right-3 top-3">
              <div className="animate-spin h-5 w-5 border-2 border-amber-500 border-t-transparent rounded-full"></div>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={getCurrentLocation}
          className="ml-2 p-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
          aria-label="Use Current Location"
        >
          <FaCrosshairs />
        </button>
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-300 max-h-60 overflow-y-auto"
        >
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.place_id}
              className="p-3 hover:bg-amber-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-amber-500 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <div className="font-medium">{suggestion.structured_formatting.main_text}</div>
                  <div className="text-sm text-gray-500">{suggestion.structured_formatting.secondary_text}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Display selected location details */}
      {location.lat && location.lng && (
        <div className="mt-2 text-xs text-gray-700 bg-amber-50 p-2 rounded-lg border border-amber-100">
          <p className="font-medium">Selected Location:</p>
          <p className="truncate">{address}</p>
          <p className="mt-1">
            <span className="font-medium">Coordinates:</span> {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;