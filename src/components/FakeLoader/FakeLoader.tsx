import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { fadeIn } from "../../css/animations/fade-in";
import Watches from "../../assets/images/gif/watches-0.gif";

export const FakeLoader = () => {
  const [text, setText] = React.useState<string>("⏳Loading");
  const history = useHistory();

  const intervalId = React.useRef<ReturnType<typeof setInterval>>();
  const timerId1 = React.useRef<ReturnType<typeof setTimeout>>();
  const timerId2 = React.useRef<ReturnType<typeof setTimeout>>();
  const timerId3 = React.useRef<ReturnType<typeof setTimeout>>();
  const counter = React.useRef<number>(0);

  React.useEffect(() => {
    // intervalId.current = setInterval(() => {
    //   ++counter.current;
    //   if (counter.current % 4 === 0) {
    //     setText("⏳Loading");
    //   } else {
    //     setText((prev) => prev + ".");
    //   }
    // }, 400);
    // timerId1.current = setTimeout(() => {
    //   setText("You've got ✉️✉️✉️!");
    //   window.clearInterval(intervalId.current);
    // }, 5000);
    // timerId2.current = setTimeout(() => {
    //   setText("Redirecting...📩");
    // }, 6000);
    // timerId3.current = setTimeout(() => {
    //   history.push("/mailbox/incoming");
    // }, 7000);
    // return () => {
    //   window.clearInterval(intervalId.current);
    //   window.clearTimeout(timerId1.current);
    //   window.clearTimeout(timerId2.current);
    //   window.clearTimeout(timerId3.current);
    // };
  }, []);

  return (
    <FakeLoaderContainer>
      <TextWrapper>{text}</TextWrapper>
      <ImgWrapper>
        <img src={Watches} alt="it might take time" />
      </ImgWrapper>
    </FakeLoaderContainer>
  );
};

const ImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    img {
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
    justify-content: flex-start;
    align-items: flex-start;
    height: calc(100% - 5.5rem - 2rem);
  }
`;

const TextWrapper = styled.div`
  text-align: left;
  width: 100%;

  @media (max-width: 425px) {
    margin-bottom: 2rem;
  }
`;

const FakeLoaderContainer = styled.div`
  height: 100%;
  font-size: 2.4rem;
  animation: ${fadeIn} 0.5s linear;
  font-weight: 500;
  padding: 2rem;
`;
