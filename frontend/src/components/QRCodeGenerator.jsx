import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { ChromePicker } from "react-color";
import config from "../../config";
import { useAuth } from "../contexts/AuthContext";
import {
  Coffee,
  Utensils,
  Wine,
  Beer,
  Pizza,
  IceCream,
  Cake,
  Salad,
  Sandwich,
  Fish,
} from "lucide-react";

const QRCodeGenerator = () => {

  const { loading: AuthLoading, userData } = useAuth();

  if (AuthLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 relative">
          <div className="absolute inset-0 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
          <div className="absolute inset-3 border-2 border-amber-100 border-b-amber-400 rounded-full animate-spin-slow"></div>
        </div>
        <p className="mt-6 text-amber-800 font-medium">Loading </p>
      </div>
    );
  }

  const id = userData.restaurantId;
  const qrRef = useRef(null);
  // const baseUrl = window.location.origin;
  // console.log(currentUser);
  console.log(userData);
  console.log(id)
  const qrValue = `${config.QR_URL}/${id}`;

  // Custom state
  const [qrOptions, setQrOptions] = useState({
    bgColor: "#FFFFFF",
    fgColor: "#B45309", // amber-700
    shape: "square",
    size: 256,
    logoImage: null,
    logoSize: 60,
    includeLogo: false,
    includeCustomLogo: false,
    selectedPresetLogo: "food",
    restaurantName: "",
    downloadFormat: "png",
    errorCorrectionLevel: "H",
    logoBackgroundColor: "#FFFFFF",
    logoPosition: "center",
    borderColor: "#B45309",
    borderSize: 0,
    shapeType: "basic", // basic, food, drink, or restaurant
    customShape: "square", // Name of the selected shape
  });

  const [displayColorPicker, setDisplayColorPicker] = useState({
    fgColor: false,
    bgColor: false,
    logoBgColor: false,
    borderColor: false,
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
    seafood: <Fish size={qrOptions.logoSize} color={qrOptions.fgColor} />,
  };

  // QR Code shape templates
  // have to put this remaining different shapes in future updates
  const shapeTemplates = {
    basic: [
      { id: "square", label: "Square", path: null },
      { id: "circle", label: "Circle", path: null },
      { id: "rounded", label: "Rounded", path: null },
      // { id: 'hexagon', label: 'Hexagon', path: "M50,0 L93.3,25 L93.3,75 L50,100 L6.7,75 L6.7,25 Z" },
      // { id: 'diamond', label: 'Diamond', path: "M50,0 L100,50 L50,100 L0,50 Z" },
    ],
    // food: [
    //   { id: 'pizza', label: 'Pizza', path: "M50,0 C77.6,0 100,22.4 100,50 C100,77.6 77.6,100 50,100 C22.4,100 0,77.6 0,50 C0,22.4 22.4,0 50,0 Z M50,10 L10,70 L90,70 Z" },
    //   { id: 'cupcake', label: 'Cupcake', path: "M15,40 Q15,20 50,20 Q85,20 85,40 L85,85 Q85,100 50,100 Q15,100 15,85 Z M15,40 L85,40 Z" },
    //   { id: 'burger', label: 'Burger', path: "M10,35 Q10,20 50,20 Q90,20 90,35 L90,45 Q90,55 50,55 Q10,55 10,45 Z M10,55 L90,55 L90,85 Q90,100 50,100 Q10,100 10,85 Z" },
    //   { id: 'bowl', label: 'Bowl', path: "M10,50 Q50,20 90,50 L90,85 Q90,100 50,100 Q10,100 10,85 Z" },
    // ],
    // drink: [
    //   { id: 'coffee-cup', label: 'Coffee Cup', path: "M20,20 L80,20 L70,90 Q60,100 50,100 Q40,100 30,90 Z M80,20 Q90,25 90,35 Q80,40 80,35 Z" },
    //   { id: 'wine-glass', label: 'Wine Glass', path: "M35,15 L65,15 L75,50 Q80,80 50,95 Q20,80 25,50 Z M35,15 L35,0 L65,0 L65,15 Z" },
    //   { id: 'cocktail', label: 'Cocktail', path: "M10,10 L90,10 L50,70 L50,90 L65,90 L65,100 L35,100 L35,90 L50,90 L50,70 Z" },
    //   { id: 'beer-mug', label: 'Beer Mug', path: "M25,10 L75,10 L75,80 Q75,100 50,100 Q25,100 25,80 Z M75,10 Q95,15 95,40 L85,40 Q85,30 75,25 Z" },
    // ],
    // restaurant: [
    //   { id: 'plate', label: 'Plate', path: "M50,0 C77.6,0 100,22.4 100,50 C100,77.6 77.6,100 50,100 C22.4,100 0,77.6 0,50 C0,22.4 22.4,0 50,0 Z M50,20 C63.3,20 74,30.7 74,44 C74,57.3 63.3,68 50,68 C36.7,68 26,57.3 26,44 C26,30.7 36.7,20 50,20 Z" },
    //   { id: 'chef-hat', label: 'Chef Hat', path: "M25,50 Q25,30 50,30 Q75,30 75,50 Q90,50 90,70 Q90,80 75,80 L25,80 Q10,80 10,70 Q10,50 25,50 Z M25,80 L25,100 L75,100 L75,80 Z" },
    //   { id: 'menu-card', label: 'Menu Card', path: "M20,0 L80,0 L80,100 L20,100 Z M30,20 L70,20 M30,40 L70,40 M30,60 L70,60 M30,80 L70,80" },
    //   { id: 'table-setting', label: 'Table Setting', path: "M10,10 L90,10 L90,90 L10,90 Z M30,30 C30,40 40,50 50,50 C60,50 70,40 70,30 M50,50 L50,70 M30,70 L70,70" },
    // ]
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
          includeLogo: false,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Get logo position styles based on selected position
  const getLogoPositionStyle = () => {
    const baseStyle = {
      position: "absolute",
      background: qrOptions.logoBackgroundColor,
      borderRadius: "50%",
      padding: "8px",
    };

    switch (qrOptions.logoPosition) {
      case "topLeft":
        return {
          ...baseStyle,
          top: "25%",
          left: "25%",
          transform: "translate(-50%, -50%)",
        };
      case "topRight":
        return {
          ...baseStyle,
          top: "25%",
          left: "75%",
          transform: "translate(-50%, -50%)",
        };
      case "bottomLeft":
        return {
          ...baseStyle,
          top: "75%",
          left: "25%",
          transform: "translate(-50%, -50%)",
        };
      case "bottomRight":
        return {
          ...baseStyle,
          top: "75%",
          left: "75%",
          transform: "translate(-50%, -50%)",
        };
      case "center":
      default:
        return {
          ...baseStyle,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        };
    }
  };

  // Download QR code with logo
  const downloadQRCode = () => {
    if (!qrRef.current) return;

    // Create a new canvas to include the QR code with the custom shape
    const qrCanvas = document.createElement("canvas");
    const ctx = qrCanvas.getContext("2d");
    const padding = 40;

    // Get the original QR canvas
    const originalCanvas = qrRef.current.querySelector("canvas");
    if (!originalCanvas) return;

    // Set canvas size with padding for text
    qrCanvas.width =
      originalCanvas.width + padding * 2 + qrOptions.borderSize * 2;
    qrCanvas.height =
      originalCanvas.height +
      padding * (qrOptions.restaurantName ? 3 : 2.5) +
      qrOptions.borderSize * 2;

    // Background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, qrCanvas.width, qrCanvas.height);

    // Create a temporary canvas for the shaped QR code
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    tempCanvas.width = originalCanvas.width;
    tempCanvas.height = originalCanvas.height;

    // Draw the original QR code to the temp canvas
    tempCtx.drawImage(originalCanvas, 0, 0);

    // Apply shape if not a basic shape that's handled with CSS
    if (
      !(
        qrOptions.shapeType === "basic" &&
        (qrOptions.customShape === "square" ||
          qrOptions.customShape === "circle" ||
          qrOptions.customShape === "rounded")
      )
    ) {
      // Find the shape path
      let shapePath = null;
      for (const shape of shapeTemplates[qrOptions.shapeType]) {
        if (shape.id === qrOptions.customShape) {
          shapePath = shape.path;
          break;
        }
      }

      if (shapePath) {
        // Create a path for clipping
        tempCtx.save();
        tempCtx.beginPath();

        const path = new Path2D(shapePath);

        // Scale the path to fit the canvas
        const scale = originalCanvas.width / 100;
        tempCtx.scale(scale, scale);

        tempCtx.clip(path);
        tempCtx.scale(1 / scale, 1 / scale); // Reverse the scale

        // Clear and redraw the QR code
        tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        tempCtx.drawImage(originalCanvas, 0, 0);

        // Draw border if enabled
        if (qrOptions.borderSize > 0) {
          tempCtx.strokeStyle = qrOptions.borderColor;
          tempCtx.lineWidth = qrOptions.borderSize;
          tempCtx.scale(scale, scale); // Scale back for the path
          tempCtx.stroke(path);
          tempCtx.scale(1 / scale, 1 / scale); // Reverse scale again
        }

        tempCtx.restore();
      }
    } else {
      // Handle basic shapes that use CSS
      if (qrOptions.customShape === "circle") {
        // Create a circular mask
        tempCtx.globalCompositeOperation = "destination-in";
        tempCtx.beginPath();
        tempCtx.arc(
          tempCanvas.width / 2,
          tempCanvas.height / 2,
          tempCanvas.width / 2,
          0,
          Math.PI * 2
        );
        tempCtx.fill();
        tempCtx.globalCompositeOperation = "source-over";
      } else if (qrOptions.customShape === "rounded") {
        // Create a rounded rectangle mask
        const radius = tempCanvas.width * 0.1; // 10% of width for rounded corners
        tempCtx.globalCompositeOperation = "destination-in";
        tempCtx.beginPath();
        tempCtx.moveTo(radius, 0);
        tempCtx.lineTo(tempCanvas.width - radius, 0);
        tempCtx.quadraticCurveTo(tempCanvas.width, 0, tempCanvas.width, radius);
        tempCtx.lineTo(tempCanvas.width, tempCanvas.height - radius);
        tempCtx.quadraticCurveTo(
          tempCanvas.width,
          tempCanvas.height,
          tempCanvas.width - radius,
          tempCanvas.height
        );
        tempCtx.lineTo(radius, tempCanvas.height);
        tempCtx.quadraticCurveTo(
          0,
          tempCanvas.height,
          0,
          tempCanvas.height - radius
        );
        tempCtx.lineTo(0, radius);
        tempCtx.quadraticCurveTo(0, 0, radius, 0);
        tempCtx.closePath();
        tempCtx.fill();
        tempCtx.globalCompositeOperation = "source-over";
      }

      // Draw border for basic shapes if enabled
      if (qrOptions.borderSize > 0) {
        tempCtx.strokeStyle = qrOptions.borderColor;
        tempCtx.lineWidth = qrOptions.borderSize;

        if (qrOptions.customShape === "square") {
          tempCtx.strokeRect(0, 0, tempCanvas.width, tempCanvas.height);
        } else if (qrOptions.customShape === "circle") {
          tempCtx.beginPath();
          tempCtx.arc(
            tempCanvas.width / 2,
            tempCanvas.height / 2,
            tempCanvas.width / 2 - qrOptions.borderSize / 2,
            0,
            Math.PI * 2
          );
          tempCtx.stroke();
        } else if (qrOptions.customShape === "rounded") {
          const radius = tempCanvas.width * 0.1;
          const offset = qrOptions.borderSize / 2;

          tempCtx.beginPath();
          tempCtx.moveTo(radius, offset);
          tempCtx.lineTo(tempCanvas.width - radius, offset);
          tempCtx.quadraticCurveTo(
            tempCanvas.width - offset,
            offset,
            tempCanvas.width - offset,
            radius
          );
          tempCtx.lineTo(tempCanvas.width - offset, tempCanvas.height - radius);
          tempCtx.quadraticCurveTo(
            tempCanvas.width - offset,
            tempCanvas.height - offset,
            tempCanvas.width - radius,
            tempCanvas.height - offset
          );
          tempCtx.lineTo(radius, tempCanvas.height - offset);
          tempCtx.quadraticCurveTo(
            offset,
            tempCanvas.height - offset,
            offset,
            tempCanvas.height - radius
          );
          tempCtx.lineTo(offset, radius);
          tempCtx.quadraticCurveTo(offset, offset, radius, offset);
          tempCtx.closePath();
          tempCtx.stroke();
        }
      }
    }

    // Draw the shaped QR code onto the final canvas
    ctx.drawImage(tempCanvas, padding, padding);

    // Add logo to the QR code
    const addLogoAndFinish = () => {
      if (qrOptions.includeLogo || qrOptions.includeCustomLogo) {
        const qrCenterX = padding + tempCanvas.width / 2;
        const qrCenterY = padding + tempCanvas.height / 2;

        // Logo position offset
        let logoX = qrCenterX;
        let logoY = qrCenterY;

        if (qrOptions.logoPosition === "topLeft") {
          logoX = padding + tempCanvas.width * 0.25;
          logoY = padding + tempCanvas.height * 0.25;
        } else if (qrOptions.logoPosition === "topRight") {
          logoX = padding + tempCanvas.width * 0.75;
          logoY = padding + tempCanvas.height * 0.25;
        } else if (qrOptions.logoPosition === "bottomLeft") {
          logoX = padding + tempCanvas.width * 0.25;
          logoY = padding + tempCanvas.height * 0.75;
        } else if (qrOptions.logoPosition === "bottomRight") {
          logoX = padding + tempCanvas.width * 0.75;
          logoY = padding + tempCanvas.height * 0.75;
        }

        // Draw logo background
        const logoRadius = qrOptions.logoSize / 2 + 8; // Added padding
        ctx.fillStyle = qrOptions.logoBackgroundColor;
        ctx.beginPath();
        ctx.arc(logoX, logoY, logoRadius, 0, Math.PI * 2);
        ctx.fill();

        if (qrOptions.includeCustomLogo && qrOptions.logoImage) {
          // Draw custom logo
          const logoImg = new Image();
          logoImg.onload = () => {
            ctx.drawImage(
              logoImg,
              logoX - qrOptions.logoSize / 2,
              logoY - qrOptions.logoSize / 2,
              qrOptions.logoSize,
              qrOptions.logoSize
            );

            finalizeDownload();
          };
          logoImg.src = qrOptions.logoImage;
        } else if (qrOptions.includeLogo) {
          // Draw preset logo - convert SVG to canvas
          const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${
            qrOptions.logoSize
          }" height="${
            qrOptions.logoSize
          }" viewBox="0 0 24 24" fill="none" stroke="${
            qrOptions.fgColor
          }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          ${getLogoPath(qrOptions.selectedPresetLogo)}
        </svg>`;

          const logoImg = new Image();
          logoImg.onload = () => {
            ctx.drawImage(
              logoImg,
              logoX - qrOptions.logoSize / 2,
              logoY - qrOptions.logoSize / 2,
              qrOptions.logoSize,
              qrOptions.logoSize
            );

            finalizeDownload();
          };
          logoImg.src = "data:image/svg+xml;base64," + btoa(svgString);
        } else {
          finalizeDownload();
        }
      } else {
        finalizeDownload();
      }
    };

    // Get SVG path for preset logos
    const getLogoPath = (logoType) => {
      switch (logoType) {
        case "food":
          return '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M19 2v4c0 1.1-.9 2-2 2h-1M12 17.5V22h8v-4.5"></path><path d="M12 15a5 5 0 0 1 8 0"></path>';
        case "coffee":
          return '<path d="M17 8h1a4 4 0 1 1 0 8h-1"></path><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path><line x1="6" x2="6" y1="2" y2="4"></line><line x1="10" x2="10" y1="2" y2="4"></line><line x1="14" x2="14" y1="2" y2="4"></line>';
        case "wine":
          return '<path d="M8 22h8"></path><path d="M7 10h10"></path><path d="M12 22v-8"></path><path d="M12 6.5c0-1-.514-1.5-2-2.5-1.5-1-2-3.5-2-5h8c0 1.5-.5 4-2 5-1.486 1-2 1.5-2 2.5Z"></path>';
        case "beer":
          return '<path d="M17 11h1a3 3 0 0 1 0 6h-1"></path><path d="M9 12v10H6a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3Z"></path><path d="M19 12v10h-7"></path><path d="M13 5v7"></path><path d="M9 5v7"></path><path d="M17 5v7"></path><path d="M13 5h4a4 4 0 0 0 4-4H9a4 4 0 0 0-4 4h4"></path>';
        case "pizza":
          return '<path d="M15 11h.01"></path><path d="M11 15h.01"></path><path d="M16 16h.01"></path><path d="m2 16 20 6-6-20A20 20 0 0 0 2 16"></path><path d="M5.71 17.11a17.04 17.04 0 0 1 11.4-11.4"></path>';
        case "icecream":
          return '<path d="m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11"></path><path d="M17 7A5 5 0 0 0 7 7"></path><path d="M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4"></path>';
        case "cake":
          return '<path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"></path><path d="M4 16.5V16a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v.5"></path><path d="M2 21h20"></path><path d="M7 8v2"></path><path d="M12 8v2"></path><path d="M17 8v2"></path><path d="M7 4h.01"></path><path d="M12 4h.01"></path><path d="M17 4h.01"></path>';
        case "salad":
          return '<path d="M7 21h10"></path><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"></path><path d="M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1"></path><path d="m13 12 4-4"></path><path d="M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2"></path>';
        case "sandwich":
          return '<path d="M3 11v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3"></path><path d="M12 19H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3.83"></path><path d="m3 11 7.77-6.04a2 2 0 0 1 2.46 0L21 11H3Z"></path><path d="M12.97 19.77 7 15h12.5l-3.75 4.5a2 2 0 0 1-2.78.27Z"></path>';
        case "seafood":
          return '<path d="M12 9.5 16.5 5a2.83 2.83 0 0 1 4 0 2.83 2.83 0 0 1 0 4L16 13.5"></path><path d="M12 14.5 7.5 19a2.83 2.83 0 0 1-4 0 2.83 2.83 0 0 1 0-4L8 10.5"></path><path d="M12 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"></path><path d="M12 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"></path><path d="m18 16-2 2"></path><path d="m6 8 2-2"></path>';
        default:
          return '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M19 2v4c0 1.1-.9 2-2 2h-1M12 17.5V22h8v-4.5"></path><path d="M12 15a5 5 0 0 1 8 0"></path>';
      }
    };

    // Add restaurant name if provided
    const finalizeDownload = () => {
      if (qrOptions.restaurantName) {
        ctx.font = "bold 32px serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "#1F2937"; // gray-800
        ctx.fillText(
          qrOptions.restaurantName,
          qrCanvas.width / 2,
          originalCanvas.height + padding * 2
        );
      }

      // Add MenuQ branding
      ctx.font = "16px sans-serif";
      ctx.textAlign = "right";
      ctx.fillStyle = "#B45309"; // amber-700
      ctx.fillText(
        "Powered by ",
        qrCanvas.width / 2,
        qrCanvas.height - padding / 2
      );

      // Load and draw the MenuQ logo
      const menuQLogo = new Image();
      menuQLogo.onload = () => {
        // Draw the logo next to the text
        const logoHeight = 20; // Adjust as needed
        const logoWidth = (logoHeight * menuQLogo.width) / menuQLogo.height; // Maintain aspect ratio

        ctx.drawImage(
          menuQLogo,
          qrCanvas.width / 2 + 5, // Add some space after the text
          qrCanvas.height - padding / 2 - logoHeight + 4, // Vertical alignment with text
          logoWidth,
          logoHeight
        );

        // Download
        const link = document.createElement("a");
        link.download = `menuq-${id}.${qrOptions.downloadFormat}`;
        link.href = qrCanvas.toDataURL(`image/${qrOptions.downloadFormat}`);
        link.click();
      };
      menuQLogo.src = "/short_logo-removebg.png";
    };

    // Start the process by adding the logo
    addLogoAndFinish();
  };

  // Toggle color picker
  const toggleColorPicker = (pickerName) => {
    setDisplayColorPicker({
      ...displayColorPicker,
      [pickerName]: !displayColorPicker[pickerName],
    });
  };

// Render color picker component
  const renderColorPicker = (label, colorValue, pickerName, onChange) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <div className="relative">
          <button
            className="w-full p-2 border border-gray-200 rounded-md flex justify-between items-center"
            onClick={() => toggleColorPicker(pickerName)}
            type="button"
          >
            <span>Select Color</span>
            <div
              className="w-6 h-6 rounded"
              style={{ backgroundColor: colorValue }}
            ></div>
          </button>
          {displayColorPicker[pickerName] && (
            <div className="absolute z-10 mt-2">
              <div
                className="fixed inset-0"
                onClick={() => toggleColorPicker(pickerName)}
              />
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

  // Get the clip-path ID for the current shape
  const getClipPathId = () => {
    return `shape-clip-${qrOptions.shapeType}-${qrOptions.customShape}`;
  };

  // QR code shape options
  const renderQRCode = () => {
    // Determine if using a custom SVG shape
    const isCustomShape = !(
      qrOptions.shapeType === "basic" &&
      (qrOptions.customShape === "square" ||
        qrOptions.customShape === "circle" ||
        qrOptions.customShape === "rounded")
    );

    // Determine the CSS class for basic shapes
    let shapeClass = "";
    if (qrOptions.shapeType === "basic") {
      if (qrOptions.customShape === "circle") {
        shapeClass = "rounded-full";
      } else if (qrOptions.customShape === "rounded") {
        shapeClass = "rounded-lg";
      }
    }

    // Find the shape path for SVG clipping
    let shapePath = null;
    if (isCustomShape) {
      for (const shape of shapeTemplates[qrOptions.shapeType]) {
        if (shape.id === qrOptions.customShape) {
          shapePath = shape.path;
          break;
        }
      }
    }

    const clipPathId = getClipPathId();

    return (
      <div className="relative" ref={qrRef}>
        {/* Define the clip path for the custom shape */}
        {isCustomShape && shapePath && (
          <svg style={{ position: "absolute", width: 0, height: 0 }}>
            <defs>
              <clipPath id={clipPathId}>
                <path d={shapePath} />
              </clipPath>
            </defs>
          </svg>
        )}

        <div
          className={`relative ${shapeClass}`}
          style={{
            border:
              qrOptions.borderSize > 0 && !isCustomShape
                ? `${qrOptions.borderSize}px solid ${qrOptions.borderColor}`
                : "none",
            clipPath: isCustomShape ? `url(#${clipPathId})` : "none",
            overflow: "hidden",
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
              qrOptions.includeLogo || qrOptions.includeCustomLogo
                ? {
                    src: qrOptions.includeCustomLogo
                      ? qrOptions.logoImage
                      : null,
                    excavate: true,
                    width: qrOptions.logoSize,
                    height: qrOptions.logoSize,
                  }
                : undefined
            }
          />
        </div>

        {/* Add SVG border for custom shapes */}
        {isCustomShape && shapePath && qrOptions.borderSize > 0 && (
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
            viewBox="0 0 100 100"
          >
            <path
              d={shapePath}
              fill="none"
              stroke={qrOptions.borderColor}
              strokeWidth={qrOptions.borderSize}
            />
          </svg>
        )}

        {/* Add logo overlay */}
        {qrOptions.includeLogo && !qrOptions.includeCustomLogo && (
          <div style={getLogoPositionStyle()}>
            {presetLogos[qrOptions.selectedPresetLogo]}
          </div>
        )}
      </div>
    );
  };

  // Render shape template buttons
  const renderShapeButtons = (category) => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {shapeTemplates[category].map((shape) => (
          <button
            key={shape.id}
            type="button"
            className={`p-2 border rounded-md flex items-center justify-center
              ${
                qrOptions.shapeType === category &&
                qrOptions.customShape === shape.id
                  ? "border-amber-600 bg-amber-50"
                  : "border-gray-200"
              }`}
            onClick={() =>
              setQrOptions({
                ...qrOptions,
                shapeType: category,
                customShape: shape.id,
              })
            }
            title={shape.label}
          >
            {shape.id === "square" ? (
              <div className="w-8 h-8 bg-gray-400"></div>
            ) : shape.id === "circle" ? (
              <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
            ) : shape.id === "rounded" ? (
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
    <div className="container mx-auto px-4 py-6 sm:py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-amber-700 mb-4 sm:mb-6 text-center">
          Customize Your Menu QR Code
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 text-center max-w-2xl mx-auto">
          Create a unique QR code that reflects your brand and style. Customers
          will scan this to view your digital menu.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Preview Panel */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-amber-100 order-2 lg:order-1">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-800 mb-4 sm:mb-6">
              Preview
            </h2>
            <div className="flex flex-col items-center">
              <div className="p-4 sm:p-6 bg-white shadow-md">{renderQRCode()}</div>
              {qrOptions.restaurantName && (
                <p className="mt-4 text-lg font-bold text-gray-800">
                  {qrOptions.restaurantName}
                </p>
              )}
              <p className="text-sm text-amber-700 mt-2 flex items-center space-x-2">
                <span>Powered by</span>
                <img
                  src="/short_logo-removebg.png"
                  alt="MenuQ Logo"
                  className="h-6 w-auto"
                />
              </p>

              <button
                onClick={downloadQRCode}
                type="button"
                className="mt-6 sm:mt-8 px-4 sm:px-6 py-2 sm:py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors flex items-center w-full sm:w-auto justify-center"
              >
                Download QR Code
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Customization Panel */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-amber-100 overflow-y-auto max-h-[80vh] sm:max-h-screen order-1 lg:order-2">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-800 mb-4 sm:mb-6">
              Customize
            </h2>

            {/* QR Shape Options */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                QR Code Shape
              </h3>

              {/* Shape Category Tabs */}
              <div className="flex flex-wrap border-b border-gray-200 mb-4">
                {Object.keys(shapeTemplates).map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`py-2 px-3 sm:px-4 font-medium text-sm capitalize
                      ${
                        qrOptions.shapeType === category
                          ? "border-b-2 border-amber-600 text-amber-700"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    onClick={() =>
                      setQrOptions({
                        ...qrOptions,
                        shapeType: category,
                        customShape: shapeTemplates[category][0].id,
                      })
                    }
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Shape Options */}
              {renderShapeButtons(qrOptions.shapeType)}

              {/* Border Options */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Border Size (px)
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={qrOptions.borderSize}
                  onChange={(e) =>
                    setQrOptions({
                      ...qrOptions,
                      borderSize: Number(e.target.value),
                    })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>

              {qrOptions.borderSize > 0 &&
                renderColorPicker(
                  "Border Color",
                  qrOptions.borderColor,
                  "borderColor",
                  (color) => setQrOptions({ ...qrOptions, borderColor: color })
                )}
            </div>

            {/* Colors */}
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Colors</h3>

              {/* QR Color */}
              {renderColorPicker(
                "QR Code Color",
                qrOptions.fgColor,
                "fgColor",
                (color) => setQrOptions({ ...qrOptions, fgColor: color })
              )}

              {/* Background Color */}
              {renderColorPicker(
                "Background Color",
                qrOptions.bgColor,
                "bgColor",
                (color) => setQrOptions({ ...qrOptions, bgColor: color })
              )}  
            </div>

            {/* Size & Error Correction */}
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Size & Quality
              </h3>

              {/* QR Size */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  QR Code Size (px)
                </label>
                <input
                  type="range"
                  min="128"
                  max="512"
                  step="16"
                  value={qrOptions.size}
                  onChange={(e) =>
                    setQrOptions({ ...qrOptions, size: Number(e.target.value) })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>128</span>
                  <span>256</span>
                  <span>512</span>
                </div>
              </div>

              {/* Error Correction */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Error Correction Level
                </label>
                <select
                  value={qrOptions.errorCorrectionLevel}
                  onChange={(e) =>
                    setQrOptions({
                      ...qrOptions,
                      errorCorrectionLevel: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-200 rounded-md"
                >
                  <option value="L">Low (7%)</option>
                  <option value="M">Medium (15%)</option>
                  <option value="Q">Quartile (25%)</option>
                  <option value="H">High (30%)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Higher correction levels allow QR codes to remain readable
                  even when partially damaged or obstructed
                </p>
              </div>
            </div>

            {/* Logo Options */}
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Logo Options
              </h3>

              {/* Logo Toggle */}
              <div className="mb-4">
                <div className="flex items-center">
                  <input
                    id="include-logo"
                    type="checkbox"
                    checked={qrOptions.includeLogo}
                    onChange={(e) =>
                      setQrOptions({
                        ...qrOptions,
                        includeLogo: e.target.checked,
                        includeCustomLogo: e.target.checked
                          ? false
                          : qrOptions.includeCustomLogo,
                      })
                    }
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="include-logo"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Include Preset Logo
                  </label>
                </div>
              </div>

              {/* Preset Logo Selection */}
              {qrOptions.includeLogo && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Choose Logo
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {Object.entries(presetLogos).map(([key, logo]) => (
                      <button
                        key={key}
                        type="button"
                        className={`p-2 border rounded-md flex items-center justify-center
                          ${
                            qrOptions.selectedPresetLogo === key
                              ? "border-amber-600 bg-amber-50"
                              : "border-gray-200"
                          }`}
                        onClick={() =>
                          setQrOptions({
                            ...qrOptions,
                            selectedPresetLogo: key,
                          })
                        }
                      >
                        {React.cloneElement(logo, { size: 24 })}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom Logo Upload */}
              <div className="mb-4">
                <div className="flex items-center">
                  <input
                    id="custom-logo"
                    type="checkbox"
                    checked={qrOptions.includeCustomLogo}
                    onChange={(e) =>
                      setQrOptions({
                        ...qrOptions,
                        includeCustomLogo: e.target.checked,
                        includeLogo: e.target.checked
                          ? false
                          : qrOptions.includeLogo,
                      })
                    }
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="custom-logo"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Upload Custom Logo
                  </label>
                </div>

                {qrOptions.includeCustomLogo && (
                  <div className="mt-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-amber-50 file:text-amber-700
                        hover:file:bg-amber-100"
                    />
                  </div>
                )}
              </div>

              {/* Logo Size */}
              {(qrOptions.includeLogo || qrOptions.includeCustomLogo) && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo Size
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={qrOptions.logoSize}
                    onChange={(e) =>
                      setQrOptions({
                        ...qrOptions,
                        logoSize: Number(e.target.value),
                      })
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Small</span>
                    <span>Medium</span>
                    <span>Large</span>
                  </div>
                </div>
              )}

              {/* Logo Position */}
              {qrOptions.includeLogo && !qrOptions.includeCustomLogo && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo Position
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      "topLeft",
                      "topRight",
                      "center",
                      "bottomLeft",
                      "bottomRight",
                    ].map((position) => (
                      <button
                        key={position}
                        type="button"
                        className={`p-2 border rounded-md capitalize flex items-center justify-center text-xs sm:text-sm
                          ${
                            qrOptions.logoPosition === position
                              ? "border-amber-600 bg-amber-50"
                              : "border-gray-200"
                          }`}
                        onClick={() =>
                          setQrOptions({ ...qrOptions, logoPosition: position })
                        }
                      >
                        {position.replace(/([A-Z])/g, " $1").toLowerCase()}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Logo Background Color */}
              {qrOptions.includeLogo &&
                !qrOptions.includeCustomLogo &&
                renderColorPicker(
                  "Logo Background Color",
                  qrOptions.logoBackgroundColor,
                  "logoBgColor",
                  (color) =>
                    setQrOptions({ ...qrOptions, logoBackgroundColor: color })
                )}
            </div>

            {/* Restaurant Name & Download Options */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Additional Options
              </h3>

              {/* Restaurant Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Restaurant Name (Optional)
                </label>
                <input
                  type="text"
                  value={qrOptions.restaurantName}
                  onChange={(e) =>
                    setQrOptions({
                      ...qrOptions,
                      restaurantName: e.target.value,
                    })
                  }
                  placeholder="Enter your restaurant name"
                  className="w-full p-2 border border-gray-200 rounded-md"
                />
              </div>

              {/* Download Format */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Download Format
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="png"
                      checked={qrOptions.downloadFormat === "png"}
                      onChange={() =>
                        setQrOptions({ ...qrOptions, downloadFormat: "png" })
                      }
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">PNG</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="jpeg"
                      checked={qrOptions.downloadFormat === "jpeg"}
                      onChange={() =>
                        setQrOptions({ ...qrOptions, downloadFormat: "jpeg" })
                      }
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">JPEG</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions Section */}
        <div className="mt-10 sm:mt-16 max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-700 mb-4">
            Using Your QR Code
          </h2>
          <div className="bg-amber-50 p-4 sm:p-6 rounded-lg border border-amber-100">
            <ol className="list-decimal list-inside space-y-2 sm:space-y-3 text-gray-700">
              <li>
                Customize your QR code using the options above to match your
                restaurant's style
              </li>
              <li>Download your QR code in your preferred format</li>
              <li>
                Print your QR code and place it on tables, at the entrance, or
                on promotional materials
              </li>
              <li>
                Customers can scan the QR code with their smartphone camera to
                access your digital menu
              </li>
              <li>
                Update your menu anytime through the dashboard - changes will
                reflect immediately for all customers
              </li>
            </ol>
            <div className="mt-4 text-sm text-gray-500">
              <p>
                For best results, print QR codes at a minimum size of 2x2 inches
                (5x5 cm) on non-glossy paper
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;