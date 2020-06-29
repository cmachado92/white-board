const cards = [
  {
    id: "card-1",
    title: "Complete Layout",
  },
  {
    id: "card-2",
    title: "Add portal to layout",
  },
  {
    id: "card-3",
    title: "Complete Ability to send Emails",
  },
];

const data = {
  lists: {
    "list-1": {
      id: "list-1",
      title: "Estimate",
      cards,
      color: "",
    },
    "list-2": {
      id: "list-2",
      title: "In-Progress",
      cards: [
        {
          id: "card-4",
          title: "Sync to Quickbooks",
        },
      ],
      color: "",
    },
    "list-3": {
      id: "list-3",
      title: "Completed",
      cards: [],
      color: "",
    },
  },
  listIds: ["list-1", "list-2", "list-3"],
};

export default data;
