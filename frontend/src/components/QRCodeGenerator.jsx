import React, { useRef, useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const QRCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: fit-content;
`;

const QRLabel = styled.div`
  margin-top: 10px;
  font-weight: 500;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const DownloadButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #3a7bc8;
  }
`;

const QRCodeGenerator = ({
  url,
  size = 200,
  logoUrl = '/public/vite.svg',
  logoSize = 40,
  showLabel = true,
  labelText = '',
  bgColor = '#ffffff',
  fgColor = '#000000',
}) => {
  const qrCodeRef = useRef(null);
  const [logoImage, setLogoImage] = useState(null);

  // Preload the logo image
  useEffect(() => {
    if (logoUrl) {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // This helps with CORS issues
      img.onload = () => {
        setLogoImage(img);
      };
      img.src = logoUrl;
    }
  }, [logoUrl]);

  const downloadQRCode = () => {
    if (!qrCodeRef.current) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // Draw QR code to canvas first
    const svgElement = qrCodeRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgURL = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgData);
    
    const img = new Image();
    img.onload = () => {
      // Draw QR code
      ctx.drawImage(img, 0, 0, size, size);
      
      // Draw logo on top if we have it loaded
      if (logoImage && logoUrl) {
        // Calculate center position
        const centerPos = (size - logoSize) / 2;
        ctx.drawImage(logoImage, centerPos, centerPos, logoSize, logoSize);
      }
      
      // Create download link
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      canvas.toBlob((blob) => {
        link.href = URL.createObjectURL(blob);
        link.click();
      }, 'image/png');
    };
    img.src = svgURL;
  };

  const imageSettings = logoUrl && logoImage
    ? {
        src: logoUrl,
        height: logoSize,
        width: logoSize,
        excavate: true,
      }
    : undefined;

  return (
    <QRCodeContainer>
      <div ref={qrCodeRef}>
        <QRCodeSVG
          value={url}
          size={size}
          bgColor={bgColor}
          fgColor={fgColor}
          level={'H'} // High error correction for logo overlay
          includeMargin={true}
          imageSettings={imageSettings}
        />
      </div>
      {showLabel && (
        <QRLabel>{labelText || `Scan to visit ${url}`}</QRLabel>
      )}
      <ButtonContainer>
        <DownloadButton onClick={downloadQRCode}>
          Download QR Code
        </DownloadButton>
      </ButtonContainer>
    </QRCodeContainer>
  );
};

QRCodeGenerator.propTypes = {
  url: PropTypes.string.isRequired,
  size: PropTypes.number,
  logoUrl: PropTypes.string,
  logoSize: PropTypes.number,
  showLabel: PropTypes.bool,
  labelText: PropTypes.string,
  bgColor: PropTypes.string,
  fgColor: PropTypes.string,
};

export default QRCodeGenerator;