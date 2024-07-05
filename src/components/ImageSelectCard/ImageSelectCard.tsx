import { IonIcon } from '@ionic/react';
import { checkmarkCircle } from 'ionicons/icons';
import { useState } from 'react';
import './ImageSelectCard.css';

interface ImageSelectCardProps {
    imageUrl: string;
    onSelect: (imageUrl: string) => void;
    isSelected: boolean;
    selectionMode: boolean;
    onFullscreen: (fullscreen: boolean) => void;
}

const ImageSelectCard: React.FC<ImageSelectCardProps> = ({ imageUrl, onSelect, isSelected, selectionMode, onFullscreen }) => {
    const [, setLongPress] = useState(false);
    const [isSelectedAnimation, setIsSelectedAnimation] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);

    let timer: ReturnType<typeof setTimeout>;

    const handleTouchStart = () => {
        if (!selectionMode) {
            timer = setTimeout(() => {
                setLongPress(true);
                onSelect(imageUrl);
                setIsSelectedAnimation(true);
                setTimeout(() => setIsSelectedAnimation(false), 255);
            }, 500);
        }
    };

    const handleTouchEnd = () => {
        clearTimeout(timer);
        setLongPress(false);
    };

    const handleClick = () => {
        setIsFullScreen(!isFullScreen);
        onFullscreen(!isFullScreen);
    };

    return (
        <div
            className={`image-select-card ${isSelected ? 'selected' : ''} ${isSelectedAnimation ? 'animated' : ''} ${isFullScreen ? 'fullscreen' : ''}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchEnd}
            onClick={handleClick}
        >
            <img src={imageUrl} className={`image ${isFullScreen ? 'fullscreen-image' : ''}`} />
            {isSelected && (
                <IonIcon icon={checkmarkCircle} className="selection-icon" style={{ color: '#ffffff' }} />
            )}
        </div>
    );
};

export default ImageSelectCard;
