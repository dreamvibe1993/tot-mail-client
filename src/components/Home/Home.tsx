import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ServiceButton } from "../UI/Buttons/ServiceButton/ServiceButton";

export const Home = () => {
  return (
    <HomeContainer>
      <Block>
        <Heading>Что умеет это приложение?</Heading>
        <ul>
          <li>Удалять письма</li>
          <li>Перемещать письма</li>
          <li>Читать письма</li>
          <li>Создавать почтовые ящики</li>
          <li>Копировать почтовые ящики</li>
          <li>Удалять почтовые ящики</li>
          <li>Сортировать почту по дате</li>
          <li>Сортировать почту по статусу</li>
          <li>Отображать статус письма (просмотрено или нет)</li>
        </ul>
      </Block>
      <Block>
        <Heading>Сделано с использованием: </Heading>
        <ul>
          <li>Typescript</li>
          <li>Styled Components</li>
          <li>Redux</li>
        </ul>
      </Block>
      <Block>
        <Heading>Я: </Heading>
        <ul>
          <li>
            <a href="https://georgy-apraksin.space/">Сайт</a>
          </li>
          <li>
            <a href="https://t.me/georgy_apraksin">Телега</a>
          </li>
          <li>
            <a href="mailto:georgy.apraksin@gmail.com">Почта</a>
          </li>
          <li>
            <a href="tel:+79222172233">Телефон</a>
          </li>
        </ul>
      </Block>
      <Link to={"/mailbox"}>
        <ServiceButton>УЗРЕТЬ!</ServiceButton>
      </Link>
    </HomeContainer>
  );
};

const Heading = styled.h1`
  text-align: center;
`;

const Block = styled.div`
  width: 50%;
  font-size: 1.6rem;
`;

const HomeContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
