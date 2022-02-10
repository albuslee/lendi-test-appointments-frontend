import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #e7e7e7;
  display: flex;
  font-size: 20px;
  justify-content: space-between;
  padding: 24px 48px;
  box-shadow: 1px 1px 1px #b8b8b8;
  margin-bottom: 48px;
`;

export interface NavigationProps {
  selectedBrokerAppointment:
    | {
        name: string;
        date: string;
      }
    | undefined;
}

const Navigation = ({ selectedBrokerAppointment }: NavigationProps) => {
  return (
    <Wrapper>
      <strong>
        {selectedBrokerAppointment
          ? `Currently selected appointment: ${selectedBrokerAppointment.date} with ${selectedBrokerAppointment.name}`
          : "Please select an appointment"}
      </strong>
      <strong>Welcome to Lendi</strong>
    </Wrapper>
  );
};

export default Navigation;
