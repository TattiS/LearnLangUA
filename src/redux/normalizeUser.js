export const normalizeUser = (user) =>
  user
    ? {
        id: user.uid,
        email: user.email,
        nick: user.displayName || null,
      }
    : null;
