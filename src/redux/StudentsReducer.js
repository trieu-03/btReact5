const stateDefault = {
    studentsArr: [],
    studentsEdit: {},
    keyWord: '',
    findStudentsArr: []
}

const StudentsReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'ADD_STUDENT': {
            state.studentsArr = [...state.studentsArr, action.payload]

            return { ...state }
        }
        case 'DELETE_STUDENT': {
            const studentsArrUpdate = state.studentsArr.filter(sv => sv.id !== action.payload)
            state.studentsArr = studentsArrUpdate
            state.studentsEdit = {}

            return { ...state }
        }
        case 'EDIT_STUDENT': {
            state.studentsEdit = action.payload


            return { ...state }
        }
        case 'UPDATE_STUDENT': {
            let index = state.studentsArr.findIndex(user => user.id === action.payload.id)
            let newStudentArr = [...state.studentsArr]
            if (index !== -1) {
                newStudentArr[index] = action.payload
            }
            state.studentsArr = newStudentArr
            state.studentsEdit = {}


            return { ...state }
        }
        case 'FIND_STUDENT': {
            let filteredStudents = []
            state.keyWord = action.payload.toLowerCase();
            filteredStudents = state.studentsArr.filter(student => {
                return student.name.toLowerCase().includes(state.keyWord);
            });
            state.findStudentsArr = filteredStudents
            return { ...state };
        }
        default:
            return state
    }


}

export default StudentsReducer