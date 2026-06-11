import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SlLike, SlDislike } from "react-icons/sl";
import { motion } from "framer-motion";
import styled from "styled-components";
import Cookies from "js-cookie";

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  width: 100%;
  height: 65px;
  padding: 0 6%;
  border-radius: 16px;
  border-bottom: 1px solid #e2e3e4;
  border-left: 1px solid #e4e2e2;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
`;

const Bar = styled.div`
  display: flex;
  width: 100%;
  height: 3px;
  border-radius: 6px;
  overflow: hidden;
  background-color: #eee;
`;

const BarWrap = styled.div`
  flex: 1;
  position: relative;
`;

const LikeFill = styled.div`
  height: 100%;
  background-color: #fd6565;
  width: ${(props) => props.percent}%;
  transition: width 0.3s ease;
`;

const DislikeFill = styled.div`
  height: 100%;
  background-color: #375ff2;
  width: ${(props) => props.percent}%;
  transition: width 0.3s ease;
`;

const Pointer = styled.div`
  position: absolute;
  top: -10px;
  left: ${(props) => props.percent}%;
  transform: translateX(-50%);
  transition: left 0.3s ease;

  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 7px solid #333;
`;

const LikeCount = styled.span`
  position: absolute;
  top: 10px;
  left: 0;
  font-size: 14px;
  font-weight: 600;
  color: #cb3333;
`;

const DislikeCount = styled.span`
  position: absolute;
  top: 10px;
  right: 0;
  font-size: 14px;
  font-weight: 600;
  color: #1d3074;
`;
const cookie_key = (id) => `vote_${id}`;

function Vote({ id }) {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [count, setCount] = useState({ like: 0, dislike: 0 });
  const [voteState, setVoteState] = useState(null);
  const [likeKey, setLikeKey] = useState(0);
  const [dislikeKey, setDislikeKey] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/${id}/vote`)
      .then((res) => {
        console.log("test");
        setLikeCount(res.data.like);
        setDislikeCount(res.data.dislike);
        console.log("likecount" + res.data.dislike);
      })
      .catch((err) => {
        console.log("testsdfa");
        console.error("투표 로드 실패:", err);
      });

    setVoteState(Cookies.get(cookie_key(id)));
  }, [id]);

  const total = likeCount + dislikeCount;
  const likePercent = total === 0 ? 50 : (likeCount / total) * 100;
  const dislikePercent = 100 - likePercent;

  const handleClick = (type) => {
    if (voteState == "like" || voteState == "dislike") {
      if (type == "like") {
        setLikeKey((k) => k + 1);
      }
      if (type == "dislike") {
        setDislikeKey((k) => k + 1);
      }
      return;
    }

    if (type == "like") {
      axios.post(`http://localhost:8080/${id}/like`).then((res) => {
        console.log("liked => " + res.data);
        setLikeCount(res.data);
      });
      setVoteState("like");
      Cookies.set(cookie_key(id), "like", { expires: 30 });
    }
    if (type == "dislike") {
      axios.post(`http://localhost:8080/${id}/dislike`).then((res) => {
        console.log("disliked => " + res.data.dislike);
        setDislikeCount(res.data);
      });
      setVoteState("dislike");
      Cookies.set(cookie_key(id), "dislike", { expires: 30 });
    }
  };

  return (
    <Container>
      <motion.div
        key={likeKey}
        whileTap={{ scale: 0.8 }}
        onClick={() => handleClick("like")}
        animate={{ scale: [1, 1.4, 0.9, 1] }}
        transition={{ duration: 0.4 }}
        style={{ cursor: "pointer", display: "flex", flexShrink: 0 }}
      >
        <SlLike
          style={{
            color: "#e86a6a",
          }}
        />
      </motion.div>
      <BarWrap>
        <Pointer percent={likePercent} />
        <Bar>
          <LikeFill percent={likePercent} />
          <DislikeFill percent={dislikePercent} />
        </Bar>
        <LikeCount>{likeCount}</LikeCount>
        <DislikeCount>{dislikeCount}</DislikeCount>
      </BarWrap>
      <motion.div
        key={dislikeKey}
        whileTap={{ scale: 0.8 }}
        onClick={() => handleClick("dislike")}
        animate={{ scale: [1, 1.4, 0.9, 1] }}
        transition={{ duration: 0.4 }}
        style={{ display: "flex", flexShrink: 0 }}
      >
        <SlDislike style={{ fill: "#0e1943", cursor: "pointer" }} />
      </motion.div>
    </Container>
  );
}

export default Vote;
