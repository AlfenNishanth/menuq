import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import { ChromePicker } from 'react-color';
import { 
  Coffee, Utensils, Wine, Beer, Pizza, 
  IceCream, Cake, Salad, Sandwich, Fish
} from 'lucide-react';

const QRCodeGenerator = () => {
  const { id } = useParams();
  const qrRef = useRef(null);
  const baseUrl = window.location.origin;
  const qrValue = `${baseUrl}/menu/${id}`;
  
  // Custom state
  const [qrOptions, setQrOptions] = useState({
    bgColor: '#FFFFFF',
    fgColor: '#B45309', // amber-700
    shape: 'square',
    size: 256,
    logoImage: null,
    logoSize: 60,
    includeLogo: false,
    includeCustomLogo: false,
    selectedPresetLogo: 'food',
    restaurantName: '',
    downloadFormat: 'png',
    errorCorrectionLevel: 'H',
    logoBackgroundColor: '#FFFFFF',
    logoPosition: 'center',
    borderColor: '#B45309',
    borderSize: 0,
    shapeType: 'basic', // basic, food, drink, or restaurant
    customShape: 'square', // Name of the selected shape
  });
  
  const [displayColorPicker, setDisplayColorPicker] = useState({
    fgColor: false,
    bgColor: false,
    logoBgColor: false,
    borderColor: false
  });

  // Preset logo options
  const presetLogos = {
    food: <Utensils size={qrOptions.logoSize} color={qrOptions.fgColor} />,
    coffee: <Coffee size={qrOptions.logoSize} color={qrOptions.fgColor} />,
    wine: <Wine size={qrOptions.logoSize} color={qrOptions.fgColor} />,
    beer: <Beer size={qrOptions.logoSize} color={qrOptions.fgColor} />,
    pizza: <Pizza size={qrOptions.logoSize} color={qrOptions.fgColor} />,
    icecream: <IceCream size={qrOptions.logoSize} color={qrOptions.fgColor} />,
    cake: <Cake size={qrOptions.logoSize} color={qrOptions.fgColor} />,
    salad: <Salad size={qrOptions.logoSize} color={qrOptions.fgColor} />,
    sandwich: <Sandwich size={qrOptions.logoSize} color={qrOptions.fgColor} />,
    seafood: <Fish size={qrOptions.logoSize} color={qrOptions.fgColor} />
  };

  // QR Code shape templates
  const shapeTemplates = {
    basic: [
      { id: 'square', label: 'Square', path: null },
      { id: 'circle', label: 'Circle', path: null },
      { id: 'rounded', label: 'Rounded', path: null },
      { id: 'hexagon', label: 'Hexagon', path: "M50,0 L93.3,25 L93.3,75 L50,100 L6.7,75 L6.7,25 Z" },
      { id: 'diamond', label: 'Diamond', path: "M50,0 L100,50 L50,100 L0,50 Z" },
    ],
    food: [
      { id: 'pizza', label: 'Pizza', path: "M50,0 C77.6,0 100,22.4 100,50 C100,77.6 77.6,100 50,100 C22.4,100 0,77.6 0,50 C0,22.4 22.4,0 50,0 Z M50,10 L10,70 L90,70 Z" },
      { id: 'cupcake', label: 'Cupcake', path: "M15,40 Q15,20 50,20 Q85,20 85,40 L85,85 Q85,100 50,100 Q15,100 15,85 Z M15,40 L85,40 Z" },
      { id: 'burger', label: 'Burger', path: "M10,35 Q10,20 50,20 Q90,20 90,35 L90,45 Q90,55 50,55 Q10,55 10,45 Z M10,55 L90,55 L90,85 Q90,100 50,100 Q10,100 10,85 Z" },
      { id: 'bowl', label: 'Bowl', path: "M10,50 Q50,20 90,50 L90,85 Q90,100 50,100 Q10,100 10,85 Z" },
    ],
    drink: [
      { id: 'coffee-cup', label: 'Coffee Cup', path: "M20,20 L80,20 L70,90 Q60,100 50,100 Q40,100 30,90 Z M80,20 Q90,25 90,35 Q80,40 80,35 Z" },
      { id: 'wine-glass', label: 'Wine Glass', path: "M35,15 L65,15 L75,50 Q80,80 50,95 Q20,80 25,50 Z M35,15 L35,0 L65,0 L65,15 Z" },
      { id: 'cocktail', label: 'Cocktail', path: "M10,10 L90,10 L50,70 L50,90 L65,90 L65,100 L35,100 L35,90 L50,90 L50,70 Z" },
      { id: 'beer-mug', label: 'Beer Mug', path: "M25,10 L75,10 L75,80 Q75,100 50,100 Q25,100 25,80 Z M75,10 Q95,15 95,40 L85,40 Q85,30 75,25 Z" },
    ],
    restaurant: [
      { id: 'plate', label: 'Plate', path: "M50,0 C77.6,0 100,22.4 100,50 C100,77.6 77.6,100 50,100 C22.4,100 0,77.6 0,50 C0,22.4 22.4,0 50,0 Z M50,20 C63.3,20 74,30.7 74,44 C74,57.3 63.3,68 50,68 C36.7,68 26,57.3 26,44 C26,30.7 36.7,20 50,20 Z" },
      { id: 'chef-hat', label: 'Chef Hat', path: "M25,50 Q25,30 50,30 Q75,30 75,50 Q90,50 90,70 Q90,80 75,80 L25,80 Q10,80 10,70 Q10,50 25,50 Z M25,80 L25,100 L75,100 L75,80 Z" },
      { id: 'menu-card', label: 'Menu Card', path: "M20,0 L80,0 L80,100 L20,100 Z M30,20 L70,20 M30,40 L70,40 M30,60 L70,60 M30,80 L70,80" },
      { id: 'table-setting', label: 'Table Setting', path: "M10,10 L90,10 L90,90 L10,90 Z M30,30 C30,40 40,50 50,50 C60,50 70,40 70,30 M50,50 L50,70 M30,70 L70,70" },
    ]
  };

  // Handle custom logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setQrOptions({
          ...qrOptions,
          logoImage: e.target.result,
          includeCustomLogo: true,
          includeLogo: false
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Get logo position styles based on selected position
  const getLogoPositionStyle = () => {
    const baseStyle = {
      position: 'absolute',
      background: qrOptions.logoBackgroundColor,
      borderRadius: '50%',
      padding: '8px'
    };
    
    switch(qrOptions.logoPosition) {
      case 'topLeft':
        return { ...baseStyle, top: '25%', left: '25%', transform: 'translate(-50%, -50%)' };
      case 'topRight':
        return { ...baseStyle, top: '25%', left: '75%', transform: 'translate(-50%, -50%)' };
      case 'bottomLeft':
        return { ...baseStyle, top: '75%', left: '25%', transform: 'translate(-50%, -50%)' };
      case 'bottomRight':
        return { ...baseStyle, top: '75%', left: '75%', transform: 'translate(-50%, -50%)' };
      case 'center':
      default:
        return { ...baseStyle, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }
  };

  // Download QR code
  const downloadQRCode = () => {
    if (!qrRef.current) return;
    
    const canvas = qrRef.current.querySelector('canvas');
    const qrCanvas = document.createElement('canvas');
    const ctx = qrCanvas.getContext('2d');
    const padding = 40;
    
    // Set canvas size with padding for text
    qrCanvas.width = canvas.width + padding * 2 + (qrOptions.borderSize * 2);
    qrCanvas.height = canvas.height + padding * (qrOptions.restaurantName ? 3 : 2.5) + (qrOptions.borderSize * 2);
    
    // Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, qrCanvas.width, qrCanvas.height);
    
    // Border if enabled
    if (qrOptions.borderSize > 0) {
      ctx.fillStyle = qrOptions.borderColor;
      ctx.fillRect(
        padding - qrOptions.borderSize, 
        padding - qrOptions.borderSize, 
        canvas.width + (qrOptions.borderSize * 2), 
        canvas.height + (qrOptions.borderSize * 2)
      );
    }
    
    // Draw QR code
    ctx.drawImage(canvas, padding, padding);
    
    // Add restaurant name if provided
    if (qrOptions.restaurantName) {
      ctx.font = 'bold 20px serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#1F2937'; // gray-800
      ctx.fillText(qrOptions.restaurantName, qrCanvas.width / 2, canvas.height + padding * 1.5);
    }
    
    // Add MenuQ branding
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillStyle = '#B45309'; // amber-700
    ctx.fillText('Powered by ', qrCanvas.width / 2, qrCanvas.height - padding / 2);
    
    // Load and draw the logo
    const logo = new Image();
    logo.onload = () => {
      // Draw the logo next to the text
      const logoHeight = 20; // Adjust as needed
      const logoWidth = (logoHeight * logo.width) / logo.height; // Maintain aspect ratio
      
      ctx.drawImage(
        logo, 
        qrCanvas.width / 2 + 5, // Add some space after the text
        qrCanvas.height - padding / 2 - logoHeight + 4, // Vertical alignment with text
        logoWidth, 
        logoHeight
      );
        // Download
        const link = document.createElement('a');
        link.download = `menuq-${id}.${qrOptions.downloadFormat}`;
        link.href = qrCanvas.toDataURL(`image/${qrOptions.downloadFormat}`);
        link.click();
    };
    logo.src = "/short_logo-removebg.png"; 
  };

  // Apply custom shape to QR code
  const renderCustomShape = () => {
    // Find the selected shape from templates
    let shapePath = null;
    let shapeCategory = qrOptions.shapeType;
    let shapeId = qrOptions.customShape;
    
    // Handle basic shapes separately
    if (shapeCategory === 'basic' && (shapeId === 'square' || shapeId === 'circle' || shapeId === 'rounded')) {
      return null; // These are handled with CSS instead of SVG
    }
    
    // Find the selected shape from templates
    for (const category in shapeTemplates) {
      for (const shape of shapeTemplates[category]) {
        if (shapeCategory === category && shapeId === shape.id) {
          shapePath = shape.path;
          break;
        }
      }
    }
    
    if (!shapePath) return null;
    
    return (
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 100 100" 
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 10 }}
      >
        <defs>
          <clipPath id="shapeClip">
            <path d={shapePath} />
          </clipPath>
        </defs>
        <path 
          d={shapePath} 
          fill="none" 
          stroke={qrOptions.borderColor} 
          strokeWidth={qrOptions.borderSize > 0 ? qrOptions.borderSize : 0} 
        />
      </svg>
    );
  };

  // QR code shape options
  const renderQRCode = () => {
    // Determine the shape class
    let shapeClass = '';
    if (qrOptions.shapeType === 'basic') {
      if (qrOptions.customShape === 'circle') {
        shapeClass = 'rounded-full';
      } else if (qrOptions.customShape === 'rounded') {
        shapeClass = 'rounded-lg';
      }
    }
    
    // Check if using an SVG clip-path
    const useClipPath = !(qrOptions.shapeType === 'basic' && 
                         (qrOptions.customShape === 'square' || 
                          qrOptions.customShape === 'circle' || 
                          qrOptions.customShape === 'rounded'));
    
    return (
      <div className="relative" ref={qrRef}>
        <div 
          className={`relative ${shapeClass} overflow-hidden`}
          style={{
            border: qrOptions.borderSize > 0 && !useClipPath ? 
                   `${qrOptions.borderSize}px solid ${qrOptions.borderColor}` : 'none',
            clipPath: useClipPath ? 'url(#shapeClip)' : 'none'
          }}
        >
          <QRCodeCanvas
            value={qrValue}
            size={qrOptions.size}
            bgColor={qrOptions.bgColor}
            fgColor={qrOptions.fgColor}
            level={qrOptions.errorCorrectionLevel}
            includeMargin={true}
            imageSettings={
              (qrOptions.includeLogo || qrOptions.includeCustomLogo) ? {
                src: qrOptions.includeCustomLogo ? qrOptions.logoImage : null,
                excavate: true,
                width: qrOptions.logoSize,
                height: qrOptions.logoSize
              } : undefined
            }
          />
        </div>
        
        {/* Apply SVG shape overlay */}
        {renderCustomShape()}
        
        {/* Add logo overlay */}
        {qrOptions.includeLogo && !qrOptions.includeCustomLogo && (
          <div style={getLogoPositionStyle()}>
            {presetLogos[qrOptions.selectedPresetLogo]}
          </div>
        )}
      </div>
    );
  };

  // Toggle color picker
  const toggleColorPicker = (pickerName) => {
    setDisplayColorPicker({
      ...displayColorPicker,
      [pickerName]: !displayColorPicker[pickerName]
    });
  };

  // Render color picker component
  const renderColorPicker = (label, colorValue, pickerName, onChange) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <div className="relative">
          <button
            className="w-full p-2 border border-gray-200 rounded-md flex justify-between items-center"
            onClick={() => toggleColorPicker(pickerName)}
            type="button"
          >
            <span>Select Color</span>
            <div className="w-6 h-6 rounded" style={{ backgroundColor: colorValue }}></div>
          </button>
          {displayColorPicker[pickerName] && (
            <div className="absolute z-10 mt-2">
              <div className="fixed inset-0" onClick={() => toggleColorPicker(pickerName)} />
              <ChromePicker
                color={colorValue}
                onChange={(color) => onChange(color.hex)}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render shape template buttons
  const renderShapeButtons = (category) => {
    return (
      <div className="grid grid-cols-4 gap-2 mb-4">
        {shapeTemplates[category].map(shape => (
          <button
            key={shape.id}
            type="button"
            className={`p-2 border rounded-md flex items-center justify-center
              ${qrOptions.shapeType === category && qrOptions.customShape === shape.id 
                ? 'border-amber-600 bg-amber-50' 
                : 'border-gray-200'}`}
            onClick={() => setQrOptions({
              ...qrOptions, 
              shapeType: category, 
              customShape: shape.id
            })}
            title={shape.label}
          >
            {shape.id === 'square' ? (
              <div className="w-8 h-8 bg-gray-400"></div>
            ) : shape.id === 'circle' ? (
              <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
            ) : shape.id === 'rounded' ? (
              <div className="w-8 h-8 bg-gray-400 rounded-lg"></div>
            ) : (
              <svg width="32" height="32" viewBox="0 0 100 100">
                <path d={shape.path} fill="#9CA3AF" />
              </svg>
            )}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-serif font-bold text-amber-700 mb-6 text-center">
          Customize Your Menu QR Code
        </h1>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Create a unique QR code that reflects your brand and style. Customers will scan this to view your digital menu.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Preview Panel */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-100">
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">Preview</h2>
            <div className="flex flex-col items-center">
              <div className="p-6 bg-white shadow-md">
                {renderQRCode()}
              </div>
              {qrOptions.restaurantName && (
                <p className="mt-4 text-lg font-bold text-gray-800">{qrOptions.restaurantName}</p>
              )}
              <p className="text-sm text-amber-700 mt-2 flex items-center space-x-2">
                <span>Powered by</span>
                <img src="/short_logo-removebg.png" alt="MenuQ Logo" className="h-6 w-auto" />
              </p>
              
              <button
                onClick={downloadQRCode}
                type="button"
                className="mt-8 px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors flex items-center"
              >
                Download QR Code
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Customization Panel */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-100 overflow-y-auto max-h-screen">
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">Customize</h2>
            
            {/* QR Shape Options */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">QR Code Shape</h3>
              
              {/* Shape Category Tabs */}
              <div className="flex border-b border-gray-200 mb-4">
                {Object.keys(shapeTemplates).map(category => (
                  <button
                    key={category}
                    type="button"
                    className={`py-2 px-4 font-medium text-sm capitalize
                      ${qrOptions.shapeType === category 
                        ? 'border-b-2 border-amber-600 text-amber-700' 
                        : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setQrOptions({
                      ...qrOptions, 
                      shapeType: category, 
                      customShape: shapeTemplates[category][0].id
                    })}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              {/* Shape Options */}
              {renderShapeButtons(qrOptions.shapeType)}
            </div>
            
            {/* Colors */}
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Colors</h3>
              
              {/* QR Color */}
              {renderColorPicker(
                "QR Code Color", 
                qrOptions.fgColor, 
                "fgColor", 
                (color) => setQrOptions({...qrOptions, fgColor: color})
              )}
              
              {/* Background Color */}
              {renderColorPicker(
                "Background Color", 
                qrOptions.bgColor, 
                "bgColor", 
                (color) => setQrOptions({...qrOptions, bgColor: color})
              )}
              
              {/* Border Options */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Border Size (px)</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={qrOptions.borderSize}
                  onChange={(e) => setQrOptions({...qrOptions, borderSize: Number(e.target.value)})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>
              
              {qrOptions.borderSize > 0 && (
                renderColorPicker(
                  "Border Color", 
                  qrOptions.borderColor, 
                  "borderColor", 
                  (color) => setQrOptions({...qrOptions, borderColor: color})
                )
              )}
            </div>
            
            {/* Size & Error Correction */}
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Size & Quality</h3>
              
              {/* Size */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Size: {qrOptions.size}px</label>
                <input
                  type="range"
                  min="128"
                  max="512"
                  step="32"
                  value={qrOptions.size}
                  onChange={(e) => setQrOptions({...qrOptions, size: Number(e.target.value)})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>128px</span>
                  <span>320px</span>
                  <span>512px</span>
                </div>
              </div>
              
              {/* Error Correction Level */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Error Correction Level</label>
                <select
                  value={qrOptions.errorCorrectionLevel}
                  onChange={(e) => setQrOptions({...qrOptions, errorCorrectionLevel: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="L">Low (7%)</option>
                  <option value="M">Medium (15%)</option>
                  <option value="Q">Quartile (25%)</option>
                  <option value="H">High (30%)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Higher levels make the QR code more reliable even if damaged or dirty.</p>
              </div>
            </div>
            
            {/* Logo Options */}
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Logo</h3>
              
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="includeLogo"
                  checked={qrOptions.includeLogo}
                  onChange={() => setQrOptions({
                    ...qrOptions,
                    includeLogo: !qrOptions.includeLogo,
                    includeCustomLogo: false
                  })}
                  className="h-4 w-4 text-amber-600"
                />
                <label htmlFor="includeLogo" className="ml-2 text-sm text-gray-600">
                  Use preset logo
                </label>
              </div>
              
              {qrOptions.includeLogo && (
                <>
                  <div className="grid grid-cols-5 gap-2 mb-4">
                    {Object.keys(presetLogos).map(logo => (
                      <button
                        key={logo}
                        type="button"
                        className={`p-2 border rounded-md flex items-center justify-center 
                          ${qrOptions.selectedPresetLogo === logo ? 'border-amber-600 bg-amber-50' : 'border-gray-200'}`}
                        onClick={() => setQrOptions({...qrOptions, selectedPresetLogo: logo})}
                      >
                        {React.cloneElement(presetLogos[logo], { size: 24 })}
                      </button>
                    ))}
                  </div>
                  
                  {/* Logo Size */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo Size: {qrOptions.logoSize}px</label>
                    <input
                      type="range"
                      min="40"
                      max="100"
                      step="5"
                      value={qrOptions.logoSize}
                      onChange={(e) => setQrOptions({...qrOptions, logoSize: Number(e.target.value)})}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  
                  {/* Logo Position */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo Position</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['topLeft', 'center', 'topRight', 'bottomLeft', 'bottomRight'].map((position, index) => {
                        const positionName = position === 'topLeft' ? 'Top Left' :
                                           position === 'topRight' ? 'Top Right' :
                                           position === 'bottomLeft' ? 'Bottom Left' :
                                           position === 'bottomRight' ? 'Bottom Right' : 'Center';
                        return (
                          <button
                            key={position}
                            type="button"
                            className={`p-2 border rounded-md flex items-center justify-center
                              ${qrOptions.logoPosition === position ? 'border-amber-600 bg-amber-50' : 'border-gray-200'}`}
                            onClick={() => setQrOptions({...qrOptions, logoPosition: position})}
                            title={positionName}
                          >
                            <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Logo Background Color */}
                  {renderColorPicker(
                    "Logo Background Color", 
                    qrOptions.logoBackgroundColor, 
                    "logoBgColor", 
                    (color) => setQrOptions({...qrOptions, logoBackgroundColor: color})
                  )}
                </>
              )}
              
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="includeCustomLogo"
                  checked={qrOptions.includeCustomLogo}
                  onChange={() => setQrOptions({
                    ...qrOptions, 
                    includeCustomLogo: !qrOptions.includeCustomLogo,
                    includeLogo: false
                  })}
                  className="h-4 w-4 text-amber-600"
                />
                <label htmlFor="includeCustomLogo" className="ml-2 text-sm text-gray-600">
                  Upload custom logo
                </label>
                </div>
                
                {qrOptions.includeCustomLogo && (
                  <div className="mb-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                    />
                    <p className="text-xs text-gray-500 mt-1">Maximum size: 2MB. Recommended format: PNG with transparency.</p>
                    
                    {/* Logo Size */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Logo Size: {qrOptions.logoSize}px</label>
                      <input
                        type="range"
                        min="40"
                        max="100"
                        step="5"
                        value={qrOptions.logoSize}
                        onChange={(e) => setQrOptions({...qrOptions, logoSize: Number(e.target.value)})}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                )}
                </div>
                
                {/* Restaurant Name & Download Options */}
                <div className="border-t border-gray-200 pt-6 mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Final Touches</h3>
                  
                  {/* Restaurant Name */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Restaurant Name (Optional)</label>
                    <input
                      type="text"
                      value={qrOptions.restaurantName}
                      onChange={(e) => setQrOptions({...qrOptions, restaurantName: e.target.value})}
                      placeholder="Enter your restaurant name"
                      className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">This will appear below the QR code in the downloaded image.</p>
                  </div>
                  
                  {/* Download Format */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Download Format</label>
                    <select
                      value={qrOptions.downloadFormat}
                      onChange={(e) => setQrOptions({...qrOptions, downloadFormat: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="png">PNG (Recommended)</option>
                      <option value="jpeg">JPEG</option>
                    </select>
                  </div>
                  
                  <button
                    onClick={downloadQRCode}
                    type="button"
                    className="w-full mt-4 px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors flex items-center justify-center"
                  >
                    Download QR Code
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </div>
                
                {/* Print Tips */}
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                  <h3 className="text-lg font-medium text-amber-800 mb-2">Print Tips</h3>
                  <ul className="text-sm text-amber-700 space-y-2">
                    <li>• Use high-quality paper for better scanning results</li>
                    <li>• Print at actual size (100% scale)</li>
                    <li>• For table tents, we recommend at least 3" x 3" size</li>
                    <li>• Always test scan before mass printing</li>
                  </ul>
                </div>
                </div>
                </div>
                </div>
                </div>
                );
                };
                
                export default QRCodeGenerator;