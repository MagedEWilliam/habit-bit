import { createStore } from "@stencil/store";

let habits = [
  {
    order: 0,
    name: "Drink Water",
    id: 'd6728761-f280-4da8-9087-f8d66f84165d',
    color: '#0CC5FD'
  }
];

let checkinByHabit = {
  "d6728761-f280-4da8-9087-f8d66f84165d": {
    "2020": []
  }
};

if (typeof localStorage !== 'undefined') {
  try {
    const retriveCheckinByHabit = JSON.parse( localStorage.getItem('checkinByHabit') );
    const retriveHabits = JSON.parse( localStorage.getItem('habits') );
    
    if(retriveCheckinByHabit){
      checkinByHabit = retriveCheckinByHabit
    }
    if(retriveHabits){
      habits = retriveHabits
    }
  }
  catch(e) {
    console.log(e)
  }
}

console.log(checkinByHabit)

const { state, onChange} = createStore({
  habits: [
    ...habits
  ],
  checkinByHabit: {
    ...checkinByHabit
  }
});

onChange('habits', value => {
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem('habits', JSON.stringify(value));
    }
    catch(e) {
      console.log(e)
    }
  }
});

onChange('checkinByHabit', value => {
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem('checkinByHabit', JSON.stringify(value));
    }
    catch(e) {
      console.log(e)
    }
  }
});

export default state;