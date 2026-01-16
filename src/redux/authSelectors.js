export const selectUser = (state) => state.auth.user;
export const selectIsAuthorized = (state) => Boolean(state.auth.user);
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export const selectModal = (state) => state.auth.modal;
export const selectIsModalOpen = (state) => state.auth.modal.isOpen;
export const selectModalType = (state) => state.auth.modal.type;
