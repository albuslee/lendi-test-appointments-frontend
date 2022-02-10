import { screen, render, fireEvent } from "@testing-library/react";

import Broker from "./Broker";

const testBroker = {
  name: "bob",
  id: 1,
  appointments: [{ brokerId: 1, date: "24/11/2021", id: 1 }],
};
const setSelectedAppointmentId = () => {};

describe("Broker Component", () => {
  beforeEach(() => {
    render(
      <Broker
        broker={testBroker}
        setSelectedAppointmentId={setSelectedAppointmentId}
      />
    );
  });
  test("should display no appointments when not clicking button", () => {
    const showAppointmentsButton = screen.getByTestId(
      "broker-appointments-button"
    );
    expect(showAppointmentsButton.innerHTML).toBe("Show appointments");
    expect(() => screen.getByTestId("broker-appointments-list")).toThrow();
  });

  test("should show appointments on button click", () => {
    const showAppointmentsButton = screen.getByTestId(
      "broker-appointments-button"
    );
    fireEvent.click(showAppointmentsButton);
    const appointmentsList = screen.getByTestId("broker-appointments-list");
    expect(showAppointmentsButton.innerHTML).toBe("Hide appointments");
    expect(appointmentsList.children).toHaveLength(1);
    expect(appointmentsList.children[0].innerHTML).toBe("24/11/2021");
  });

  test("should hide appointments after click button twice", () => {
    const showAppointmentsButton = screen.getByTestId(
      "broker-appointments-button"
    );
    fireEvent.click(showAppointmentsButton);
    fireEvent.click(showAppointmentsButton);
    expect(showAppointmentsButton.innerHTML).toBe("Show appointments");
    expect(() => screen.getByTestId("broker-appointments-list")).toThrow();
  });
});
