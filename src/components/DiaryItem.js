import { useNavigate } from "react-router-dom";

import MyButton from "./MyButton";
import { getStringDate } from "../util/date";

const DiaryItem = ({ id, date, emotion, content }) => {
  const navigate = useNavigate();
  console.log(id, emotion, content, date);
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  const strDate = getStringDate(date);

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };
  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img
          src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}
        ></img>
      </div>
      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper" onClick={goEdit}>
        <MyButton text={"수정하기"} />
      </div>
    </div>
  );
};

export default DiaryItem;
