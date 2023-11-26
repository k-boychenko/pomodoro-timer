import axios from 'axios';

import { IUser } from '../common/interfaces/users.interface';

const USERS_API_BASE_URL = 'http://localhost:8080/api/users';

// TODO: add user interface, chanhe user type to the IF

class UsersService {
    getUsers(){
        return axios.get(USERS_API_BASE_URL);
    }

    getUserById(uid: string) {
        return axios.get(USERS_API_BASE_URL + '/' + uid);
    }

    createUser(user: IUser) {
        return axios.post(USERS_API_BASE_URL, user);
    }

    updateUser(user: IUser, uid: string) {
        return axios.put(USERS_API_BASE_URL + '/' + uid, user);
    }

    deleteUser(uid: string) {
        return axios.delete(USERS_API_BASE_URL + '/' + uid);
    }
}

export default new UsersService();