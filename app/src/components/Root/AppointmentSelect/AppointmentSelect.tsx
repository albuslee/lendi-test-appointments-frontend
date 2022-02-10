import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Broker from "./Broker";

const Wrapper = styled.div`
  display: flex;
`;

const SideBar = styled.div`
  width: 250px;
`;

const Heading = styled.strong.attrs({ role: "heading", level: 2 })`
  display: block;
  font-size: 20px;
`;

interface BrokerAppointment {
  id: number;
  name: string;
  appointments: { id: number; brokerId: number; date: string }[];
}

type Broker = Pick<BrokerAppointment, "id" | "name">;

type Appointment = {
  id: number;
  brokerId: number;
  date: string;
};
export interface AppointmentSelectProps {
  setSelectedBrokerAppointment: Function;
}

const AppointmentSelect = ({
  setSelectedBrokerAppointment,
}: AppointmentSelectProps) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<number>();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment>();
  const [brokerAppointments, setBrokerAppointments] = useState<
    BrokerAppointment[]
  >([]);

  // use two useEffect here to make sure appointments are loaded first,
  // or we can use await to get both appointments and brokers within one useEffect
  useEffect(() => {
    axios
      .get("http://localhost:8080/appointments")
      .then(({ data }) => setAppointments(data));
  }, []);
  useEffect(() => {
    axios.get("http://localhost:8080/brokers").then(({ data }) => {
      const updatedData = data.map((broker: Broker) => ({
        ...broker,
        appointments: appointments.filter(
          (appt) => appt.brokerId === broker.id
        ),
      }));
      setBrokerAppointments(updatedData);
    });
  }, [appointments]);

  // update selectedAppointment when selectedAppointmentId is updated by clicking appointment
  useEffect(() => {
    const appointment = appointments.find(
      (appt: Appointment) => appt.id === selectedAppointmentId
    );
    setSelectedAppointment(appointment);
    if (selectedAppointmentId) {
      setSelectedBrokerAppointment({
        name: brokerAppointments.find(
          (broker) => broker.id === appointment?.brokerId
        )?.name,
        date: appointment?.date,
      });
    }
  }, [selectedAppointmentId]);

  return (
    <Wrapper>
      <SideBar>
        <Heading>Amazing site</Heading>
        <ul>
          {brokerAppointments.map((broker: BrokerAppointment) => (
            <Broker
              key={broker.id}
              broker={broker}
              setSelectedAppointmentId={setSelectedAppointmentId}
            />
          ))}
        </ul>
      </SideBar>
      <div>
        <Heading>Appointment details</Heading>
        {selectedAppointment ? (
          <>
            <div>BrokerId: {selectedAppointment?.brokerId}</div>
            <div>Date: {selectedAppointment?.date}</div>
          </>
        ) : (
          <div>No appointments are selected</div>
        )}
      </div>
    </Wrapper>
  );
};

export default AppointmentSelect;
