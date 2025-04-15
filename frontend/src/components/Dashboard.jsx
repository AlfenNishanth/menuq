import React, { useState, useEffect, useRef } from "react";
import { db } from "../fireabse/firebase"; // Fixed typo in the import path
import { collection, query, getDocs, orderBy, limit, addDoc, serverTimestamp } from "firebase/firestore";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar, Clock, BarChart2, Users, Coffee, Download, Loader, QrCode } from "lucide-react";
import { QRCodeSVG } from 'qrcode.react';
import styled from 'styled-components';

// Styled components for QR Code
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
  background-color: #d97706; /* Amber-600 */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #b45309; /* Amber-700 */
  }
`;

// QR Code Display Component
const QRCodeDisplay = ({
  url,
  size = 200,
  showLabel = true,
  labelText = '',
  bgColor = '#ffffff',
  fgColor = '#000000',
  labelPosition = 'bottom',
  labelSize = '14px',
  labelFont = 'Arial',
  labelColor = '#333333',
  restaurantName = 'Restaurant'
}) => {
  const qrCodeRef = useRef(null);

  // Handle download QR code as PNG using your specific implementation
  const downloadQrCode = () => {
    if (qrCodeRef.current) {
      const svg = qrCodeRef.current.querySelector('svg');
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      // Calculate proper size with padding
      const padding = 20;
      const finalSize = size + (padding * 2);
      
      canvas.width = finalSize;
      canvas.height = finalSize;
      
      img.onload = () => {
        // Fill with background color
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, finalSize, finalSize);
        
        // Draw QR code
        ctx.drawImage(img, padding, padding);
        
        // If we have a label
        if (showLabel) {
          ctx.font = `${labelSize} ${labelFont}`;
          ctx.fillStyle = labelColor;
          ctx.textAlign = 'center';
          
          if (labelPosition === 'bottom') {
            ctx.fillText(labelText, finalSize / 2, finalSize - 5);
          } else {
            ctx.fillText(labelText, finalSize / 2, 15);
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

  // Container style based on label position
  const containerStyle = {
    display: 'flex',
    flexDirection: labelPosition === 'bottom' ? 'column' : 'column-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px'
  };

  // Label style
  const labelStyle = {
    marginTop: labelPosition === 'bottom' ? '10px' : '0',
    marginBottom: labelPosition === 'top' ? '10px' : '0',
    fontSize: labelSize,
    fontFamily: labelFont,
    color: labelColor,
    textAlign: 'center'
  };

  return (
    <QRCodeContainer>
      <div ref={qrCodeRef} style={containerStyle}>
        {labelPosition === 'top' && showLabel && (
          <div style={labelStyle}>{labelText}</div>
        )}
        
        <QRCodeSVG
          value={url}
          size={size}
          bgColor={bgColor}
          fgColor={fgColor}
          level={'H'} // High error correction
          includeMargin={false}
        />
        
        {labelPosition === 'bottom' && showLabel && (
          <div style={labelStyle}>{labelText}</div>
        )}
      </div>
      <ButtonContainer>
        <DownloadButton onClick={downloadQrCode}>
          Download QR Code
        </DownloadButton>
      </ButtonContainer>
    </QRCodeContainer>
  );
};

// Main Dashboard Component
const DashboardHome = () => {
  // State for scan statistics
  const [scanStats, setScanStats] = useState({
    totalScans: 0,
    todayScans: 0,
    weeklyData: []
  });
  
  // State for QR code selector
  const [showQRDownloader, setShowQRDownloader] = useState(false);
  const [qrURL, setQrURL] = useState('https://yourrestaurant.com/menu');
  const [qrLabel, setQrLabel] = useState('Restaurant Menu');
  const [restaurantName, setRestaurantName] = useState('Your Restaurant');
  
  // QR Code visual options
  const [qrOptions, setQrOptions] = useState({
    size: 200,
    backgroundColor: '#ffffff',
    foregroundColor: '#000000',
    showLabel: true,
    labelText: 'Scan for Menu',
    labelPosition: 'bottom',
    labelSize: '14px',
    labelFont: 'Arial',
    labelColor: '#333333'
  });
  
  // List of existing QR codes
  const [qrCodes, setQrCodes] = useState([]);
  const [selectedQrCode, setSelectedQrCode] = useState(null);
  
  // Loading state
  const [loading, setLoading] = useState(true);
  
  // State for exporting data
  const [exporting, setExporting] = useState(false);
  
  // Function to fetch real-time data from Firestore
  useEffect(() => {
    const fetchScanData = async () => {
      try {
        setLoading(true);
        
        // Reference to the scans collection
        const scansRef = collection(db, "QRScans");
        
        // Get all scans
        const querySnapshot = await getDocs(scansRef);
        const totalScans = querySnapshot.size;
        
        // Calculate today's scans
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const todayScans = querySnapshot.docs.filter(doc => {
          const scanDate = doc.data().timestamp?.toDate() || new Date(doc.data().timestamp);
          return scanDate >= today;
        }).length;
        
        // Calculate weekly scan data (past 7 days)
        const weeklyData = [];
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          date.setHours(0, 0, 0, 0);
          
          const nextDate = new Date(date);
          nextDate.setDate(nextDate.getDate() + 1);
          
          const dayScans = querySnapshot.docs.filter(doc => {
            const scanDate = doc.data().timestamp?.toDate() || new Date(doc.data().timestamp);
            return scanDate >= date && scanDate < nextDate;
          }).length;
          
          weeklyData.push({
            name: dayNames[date.getDay()],
            scans: dayScans,
            date: date.toLocaleDateString()
          });
        }
        
        setScanStats({
          totalScans,
          todayScans,
          weeklyData
        });
      } catch (error) {
        console.error("Error fetching scan data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScanData();
    
    // Fetch existing QR codes
    const fetchQRCodes = async () => {
      try {
        const qrCodesRef = collection(db, "GeneratedQRCodes");
        const qrSnapshot = await getDocs(qrCodesRef);
        
        const codes = qrSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            qrId: data.qrId,
            url: data.url,
            label: data.label,
            createdAt: data.createdAt?.toDate() || new Date(),
            scans: data.scans || 0,
            options: data.options || {}
          };
        });
        
        setQrCodes(codes);
        
        // Set default selected QR code to the most recent one
        if (codes.length > 0) {
          const mostRecent = codes.sort((a, b) => b.createdAt - a.createdAt)[0];
          setSelectedQrCode(mostRecent);
          setQrURL(mostRecent.url);
          setQrLabel(mostRecent.label);
          
          // Set QR options if available
          if (mostRecent.options) {
            setQrOptions(prev => ({
              ...prev,
              ...mostRecent.options
            }));
          }
        }
        
      } catch (error) {
        console.error("Error fetching QR codes:", error);
      }
    };
    
    fetchQRCodes();
    
    // Set up a real-time listener (simulated with interval refresh)
    const refreshInterval = setInterval(fetchScanData, 60000); // Refresh every minute
    
    return () => clearInterval(refreshInterval);
  }, []);
  
  // Function to show QR code downloader
  const showQRCodeDownloader = () => {
    setShowQRDownloader(true);
  };
  
  // Function to handle QR code selection change
  const handleQRCodeChange = (e) => {
    const selectedId = e.target.value;
    const selected = qrCodes.find(code => code.id === selectedId);
    
    if (selected) {
      setSelectedQrCode(selected);
      setQrURL(selected.url);
      setQrLabel(selected.label);
      
      // Update QR options if available
      if (selected.options) {
        setQrOptions(prev => ({
          ...prev,
          ...selected.options
        }));
      }
    }
  };
  
  // Function to export scan data
  const exportScanData = async () => {
    try {
      setExporting(true);
      
      // Reference to the scans collection
      const scansRef = collection(db, "QRScans");
      
      // Get all scans
      const querySnapshot = await getDocs(scansRef);
      
      // Format data for export
      const exportData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          timestamp: data.timestamp?.toDate().toISOString() || "Unknown",
          customerId: data.customerId || "Anonymous",
          customerName: data.customerName || "Anonymous",
          scanType: data.scanType || "Menu",
          deviceInfo: data.deviceInfo || "Unknown"
        };
      });
      
      // Create CSV content
      const csvHeader = "ID,Timestamp,Customer ID,Customer Name,Scan Type,Device Info\n";
      const csvRows = exportData.map(row => 
        `${row.id},${row.timestamp},${row.customerId},${row.customerName},${row.scanType},${row.deviceInfo}`
      );
      const csvContent = csvHeader + csvRows.join('\n');
      
      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `scan_data_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error("Error exporting scan data:", error);
    } finally {
      setExporting(false);
    }
  };
  
  // Get current time
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Calculate the average daily scans
  const getAverageDailyScans = () => {
    if (scanStats.weeklyData.length === 0) return 0;
    const total = scanStats.weeklyData.reduce((sum, day) => sum + day.scans, 0);
    return Math.round(total / scanStats.weeklyData.length);
  };
  
  // Find the peak day
  const getPeakDay = () => {
    if (scanStats.weeklyData.length === 0) return "N/A";
    let peakDay = scanStats.weeklyData[0];
    
    scanStats.weeklyData.forEach(day => {
      if (day.scans > peakDay.scans) {
        peakDay = day;
      }
    });
    
    return peakDay.name;
  };
  
  // Calculate growth percentage
  const getGrowthPercentage = () => {
    if (scanStats.weeklyData.length < 7) return "N/A";
    
    // Compare last 3 days with previous 3 days
    const recentDays = scanStats.weeklyData.slice(4, 7);
    const previousDays = scanStats.weeklyData.slice(1, 4);
    
    const recentTotal = recentDays.reduce((sum, day) => sum + day.scans, 0);
    const previousTotal = previousDays.reduce((sum, day) => sum + day.scans, 0);
    
    if (previousTotal === 0) return "+100%";
    
    const growthPercent = ((recentTotal - previousTotal) / previousTotal) * 100;
    return (growthPercent > 0 ? "+" : "") + growthPercent.toFixed(1) + "%";
  };

  return (
    <div className="px-6 py-8 bg-gradient-to-br from-amber-50/40 to-white min-h-screen">
      {/* Dashboard Header with Glass Morphism */}
      <div className="bg-white bg-opacity-70 backdrop-blur-lg rounded-xl shadow-md p-6 mb-8 border border-amber-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-amber-800 mb-2">Restaurant Dashboard</h1>
            <p className="text-amber-700 flex items-center">
              <Clock size={16} className="mr-2" /> 
              <span>Last updated: {getCurrentTime()}</span>
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <button className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg transition duration-150 flex items-center">
              <BarChart2 size={16} className="mr-2" /> Analytics
            </button>
            <button className="bg-white hover:bg-gray-50 text-amber-800 border border-amber-300 py-2 px-4 rounded-lg transition duration-150">
              Settings
            </button>
          </div>
        </div>
      </div>
      
      {/* QR Code Downloader Modal */}
      {showQRDownloader && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-amber-700">Download QR Code</h2>
              <button 
                onClick={() => setShowQRDownloader(false)}
                className="text-amber-500 hover:text-amber-700"
              >
                ✕
              </button>
            </div>
            
            {qrCodes.length > 0 ? (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select QR Code:
                  </label>
                  <select
                    value={selectedQrCode?.id || ""}
                    onChange={handleQRCodeChange}
                    className="w-full p-2 border border-amber-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                  >
                    {qrCodes.map(code => (
                      <option key={code.id} value={code.id}>
                        {code.label} ({code.scans} scans)
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex justify-center my-4">
                  <QRCodeDisplay 
                    url={qrURL}
                    labelText={qrLabel}
                    size={qrOptions.size}
                    showLabel={qrOptions.showLabel}
                    bgColor={qrOptions.backgroundColor}
                    fgColor={qrOptions.foregroundColor}
                    labelPosition={qrOptions.labelPosition}
                    labelSize={qrOptions.labelSize}
                    labelFont={qrOptions.labelFont}
                    labelColor={qrOptions.labelColor}
                    restaurantName={restaurantName}
                  />
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No QR codes available.</p>
                <p className="text-sm text-gray-400 mt-2">
                  Visit the QR Generator page to create new codes.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-amber-600 to-amber-800 rounded-xl shadow-md overflow-hidden">
          <div className="flex items-start p-6">
            <div className="p-3 bg-white bg-opacity-30 rounded-lg mr-4">
              <BarChart2 size={24} className="text-white" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Total Scans</p>
              <h3 className="text-2xl font-bold mt-1 text-white">{loading ? "..." : scanStats.totalScans}</h3>
              <div className="flex items-center mt-2">
                <span className="text-xs font-medium bg-white text-amber-700 px-2 py-1 rounded-full">
                  {loading ? "Loading..." : getGrowthPercentage()}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl shadow-md overflow-hidden">
          <div className="flex items-start p-6">
            <div className="p-3 bg-white bg-opacity-30 rounded-lg mr-4">
              <Calendar size={24} className="text-white" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Today's Scans</p>
              <h3 className="text-2xl font-bold mt-1 text-white">{loading ? "..." : scanStats.todayScans}</h3>
              <div className="flex items-center mt-2">
                <span className="text-xs font-medium bg-white text-amber-700 px-2 py-1 rounded-full">
                  {loading ? "Loading..." : scanStats.todayScans > getAverageDailyScans() ? 
                    `+${Math.round((scanStats.todayScans/getAverageDailyScans() - 1) * 100)}% vs avg` : 
                    `${Math.round((scanStats.todayScans/getAverageDailyScans() - 1) * 100)}% vs avg`}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-md overflow-hidden">
          <div className="flex items-start p-6">
            <div className="p-3 bg-white bg-opacity-30 rounded-lg mr-4">
              <Users size={24} className="text-white" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Conversion Rate</p>
              <h3 className="text-2xl font-bold mt-1 text-white">65%</h3>
              <div className="flex items-center mt-2">
                <span className="text-xs font-medium bg-white text-amber-700 px-2 py-1 rounded-full">
                  +3% improvement
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-600 to-amber-800 rounded-xl shadow-md overflow-hidden">
          <div className="flex items-start p-6">
            <div className="p-3 bg-white bg-opacity-30 rounded-lg mr-4">
              <Coffee size={24} className="text-white" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Menu Engagement</p>
              <h3 className="text-2xl font-bold mt-1 text-white">78%</h3>
              <div className="flex items-center mt-2">
                <span className="text-xs font-medium bg-white text-amber-700 px-2 py-1 rounded-full">
                  High performance
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Weekly Scan Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 border border-amber-100">
          <h2 className="text-xl font-semibold text-amber-800 mb-6">Weekly Scan Activity</h2>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin h-8 w-8 border-4 border-t-transparent border-amber-600 rounded-full"></div>
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scanStats.weeklyData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [`${value} scans`, 'Scans']}
                    labelFormatter={(label) => {
                      const dataPoint = scanStats.weeklyData.find(day => day.name === label);
                      return `${label} (${dataPoint ? dataPoint.date : ''})`;
                    }}
                  />
                  <Bar dataKey="scans" fill="#d97706" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="p-3 bg-amber-50 rounded-lg text-center">
              <p className="text-xs text-gray-500">Peak Day</p>
              <p className="font-semibold text-amber-700">{loading ? "..." : getPeakDay()}</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg text-center">
              <p className="text-xs text-gray-500">Avg. Daily</p>
              <p className="font-semibold text-amber-700">{loading ? "..." : getAverageDailyScans()} Scans</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg text-center">
              <p className="text-xs text-gray-500">Growth</p>
              <p className="font-semibold text-amber-700">{loading ? "..." : getGrowthPercentage()}</p>
            </div>
          </div>
        </div>
        
        {/* Quick Actions Panel */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-amber-100">
          <h2 className="text-xl font-semibold text-amber-800 mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <button 
              onClick={showQRCodeDownloader}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-3 px-4 rounded-xl transition duration-150 font-medium flex items-center justify-center"
            >
              <QrCode size={16} className="mr-2" />
              Download QR Code
            </button>
            <button 
              onClick={exportScanData}
              disabled={exporting}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 px-4 rounded-xl transition duration-150 font-medium flex items-center justify-center"
            >
              {exporting ? (
                <>
                  <Loader size={16} className="mr-2 animate-spin" />
                  Exporting Data...
                </>
              ) : (
                <>
                  <Download size={16} className="mr-2" />
                  Export Scan Data
                </>
              )}
            </button>
            <button className="w-full border border-amber-300 hover:bg-amber-50 text-amber-800 py-3 px-4 rounded-xl transition duration-150 font-medium">
              View Detailed Reports
            </button>
          </div>
          
          {/* Restaurant Status Card */}
          <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-xl border border-amber-200">
            <h3 className="text-md font-medium mb-2 text-amber-800">Restaurant Status</h3>
            <div className="flex items-center mb-3">
              <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium">Open Now</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Today: 9:00 AM - 10:00 PM</span>
              <span className="font-medium text-green-600">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

export const DashboardIndex = () => {
  return (
    <div className="p-0">
      <DashboardHome />
    </div>
  );
};