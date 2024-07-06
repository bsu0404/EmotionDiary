import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import Viewer from "../components/Viewer";

import { getStringDate } from "../util/date";

import useDiary from "../hooks/useDiary";

const Diary = () => {
  const { id } = useParams();
  const currentData = useDiary(id);
  const navigate = useNavigate();
  const { onDelete } = useContext(DiaryDispatchContext);

  if (!currentData) {
    return <div>로딩중...</div>;
  }

  const { date, emotion, content } = currentData;

  const onClickDelete = () => {
    if (window.confirm("일기를 삭제하시겠습니까?")) {
      onDelete(id);
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="DiaryPage">
      <MyHeader
        leftChild={<MyButton text={"<뒤로가기"} onClick={() => navigate(-1)} />}
        headText={`${getStringDate(new Date(date))} 기록`}
        rightChild={
          <>
            <MyButton
              text={"수정하기"}
              onClick={() => navigate(`/edit/${id}`)}
            />
            <MyButton
              text={"삭제하기"}
              type={"negative"}
              onClick={onClickDelete}
            />
          </>
        }
      />
      <Viewer emotion={emotion} content={content} />
    </div>
  );
};

export default Diary;
