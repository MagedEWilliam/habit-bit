import { createStore } from "@stencil/store";

const { state } = createStore({
    habits: [
        {
            order: 0,
            name: "Drinking water",
            id: '0',
            color: '#74FD0C'
        },
        {
            order: 0,
            name: "Eating Healthy",
            id: 'd6728761-f280-4da8-9087-f8d66f84165d',
            color: '#0CC5FD'
        },
    ],
    checkinByHabit: {
        "0": {
          "2020": [
            "2020-10-1",
            "2020-10-11",
            "2020-9-16",
            "2020-9-13",
            "2020-9-28"
          ]
        },
        "d6728761-f280-4da8-9087-f8d66f84165d": {
          "2020": [
            "2020-8-1",
            "2020-1-16",
            "2020-3-16",
            "2020-2-13",
            "2020-4-28"
          ]
        }
      }
});

export default state;