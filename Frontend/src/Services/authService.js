const MOCK_USERS = [
  { email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { email: 'user@example.com', password: 'user123', role: 'customer' },
];

export const login = async (email, password, role) => {
  const user = MOCK_USERS.find(
    u => u.email === email && u.password === password && u.role === role
  );
  if (user) {
    return { success: true, user: { email: user.email, role: user.role } };
  }
  return { success: false, error: 'Invalid credentials' };
};

export const register = async ({ email, password, role }) => {
  if (MOCK_USERS.find(u => u.email === email)) {
    return { success: false, error: 'User already exists' };
  }
  const newUser = { email, password, role };
  MOCK_USERS.push(newUser);
  return { success: true, user: { email, role } };
};

export const logout = async () => {
  return { success: true };
};
