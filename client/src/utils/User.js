import secureLocalStorage from "react-secure-storage"
import decode from "jwt-decode";

export const getUserFromJWT = () => {
    const token = secureLocalStorage.getItem('token')
    if (token) {
        const decoded = decode(token);
        const user = decoded?.payload
        return user;
    }
    return null
}

