import * as s from './style.css';
import { EmojiIcon } from 'features/diary/ui';
import { useRef, useState } from 'react';

const Content = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className={s.container}>
      <div className={s.titleContainer}>
        <input
          className={s.titleText}
          placeholder="제목을 입력해주세요."
        ></input>
      </div>
      <div className={s.mainContainer}>
        <div className={s.emojiPicker}>
          <EmojiIcon />
          <div className={s.emojiPickerText}>감정 추가</div>
        </div>
        <textarea
          ref={textAreaRef}
          className={s.textBox}
          placeholder="오늘 하루는 어땠나요?"
          value={text}
          onChange={handleInput}
        ></textarea>
      </div>
    </div>
  );
};

export default Content;
