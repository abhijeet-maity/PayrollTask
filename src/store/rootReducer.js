import authSlice from "../reducers/authSlice";
import taskSlice from "../reducers/taskSlice";

const rootReducer = {
    auth: authSlice,
    task: taskSlice,
}

export default rootReducer;

