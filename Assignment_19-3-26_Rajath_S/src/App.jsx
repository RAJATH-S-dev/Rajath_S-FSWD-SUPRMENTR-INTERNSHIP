import React, { useState, useEffect, useRef } from 'react';
import './App.css'; // Make sure this path matches where you saved the CSS file

const FolderArchitect = () => {
  const [folders, setFolders] = useState([]);
  const [isRetrieving, setIsRetrieving] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');
  const [clipboard, setClipboard] = useState(null);
  
  // Ref to track active timeouts for the alert message
  const alertTimeoutRef = useRef(null);

  useEffect(() => {
    setIsRetrieving(true);
    
    const fetchFolders = setTimeout(() => {
      setFolders([
        { id: 1, name: 'Documents', type: 'folder' },
        { id: 2, name: 'Images', type: 'folder' },
        { id: 3, name: 'Project_Code.zip', type: 'file' },
      ]);
      setIsRetrieving(false);
      setAlertMessage(''); 
    }, 4000); 

    return () => clearTimeout(fetchFolders);
  }, []);

  const showAlert = (message) => {
    // Clear any existing timeout so the message doesn't disappear prematurely
    if (alertTimeoutRef.current) {
      clearTimeout(alertTimeoutRef.current);
    }
    setAlertMessage(message);
    alertTimeoutRef.current = setTimeout(() => setAlertMessage(''), 3000);
  };

  const handleAction = (actionType, item) => {
    if (isRetrieving) {
      showAlert('Retrieving data. Wait a few seconds and try to cut or copy again.');
      return;
    }

    setClipboard({ action: actionType, item });
    showAlert(`Success: ${item.name} has been ${actionType === 'cut' ? 'cut' : 'copied'} to clipboard.`);
  };

  return (
    <div className="container">
      <h1 className="title">Folder Architect</h1>
      
      {/* Alert Message Box */}
      {alertMessage && (
        <div className={isRetrieving ? "warning-alert" : "success-alert"}>
          {alertMessage}
        </div>
      )}

      {/* Main Folder View */}
      <div className="explorer">
        {isRetrieving && (
          <div className="loader">
            ⏳ Retrieving data...
          </div>
        )}

        <ul className="list">
          {isRetrieving ? (
            // Skeleton loader items
            <li className="list-item skeleton">
               <span className="item-name">Loading items...</span>
               <div className="button-group">
                  <button className="button" onClick={() => handleAction('cut', { name: 'Unknown' })}>Cut</button>
                  <button className="button primary" onClick={() => handleAction('copy', { name: 'Unknown' })}>Copy</button>
               </div>
            </li>
          ) : folders.length > 0 ? (
            folders.map((item) => (
              <li key={item.id} className="list-item">
                <span className="item-name">
                  {item.type === 'folder' ? '📁' : '📄'} {item.name}
                </span>
                <div className="button-group">
                  <button 
                    className="button" 
                    onClick={() => handleAction('cut', item)}
                  >
                    Cut
                  </button>
                  <button 
                    className="button primary" 
                    onClick={() => handleAction('copy', item)}
                  >
                    Copy
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="list-item empty-state">
              <span className="item-name" style={{ color: 'var(--secondary)', justifyContent: 'center', width: '100%' }}>No folders found.</span>
            </li>
          )}
        </ul>
      </div>

      {/* Debug view for clipboard */}
      <div className="footer">
        <strong>Clipboard Status: </strong>
        {clipboard ? `${clipboard.action.toUpperCase()} - ${clipboard.item.name}` : 'Empty'}
      </div>
    </div>
  );
};

export default FolderArchitect;