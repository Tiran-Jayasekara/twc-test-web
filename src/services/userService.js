import axios from "axios";

const userService = () => {

    const http = axios.create({
        baseURL: 'http://localhost:3001',
        // process.env.REACT_APP_BASE_URL,

        headers: {
            "Content-type": "application/json",
        },
    });

    // Register User
    const register = async (registerForm) => {
        try {
            const userRegister = await http.post("/user/register", registerForm);
            return userRegister;
        } catch (error) {
            throw error;
        }
    }

    // Login user
    const login = async (loginForm) => {
        try {
            const userLogin = await http.post("/user/login", loginForm);
            return userLogin;
        } catch (error) {
            throw error;
        }
    }


    return {
        register,
        login
    }
}

export default userService