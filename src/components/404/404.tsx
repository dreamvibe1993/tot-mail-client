import React from "react";
import styled from "styled-components";
import { useGoBack } from "../../lib/hooks/useGoBack";
import { ServiceButton } from "../UI/Buttons/ServiceButton/ServiceButton";

export const NotFoundPage = () => {
  const goBack = useGoBack();

  return <NotFoundContainer>
    <Heading>404!</Heading>
    <ServiceButton onClick={goBack}>Вернуться назад!</ServiceButton>
  </NotFoundContainer>
};

const Heading = styled.h1`
    margin-bottom: 2rem;
`

const NotFoundContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
`