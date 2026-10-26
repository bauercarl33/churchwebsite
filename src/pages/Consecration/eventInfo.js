// Details for the Consecration weekend, from the parish's event information
// (src/info.txt). Edit here to update the page.

/** Google Maps search link for a street address. */
export const mapsLink = (address) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export const eventName =
  "Consecration of Saint Mary Romanian Orthodox Church’s New Building and Parish Hall";

export const mainService = {
  label: "Consecration Service of the Church",
  dayLabel: "Saturday, November 14",
  time: "9:00 AM",
};

export const program = [
  {
    day: "Friday",
    date: "November 13",
    isoDate: "2026-11-13",
    items: [
      { time: "6:00 PM", iso: "18:00", title: "Great Vespers" },
      { time: "7:00 PM", iso: "19:00", title: "Conference" },
      {
        time: "7:30 PM",
        iso: "19:30",
        title: "Christmas Carol and Byzantine Music Concert",
        detail: "by the Anastasios Byzantine Chant Group",
      },
      { time: "8:30 PM", iso: "20:30", title: "Dinner" },
    ],
  },
  {
    day: "Saturday",
    date: "November 14",
    isoDate: "2026-11-14",
    main: true,
    items: [
      { time: "8:00 AM", iso: "08:00", title: "Matins" },
      { time: "9:00 AM", iso: "09:00", title: "Consecration Service of the Church", highlight: true },
      { time: "10:30 AM", iso: "10:30", title: "Divine Liturgy" },
      { time: "12:00 PM", iso: "12:00", title: "Sermon" },
      { time: "12:30 PM", iso: "12:30", title: "Presentation of Honors" },
      { time: "1:00 PM", iso: "13:00", title: "Lunch" },
      { time: "6:00 PM", iso: "18:00", title: "Vespers" },
      { time: "7:15 PM", iso: "19:15", title: "Conference" },
    ],
    note: "No dinner on Saturday evening.",
  },
  {
    day: "Sunday",
    date: "November 15",
    isoDate: "2026-11-15",
    items: [
      { time: "9:00 AM", iso: "09:00", title: "Matins" },
      { time: "10:00 AM", iso: "10:00", title: "Divine Liturgy" },
      { time: "11:45 AM", iso: "11:45", title: "Sermon" },
      { time: "12:15 PM", iso: "12:15", title: "Lunch" },
    ],
  },
];

export const parking = {
  main: {
    title: "Main parking",
    text: "At the church, 200 Monaco Drive, Cedar Park, TX 78613.",
  },
  overflow: {
    title: "Overflow parking",
    name: "Nissan",
    address: "2121 S Bell Blvd, Cedar Park, TX 78613",
  },
  shuttle:
    "A dedicated bus will run back and forth continuously between the overflow parking lot and the church.",
  signs: "Look out for directional signs guiding you to the correct parking zones.",
};

export const hotel = {
  name: "Marriott",
  address: "2600 La Frontera Blvd., Round Rock, TX, 78681",
  booking: "SAINT MARY",
  rate: "$99/room",
  link: "https://www.marriott.com/event-reservations/reservation-link.mi?id=1793033685472&key=GRP&app=resvlink&_p=c71529c39d0b7af2e31a90ffeabd&__branch_flow_type=chrome_deepview&__branch_flow_id=1643372191264953521"
};
