import { createSlice } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config";
import STATUSES from "./STATUSES";

const groupsSlice = createSlice({
  name: "groups",
  initialState: {
    data: [],
    fetchGroups: false,
    selectedGroup: null,
    status: STATUSES.IDLE,
  },
  reducers: {
    getgroups(state, action) {
      state.data.push(action.payload);
      state.fetchGroups = true;
    },
    selectgroup(state, action) {
      console.log("I am called!!!");
      state.selectedGroup = action.payload;
    },
  },
});

export const { getgroups, selectgroup } = groupsSlice.actions;
export default groupsSlice.reducer;

// Thunks;
export function getGroups() {
  return async function getGroupsThunk(dispatch, getState) {
    try {
      const colRef = collection(db, "groups");
      const docsSnap = await getDocs(colRef);

      if (docsSnap) {
        docsSnap.forEach((doc) => {
          dispatch(getgroups(doc.data()));
        });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such Collection!");
      }
    } catch (err) {
      console.log("ERROR - ", err);
    }
  };
}
// export function getGroups() {
//   return function getGroupsThunk(dispatch, getState) {
//     try {
//       const colRef = collection(db, "groups");
//       const unsub = onSnapshot(colRef, (querySnapshot) => {
//         const groups = [];
//         querySnapshot.forEach((doc) => {
//           groups.push(doc.data());

//           dispatch(getgroups(doc.data()));
//         });
//         console.log("groups  , ,, , , ", groups);
//       });
//       return () => unsub();
//     } catch (err) {
//       console.log("ERROR - ", err);
//     }
//   };
// }
