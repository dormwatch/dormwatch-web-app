declare module '*/services/problemsApi' {
  const anyType: any;
  export default anyType;
  export const fetchPendingComplaints: any;
  export const fetchApprovedComplaints: any;
  export const fetchRejectedComplaints: any;
  export const fetchComplaintsByStatus: any;
  export const updateComplaintStatus: any;
  export const updateComplaintPriority: any;
  export const deleteProblem: any;
  export const fetchComments: any;
  export const postComment: any;
  export const deleteComment: any;
  export const fetchUserProfile: any;
  export const CATEGORY_LABELS: any;
  export const fetchTickets: any;
  export const createTicket: any;
  export const fetchEmployees: any;
  export const updateTicket: any;
  export const loginUser: any;
  export const registerUser: any;
  export const updateUserProfile: any;
  export const changeUserRoom: any;
  export const fetchBuildings: any;
  export const fetchPlaces: any;
  export const fetchAllComplaints: any;
  export const createProblem: any;
  export const voteComplaint: any;
  export const fetchMyProblems: any;
  export const logoutUser: any;
}

declare module '*/services/imageUtils' {
  const anyType: any;
  export default anyType;
  export const resolveImageUrl: any;
}

declare module '*.js';
