import './subscribeButton.css';
import { BiBell } from 'react-icons/bi';

interface SubscribeButtonProps {
  text: string;
  onClick: () => void;
  disabled: boolean;
}

export default function SubscribeButton({ text, onClick, disabled }: SubscribeButtonProps) {
  return (
    <button disabled={disabled} className="sub-btn" onClick={onClick}>
      <BiBell className="sub-icon" />
      {text}
    </button>
  );
}
