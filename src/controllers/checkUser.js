export function checkUser(users, res) {
  const { username, password } = res;
  return users.find(
    (user) => user.username === username && user.password === password
  );
}
