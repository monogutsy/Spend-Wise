import { addDays, format } from "date-fns";
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

function toIsoDate(daysFromNow) {
  return format(
    addDays(new Date(), daysFromNow),
    "yyyy-MM-dd"
  );
}

const initialState = {
  bills: [
    {
      id: uuid(),
      name: "Electricity",
      amount: 2200,
      dueDate: toIsoDate(1),
    },
    {
      id: uuid(),
      name: "Internet",
      amount: 1599,
      dueDate: toIsoDate(4),
    },
    {
      id: uuid(),
      name: "Water",
      amount: 680,
      dueDate: toIsoDate(2),
    },
  ],
};

const billsSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {
    addBill: (state, action) => {
      state.bills.push(action.payload);
    },
    deleteBill: (state, action) => {
      state.bills = state.bills.filter(
        (bill) => bill.id !== action.payload
      );
    },
  },
});

export const { addBill, deleteBill } =
  billsSlice.actions;

export default billsSlice.reducer;
