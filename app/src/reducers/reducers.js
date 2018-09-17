let defaultState = {
    userName: null,
    userEmail: null,
    userFiles: [],
    uploadedFiles: [], 
    user: null,
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
                    i == action.fileKey ? false : true
                )
            }
        case 'SET_USER_CREDENTIALS':
            var userData = (action.name !== null || action.email !== null ? {
                username: action.name,
                email: action.email,
            } : null)
            return {
                ...state,
                user: userData,
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
                            loaded: true,
                        },
                    } : file
                )
            }
        default: return state;
    }
}

export default reducers;