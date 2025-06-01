import authSlice from "../reducers/authSlice";
import taskSlice from "../reducers/taskSlice";
import memberSlice from "../reducers/memberSlice";

const rootReducer = {
    auth: authSlice,
    task: taskSlice,
    members : memberSlice,
}

export default rootReducer;

