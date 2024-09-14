export default async () => {
    localStorage.removeItem("token");

    page("/login");
};
