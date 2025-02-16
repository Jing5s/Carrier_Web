import { Sent, Cancel, Image, File } from 'features/Mail/ui';
import * as s from './style.css';
import theme from 'shared/styles/theme.css';
// @ts-ignore
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { MailModalProps } from 'entities/mail/types/MailModalProps';

const SendModal = ({ toggleModalOpen }: MailModalProps) => {
  const [content, setContent] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[] | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setUploadedFiles((files) => (files ? [...files, ...newFiles] : newFiles));
    }
  };

  const getByteSize = (size: number) => {
    const byteUnits = ['KB', 'MB'];
    for (let i = 0; i < byteUnits.length; i++) {
      size = size / 1024;
      if (size < 1024) {
        return size.toFixed(2) + ' ' + byteUnits[i];
      }
    }
  };

  return (
    <div className={s.container}>
      <header className={s.header}>
        <button
          onClick={() => {
            toggleModalOpen?.(false);
          }}
        >
          <Cancel />
        </button>
      </header>

      <div className={s.inputs}>
        <div className={s.inputContainer}>
          <p className={s.label}>받는사람:</p>
          <input type="email" className={s.input} />
        </div>
        <div className={s.inputContainer}>
          <p className={s.label}>제목:</p>
          <input type="text" className={s.input} />
        </div>
      </div>

      <div className={s.editorContainer}>
        <div className={s.textEditor}>
          <ReactQuill
            value={content}
            onChange={setContent}
            className={s.editor}
          />
        </div>
        <div className={s.fileList}>
          {uploadedFiles?.map((file, index) => (
            <div key={index} className={s.fileItem}>
              <p className={s.fileName}>
                {file.name}{' '}
                <span className={s.fileBytes}>{getByteSize(file.size)}</span>
              </p>
              <button className={s.fileDeleteBtn}>
                <Cancel />
              </button>
            </div>
          ))}
        </div>
      </div>

      <footer className={s.footer}>
        <button className={s.icon}>
          <Image />
        </button>
        <label className={s.icon}>
          <File />
          <input
            type="file"
            className={s.fileInput}
            multiple
            onChange={handleFileChange}
          />
        </label>
        <button className={`${s.icon} ${s.sent}`}>
          <Sent fill={theme.white} />
        </button>
      </footer>
    </div>
  );
};

export default SendModal;
