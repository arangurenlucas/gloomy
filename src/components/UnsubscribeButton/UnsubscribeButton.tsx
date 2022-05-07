import { BiBellOff } from 'react-icons/bi';
import './unsubscribeButton.css';

interface UnsubscribeButtonProps {
  text: string;
  onClick: () => void;
  disabled: boolean;
}

export default function UnsubscribeButton({ text, onClick, disabled }: UnsubscribeButtonProps) {
  return (
    <button disabled={disabled} className="unsub-btn" onClick={onClick}>
      <BiBellOff className='unsub-icon'/>
      {text}
    </button>
  );
}
