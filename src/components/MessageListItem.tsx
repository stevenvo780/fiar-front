import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Image from 'next/image';
import { WppMS } from '@utils/types';
import { getFileType, getFileNameFromUrl } from '@utils/fileUtils';
import styles from '@styles/Messages.module.css';
import { 
  FaFileAudio, 
  FaFileVideo, 
  FaFile, 
  FaFilePdf, 
  FaFileWord, 
  FaFileExcel,
  FaFileAlt
} from 'react-icons/fa';

interface MessageListItemProps {
  message: WppMS;
  onEdit: (message: WppMS) => void;
  onDelete: (messageId: number) => void;
  onToggleActive: (messageId: number, active: boolean) => void;
}

const MessageListItem: React.FC<MessageListItemProps> = ({ 
  message, 
  onEdit, 
  onDelete,
  onToggleActive 
}) => {
  const renderFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'video':
        return <FaFileVideo size={50} className={styles.fileIcon} color="#4285F4" />;
      case 'audio':
        return <FaFileAudio size={50} className={styles.fileIcon} color="#0F9D58" />;
      case 'pdf':
        return <FaFilePdf size={50} className={styles.fileIcon} color="#DB4437" />;
      case 'word':
        return <FaFileWord size={50} className={styles.fileIcon} color="#4285F4" />;
      case 'excel':
        return <FaFileExcel size={50} className={styles.fileIcon} color="#0F9D58" />;
      default:
        return <FaFileAlt size={50} className={styles.fileIcon} color="#F4B400" />;
    }
  };

  const renderFilePreview = () => {
    if (!message.file) {
      return (
        <div className={styles.noFileContainer}>
          <p>Sin archivo</p>
        </div>
      );
    }

    const fileType = getFileType(message.file);
    const fileName = getFileNameFromUrl(message.file);

    switch (fileType) {
      case 'image':
        return (
          <div className={styles.previewContainer}>
            <Image 
              src={message.file} 
              alt="Vista previa" 
              width={150} 
              height={150} 
              className={styles.previewImage}
            />
          </div>
        );
      
      case 'video':
        return (
          <div className={styles.previewContainer}>
            <video 
              className={styles.videoPreview} 
              controls 
              width="150"
              height="150"
            >
              <source src={message.file} type={`video/${message.file.split('.').pop()?.toLowerCase()}`} />
              Tu navegador no soporta la etiqueta de video.
            </video>
          </div>
        );
      
      case 'audio':
        return (
          <div className={styles.previewContainer}>
            <audio 
              className={styles.audioPreview} 
              controls
            >
              <source src={message.file} type={`audio/${message.file.split('.').pop()?.toLowerCase()}`} />
              Tu navegador no soporta la etiqueta de audio.
            </audio>
            <div className={styles.audioIcon}>
              <FaFileAudio size={40} color="#0F9D58" />
            </div>
          </div>
        );
      
      default:
        return (
          <div className={styles.fileIconContainer}>
            {renderFileIcon(fileType)}
            <p className={styles.fileUrlDisplay}>{fileName}</p>
          </div>
        );
    }
  };

  return (
    <div className="card">
      <div className={styles.cardBody}>
        <Row>
          <Col sm="1">
            <div className="text-center" style={{ backgroundColor: "#fbc658", borderRadius: "50%", width: "30px", height: "30px", lineHeight: "30px" }}>
              {message.order}
            </div>
          </Col>
          <Col sm="2">
            <Button
              variant={message.active ? 'success' : 'secondary'}
              onClick={() => onToggleActive(message.id || 0, !message.active)}
              className='btn btn-lg'
              style={{
                borderColor: message.active ? 'green' : 'gray',
              }}>
              {message.active ? 'Activo' : 'Inactivo'}
            </Button>
          </Col>
          <Col sm="3">
            <p className={styles.messageText}>{message.message}</p>
          </Col>
          <Col sm="2" className="text-center">
            {renderFilePreview()}
          </Col>
          <Col sm="2">
            <Button 
              className={`btn btn-secondary btn-lg ${styles.listButton}`} 
              onClick={() => onEdit(message)}
            >
              Actualizar
            </Button>
          </Col>
          <Col sm="2">
            <Button 
              className={`btn btn-secondary btn-lg ${styles.listButton}`} 
              onClick={() => onDelete(message.id || 0)}
            >
              Eliminar
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MessageListItem;
