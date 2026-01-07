export const selectTeachersState = (state) => state.teachers;

export const selectTeachers = (state) => state.teachers.teachers;
export const selectTeachersLoading = (state) => state.teachers.loading;
export const selectTeachersError = (state) => state.teachers.error;

export const selectTeachersLastKey = (state) => state.teachers.lastKey;
export const selectTeachersHasMore = (state) => state.teachers.hasMore;
