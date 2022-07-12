import React from "react";
import styled from "styled-components";
import { ServiceInput } from "../UI/Inputs/ServiceInput";

export const CreateBoxModal = () => {
  return (
    <CreateBoxModalContainer>
      <form>
        <ServiceInput type="text" placeholder="Type section name"/>
      </form>
    </CreateBoxModalContainer>
  );
};

const CreateBoxModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 50%;
  width: 50%;
`;
