import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SlLike, SlDislike } from "react-icons/sl";
import { FaHeart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import Cookies from "js-cookie";

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 12px;

  width: 100%;
  height: 80px;
  padding: 20px 6% 0 6%;

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

const Title = styled.div`
  position: absolute;
  color: #1b1c1c;
  font-family: Lexend;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0cap.5px;
  text-transform: uppercase;
  top: 15px;
  left: 60px;
`;

function Vote({ id }) {
  const [hearts, setHearts] = useState([]);
  const [nonHearts, setNonHearts] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [voteState, setVoteState] = useState(null);
  const [likeKey, setLikeKey] = useState(0);
  const [dislikeKey, setDislikeKey] = useState(1);

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
        spawnHeart();
      }
      if (type == "dislike") {
        setDislikeKey((k) => k + 1);
        spawnNonHeart();
      }
      return;
    }

    if (type == "like") {
      axios.post(`http://localhost:8080/${id}/like`).then((res) => {
        console.log("liked => " + res.data);
        setLikeCount(res.data.count);
      });
      setVoteState("like");
      Cookies.set(cookie_key(id), "like", { expires: 30 });
      setLikeKey((k) => k + 1);
      spawnHeart();
    }
    if (type == "dislike") {
      axios.post(`http://localhost:8080/${id}/dislike`).then((res) => {
        console.log("disliked => " + res.data.dislike);
        setDislikeCount(res.data.count);
      });
      setVoteState("dislike");
      Cookies.set(cookie_key(id), "dislike", { expires: 30 });
      setDislikeKey((k) => k + 1);
      spawnNonHeart();
    }
  };

  const spawnHeart = () => {
    const id = Date.now() + Math.random();
    const x = (Math.random() - 0.5) * 40;
    setHearts((prev) => [...prev, { id, x }]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
    }, 1000);
  };

  const spawnNonHeart = () => {
    const id = Date.now() + Math.random();
    const x = (Math.random() - 0.5) * 40;
    setNonHearts((prev) => [...prev, { id, x }]);
    setTimeout(() => {
      setNonHearts((prev) => prev.filter((h) => h.id !== id));
    }, 1000);
  };

  return (
    <Container>
      <Title>이 단어가 마음에 드셨나요?</Title>
      <div style={{ position: "relative", display: "flex" }}>
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ opacity: 1, y: 0, x: 0, scale: 0.5 }}
              animate={{ opacity: 0, y: -60, x: heart.x, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                translateX: "-50%",
                pointerEvents: "none",
                color: "#fd6565",
              }}
            >
              <div style={{ fontSize: "20px", userSelect: "none" }}>🔥</div>
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.div
          key={likeKey}
          whileTap={{ scale: 0.8 }}
          onClick={() => handleClick("like")}
          animate={{ scale: [1, 1.4, 0.9, 1] }}
          transition={{ duration: 0.4 }}
          style={{ cursor: "pointer", display: "flex", flexShrink: 0 }}
        >
          <div
            style={{ cursor: "pointer", fontSize: "20px", userSelect: "none" }}
          >
            🔥
          </div>
        </motion.div>
      </div>
      <BarWrap>
        <Pointer percent={likePercent} />
        <Bar>
          <LikeFill percent={likePercent} />
          <DislikeFill percent={dislikePercent} />
        </Bar>
        <LikeCount>{likeCount}</LikeCount>
        <DislikeCount>{dislikeCount}</DislikeCount>
      </BarWrap>
      <div style={{ position: "relative", display: "flex" }}>
        {/* 떠오르는 하트들 */}
        <AnimatePresence>
          {nonHearts.map((nonHeart) => (
            <motion.div
              key={nonHeart.id}
              initial={{ opacity: 1, y: 0, x: 0, scale: 0.5 }}
              animate={{ opacity: 0, y: -60, x: nonHeart.x, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                translateX: "-50%",
                pointerEvents: "none",
                color: "#fd6565",
              }}
            >
              <div style={{ fontSize: "20px", userSelect: "none" }}>💩</div>
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.div
          key={dislikeKey}
          whileTap={{ scale: 0.8 }}
          onClick={() => handleClick("dislike")}
          animate={{ scale: [1, 1.4, 0.9, 1] }}
          transition={{ duration: 0.4 }}
          style={{ cursor: "pointer", display: "flex", flexShrink: 0 }}
        >
          <div
            style={{ cursor: "pointer", fontSize: "20px", userSelect: "none" }}
          >
            💩
          </div>
        </motion.div>
      </div>
    </Container>
  );
}

export default Vote;
