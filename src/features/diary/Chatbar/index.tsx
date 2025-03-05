import * as s from './style.css';

const Chatbar = () => {
  return (
    <div className={s.container}>
      <div className={s.suggestionList}>
        <div className={s.suggestionText}>일정 주제 질문</div>
      </div>
      <div className={s.suggestionList}>
        <div className={s.suggestionText}>
          아침에 일어났을 땐 평소와 달랐나요?
        </div>
      </div>
      <div className={s.suggestionList}>
        <div className={s.suggestionText}>
          오후 4시 30분에 있었던 화영 거래처와의 미팅은 어떠셨나요?
        </div>
      </div>
      <div className={s.suggestionButton}>
        <div className={s.suggestionButtonText}>일기 주제 추천받기</div>
      </div>
    </div>
  );
};

export default Chatbar;
