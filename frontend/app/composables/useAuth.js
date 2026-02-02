export const useAuth = () => {
  const user = useState("user", () => null);
  const token = useState("token", () => null);
  const cookieToken = useCookie("token");

  if (process.client && !token.value) {
    token.value = cookieToken.value || localStorage.getItem("token");
  }

  const login = async (payload) => {
    const res = await $fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      body: payload,
    });

    token.value = res.token;
    user.value = res.user;

    localStorage.setItem("token", res.token);

    cookieToken.value = res.token;
    navigateTo("/");
  };

  const register = async (payload) => {
    await $fetch("http://localhost:5001/api/auth/register", {
      method: "POST",
      body: payload,
    });
    navigateTo("/login");
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem("token");
    cookieToken.value = null;
    navigateTo("/login");
  };

  const fetchUser = async () => {
    if (!token.value) return;

    try {
      const res = await $fetch("http://localhost:5001/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });

      user.value = res;
    } catch (err) {
      logout();
    }
  };

  return { user, token, login, logout, register, fetchUser };
};
