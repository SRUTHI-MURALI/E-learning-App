/* eslint-disable react-refresh/only-export-components */
import {configureStore} from '@reduxjs/toolkit'

import StudentSlice from '../ReduxComponents/StudentSlice'
import TutorSlice from '../ReduxComponents/TutorSlice'

export default configureStore({
    reducer:{
        student:StudentSlice,
        tutor:TutorSlice,
    }
})