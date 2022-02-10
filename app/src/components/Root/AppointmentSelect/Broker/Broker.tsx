import React, { useState } from "react";
import styled from "styled-components";

const Li = styled.li`
  cursor: pointer;
`;
export interface BrokerProps {
  broker: {
    name: string;
    id: number;
    appointments: { id: number; brokerId: number; date: string }[];
  };
  setSelectedAppointmentId: Function;
}

enum AppointmentStatus {
  Show = "Show",
  Hide = "Hide",
}

const Broker = (broker: BrokerProps) => {
  const [hidden, setHidden] = useState<boolean>(true);

  const AppointmentList = () => (
    <ul data-testid="broker-appointments-list">
      {broker.broker.appointments.length > 0 ? (
        broker.broker.appointments.map(({ id, date }) => (
          <Li key={id} onClick={() => broker.setSelectedAppointmentId(id)}>
            {date}
          </Li>
        ))
      ) : (
        <div>No appointments available</div>
      )}
    </ul>
  );

  return (
    <li>
      {broker.broker.name}
      <br />
      appointments:
      <button
        data-testid="broker-appointments-button"
        onClick={() => setHidden(!hidden)}
      >
        {hidden ? AppointmentStatus.Show : AppointmentStatus.Hide} appointments
      </button>
      {!hidden ? <AppointmentList /> : <></>}
    </li>
  );
};

export default Broker;
