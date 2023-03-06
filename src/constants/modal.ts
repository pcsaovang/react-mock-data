export const ModalId = {
  LOGIN_MODAL: "loginModal",
  TODO_LIST_MODAL: "todoListModal",
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ModalId = typeof ModalId[keyof typeof ModalId];