// QRCodeGenerator.jsx
import React, { useRef } from 'react';
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

  const downloadQRCode = () => {
    if (!qrCodeRef.current) return;
    
    // Create a canvas element to draw the QR code
    const canvas = document.createElement('canvas');
    const svgElement = qrCodeRef.current.querySelector('svg');
    const { width, height } = svgElement.getBoundingClientRect();
    
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    // Draw white background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Convert SVG to data URL
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const reader = new FileReader();
    
    reader.onload = function(event) {
      const img = new Image();
      img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to blob and download
        canvas.toBlob(function(blob) {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'qrcode.png';
          link.click();
        });
      };
      img.src = event.target.result;
    };
    
    reader.readAsDataURL(svgBlob);
  };

  const imageSettings = logoUrl
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

export default QRCodeGenerator;