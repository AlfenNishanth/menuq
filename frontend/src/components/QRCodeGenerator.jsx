import React, { useRef, useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRCodeGenerator = ({ restaurantUrl = "https://example.com/restaurant", restaurantName = "Your Restaurant" }) => {
  // State to store all customization options
  const [options, setOptions] = useState({
    url: restaurantUrl,
    size: 240,
    logoUrl: '',
    logoSize: 60,
    logoShape: 'circle', // circle, square, rounded-square, hexagon, shield
    logoBackgroundColor: '#ffffff',
    codeColor: '#000000',
    backgroundColor: '#ffffff',
    gradientColors: null, // [startColor, endColor]
    gradientType: 'linear', // linear or radial
    cornerStyle: 'square', // square, rounded, dot
    cornerDotStyle: 'square', // square, rounded, dot
    dotStyle: 'square', // square, rounded, dot
    showBorder: false,
    borderColor: '#000000',
    borderSize: 4,
    borderRadius: 8,
    showLabel: true,
    labelText: 'Scan to view our menu',
    labelColor: '#333333',
    labelFont: 'Georgia, serif',
    labelSize: '14px',
    labelPosition: 'bottom', // top, bottom
    showShadow: true,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    errorCorrectionLevel: 'H', // L, M, Q, H
    cardStyle: 'modern', // classic, modern, minimal, elegant
    animation: 'none', // none, pulse, zoom, rotate
    qrCodeFrame: 'none', // none, fork-knife, plate, restaurant
  });

  const qrCodeRef = useRef(null);
  const fileInputRef = useRef(null);
  const [logoImage, setLogoImage] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [selectedColorPreset, setSelectedColorPreset] = useState(null);
  const [previewMode, setPreviewMode] = useState('digital'); // digital, print, table
  
  // Preloaded logos for restaurants
  const preloadedLogos = [
    { name: "Restaurant", url: "/api/placeholder/64/64", category: "restaurant" },
    { name: "Cafe", url: "/api/placeholder/64/64", category: "cafe" },
    { name: "Pizza", url: "/api/placeholder/64/64", category: "restaurant" },
    { name: "Burger", url: "/api/placeholder/64/64", category: "restaurant" },
    { name: "Coffee Shop", url: "/api/placeholder/64/64", category: "cafe" },
    { name: "Bakery", url: "/api/placeholder/64/64", category: "cafe" },
    { name: "Food Truck", url: "/api/placeholder/64/64", category: "food-truck" },
    { name: "Ice Cream", url: "/api/placeholder/64/64", category: "dessert" },
    { name: "Bar", url: "/api/placeholder/64/64", category: "bar" },
    { name: "Sushi", url: "/api/placeholder/64/64", category: "restaurant" }
  ];
  
  // Enhanced color presets for classy QR codes
  const colorPresets = [
    { name: "Classic Black", codeColor: "#000000", backgroundColor: "#FFFFFF", gradientColors: null },
    { name: "Elegant Gold", codeColor: "#D4AF37", backgroundColor: "#FFFFFF", gradientColors: null },
    { name: "Royal Blue", codeColor: "#1E3A8A", backgroundColor: "#FFFFFF", gradientColors: null },
    { name: "Burgundy", codeColor: "#800020", backgroundColor: "#FFF8E1", gradientColors: null },
    { name: "Forest Green", codeColor: "#2C5E1A", backgroundColor: "#F5F5F5", gradientColors: null },
    { name: "Gold Gradient", codeColor: "#000000", backgroundColor: "#FFFFFF", gradientColors: ["#BF953F", "#FCF6BA"], gradientType: "linear" },
    { name: "Blue Elegance", codeColor: "#000000", backgroundColor: "#FFFFFF", gradientColors: ["#2C3E50", "#4CA1AF"], gradientType: "linear" },
    { name: "Wine", codeColor: "#000000", backgroundColor: "#FFFFFF", gradientColors: ["#5E1224", "#A52A2A"], gradientType: "linear" },
    { name: "Emerald", codeColor: "#000000", backgroundColor: "#FFFFFF", gradientColors: ["#02AAB0", "#00CDAC"], gradientType: "radial" },
    { name: "Rose Gold", codeColor: "#000000", backgroundColor: "#FFFFFF", gradientColors: ["#E0BFB8", "#D5A6BD"], gradientType: "linear" }
  ];
  
  // Frame designs for QR codes
  const frameStyles = [
    { name: "None", value: "none", icon: "◻" },
    { name: "Fork & Knife", value: "fork-knife", icon: "🍴" },
    { name: "Plate", value: "plate", icon: "🍽️" },
    { name: "Restaurant", value: "restaurant", icon: "🏮" },
    { name: "Menu", value: "menu", icon: "📋" }
  ];
  
  // Card style designs
  const cardStyles = [
    { name: "Classic", value: "classic", description: "Traditional, elegant styling" },
    { name: "Modern", value: "modern", description: "Clean, contemporary look" },
    { name: "Minimal", value: "minimal", description: "Simple, understated design" },
    { name: "Elegant", value: "elegant", description: "Luxurious, upscale appearance" },
    { name: "Rustic", value: "rustic", description: "Warm, natural styling" }
  ];
  
  // Animation styles
  const animationStyles = [
    { name: "None", value: "none", description: "No animation" },
    { name: "Pulse", value: "pulse", description: "Gentle pulsing effect" },
    { name: "Zoom", value: "zoom", description: "Subtle zoom in/out" },
    { name: "Rotate", value: "rotate", description: "Slow rotation effect" },
    { name: "Shimmer", value: "shimmer", description: "Elegant shimmer effect" }
  ];
  
  // QR code shapes and styles
  const qrCodeStyles = {
    cornerStyles: [
      { name: "Square", value: "square", icon: "▢" },
      { name: "Rounded", value: "rounded", icon: "⬭" },
      { name: "Dot", value: "dot", icon: "●" }
    ],
    dotStyles: [
      { name: "Square", value: "square", icon: "▢" },
      { name: "Rounded", value: "rounded", icon: "⬭" },
      { name: "Dot", value: "dot", icon: "●" },
      { name: "Diamond", value: "diamond", icon: "◆" },
      { name: "Star", value: "star", icon: "★" }
    ],
    logoShapes: [
      { name: "Circle", value: "circle", clipPath: "circle(50% at center)" },
      { name: "Square", value: "square", clipPath: "none" },
      { name: "Rounded Square", value: "rounded-square", clipPath: "inset(0% round 20%)" },
      { name: "Hexagon", value: "hexagon", clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" },
      { name: "Shield", value: "shield", clipPath: "polygon(0% 0%, 100% 0%, 100% 75%, 50% 100%, 0% 75%)" },
      { name: "Diamond", value: "diamond", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }
    ]
  };
  
  // Usage suggestions for different QR code styles
  const usageSuggestions = [
    { 
      name: "Menu Table Tents", 
      description: "Place on tables for easy menu access", 
      settings: { 
        showLabel: true, 
        labelText: "Scan for our menu", 
        size: 180, 
        cardStyle: "elegant",
        showBorder: true
      } 
    },
    { 
      name: "Storefront Window", 
      description: "Attract customers from outside", 
      settings: { 
        size: 300, 
        labelText: "Scan to view our menu & hours", 
        showLabel: true, 
        cardStyle: "modern",
        showShadow: true
      } 
    },
    { 
      name: "Business Cards", 
      description: "Professional networking tool", 
      settings: { 
        size: 150, 
        showLabel: false, 
        cardStyle: "minimal",
        showBorder: false
      } 
    },
    { 
      name: "Social Media", 
      description: "For digital sharing", 
      settings: { 
        animation: "pulse", 
        labelText: "Scan to order online", 
        showLabel: true, 
        cardStyle: "modern",
        gradientColors: ["#3498db", "#2ecc71"]
      } 
    },
    { 
      name: "Fine Dining", 
      description: "Elegant, unobtrusive design", 
      settings: { 
        codeColor: "#D4AF37", 
        labelText: "View our wine selection", 
        labelFont: "Georgia, serif", 
        cardStyle: "elegant",
        cornerStyle: "rounded"
      } 
    }
  ];
  
  // Preload the logo image
  useEffect(() => {
    if (options.logoUrl) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        setLogoImage(img);
      };
      img.src = options.logoUrl;
    }
  }, [options.logoUrl]);
  
  // Handle option changes
  const handleOptionChange = (name, value) => {
    setOptions(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle gradient color changes
  const handleGradientChange = (index, color) => {
    const newGradientColors = options.gradientColors ? [...options.gradientColors] : ['#000000', '#000000'];
    newGradientColors[index] = color;
    setOptions(prev => ({
      ...prev,
      gradientColors: newGradientColors
    }));
    setSelectedColorPreset(null);
  };
  
  // Toggle gradient on/off
  const toggleGradient = (e) => {
    if (e.target.checked) {
      setOptions(prev => ({
        ...prev,
        gradientColors: ['#000000', '#4286f4']
      }));
    } else {
      setOptions(prev => ({
        ...prev,
        gradientColors: null
      }));
    }
    setSelectedColorPreset(null);
  };
  
  // Apply color preset
  const applyColorPreset = (preset) => {
    setOptions(prev => ({
      ...prev,
      codeColor: preset.codeColor,
      backgroundColor: preset.backgroundColor,
      gradientColors: preset.gradientColors,
      gradientType: preset.gradientType || prev.gradientType
    }));
    setSelectedColorPreset(preset.name);
  };
  
  // Apply usage suggestion preset
  const applyUsageSuggestion = (suggestion) => {
    setOptions(prev => ({
      ...prev,
      ...suggestion.settings
    }));
  };
  
  // Handle logo file upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match('image.*')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleOptionChange('logoUrl', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Select a preloaded logo
  const selectPreloadedLogo = (logoUrl) => {
    handleOptionChange('logoUrl', logoUrl);
  };

  // Get animation style based on current selection
  const getAnimationStyle = () => {
    switch(options.animation) {
      case 'pulse':
        return {
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.05)' },
            '100%': { transform: 'scale(1)' }
          }
        };
      case 'zoom':
        return {
          animation: 'zoom 3s infinite',
          '@keyframes zoom': {
            '0%': { transform: 'scale(0.95)' },
            '50%': { transform: 'scale(1.05)' },
            '100%': { transform: 'scale(0.95)' }
          }
        };
      case 'rotate':
        return {
          animation: 'rotate 8s infinite linear',
          '@keyframes rotate': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' }
          }
        };
      case 'shimmer':
        return {
          position: 'relative',
          overflow: 'hidden',
          '&:after': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
            transform: 'rotate(30deg)',
            animation: 'shimmer 3s infinite',
          },
          '@keyframes shimmer': {
            '0%': { transform: 'translateX(-100%) rotate(30deg)' },
            '100%': { transform: 'translateX(100%) rotate(30deg)' }
          }
        };
      default:
        return {};
    }
  };
  
  // Get card style based on selection
  const getCardStyle = () => {
    const baseStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      background: options.backgroundColor,
      width: 'fit-content',
    };
    
    switch(options.cardStyle) {
      case 'classic':
        return {
          ...baseStyle,
          borderRadius: options.showBorder ? `${options.borderRadius}px` : '0',
          border: options.showBorder ? `${options.borderSize}px solid ${options.borderColor}` : 'none',
          boxShadow: options.showShadow ? `0 4px 8px ${options.shadowColor}` : 'none',
        };
      case 'modern':
        return {
          ...baseStyle,
          borderRadius: '12px',
          border: options.showBorder ? `${options.borderSize}px solid ${options.borderColor}` : 'none',
          boxShadow: options.showShadow ? `0 10px 30px ${options.shadowColor}` : 'none',
          background: options.backgroundColor,
        };
      case 'minimal':
        return {
          ...baseStyle,
          borderRadius: '0',
          border: 'none',
          boxShadow: 'none',
          padding: '10px',
        };
      case 'elegant':
        return {
          ...baseStyle,
          borderRadius: '8px',
          border: options.showBorder ? `1px solid ${options.borderColor}` : 'none',
          boxShadow: options.showShadow ? `0 15px 35px ${options.shadowColor}` : 'none',
          background: options.backgroundColor,
          padding: '30px',
        };
      case 'rustic':
        return {
          ...baseStyle,
          borderRadius: '5px',
          border: options.showBorder ? `2px solid ${options.borderColor}` : 'none',
          boxShadow: options.showShadow ? `5px 5px 15px ${options.shadowColor}` : 'none',
          background: options.backgroundColor,
          padding: '25px',
        };
      default:
        return baseStyle;
    }
  };
  
  // Get QR frame style based on selection
  const getQrFrameSvg = () => {
    const size = options.size;
    const padding = 20;
    const totalSize = size + (padding * 2);
    
    switch(options.qrCodeFrame) {
      case 'fork-knife':
        return (
          <svg width={totalSize} height={totalSize} viewBox={`0 0 ${totalSize} ${totalSize}`} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <mask id="qrMask">
                <rect width={totalSize} height={totalSize} fill="white"/>
                <rect x={padding} y={padding} width={size} height={size} fill="black"/>
              </mask>
            </defs>
            <g mask="url(#qrMask)">
              <path d={`M${padding/2} ${totalSize/4} 
                        C${padding/2} ${totalSize/5}, ${padding*1.5} ${padding}, ${padding*2} ${padding*1.5} 
                        L${padding*2} ${totalSize - padding*1.5}
                        C${padding*1.5} ${totalSize - padding}, ${padding/2} ${totalSize - totalSize/5}, ${padding/2} ${totalSize - totalSize/4}`} 
                    fill="none" stroke={options.codeColor} strokeWidth="2"/>
              
              <path d={`M${totalSize - padding/2} ${totalSize/4} 
                        C${totalSize - padding/2} ${totalSize/5}, ${totalSize - padding*1.5} ${padding}, ${totalSize - padding*2} ${padding*1.5} 
                        L${totalSize - padding*2} ${totalSize - padding*1.5}
                        C${totalSize - padding*1.5} ${totalSize - padding}, ${totalSize - padding/2} ${totalSize - totalSize/5}, ${totalSize - padding/2} ${totalSize - totalSize/4}`} 
                    fill="none" stroke={options.codeColor} strokeWidth="2"/>
              
              <circle cx={totalSize/2} cy={padding/2} r={padding/4} fill={options.codeColor} />
              <circle cx={totalSize/2} cy={totalSize - padding/2} r={padding/4} fill={options.codeColor} />
            </g>
          </svg>
        );
      case 'plate':
        return (
          <svg width={totalSize} height={totalSize} viewBox={`0 0 ${totalSize} ${totalSize}`} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <mask id="qrMask">
                <rect width={totalSize} height={totalSize} fill="white"/>
                <rect x={padding} y={padding} width={size} height={size} fill="black"/>
              </mask>
            </defs>
            <g mask="url(#qrMask)">
              <ellipse cx={totalSize/2} cy={totalSize/2} rx={totalSize/2 - 5} ry={totalSize/2 - 5} 
                fill="none" stroke={options.codeColor} strokeWidth="3" strokeDasharray="5,5"/>
              <ellipse cx={totalSize/2} cy={totalSize/2} rx={totalSize/2 - 15} ry={totalSize/2 - 15} 
                fill="none" stroke={options.codeColor} strokeWidth="1"/>
            </g>
          </svg>
        );
      case 'restaurant':
        return (
          <svg width={totalSize} height={totalSize} viewBox={`0 0 ${totalSize} ${totalSize}`} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <mask id="qrMask">
                <rect width={totalSize} height={totalSize} fill="white"/>
                <rect x={padding} y={padding} width={size} height={size} fill="black"/>
              </mask>
            </defs>
            <g mask="url(#qrMask)">
              <rect x="5" y="5" width={totalSize-10} height={totalSize-10} rx="10" ry="10" 
                fill="none" stroke={options.codeColor} strokeWidth="2"/>
              
              <path d={`M${padding/2} ${padding/2} L${padding*1.5} ${padding/2} L${padding*1.5} ${padding*1.5} L${padding/2} ${padding*1.5} Z`} 
                fill={options.codeColor} />
              <path d={`M${totalSize - padding/2} ${padding/2} L${totalSize - padding*1.5} ${padding/2} L${totalSize - padding*1.5} ${padding*1.5} L${totalSize - padding/2} ${padding*1.5} Z`} 
                fill={options.codeColor} />
              <path d={`M${padding/2} ${totalSize - padding/2} L${padding*1.5} ${totalSize - padding/2} L${padding*1.5} ${totalSize - padding*1.5} L${padding/2} ${totalSize - padding*1.5} Z`} 
                fill={options.codeColor} />
              <path d={`M${totalSize - padding/2} ${totalSize - padding/2} L${totalSize - padding*1.5} ${totalSize - padding/2} L${totalSize - padding*1.5} ${totalSize - padding*1.5} L${totalSize - padding/2} ${totalSize - padding*1.5} Z`} 
                fill={options.codeColor} />
            </g>
          </svg>
        );
      case 'menu':
        return (
          <svg width={totalSize} height={totalSize} viewBox={`0 0 ${totalSize} ${totalSize}`} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <mask id="qrMask">
                <rect width={totalSize} height={totalSize} fill="white"/>
                <rect x={padding} y={padding} width={size} height={size} fill="black"/>
              </mask>
            </defs>
            <g mask="url(#qrMask)">
              <rect x="5" y="5" width={totalSize-10} height={totalSize-10} rx="3" ry="3" 
                fill="none" stroke={options.codeColor} strokeWidth="2"/>
              
              <line x1="15" y1="15" x2="40" y2="15" stroke={options.codeColor} strokeWidth="2"/>
              <line x1="15" y1="25" x2="30" y2="25" stroke={options.codeColor} strokeWidth="2"/>
              
              <line x1={totalSize-15} y1="15" x2={totalSize-40} y2="15" stroke={options.codeColor} strokeWidth="2"/>
              <line x1={totalSize-15} y1="25" x2={totalSize-30} y2="25" stroke={options.codeColor} strokeWidth="2"/>
              
              <line x1="15" y1={totalSize-15} x2="40" y2={totalSize-15} stroke={options.codeColor} strokeWidth="2"/>
              <line x1="15" y1={totalSize-25} x2="30" y2={totalSize-25} stroke={options.codeColor} strokeWidth="2"/>
              
              <line x1={totalSize-15} y1={totalSize-15} x2={totalSize-40} y2={totalSize-15} stroke={options.codeColor} strokeWidth="2"/>
              <line x1={totalSize-15} y1={totalSize-25} x2={totalSize-30} y2={totalSize-25} stroke={options.codeColor} strokeWidth="2"/>
            </g>
          </svg>
        );
      default:
        return null;
    }
  };
  
  // Calculate styles based on props
  const containerStyle = getCardStyle();
  
  const qrContainerStyle = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...getAnimationStyle(),
  };
  
  const labelStyle = {
    marginTop: options.labelPosition === 'bottom' ? '12px' : '0',
    marginBottom: options.labelPosition === 'top' ? '12px' : '0',
    fontWeight: '500',
    color: options.labelColor,
    fontFamily: options.labelFont,
    fontSize: options.labelSize,
    textAlign: 'center',
  };
  
  const buttonStyle = {
    backgroundColor: options.codeColor,
    color: options.backgroundColor,
    border: 'none',
    borderRadius: '6px',
    padding: '10px 20px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginTop: '15px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '14px',
  };

  const tabStyle = {
    padding: '12px 18px',
    cursor: 'pointer',
    backgroundColor: '#f8f8f8',
    border: 'none',
    borderBottom: '2px solid transparent',
    transition: 'all 0.3s',
    margin: '0 5px',
    fontWeight: '500',
    borderRadius: '8px 8px 0 0',
  };

  const activeTabStyle = {
    ...tabStyle,
    borderBottom: '2px solid #000',
    backgroundColor: '#fff',
    boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
  };
  
  const colorPresetStyle = {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    margin: '5px',
    cursor: 'pointer',
    border: '2px solid transparent',
    transition: 'all 0.2s',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  };
  
  const selectedColorPresetStyle = {
    ...colorPresetStyle,
    transform: 'scale(1.2)',
    border: '2px solid #000',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
  };
  
  const shapeOptionStyle = {
    width: '42px',
    height: '42px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5px',
    cursor: 'pointer',
    border: '1px solid #eee',
    borderRadius: '8px',
    fontSize: '24px',
    transition: 'all 0.2s',
    backgroundColor: '#f8f8f8',
  };
  
  const selectedShapeOptionStyle = {
    ...shapeOptionStyle,
    backgroundColor: '#e8e8e8',
    border: '1px solid #333',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  };
  
  const logoOptionStyle = {
    width: '60px',
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5px',
    cursor: 'pointer',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    position: 'relative',
    transition: 'all 0.2s',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  };
  
  const selectedLogoOptionStyle = {
    ...logoOptionStyle,
    border: '2px solid #333',
    transform: 'scale(1.05)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  };
  
  const previewModeButtonStyle = {
    padding: '8px 15px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
    borderRadius: '6px',
    cursor: 'pointer',
    margin: '0 5px 15px 5px',
    transition: 'all 0.2s',
    fontSize: '13px',
  };
  
  const activePreviewModeButtonStyle = {
    ...previewModeButtonStyle,
    backgroundColor: '#333',
    color: 'white',
    border: '1px solid #333',
  };
  
  const suggestionCardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    margin: '8px 0',
    cursor: 'pointer',
    transition: 'all 0.2s',
    backgroundColor: '#f9f9f9',
  };
  
  const suggestionCardHoverStyle = {
    ...suggestionCardStyle,
    borderColor: '#999',
    backgroundColor: '#f0f0f0',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  };
  
  // Logo overlay style
  const LogoOverlay = () => {
    if (!options.logoUrl || !logoImage) return null;
    
    const centerPos = (options.size - options.logoSize) / 2;
    
    // Find the selected logo shape object
    const selectedLogoShape = qrCodeStyles.logoShapes.find(shape => shape.value === options.logoShape);
    const clipPath = selectedLogoShape ? selectedLogoShape.clipPath : 'circle(50% at center)';
    
    return (
      <div
        style={{
          position: 'absolute',
          top: centerPos,
          left: centerPos,
          width: options.logoSize,
          height: options.logoSize,
          backgroundColor: options.logoBackgroundColor,
          overflow: 'hidden',
          clipPath: clipPath,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        }}
      >
        <img
          src={options.logoUrl}
          alt="Logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
    );
  };
  
  const QRCodeComponent = () => {
    const getQROptions = () => {
      const qrOptions = {
        value: options.url,
        size: options.size,
        level: options.errorCorrectionLevel,
        bgColor: options.backgroundColor,
        fgColor: options.codeColor,
        imageSettings: options.logoUrl ? {
          src: options.logoUrl,
          excavate: true,
          width: options.logoSize,
          height: options.logoSize,
        } : undefined,
        style: { display: 'block' }
      };
      
      return qrOptions;
    };
    
    return (
      <div style={qrContainerStyle} ref={qrCodeRef}>
        {options.qrCodeFrame !== 'none' && getQrFrameSvg()}
        <QRCodeSVG {...getQROptions()} />
        <LogoOverlay />
      </div>
    );
  };
  
  // Custom color picker component
  const ColorPicker = ({ color, onChange, label }) => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <label style={{ marginRight: '10px', minWidth: '120px' }}>{label}:</label>
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: '40px', height: '40px', padding: '0', cursor: 'pointer', border: '1px solid #ddd', borderRadius: '4px' }}
      />
      <input
        type="text"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        style={{ marginLeft: '10px', padding: '5px', width: '80px', border: '1px solid #ddd', borderRadius: '4px' }}
      />
    </div>
  );
  
  // Range slider component
  const RangeSlider = ({ value, onChange, min, max, label, unit = '' }) => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <label style={{ marginRight: '10px', minWidth: '120px' }}>{label}:</label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        style={{ flexGrow: 1, maxWidth: '200px' }}
      />
      <span style={{ marginLeft: '10px', minWidth: '40px' }}>{value}{unit}</span>
    </div>
  );
  
  // Checkbox component
  const CheckBox = ({ checked, onChange, label }) => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          style={{ marginRight: '10px' }}
        />
        {label}
      </label>
    </div>
  );
  
  // Select component
  const Select = ({ value, onChange, options, label }) => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <label style={{ marginRight: '10px', minWidth: '120px' }}>{label}:</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', flexGrow: 1, maxWidth: '200px' }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
  
  // Text input component
  const TextInput = ({ value, onChange, label, placeholder = '' }) => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <label style={{ marginRight: '10px', minWidth: '120px' }}>{label}:</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', flexGrow: 1, maxWidth: '200px' }}
      />
    </div>
  );
  
  // Shape options component
  const ShapeOptions = ({ options, value, onChange, label }) => (
    <div style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', marginBottom: '8px' }}>{label}:</label>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {options.map((option) => (
          <div
            key={option.value}
            onClick={() => onChange(option.value)}
            style={value === option.value ? selectedShapeOptionStyle : shapeOptionStyle}
            title={option.name}
          >
            {option.icon}
          </div>
        ))}
      </div>
    </div>
  );
  
  // Logo options component
  const LogoOptions = ({ logos, selectedLogo, onSelect }) => (
    <div style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', marginBottom: '8px' }}>Select a Logo:</label>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {logos.map((logo, index) => (
          <div
            key={index}
            onClick={() => onSelect(logo.url)}
            style={selectedLogo === logo.url ? selectedLogoOptionStyle : logoOptionStyle}
            title={logo.name}
          >
            <img src={logo.url} alt={logo.name} style={{ maxWidth: '100%', maxHeight: '100%' }} />
          </div>
        ))}
      </div>
    </div>
  );
  
  // Color presets component
  const ColorPresets = ({ presets, selected, onSelect }) => (
    <div style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', marginBottom: '8px' }}>Color Presets:</label>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {presets.map((preset, index) => {
          const style = {
            ...(selected === preset.name ? selectedColorPresetStyle : colorPresetStyle),
            background: preset.gradientColors
              ? `linear-gradient(to right, ${preset.gradientColors[0]}, ${preset.gradientColors[1]})`
              : preset.codeColor,
          };
          
          return (
            <div
              key={index}
              onClick={() => onSelect(preset)}
              style={style}
              title={preset.name}
            />
          );
        })}
      </div>
    </div>
  );
  
  // Usage suggestions component
  const UsageSuggestions = ({ suggestions, onSelect }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    
    return (
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '8px' }}>Usage Suggestions:</label>
        <div>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => onSelect(suggestion)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={hoveredIndex === index ? suggestionCardHoverStyle : suggestionCardStyle}
            >
              <h4 style={{ margin: '0 0 5px 0' }}>{suggestion.name}</h4>
              <p style={{ margin: '0', fontSize: '13px', color: '#666' }}>{suggestion.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Preview mode component
  const PreviewModeSelector = ({ mode, onChange }) => (
    <div style={{ marginBottom: '15px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        <button
          style={mode === 'digital' ? activePreviewModeButtonStyle : previewModeButtonStyle}
          onClick={() => onChange('digital')}
        >
          Digital
        </button>
        <button
          style={mode === 'print' ? activePreviewModeButtonStyle : previewModeButtonStyle}
          onClick={() => onChange('print')}
        >
          Print
        </button>
        <button
          style={mode === 'table' ? activePreviewModeButtonStyle : previewModeButtonStyle}
          onClick={() => onChange('table')}
        >
          Table Tent
        </button>
      </div>
    </div>
  );
  
  // Get the appropriate preview background based on selected mode
  const getPreviewBackground = () => {
    switch(previewMode) {
      case 'digital':
        return {
          padding: '20px',
          background: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        };
      case 'print':
        return {
          padding: '40px',
          background: '#ffffff',
          boxShadow: '0 0 0 1px #ddd',
          position: 'relative'
        };
      case 'table':
        return {
          padding: '20px',
          background: 'linear-gradient(to bottom, #f8f8f8, #ffffff)',
          borderRadius: '10px 10px 0 0',
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          transform: 'perspective(800px) rotateX(20deg)',
          transformOrigin: 'bottom center',
          marginBottom: '40px'
        };
      default:
        return {
          padding: '20px'
        };
    }
  };
  
  // Handle download QR code as PNG
  const downloadQrCode = () => {
    if (qrCodeRef.current) {
      const svg = qrCodeRef.current.querySelector('svg');
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      // Calculate proper size with padding
      const padding = 20;
      const size = options.size + (padding * 2);
      
      canvas.width = size;
      canvas.height = size;
      
      img.onload = () => {
        // Fill with background color
        ctx.fillStyle = options.backgroundColor;
        ctx.fillRect(0, 0, size, size);
        
        // Draw QR code
        ctx.drawImage(img, padding, padding);
        
        // If we have a label
        if (options.showLabel) {
          ctx.font = `${options.labelSize} ${options.labelFont}`;
          ctx.fillStyle = options.labelColor;
          ctx.textAlign = 'center';
          
          if (options.labelPosition === 'bottom') {
            ctx.fillText(options.labelText, size / 2, size - 5);
          } else {
            ctx.fillText(options.labelText, size / 2, 15);
          }
        }
        
        // Download the image
        const dataUrl = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.download = `${restaurantName.replace(/\s+/g, '-').toLowerCase()}-qr-code.png`;
        a.href = dataUrl;
        a.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };
  
  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>QR Code Generator for {restaurantName}</h1>
      
      <div style={{ display: 'flex', flexDirection: window.innerWidth > 768 ? 'row' : 'column', gap: '30px' }}>
        {/* QR Code Preview */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ marginBottom: '20px' }}>Preview</h2>
          
          <PreviewModeSelector mode={previewMode} onChange={setPreviewMode} />
          
          <div style={getPreviewBackground()}>
            <div style={containerStyle}>
              {options.labelPosition === 'top' && options.showLabel && (
                <div style={labelStyle}>{options.labelText}</div>
              )}
              
              <QRCodeComponent />
              
              {options.labelPosition === 'bottom' && options.showLabel && (
                <div style={labelStyle}>{options.labelText}</div>
              )}
            </div>
          </div>
          
          <button 
            style={buttonStyle} 
            onClick={downloadQrCode}
          >
            Download QR Code
          </button>
        </div>
        
        {/* Configuration Panel */}
        <div style={{ flex: '1.5' }}>
          <h2 style={{ marginBottom: '20px' }}>Customize Your QR Code</h2>
          
          <div style={{ display: 'flex', borderBottom: '1px solid #ddd', marginBottom: '20px' }}>
            <button 
              style={activeTab === 'basic' ? activeTabStyle : tabStyle}
              onClick={() => setActiveTab('basic')}
            >
              Basic
            </button>
            <button 
              style={activeTab === 'design' ? activeTabStyle : tabStyle}
              onClick={() => setActiveTab('design')}
            >
              Design
            </button>
            <button 
              style={activeTab === 'style' ? activeTabStyle : tabStyle}
              onClick={() => setActiveTab('style')}
            >
              Style
            </button>
            <button 
              style={activeTab === 'presets' ? activeTabStyle : tabStyle}
              onClick={() => setActiveTab('presets')}
            >
              Presets
            </button>
          </div>
          
          <div style={{ padding: '10px' }}>
            {activeTab === 'basic' && (
              <>
                <TextInput 
                  label="QR Code URL" 
                  value={options.url} 
                  onChange={(value) => handleOptionChange('url', value)}
                  placeholder="https://example.com/menu"
                />
                
                <RangeSlider 
                  label="QR Code Size" 
                  value={options.size} 
                  onChange={(value) => handleOptionChange('size', value)} 
                  min={120} 
                  max={400}
                  unit="px"
                />
                
                <Select 
                  label="Error Correction" 
                  value={options.errorCorrectionLevel} 
                  onChange={(value) => handleOptionChange('errorCorrectionLevel', value)}
                  options={[
                    { name: 'Low (L)', value: 'L' },
                    { name: 'Medium (M)', value: 'M' },
                    { name: 'Quartile (Q)', value: 'Q' },
                    { name: 'High (H)', value: 'H' },
                  ]}
                />
                
                <CheckBox
                  label="Show Label"
                  checked={options.showLabel}
                  onChange={(checked) => handleOptionChange('showLabel', checked)}
                />
                
                {options.showLabel && (
                  <>
                    <TextInput 
                      label="Label Text" 
                      value={options.labelText} 
                      onChange={(value) => handleOptionChange('labelText', value)}
                    />
                    
                    <Select 
                      label="Label Position" 
                      value={options.labelPosition} 
                      onChange={(value) => handleOptionChange('labelPosition', value)}
                      options={[
                        { name: 'Bottom', value: 'bottom' },
                        { name: 'Top', value: 'top' },
                      ]}
                    />
                    
                    <ColorPicker 
                      label="Label Color" 
                      color={options.labelColor} 
                      onChange={(color) => handleOptionChange('labelColor', color)}
                    />
                    
                    <Select 
                      label="Label Font" 
                      value={options.labelFont} 
                      onChange={(value) => handleOptionChange('labelFont', value)}
                      options={[
                        { name: 'Sans-serif', value: 'Arial, sans-serif' },
                        { name: 'Serif', value: 'Georgia, serif' },
                        { name: 'Monospace', value: 'monospace' },
                        { name: 'Elegant', value: "'Times New Roman', serif" },
                        { name: 'Modern', value: "'Helvetica Neue', sans-serif" },
                      ]}
                    />
                    
                    <RangeSlider 
                      label="Label Size" 
                      value={parseInt(options.labelSize)} 
                      onChange={(value) => handleOptionChange('labelSize', `${value}px`)} 
                      min={10} 
                      max={20}
                      unit="px"
                    />
                  </>
                )}
              </>
            )}
            
            {activeTab === 'design' && (
              <>
                <ColorPicker 
                  label="QR Code Color" 
                  color={options.codeColor} 
                  onChange={(color) => handleOptionChange('codeColor', color)}
                />
                
                <ColorPicker 
                  label="Background Color" 
                  color={options.backgroundColor} 
                  onChange={(color) => handleOptionChange('backgroundColor', color)}
                />
                
                <CheckBox
                  label="Use Gradient Colors"
                  checked={options.gradientColors !== null}
                  onChange={toggleGradient}
                />
                
                {options.gradientColors && (
                  <>
                    <ColorPicker 
                      label="Gradient Start" 
                      color={options.gradientColors[0]} 
                      onChange={(color) => handleGradientChange(0, color)}
                    />
                    
                    <ColorPicker 
                      label="Gradient End" 
                      color={options.gradientColors[1]} 
                      onChange={(color) => handleGradientChange(1, color)}
                    />
                    
                    <Select 
                      label="Gradient Type" 
                      value={options.gradientType} 
                      onChange={(value) => handleOptionChange('gradientType', value)}
                      options={[
                        { name: 'Linear', value: 'linear' },
                        { name: 'Radial', value: 'radial' },
                      ]}
                    />
                  </>
                )}
                
                <ColorPresets 
                  presets={colorPresets} 
                  selected={selectedColorPreset}
                  onSelect={applyColorPreset}
                />
                
                <ShapeOptions
                  options={qrCodeStyles.cornerStyles}
                  value={options.cornerStyle}
                  onChange={(value) => handleOptionChange('cornerStyle', value)}
                  label="Corner Style"
                />
                
                <ShapeOptions
                  options={qrCodeStyles.dotStyles}
                  value={options.dotStyle}
                  onChange={(value) => handleOptionChange('dotStyle', value)}
                  label="Dot Style"
                />
                
                <CheckBox
                  label="Add Logo"
                  checked={options.logoUrl !== ''}
                  onChange={(checked) => handleOptionChange('logoUrl', checked ? preloadedLogos[0].url : '')}
                />
                
                {options.logoUrl && (
                  <>
                    <LogoOptions
                      logos={preloadedLogos}
                      selectedLogo={options.logoUrl}
                      onSelect={(url) => handleOptionChange('logoUrl', url)}
                    />
                    
                    <button
                      onClick={() => fileInputRef.current.click()}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#f0f0f0',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginBottom: '15px',
                      }}
                    >
                      Upload Custom Logo
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleLogoUpload}
                      style={{ display: 'none' }}
                      accept="image/*"
                    />
                    
                    <RangeSlider 
                      label="Logo Size" 
                      value={options.logoSize} 
                      onChange={(value) => handleOptionChange('logoSize', value)} 
                      min={30} 
                      max={120}
                      unit="px"
                    />
                    
                    <ShapeOptions
                      options={qrCodeStyles.logoShapes}
                      value={options.logoShape}
                      onChange={(value) => handleOptionChange('logoShape', value)}
                      label="Logo Shape"
                    />
                    
                    <ColorPicker 
                      label="Logo Background" 
                      color={options.logoBackgroundColor} 
                      onChange={(color) => handleOptionChange('logoBackgroundColor', color)}
                    />
                  </>
                )}
              </>
            )}
            
            {activeTab === 'style' && (
              <>
                <Select 
                  label="Card Style" 
                  value={options.cardStyle} 
                  onChange={(value) => handleOptionChange('cardStyle', value)}
                  options={cardStyles}
                />
                
                <Select 
                  label="Animation" 
                  value={options.animation} 
                  onChange={(value) => handleOptionChange('animation', value)}
                  options={animationStyles}
                />
                
                <Select 
                  label="QR Frame" 
                  value={options.qrCodeFrame} 
                  onChange={(value) => handleOptionChange('qrCodeFrame', value)}
                  options={frameStyles}
                />
                
                <CheckBox
                  label="Show Border"
                  checked={options.showBorder}
                  onChange={(checked) => handleOptionChange('showBorder', checked)}
                />
                
                {options.showBorder && (
                  <>
                    <ColorPicker 
                      label="Border Color" 
                      color={options.borderColor} 
                      onChange={(color) => handleOptionChange('borderColor', color)}
                    />
                    
                    <RangeSlider 
                      label="Border Size" 
                      value={options.borderSize} 
                      onChange={(value) => handleOptionChange('borderSize', value)} 
                      min={1} 
                      max={8}
                      unit="px"
                    />
                    
                    <RangeSlider 
                      label="Border Radius" 
                      value={options.borderRadius} 
                      onChange={(value) => handleOptionChange('borderRadius', value)} 
                      min={0} 
                      max={20}
                      unit="px"
                    />
                  </>
                )}
                
                <CheckBox
                  label="Show Shadow"
                  checked={options.showShadow}
                  onChange={(checked) => handleOptionChange('showShadow', checked)}
                />
                
                {options.showShadow && (
                  <ColorPicker 
                    label="Shadow Color" 
                    color={options.shadowColor} 
                    onChange={(color) => handleOptionChange('shadowColor', color)}
                  />
                )}
              </>
            )}
            
            {activeTab === 'presets' && (
              <UsageSuggestions
                suggestions={usageSuggestions}
                onSelect={(suggestion) => applyUsageSuggestion(suggestion)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;