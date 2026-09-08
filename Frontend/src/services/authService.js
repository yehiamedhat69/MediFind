const users = [
  {
    id: 1,
    name: "Test Customer",
    email: "customer@test.com",
    password: "123456",
    role: "customer",
  },
  {
    id: 2,
    name: "Test Pharmacy",
    email: "pharmacy@test.com",
    password: "123456",
    role: "pharmacy",
  },
  {
    id: 3,
    name: "Test Admin",
    email: "admin@test.com",
    password: "123456",
    role: "admin",
  },
];

export const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
        (user) =>
          user.email === email && user.password === password
      );

      if (!user) {
        reject(new Error("Invalid email or password"));
        return;
      }

      resolve({
        token: `mock-token-${user.id}`,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }, 500);
  });
};