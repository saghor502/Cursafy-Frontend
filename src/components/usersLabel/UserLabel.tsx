import { ReactNode } from 'react';
import './UserLabel.css';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from '@nextui-org/react';

interface UserLabelProps {
  name?: string;
  id?: number;
  porcentaje?: string;
}

export default function ({ name, id, porcentaje }: UserLabelProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as Element).classList.contains('overlay')) {
      onClose();
    }
  };

  const handleModalContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); // Previene que el clic se propague al overlay
  };

  return (
    <div className="userLabelContainer" id={id ? id.toString() : ''}>
      <div style={{ width: '70%', display: 'inline-grid' }}>
        <p style={{ fontSize: 'xx-large' }}>{name}</p>
      </div>

      <div
        style={{
          width: '30%',
          display: 'inline-grid',
          textAlign: 'center',
          height: '100px',
        }}
      >
        <div>
          <Button onPress={onOpen}>Open Modal</Button>

          {/* Contenedor transparente */}
          {isOpen && <div className="overlay" onClick={handleOverlayClick}></div>}

          <Modal isOpen={isOpen} onOpenChange={onOpen} className="customModal">
            <ModalContent className="customModalContent">
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Modal Title
                </ModalHeader>
                <ModalBody>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit
                    venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit
                    venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.
                  </p>
                  <p>
                    Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor adipisicing. Mollit
                    dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit officia eiusmod Lorem aliqua enim
                    laboris do dolor eiusmod.
                  </p>
                </ModalBody>
              </>
            </ModalContent>
          </Modal>
        </div>

        <div style={{ height: '100%' }}>
          <p style={{ fontSize: 'xx-large' }}>{porcentaje}</p>
        </div>
      </div>
    </div>
  );
}
