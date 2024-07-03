import { useNavigate, useParams } from "react-router-dom";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import Viewer from "../components/Viewer";

import { getStringDate } from "../util/date";

import useDiary from "../hooks/useDiary";

const Diary = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentData = useDiary(id);

  if (!currentData) {
    return <div>로딩중...</div>;
  }

  const { date, emotion, content } = currentData;

  return (
    <div className="DiaryPage">
      <MyHeader
        leftChild={<MyButton text={"<뒤로가기"} onClick={() => navigate(-1)} />}
        headText={`${getStringDate(new Date(date))} 기록`}
        rightChild={
          <MyButton text={"수정하기"} onClick={() => navigate(`/edit/${id}`)} />
        }
      />
      <Viewer emotion={emotion} content={content} />
    </div>
  );
};

export default Diary;
