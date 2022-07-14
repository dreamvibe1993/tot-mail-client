import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ServiceButton } from "../UI/Buttons/ServiceButton/ServiceButton";

export const Home = () => {
  return (
    <HomeContainer>
      <h1>Что умеет это приложение?</h1>
      <ul>
        <li>Удалять письма</li>
        <li>Перемещать письма</li>
        <li>Читать письма</li>
        <li>Создавать почтовые ящики</li>
        <li>Копировать почтовые ящики</li>
        <li>Удалять почтовые ящики</li>
      </ul>
      <h1>Сделано с использованием: </h1>
      <ul>
        <li>Typescript</li>
        <li>Styled Components</li>
        <li>Redux</li>
      </ul>
      <Link to={"/mailbox"}>
        <ServiceButton>увидеть воочию</ServiceButton>
      </Link>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
