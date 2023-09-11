import React, { useRef, useState } from 'react';
import './adminScheduler.scss';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import AdminSidebar from '../../components/adminSidebar/AdminSidebar';
import AdminContent from '../../components/adminContent/AdminContent';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { makeStyles } from '@mui/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';
import { FormControl } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useCreateAppointmentMutation, useDeleteAppointmentMutation, useUpdateAppointmentMutation, useGetPendingAppointmentsQuery, useGetCalendarAppointmentsQuery,  useGetPractitionerAvailabilityQuery } from '../../slices/appointmentApiSlice';
import colors from '../../styles/colors'
  

const localizer = momentLocalizer(moment);

const useStyles = makeStyles((theme) => ({
  calendarRoot: {
      width: '100%',
      maxWidth: '100%',
      height: '300px',
      borderBottom: '1px solid #3B6E99',
      '& .MuiPickersCalendarHeader-dayLabel': {
          fontSize: '1em',
      },
      '& .MuiPickersDay-day': {
          fontSize: '0.25rem',
      },
      '& .MuiPickersCalendar-week': {  // Adjusts the height of each week row
          height: '20px',  
      },
      '& .MuiPickersCalendarHeader-transitionContainer': {  // Adjusts the height of the header
          height: '20px',
      },
  },
}));

const AdminScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeSwitch, setActiveSwitch] = useState('bookings'); // set the default active switch to 'bookings'
  const [appointmentInfo, setAppointmentInfo] = useState(null);
  const [showAppointmentInfo, setShowAppointmentInfo] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  // const [calendarKey, setCalendarKey] = useState(0);

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const messageRef = useRef();

  const classes = useStyles();

  const minTime = new Date();
  minTime.setHours(8, 0, 0);
  const maxTime = new Date();
  maxTime.setHours(23, 0, 0);

  const [checked, setChecked] = useState({});

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setChecked(prevState => ({ ...prevState, [name]: checked }));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date.toDate());
  };

  const handleNavigate = (newDate) => {
    setSelectedDate(new Date(newDate));
  };

  const handleSwitchChange = (event) => {
    setActiveSwitch(event.target.value); // set the active switch to the value of the clicked switch
  };
  
  const handleSelectEvent = (event) => {
    setIsCreating(false);
    setAppointmentInfo(event);
    setShowAppointmentInfo(true);

    if (nameRef.current) {
      nameRef.current.value = event.name;
    }

    if (emailRef.current) {
      emailRef.current.value = event.email;
    }

    if (phoneRef.current) {
      phoneRef.current.value = event.phone;
    }

    if (messageRef.current) {
      messageRef.current.value = event.message;
    }
  };

  const resourceMap = [
    { resourceId: 'Wei Guan', resourceTitle: 'Wei Guan', checked: checked['Wei Guan'] },
    { resourceId: 'Julie Zhu', resourceTitle: 'Julie Zhu', checked: checked['Julie Zhu'] },
    { resourceId: 'Shaoying Huang', resourceTitle: 'Shaoying Huang', checked: checked['Shaoying Huang'] },
    { resourceId: 'Shuqin Xiong', resourceTitle: 'Shuqin Xiong', checked: checked['Shuqin Xiong'] },
    { resourceId: 'Yiyang Huang', resourceTitle: 'Yiyang Huang', checked: checked['Yiyang Huang'] },
    { resourceId: 'Jeffery Cheng', resourceTitle: 'Jeffery Cheng', checked: checked['Jeffery Cheng'] },

    { resourceId: 'Wendy Wen', resourceTitle: 'Wendy Wen', checked: checked['Wendy Wen'] },

    { resourceId: 'Zhifeng Zhang', resourceTitle: 'Zhifeng Zhang', checked: checked['Zhifeng Zhang'] },

    { resourceId: 'Linhan Zhang', resourceTitle: 'Linhan Zhang', checked: checked['Linhan Zhang'] },
    { resourceId: 'Mark Train', resourceTitle: 'Mark Train', checked: checked['Mark Train'] },
    { resourceId: 'Alexander Kipershlak', resourceTitle: 'Alexander Kipershlak', checked: checked['Alexander Kipershlak'] },
  ]

  const { data: pendingAppointments } =  useGetPendingAppointmentsQuery();
  const { data: calendarAppointments } =  useGetCalendarAppointmentsQuery();
  const { data: practitionerAvailability } =  useGetPractitionerAvailabilityQuery();
  const [updateAppointment, { isLoading }] = useUpdateAppointmentMutation();
  const [deleteAppointment, { isLoading: deleting }] = useDeleteAppointmentMutation();
  const [createAppointment, { isLoading: creating }] = useCreateAppointmentMutation();

  const getRequests = () => {
    const pendingAppointmentEvents = pendingAppointments ? pendingAppointments.map(app => {
      const startTime = moment.tz(app.scheduleTime, "America/Toronto");
      const endTime = startTime.clone().add(parseInt(app.duration), 'minutes');
  
      return {
        title: `${app.service} request`,
        start: startTime.toDate(),
        end: endTime.toDate(),
        
        _id: app._id,
        name: app.name,
        email: app.email,
        phone: app.phone,
        type: app.type,
        service: app.service,
        practitioner: app.practitioner,
        message: app.message,
      };
    }) : [];
  
    return [
      ...pendingAppointmentEvents,
    ];
  };

  const getBookingsAndAvailability = () => {
    const calendarAppointmentEvents = calendarAppointments ? calendarAppointments.map(app => {
      const startTime = moment.tz(app.scheduleTime, "America/Toronto");
      const endTime = startTime.clone().add(parseInt(app.duration), 'minutes');
  
      return {
        title: `${app.service} booking`, // Set the title to 'Unavailable'
        start: startTime.toDate(),
        end: endTime.toDate(),
        
        resourceId: app.practitioner,
        
        _id: app._id,
        name: app.name,
        email: app.email,
        phone: app.phone,
        type: app.type,
        service: app.service,
        practitioner: app.practitioner,
        message: app.message,
      };
    }) : [];

    const availabilityEvents = practitionerAvailability ? practitionerAvailability.map(app => {
      const startTime = moment.tz(app.scheduleTime, "America/Toronto");
      const endTime = startTime.clone().add(parseInt(app.duration), 'minutes');

      return {
        title: `${app.practitioner} availability`, // Set the title to 'Unavailable'
        start: startTime.toDate(),
        end: endTime.toDate(),

        resourceId: app.practitioner,

        _id: app._id,
        name: app.name,
        email: app.email,
        phone: app.phone,
        type: app.type,
        service: app.service,
        practitioner: app.practitioner,
        message: app.message,
      };
    }) : [];

    return [
      ...calendarAppointmentEvents,
      ...availabilityEvents,
    ];
  };

  const handleCreateAppointment = () => {
    if (appointmentInfo.practitioner === "N/A") {
      toast.error('Practitioner cannot be N/A');
      return;
    }

    if (appointmentInfo.service === "N/A" && appointmentInfo.type !== "Availability") {
      toast.error('Service cannot be N/A');
      return;
    }

    if (appointmentInfo.type === "Request") {
      toast.error('Type cannot be request');
      return;
    }

    // Check if any of the fields are empty
    if ((!nameRef.current.value || !emailRef.current.value || !phoneRef.current.value)  && appointmentInfo.type !== "Availability") {
      toast.error('Please fill out all fields');
      return;
    }

    const start = moment(appointmentInfo.start);
    const end = moment(appointmentInfo.end);

    if (!end.isAfter(start)) {
      toast.error('End time must be after start time');
      return;
    }

    const newAppointment = {
      name: nameRef.current.value, // good
      email: emailRef.current.value.toLowerCase(),  // good
      phone: phoneRef.current.value, // good
      type: appointmentInfo.type, // good
      service: appointmentInfo.service,  // good
      scheduleTime: appointmentInfo.start,  // good
      duration: moment(appointmentInfo.end).diff(moment(appointmentInfo.start), 'minutes') + " Minutes", // good
      practitioner: appointmentInfo.practitioner, // good
      message: messageRef.current.value, // good
    };

    try {
      createAppointment(newAppointment);
      toast.success('Appointment created successfully');
    } catch (error) {
      toast.error('There was an error creating the appointment. Please try again.');
    }

    setShowAppointmentInfo(false);
    // setCalendarKey(calendarKey + 1);
  };

  const handleUpdateAppointment = () => {
    if (appointmentInfo.practitioner === "N/A") {
      toast.error('Practitioner cannot be N/A');
      return;
    }

    if (appointmentInfo.service === "N/A" && appointmentInfo.type !== "Availability") {
      toast.error('Service cannot be N/A');
      return;
    }

    if (appointmentInfo.type === "Request") {
      toast.error('Type cannot be request');
      return;
    }

    // Check if any of the fields are empty
    if ((!nameRef.current.value || !emailRef.current.value || !phoneRef.current.value)  && appointmentInfo.type !== "Availability") {
      toast.error('Please fill out all fields');
      return;
    }

    const start = moment(appointmentInfo.start);
    const end = moment(appointmentInfo.end);

    if (!end.isAfter(start)) {
      toast.error('End time must be after start time');
      return;
    }

    const updatedAppointment = {
      name: nameRef.current.value,
      email: emailRef.current.value.toLowerCase(),
      phone: phoneRef.current.value,
      type: appointmentInfo.type,
      service: appointmentInfo.service,
      scheduleTime: appointmentInfo.start,
      duration: moment(appointmentInfo.end).diff(moment(appointmentInfo.start), 'minutes') + " Minutes",
      practitioner: appointmentInfo.practitioner,
      message: messageRef.current.value,
    };

    updateAppointment({ id: appointmentInfo._id, ...updatedAppointment })  // Assuming updateAppointment takes the id and the updated object
      .then(() => {
        toast.success('Appointment updated successfully');
        setShowAppointmentInfo(false);
        // setCalendarKey(calendarKey + 1);
      })
      .catch(error => {
        toast.error(`Failed to update appointment: ${error.message}`);
      });
  };

  const handleDeleteAppointment = () => {
    const idToDelete = appointmentInfo._id;  // assuming appointmentInfo is an object that contains the appointment info
  
    deleteAppointment(idToDelete) // Assuming deleteAppointment takes the id to delete
      .then(() => {
        toast.success('Appointment deleted successfully');
        setShowAppointmentInfo(false);
        // setCalendarKey(calendarKey + 1);
      })
      .catch(error => {
        toast.error(`Failed to delete appointment: ${error.message}`);
      });
  };

  const handleStartTimeChange = (e) => {
    const newStartTime = e.target.value; // This will be in "YYYY-MM-DDTHH:MM" format
    const parsedStartTime = moment(newStartTime); // This will create a Moment.js object
    setAppointmentInfo({
        ...appointmentInfo, 
        start: parsedStartTime.toDate(),
    });
  };

  const handleEndTimeChange = (e) => {
    const newEndTime = e.target.value; // This will be in "YYYY-MM-DDTHH:MM" format
    const parsedEndTime = moment(newEndTime); // This will create a Moment.js object
    setAppointmentInfo({
        ...appointmentInfo, 
        end: parsedEndTime.toDate(),
    });
  };

  const handleCloseAppointmentInfo = () => {
    setShowAppointmentInfo(false);
    setIsCreating(false);
  };

  const handleSelectSlot = ({ start, end }) => {
    setAppointmentInfo(null);
    const newAppointmentInfo = {
      start,
      end,
      name: '',
      email: '',
      phone: '',
      type: 'Booking',
      service: 'N/A',
      practitioner: 'N/A',
      message: '',
    };
    
    setIsCreating(true);
    setAppointmentInfo(newAppointmentInfo);

    setShowAppointmentInfo(true);

    if (nameRef.current) {
      nameRef.current.value = newAppointmentInfo.name;
    }

    if (emailRef.current) {
      emailRef.current.value = newAppointmentInfo.email;
    }

    if (phoneRef.current) {
      phoneRef.current.value = newAppointmentInfo.phone;
    }

    if (messageRef.current) {
      messageRef.current.value = newAppointmentInfo.message;
    }
  };

  const eventPropGetter = (event) => {
    let style = {
      border: 'none',
    };
    if (event.type === "Availability") {
      style.backgroundColor = colors.primary;
    } else if (event.type === "Request") {
      style.backgroundColor = colors["translucent-grey"];
    } else {
      style.backgroundColor = colors.dark;
    }
    return { style };
  };

  return (
    <>
      <div className="appointment-info" style={{display: showAppointmentInfo ? "block" : "none"}}>
        {appointmentInfo && 
          <div className="appointment-info-container">
            <p className="appointment-info-title">Appointment Info</p>

            <p className="appointment-info-subtitle">Name:</p>
            <input 
              className="appointment-info-input"
              type="text"
              defaultValue={appointmentInfo ? appointmentInfo.name : ''}
              ref={nameRef}
            />

            <p className="appointment-info-subtitle">Email:</p>
            <input 
              className="appointment-info-input"
              type="email"
              defaultValue={appointmentInfo ? appointmentInfo.email : ''}
              ref={emailRef}
            />

            <p className="appointment-info-subtitle">Phone:</p>
            <input 
              className="appointment-info-input"
              type="tel"
              defaultValue={appointmentInfo ? appointmentInfo.phone : ''}
              ref={phoneRef}
            />


            <p className="appointment-info-subtitle">Type:</p>
            <select className="appointment-info-select" value={appointmentInfo ? appointmentInfo.type : ''} onChange={(e) => setAppointmentInfo({...appointmentInfo, type: e.target.value})}>
              <option value="Request">Request</option>
              <option value="Booking">Booking</option>
              <option value="Completed">Completed</option>
              <option value="NoShow">NoShow</option>
              <option value="Availability">Availability</option>
            </select>

            <p className="appointment-info-subtitle">Service:</p>
            <select className="appointment-info-select" value={appointmentInfo ? appointmentInfo.service : ''} onChange={(e) => setAppointmentInfo({...appointmentInfo, service: e.target.value})}>
              <option value="N/A">N/A</option>
              <option value="RMT Massage - Aromatherapy">RMT Massage - Aromatherapy</option>
              <option value="RMT Massage - Deep Tissue">RMT Massage - Deep Tissue</option>
              <option value="RMT Massage - Hot Stone">RMT Massage - Hot Stone</option>
              <option value="RMT Massage - Lymphatic Drainage">RMT Massage - Lymphatic Drainage</option>
              <option value="RMT Massage - Swedish">RMT Massage - Swedish</option>
              <option value="Acupuncture - Initial Assessment">Acupuncture - Initial Assessment</option>
              <option value="Acupuncture - Follow Up">Acupuncture - Follow Up</option>
              <option value="Chiropractic - Initial Assessment">Chiropractic - Initial Assessment</option>
              <option value="Chiropractic - Follow Up">Chiropractic - Follow Up</option>
              <option value="Physiotherapy - Initial Assessment">Physiotherapy - Initial Assessment</option>
              <option value="Physiotherapy - Follow Up">Physiotherapy - Follow Up</option>
              <option value="Facial - Hydrating">Facial - Hydrating</option>
              <option value="Facial - Deep Cleaning">Facial - Deep Cleaning</option>
            </select>

            <p className="appointment-info-subtitle">Start Time:</p>
            <input 
              className="appointment-info-input"
              type="datetime-local" 
              value={moment(appointmentInfo.start).format("YYYY-MM-DDTHH:mm")} 
              onChange={handleStartTimeChange} 
            />

            <p className="appointment-info-subtitle">End Time:</p>
            <input 
              className="appointment-info-input"
              type="datetime-local" 
              value={moment(appointmentInfo.end).format("YYYY-MM-DDTHH:mm")} 
              onChange={handleEndTimeChange} 
            />

            <p className="appointment-info-subtitle">Practitioner:</p>
            <select className="appointment-info-select" value={appointmentInfo ? appointmentInfo.practitioner : ''} onChange={(e) => setAppointmentInfo({...appointmentInfo, practitioner: e.target.value})}>
              <option value="N/A">N/A</option>
              <option value="Wei Guan">Wei Guan</option>
              <option value="Julie Zhu">Julie Zhu</option>
              <option value="Shaoying Huang">Shaoying Huang</option>
              <option value="Shuqin Xiong">Shuqin Xiong</option>
              <option value="Yiyang Huang">Yiyang Huang</option>
              <option value="Jeffery Cheng">Jeffery Cheng</option>

              <option value="Wendy Wen">Wendy Wen</option>

              <option value="Zhifeng Zhang">Zhifeng Zhang</option>

              <option value="Linhan Zhang">Linhan Zhang</option>

              <option value="Mark Train">Mark Train</option>
              <option value="Alexander Kipershlak">Alexander Kipershlak</option>

            </select>

            <p className="appointment-info-subtitle">Message:</p>
            <textarea
              className="appointment-info-input"
              defaultValue={appointmentInfo ? appointmentInfo.message : ''}
              ref={messageRef}
            ></textarea>

            <button className="appointment-info-button" onClick={handleCloseAppointmentInfo}>Close</button>
            
            {isCreating ? 
              <>
              <button className="appointment-info-button" onClick={handleCreateAppointment}>Create</button> 
              </>
              :
              <>
                <button className="appointment-info-button" onClick={handleUpdateAppointment}>Update</button>
                <br />
                <button className="appointment-info-button" onClick={handleDeleteAppointment}>Delete</button>
              </>
            }
          </div>
        }
      </div>

      <AdminSidebar title="SCHEDULER">
        <div className="admin-scheduler-sidebar-container">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              className={classes.calendarRoot}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
          <FormGroup className="admin-sidebar-scheduler-border-bottom">
            <FormControlLabel control={<Switch checked={activeSwitch === 'bookings'} onChange={handleSwitchChange} value="bookings" />} label="Manage Bookings" />
            <FormControlLabel control={<Switch checked={activeSwitch === 'requests'} onChange={handleSwitchChange} value="requests" />} label="Manage Requests" />
          </FormGroup>
          <FormGroup>
            {/* RMT */}
            <FormControlLabel control={<Checkbox name="Wei Guan" onChange={handleCheckboxChange} />} label="Wei Guan" />
            <FormControlLabel control={<Checkbox name="Julie Zhu" onChange={handleCheckboxChange} />} label="Julie Zhu" />
            <FormControlLabel control={<Checkbox name="Shaoying Huang" onChange={handleCheckboxChange} />} label="Shaoying Huang" />
            <FormControlLabel control={<Checkbox name="Shuqin Xiong" onChange={handleCheckboxChange} />} label="Shuqin Xiong" />
            <FormControlLabel control={<Checkbox name="Yiyang Huang" onChange={handleCheckboxChange} />} label="Yiyang Huang" />
            <FormControlLabel control={<Checkbox name="Jeffery Cheng" onChange={handleCheckboxChange} />} label="Jeffery Cheng" />

            {/* Massage */}
            <FormControlLabel control={<Checkbox name="Wendy Wen" onChange={handleCheckboxChange} />} label="Wendy Wen" />

            {/* Acupuncture */}
            <FormControlLabel control={<Checkbox name="Zhifeng Zhang" onChange={handleCheckboxChange} />} label="Zhifeng Zhang" />

            {/* Physio */}
            <FormControlLabel control={<Checkbox name="Linhan Zhang" onChange={handleCheckboxChange} />} label="Linhan Zhang" />

            {/* Chiro */}
            <FormControlLabel control={<Checkbox name="Mark Train" onChange={handleCheckboxChange} />} label="Mark Train" />
            <FormControlLabel control={<Checkbox name="Alexander Kipershlak" onChange={handleCheckboxChange} />} label="Alexander Kipershlak" />
          </FormGroup>
        </div>
      </AdminSidebar>
      <AdminContent>
        <div className="admin-scheduler-container">
          {activeSwitch === 'requests' && 
            <Calendar
              // key={calendarKey}
              localizer={localizer}
              events={getRequests()}
              min={minTime}
              max={maxTime}
              step={15}
              views={{ week: true, day: true }}
              date={selectedDate}
              onNavigate={handleNavigate}
              onSelectEvent={handleSelectEvent}
              defaultView={Views.WEEK}
              eventPropGetter={eventPropGetter}
              
            />
          }
          {activeSwitch === 'bookings' &&
            <Calendar
              // key={calendarKey}
              localizer={localizer}
              events={getBookingsAndAvailability()}
              min={minTime}
              max={maxTime}
              step={15}
              selectable
              views={{ week: true, day: true }}
              resourceIdAccessor="resourceId"
              resources={resourceMap.filter(resource => resource.checked)}
              resourceTitleAccessor="resourceTitle"
              date={selectedDate}
              onNavigate={handleNavigate}  
              onSelectEvent={handleSelectEvent}
              defaultView={Views.DAY}
              onSelectSlot={handleSelectSlot}
              eventPropGetter={eventPropGetter}
            />
          }
        </div>
      </AdminContent>
    </>
  );
}

export default AdminScheduler;