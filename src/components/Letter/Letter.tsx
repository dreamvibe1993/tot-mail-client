import React from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";

import { ServiceButton } from "../UI/Buttons/ServiceButton/ServiceButton";
import { BsReplyFill, BsThreeDotsVertical } from "react-icons/bs";
import { useAppSelector } from "../../redux/hooks/hooks";
import { useParams } from "react-router";

export const Letter: React.FC = () => {
  const { incoming } = useAppSelector((state) => state.mailbox);
  const params: { id: string } = useParams();
  const [letter, setLetter] = React.useState<Letter | undefined>();

  React.useEffect(() => {
    if (params.id) {
      setLetter(incoming.find((letter: Letter) => letter.id === params.id));
    }
  }, []);

  if (!letter) return <span>Loading...</span>;

  return (
    <div>
      <TopBar>
        <UserPersonal>
          <Avatar />
          <Creds>
            <Name>{letter.sender.name}</Name>
            <Email>{letter.sender.email}</Email>
          </Creds>
        </UserPersonal>
        <Controls>
          <ServiceButton>
            <BsReplyFill />
          </ServiceButton>
          <ServiceButton>
            <BsThreeDotsVertical />
          </ServiceButton>
        </Controls>
      </TopBar>
      <LetterContainer>
        <LetterLayout>
          <ReactMarkdown>{letter.message}</ReactMarkdown>
        </LetterLayout>
      </LetterContainer>
    </div>
  );
};

const LetterLayout = styled.div`
  border: 1px solid gray;
  height: 100%;
  padding: 2rem;
  p {
    font-size: 1.8rem;
  }
`;

const LetterContainer = styled.div`
  flex: 1;
  padding-top: 2rem;
`;

const Controls = styled.div`
  display: flex;
  align-items: flex-start;
  svg {
    width: 2.5rem;
    height: 100%;
  }
  & > * {
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

const Email = styled.span`
  font-size: 1.4rem;
`;

const Name = styled.span``;

const Creds = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 2.4rem;
  margin-left: 2rem;
`;

const UserPersonal = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 100%;
  background-color: gray;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
`;
