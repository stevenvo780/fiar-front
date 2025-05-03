import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { WppMS } from '@utils/types';
import FilePreview from '@components/FilePreview';
import styles from '@styles/Messages.module.css';

interface MessageItemProps {
  message: WppMS;
  onEdit: (message: WppMS) => void;
  onDelete: (messageId: number) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, onEdit, onDelete }) => {
  return (
    <Card className="mb-3">
      <Card.Body className={styles.cardBody}>
        <div className="d-flex flex-wrap">
          <div className={`${message.file ? 'col-md-9' : 'col-md-12'}`}>
            <div className="d-flex align-items-center mb-2">
              <span className="me-2 badge bg-secondary">#{message.order}</span>
              <h5 className="mb-0">Mensaje</h5>
            </div>
            <p className={styles.messageText}>{message.message}</p>
          </div>
          
          {message.file && (
            <div className="col-md-3 text-center">
              <FilePreview 
                fileUrl={message.file} 
                size="medium"
                showFileName={true}
              />
            </div>
          )}
        </div>
        
        <div className="d-flex justify-content-end mt-2">
          <Button 
            variant="outline-primary" 
            size="sm" 
            className={`me-2 ${styles.actionButton}`}
            onClick={() => onEdit(message)}
          >
            Editar
          </Button>
          <Button 
            variant="outline-danger" 
            size="sm"
            className={styles.actionButton}
            onClick={() => onDelete(message.id!)}
          >
            Eliminar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MessageItem;
