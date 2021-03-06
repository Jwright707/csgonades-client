import { NadeLight } from "../../nade/models/Nade";
import { Report } from "../../reports/models/Report";
import { User } from "../../users/models/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContactDTO } from "../../contact/models/ContactDTOs";
import { AuditDto } from "../models/AuditEvent";

export type AdminRoutes =
  | "pending-nades"
  | "declined-nades"
  | "user"
  | "reports"
  | "contact"
  | "audit";

export type AdminState = {
  auditEvents: AuditDto[];
  contactMessages: ContactDTO[];
  pendingNades: NadeLight[];
  reports: Report[];
  route: AdminRoutes | null;
  users: User[];
};

export const initialState: AdminState = {
  auditEvents: [],
  contactMessages: [],
  pendingNades: [],
  reports: [],
  route: null,
  users: [],
};

const admin = createSlice({
  initialState,
  name: "adminSlice",
  reducers: {
    addAudits(state, action: PayloadAction<AuditDto[]>) {
      state.auditEvents = action.payload;
    },
    addContactMessages(state, action: PayloadAction<ContactDTO[]>) {
      state.contactMessages = action.payload;
    },
    addPendingNades(state, action: PayloadAction<NadeLight[]>) {
      state.pendingNades = action.payload;
    },
    addReports(state, action: PayloadAction<Report[]>) {
      state.reports = action.payload;
    },
    addUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    changeRoute(state, action: PayloadAction<AdminRoutes>) {
      state.route = action.payload;
    },
  },
});

export const {
  addAudits,
  addContactMessages,
  addPendingNades,
  addReports,
  addUsers,
  changeRoute,
} = admin.actions;

export const AdminReducer = admin.reducer;
