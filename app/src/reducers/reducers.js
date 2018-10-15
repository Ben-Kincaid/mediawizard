let defaultState = {
    userFiles: [],
    uploadedFiles: [], 
    user: null,
    auth: null,
    uploadPending: false,
}

const reducers = (state = defaultState, action) => {
    switch(action.type) {
        case 'SET_USER_FILES':
            return {
                ...state,
                userFiles: action.files,
            }
        case 'SET_UPLOADED_FILES':
            return {
                ...state,
                uploadedFiles: [...action.files, ...state.uploadedFiles],
            }
        case 'UPDATE_UPLOADED_FILE_QUALITY':
            return {
                ...state,
                uploadedFiles: state.uploadedFiles.map((file, i) => 
                    i == action.key ? {
                        ...file, 
                        quality: action.quality
                    } : file
                )
            }
        case 'REMOVE_USER_FILE':
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
                    i == action.fileKey ? false : true
                )
            }
        case 'SET_USER_CREDENTIALS':
            let userData = (action.name !== null && action.email !== null ? {
                id: action.userId,
                username: action.name,
                email: action.email,
            } : null)
            
            return {
                ...state,
                user: userData,
                auth: action.auth
            }
            
        case 'UPDATE_UPLOADED_FILE_LOCATION': 
            return {
                ...state,
                uploadedFiles: state.uploadedFiles.map((file, i) => 
                    i == action.key ? {
                        ...file,
                        uploaded: {
                            location: action.location,
                            size: action.size,
                            base64: action.base64,
                            loaded: true,
                        },
                    } : file
                )
            }
        case 'UPDATE_PENDING_STATUS':
            return {
                ...state, 
                uploadPending: action.status
            }
        default: return state;
    }
}

export default reducers;