const prefix = 'TOASTS';

const OPEN_TOASTS = `${prefix}.OPEN_TOASTS`;
const CLOSE_TOASTS = `${prefix}.CLOSE_TOASTS`;

const openToast = mesage => ({
  type: OPEN_TOASTS,
  payload: mesage,
});

const closeToast = () => ({
  type: CLOSE_TOASTS,
});

export default {
  OPEN_TOASTS,
  CLOSE_TOASTS,
  openToast,
  closeToast,
};
