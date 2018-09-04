let defaultState = {
    userName: null,
    userEmail: null,
    userFiles: [],
    uploadedFiles: [], 
}

const reducers = (state = defaultState, action) => {
    switch(action.type) {
        case 'GET_USER_FILES':
            alert('getting file...')
            return {
                ...state,
                userFiles: action.files,
                
            }
        case 'SET_UPLOADED_FILES':
            return {
                ...state,
                uploadedFiles: state.uploadedFiles.concat(action.files),
         
            }
        case 'UPDATE_UPLOADED_FILE_QUALITY':
            return {
                ...state,
                uploadedFiles: state.uploadedFiles.map((file, i) => 
                    file.localId == action.localId ? {
                        ...file, 
                        quality: action.quality
                    } : file
                )
            }
        case 'REMOVE_USER_FILE':
            alert('removing file...')
            return {
                ...state,
                userFiles: state.userFiles.filter((file, i) => 
                    file.fileId === action.fileId ? false : true
                )
            }
        case 'REMOVE_UPLOADED_FILE': 
            return {
                ...state,
                uploadedFiles: state.uploadedFiles.filter((file, i) => 
                    file.localId == action.localId ? false : true
                )
            }
        default: return state;
    }
}

export default reducers;