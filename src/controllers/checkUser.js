export function checkUser(users, inputs) {
  const { username, password } = inputs;
  return users.find(
    (user) => user.username === username && user.password === password
  );
}
