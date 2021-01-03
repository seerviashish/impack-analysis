import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Student = {
  id: string;
  name: string;
  Image: string;
  state: StudentState;
};

export enum StudentState {
  NONE,
  SHORTLISTED,
  REJECTED,
}

export type HomePageState = {
  students: Student[];
};

const initialState: HomePageState = {
  students: [],
};

const homePageSlice = createSlice({
  name: "@HomePage",
  initialState,
  reducers: {
    setStudent(state, action: PayloadAction<Student[]>) {
      state.students = action.payload;
    },
    clearStudent(state) {
      state.students = [];
    },
    addStudent(state, action: PayloadAction<Student>) {
      state.students.push(action.payload);
    },
    removeStudent(state, action: PayloadAction<string>) {
      state.students = state.students.filter(
        (data) => data.id !== action.payload
      );
    },
    shortListStudent(state, action: PayloadAction<string>) {
      state.students = state.students.map((data) => {
        if (data.id === action.payload) {
          data.state = StudentState.SHORTLISTED;
        }
        return data;
      });
    },
    rejectStudent(state, action: PayloadAction<string>) {
      state.students = state.students.map((data) => {
        if (data.id === action.payload) {
          data.state = StudentState.REJECTED;
        }
        return data;
      });
    },
  },
});

export const {
  setStudent,
  clearStudent,
  addStudent,
  removeStudent,
} = homePageSlice.actions;

export default homePageSlice.reducer;
