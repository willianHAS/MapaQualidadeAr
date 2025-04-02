import React, { useState, useEffect } from 'react';

type AutocompleteProps = {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
};

const Autocomplete: React.FC<AutocompleteProps> = ({ value, onChange, placeholder }) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (value.length < 3) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(() => {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${value}`)
        .then(res => res.json())
        .then(data => {
          setSuggestions(data);
          setShowSuggestions(true);
        });
    }, 500);
    return () => clearTimeout(timer);
  }, [value]);

  const handleSelect = (suggestion: any) => {
    onChange(suggestion.display_name);
    setShowSuggestions(false);
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setShowSuggestions(true)}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((sugg, index) => (
            <li key={index} onClick={() => handleSelect(sugg)}>
              {sugg.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;