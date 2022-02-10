import React, { useState } from "react";
import styled from "styled-components";

import Navigation from "./Navigation";
import AppointmentSelect from "./AppointmentSelect";

const Wrapper = styled.div`
  background-color: #fcfcfc;
  height: 100%;
  width: 100%;
`;

const Content = styled.div`
  margin: 0 auto;
  padding: 24px;
  width: 720px;
  box-shadow: 1px 1px 4px #d3d3d3;
  background-color: white;
  border-radius: 5px;
`;

const Heading = styled.strong.attrs({ role: "heading", level: 1 })`
  display: block;
  font-size: 36px;
  margin-bottom: 40px;
  margin-top: 20px;
`;

type selectedBrokerAppointment = {
  name: string;
  date: string;
};

const Root = () => {
  const [selectedBrokerAppointment, setSelectedBrokerAppointment] = useState<
    selectedBrokerAppointment | undefined
  >();
  return (
    <Wrapper>
      <Navigation selectedBrokerAppointment={selectedBrokerAppointment} />
      <Content>
        <Heading>Amazing site</Heading>
        <AppointmentSelect
          setSelectedBrokerAppointment={setSelectedBrokerAppointment}
        />
      </Content>
    </Wrapper>
  );
};

export default Root;
