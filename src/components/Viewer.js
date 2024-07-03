import { emotionList } from "../util/emotion";

const Viewer = ({ emotion, content }) => {
  return (
    <div className="Viewer">
      <section className="img_section">
        <h4>오늘의 감정</h4>
        <div className={`emotion_img_wrapper emotion_img_wrapper_${emotion}`}>
          <img src={emotionList[emotion - 1].emotion_img} alt="emotion" />
          <div>{emotionList[emotion - 1].emotion_descript}</div>
        </div>
      </section>

      <section className="content_section">
        <h4>오늘의 일기</h4>
        <div className="content_wrapper">
          <p>{content}</p>
        </div>
      </section>
    </div>
  );
};
export default Viewer;
