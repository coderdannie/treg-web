export const scrollBarStyle = {
  '&::-webkit-scrollbar': {
    width: '6px',
    height: '6px',
    borderRadius: '8px',
    backgroundColor: `rgba(0, 0, 0, 0.05)`,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: `rgba(0, 0, 0, 0.05)`,
  },
};
export const userScroll = {
  '&::-webkit-scrollbar': {
    width: '6px',
    height: '6px',
    borderRadius: '8px',
    backgroundColor: `rgba(0, 0, 0, 0.05)`,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: `#000`,
  },
};
export const sideScroll = {
  '&::-webkit-scrollbar': {
    width: '6px',
    height: '6px',
    borderRadius: '8px',
    backgroundColor: `rgba(0, 0, 0, 0.05)`,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: `#f1f1f1`,
  },
};
export const trim = (str) => {
  return str?.length > 25 ? str.substring(0, 25) + '...' : str;
};
export const trimName = (str) => {
  return str?.length > 20 ? str.substring(0, 20) + '...' : str;
};

export const useLogOut = () => {
  return () => {
    sessionStorage.clear();
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
  };
};

export const formatDate = (date, fallback = '') => {
  if (!date) return fallback;

  return new Date(date).toLocaleDateString('default', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const formatDates = (date, fallback = '') => {
  if (!date) return fallback;

  const formattedDate = new Date(date);
  const year = formattedDate.getFullYear();
  const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
  const day = String(formattedDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const formatDateTime = (date, fallback = '') => {
  if (!date) return fallback;

  return new Date(date).toLocaleString('default', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
};

export const day = new Date().toLocaleDateString('default', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

export const month = new Date().toLocaleString('default', { month: 'long' });

export const trimID = (str) => {
  return str?.length > 30 ? str.substring(0, 30) + '...' : str;
};

export const trimNames = (str) => {
  return str?.length > 15 ? str.substring(0, 15) + '...' : str;
};
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function formatBackendDate(date) {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
