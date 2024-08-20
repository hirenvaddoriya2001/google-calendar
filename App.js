// import React from "react";
// import ApiCalendar from "react-google-calendar-api";

// import "./styles.css";

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       // sign: ApiCalendar.sign
//     };

//     // this.signUpdate = this.signUpdate.bind(this);
//     // ApiCalendar.onLoad(() => {
//     //   ApiCalendar.listenSign(this.signUpdate);
//     // });

//     this.handleItemClick = this.handleItemClick.bind(this);
//   }

//   // signUpdate(sign) {
//   //   this.setState({ sign }, () => console.log(this.state.sign));
//   // }

//   async handleItemClick(event, name) {
//     if (name === "sign-in") {
//       const res = await ApiCalendar.handleAuthClick();
//       console.log("logged in", res);
//     } else if (name === "sign-out") {
//       ApiCalendar.handleSignoutClick();
//       console.log("logged out");
//     }
//   }

//   async getUserInfo() {
//     if (ApiCalendar.sign) {
//       const response = await ApiCalendar.getBasicUserProfile();
//       console.log(response);
//     }
//   }

//   listUpcomingEvents() {
//     if (ApiCalendar.sign)
//       ApiCalendar.listUpcomingEvents(10).then(({ result }) => {
//         console.log("upcomsing events", result.items);
//       });
//   }

//   listAllEvents() {
//     if (ApiCalendar.sign)
//       ApiCalendar.listEvents({
//         timeMin: new Date().toISOString()
//       }).then(({ result }) => {
//         console.log(result.items);
//       });
//   }

//   updateEvent() {
//     const eId = "7eppmkfbhi4gtvvapv9hvej1lm";
//     const event = {
//       summary: "changed name to meet30june for demo purposes"
//     };
//     ApiCalendar.updateEvent(event, eId).then((res) => {
//       console.log(res);
//     });

//     ApiCalendar.getEvent(eId).then(console.log);
//   }

//   createEventFromNow() {
//     const eventFromNow = {
//       summary: "Poc Dev From Now",
//       time: 180
//     };

//     ApiCalendar.createEventFromNow(eventFromNow)
//       .then((response) => console.log(response))
//       .catch((err) => console.log(err));
//   }

//   createEvent() {
//     let stDate = "2021-07-01T12:00:00+05:30";
//     let endDate = "2021-07-01T15:00:00+05:30";
//     const event = {
//       summary: "new event created",
//       description: "demo of create event function",
//       start: {
//         dateTime: stDate
//       },
//       end: {
//         dateTime: endDate
//       }
//     };

//     ApiCalendar.createEvent(event)
//       .then((res) => console.log(res))
//       .catch((err) => console.log(err));
//   }

//   render() {
//     return (
//       <>
//         <button onClick={(e) => this.handleItemClick(e, "sign-in")}>
//           sign-in
//         </button>
//         <button onClick={(e) => this.handleItemClick(e, "sign-out")}>
//           sign-out
//         </button>
//         <button onClick={(e) => this.getUserInfo()}>get user info</button>
//         <button onClick={(e) => this.listUpcomingEvents()}>
//           list upcoming events
//         </button>
//         <button onClick={(e) => this.listAllEvents()}>list all events</button>
//         <button onClick={(e) => this.updateEvent()}>update an Event</button>
//         <button onClick={(e) => this.createEventFromNow()}>
//           create an Event from now
//         </button>
//         <button onClick={(e) => this.createEvent()}>create an Event</button>
//         {/* <div>{`${this.state.sign ? "true" : "false"}`}</div> */}
//       </>
//     );
//   }
// }


import React, { useEffect } from "react";
import ApiCalendar from "react-google-calendar-api";

import "./styles.css";

export default function App() {
  useEffect(() => {
    ApiCalendar.onLoad(() => {
      ApiCalendar.listenSign((sign) => {
        console.log("Sign status:", sign);
      });
    });
  }, []);

  const handleItemClick = async (name) => {
    if (name === "sign-in") {
      try {
        await ApiCalendar.handleAuthClick();
        console.log("Logged in");
      } catch (error) {
        console.log("Error:", error);
      }
    } else if (name === "sign-out") {
      ApiCalendar.handleSignoutClick();
      console.log("Logged out");
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await ApiCalendar.getBasicUserProfile();
      console.log("User info:", response);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const listUpcomingEvents = async () => {
    try {
      const { result } = await ApiCalendar.listUpcomingEvents(10);
      console.log("Upcoming events:", result.items);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const listAllEvents = async () => {
    try {
      const { result } = await ApiCalendar.listEvents({
        timeMin: new Date().toISOString(),
      });
      console.log("All events:", result.items);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const updateEvent = async () => {
    const eventId = "7eppmkfbhi4gtvvapv9hvej1lm";
    const event = {
      summary: "Changed name to meet30june for demo purposes",
    };

    try {
      const response = await ApiCalendar.updateEvent(event, eventId);
      console.log("Event updated:", response);
    } catch (error) {
      console.log("Error:", error);
    }

    try {
      const eventDetails = await ApiCalendar.getEvent(eventId);
      console.log("Updated event details:", eventDetails);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const createEventFromNow = async () => {
    const eventFromNow = {
      summary: "Poc Dev From Now",
      time: 180,
    };

    try {
      const response = await ApiCalendar.createEventFromNow(eventFromNow);
      console.log("Event created from now:", response);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const createEvent = async () => {
    const startDate = "2021-07-01T12:00:00+05:30";
    const endDate = "2021-07-01T15:00:00+05:30";
    const event = {
      summary: "New event created",
      description: "Demo of create event function",
      start: {
        dateTime: startDate,
      },
      end: {
        dateTime: endDate,
      },
    };

    try {
      const response = await ApiCalendar.createEvent(event);
      console.log("Event created:", response);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <button onClick={() => handleItemClick("sign-in")}>Sign In</button>
      <button onClick={() => handleItemClick("sign-out")}>Sign Out</button>
      <button onClick={getUserInfo}>Get User Info</button>
      <button onClick={listUpcomingEvents}>List Upcoming Events</button>
      <button onClick={listAllEvents}>List All Events</button>
      <button onClick={updateEvent}>Update an Event</button>
      <button onClick={createEventFromNow}>Create an Event from Now</button>
      <button onClick={createEvent}>Create an Event</button>
    </>
  );
}
