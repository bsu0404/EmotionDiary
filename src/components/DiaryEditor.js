import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

const DiaryEditor = ({ initData, onSubmit }) => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    date: new Date(),
    emotion: 3,
    content: "",
  });

  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)),
      });
    }
  }, [initData]);

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "date") {
      value = new Date(value);
    }
    setInput({
      ...input,
      [name]: value,
    });
  };

  const onClickSubmitButton = () => {
    console.log(input, "DiaryEditor");
    onSubmit(input);
  };

  return (
    <div className="DiaryEditor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <div className="input-box">
          <input
            className="input_date"
            name="date"
            type="date"
            onChange={onChangeInput}
            value={getStringDate(input.date)}
          />
        </div>
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="input_box emotion_list_wrapper">
          {emotionList.map((it) => (
            <EmotionItem
              key={it.emotion_id}
              {...it}
              onClick={() => {
                onChangeInput({
                  target: {
                    name: "emotion",
                    value: it.emotion_id,
                  },
                });
              }}
              isSelected={parseInt(it.emotion_id) === parseInt(input.emotion)}
            />
          ))}
        </div>
      </section>
      <section>
        <h4>오늘의 일기</h4>
        <div className="input_box_text_wrapper">
          <textarea
            name="content"
            placeholder="오늘의 일기를 작성해보세요"
            value={input.content}
            onChange={onChangeInput}
          />
        </div>
      </section>
      <section>
        <div className="control_box">
          <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
          <MyButton
            text={"작성 완료"}
            type={"positive"}
            onClick={onClickSubmitButton}
          />
        </div>
      </section>
    </div>
  );
};

export default DiaryEditor;
