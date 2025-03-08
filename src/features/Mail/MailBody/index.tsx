import { useEffect, useRef } from 'react';
import * as s from './style.css';

const MailBody = ({ htmlContent }: { htmlContent: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shadowRootRef = useRef<ShadowRoot | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (!shadowRootRef.current) {
      shadowRootRef.current = containerRef.current.attachShadow({
        mode: 'open',
      });

      const contentDiv = document.createElement('div');
      contentDiv.className = 'mail-content';
      shadowRootRef.current.appendChild(contentDiv);
    }

    if (shadowRootRef.current) {
      const contentDiv = shadowRootRef.current.querySelector('.mail-content');
      if (contentDiv) {
        contentDiv.innerHTML = htmlContent;
      }
    }
  }, [htmlContent]);

  return <div ref={containerRef} className={s.mailBodyStyle} />;
};

export default MailBody;
