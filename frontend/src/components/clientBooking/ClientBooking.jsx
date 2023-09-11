import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Dropdown, DropdownButton, Button, Form } from 'react-bootstrap';
import services from './Services';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment-timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './clientBooking.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import colors from '../../styles/colors'

import { useCreateAppointmentMutation, useGetCalendarAppointmentsQuery, useGetPractitionerAvailabilityQuery } from '../../slices/appointmentApiSlice';

import Loader from '../../components/loader/Loader';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

moment.tz.setDefault("America/Toronto");
const localizer = momentLocalizer(moment);

const ClientBooking = () => {
  const [newBooking, setNewBooking] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [hasSelectedServiceOnce, setHasSelectedServiceOnce] = useState(false);

  // const [selectedPractitioner, setSelectedPractitioner] = useState('Any');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: calendarAppointments, isLoading: loadingAppointments, isError } = useGetCalendarAppointmentsQuery();
  const { data: practitionerAvailability } =  useGetPractitionerAvailabilityQuery();
  const [createAppointment, { isLoading }] = useCreateAppointmentMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) { // if user is not authenticated
        navigate('/'); // redirect them to the home or login page
    }
  }, [navigate, userInfo]);

  const getEvents = () => {
    if (!hasSelectedServiceOnce) {
      return [];  // Return an empty array if a service has not been selected yet
    }
  
    const filterByService = (app) => {
      if (!selectedService) return true;
      return app.service.startsWith(selectedService.split(' - ')[0]);
    };
  
    const appointmentEvents = calendarAppointments
      ? calendarAppointments
          .filter(filterByService)
          .map(app => {
            const startTime = moment.tz(app.scheduleTime, "America/Toronto");
            const endTime = startTime.clone().add(parseInt(app.duration), 'minutes');
        
            return {
              title: 'Unavailable',
              start: startTime.toDate(),
              end: endTime.toDate(),
              service: app.service,
              unavailable: true,
            };
          })
      : [];
  
    return [
      ...appointmentEvents,
      ...(newBooking ? [newBooking] : [])
    ];
  };
  // Function to style events (grey out unavailable times and remove borders)
  const eventPropGetter = (event) => {
    let style = {
      border: 'none',
      borderRadius: 0,
    };
    if (event.unavailable) {
      style.backgroundColor = colors['translucent-grey'];
      style.width = '100%';
      style.cursor = 'not-allowed';
      style.marginRight = 0;
      style.display = 'flex';
    } else {
      style.backgroundColor = colors.primary; // Default events to orange
    }
    return { style };
  };

  const dayPropGetter = (date) => {
    if (moment(date).isBefore(moment(), 'day')) {
      return {
        style: {
          backgroundColor: colors['translucent-lightgrey'],
        },
      };
    } else if (moment(date).isSame(moment(), 'day')) {
      return {
        style: {
          backgroundColor: colors.light,
        },
      };
    }
    return {};
  };

  // Set the minimum time to 10:00 AM and the maximum time to 8:00 PM
  const minTime = new Date();
  minTime.setHours(10, 0, 0);
  const maxTime = new Date();
  maxTime.setHours(20, 0, 0);

  const handleSelectSlot = (slotInfo) => {

    if (!selectedService || !selectedDuration) {
      toast.error('Please select a service and duration.');
      return;
    }

    if (moment(slotInfo.start).isBefore(moment())) {
      toast.error('You cannot create an event before the current date.');
      return;
    }

    const selectedDurationMinutes = parseInt(selectedDuration.split(' ')[0]);
    const slotDurationMinutes = moment(slotInfo.end).diff(moment(slotInfo.start), 'minutes');
    if (slotDurationMinutes !== selectedDurationMinutes) {
      toast.error(`Please select a time slot that is exactly ${selectedDuration} long.`);
      return;
    }

    // Check if the slot overlaps with an unavailable time
    if (getEvents().some(event => event.unavailable && slotInfo.start < event.end && slotInfo.end > event.start)) {
      toast.error('This time slot is unavailable. Please select another time.');
      return;
    }

    // Proceed with booking
    const title = `${selectedService}`;
    const booking = {
      title,
      start: moment.tz(slotInfo.start, "America/Toronto").toDate(),
      end: moment.tz(slotInfo.end, "America/Toronto").toDate(),
      message: message,
    };
    setNewBooking(booking);
  };

  // Function to update dropdown options based on selected service
  useEffect(() => {
    if (selectedService) {
      const durations = Object.keys(services[selectedService]['duration-cost']);
      // const practitioners = services[selectedService]['practitioners'];
      setSelectedDuration(durations[0]); // Default to the first duration
      // setSelectedPractitioner('Any'); // Default to the first practitioner
    }
  }, [selectedService]);

  const handleServiceChange = (service) => {
    setSelectedService(service);
    setHasSelectedServiceOnce(true);  // Set this to true when a service is selected
  };

  const handleBookingRequest = async () => {
    if (!newBooking) {
      toast.error('Please select a time slot for your appointment.');
      return;
    }

    const fullDateAndTime = moment.tz(newBooking.start, "America/Toronto").toISOString(); // Convert the date to ISO format which is universally accepted 

    try {
      await createAppointment({
        type: 'Request',
        service: selectedService,
        scheduleTime: fullDateAndTime, // Pass the ISO format string here
        duration: selectedDuration,
        // practitioner: selectedPractitioner,
        price: services[selectedService]['duration-cost'][selectedDuration],
        message: message,
      });
      toast.success('Appointment requested successfully. We will contact you shortly.');
      // send email here
    } catch (error) {
      toast.error('There was an error requesting your appointment. Please try again.');
    }
  };
  return (
    <section className="booking-section">
      <Row className="booking-container">
        <Col sm={12} md={4} className="p-0 m-0 booking-column">
          <Container className="selection-container-menu">
            <Container className="selection-container-menu-content">
              <p className="title">Request Appointment</p>
              <p className="subtitle">Service</p>
              <DropdownButton id="dropdown-basic-button" title={selectedService || "Select Service"}>
                {Object.keys(services).map((service, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => handleServiceChange(service)}
                  >
                    {service}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <p className="subtitle">Duration</p>
              <DropdownButton
                id="dropdown-basic-button"
                title={selectedDuration || "Select Duration"}
                onClick={() => {
                  if (!selectedService) {
                    toast.error('Please select a service first.');
                  }
                }}
              >
                {selectedService && Object.keys(services[selectedService]['duration-cost']).map((duration, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => setSelectedDuration(duration)}
                  >
                    {duration}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <p className="subtitle">Phone Number and Message</p>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter phone number and message here..."
                className="message-box"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <p className="notetitle">*For a faster response, it is highly recommended to leave your phone number in the message box or in your profile before requesting.</p>
              <p className="notetitle"><br/>*Note these unavailable times are not definite at all! We can try to accommodate your request if you call us to confirm at +1 (647) 352-8688</p>

              <Button className="booking-request-button" onClick={handleBookingRequest}>
              {isLoading ? <Loader/>: 'Request'}
              </Button>
            </Container>
          </Container>
        </Col>
        <Col sm={12} md={8} className="p-0 m-0 calendar-column">
          {loadingAppointments ? <Loader/> :
          <Container className="calendar-container">
            <Calendar
              localizer={localizer}
              events={getEvents()}
              min={minTime}
              max={maxTime}
              step={15}
              timeslots={1}
              eventPropGetter={eventPropGetter}
              dayPropGetter={dayPropGetter} // Add this line
              selectable
              onSelectSlot={handleSelectSlot}
              resizable
              defaultView={Views.WEEK}
              views={{ week: true }}
            />
          </Container>
          }
        </Col>
      </Row>
    </section>
  );
};

export default ClientBooking;