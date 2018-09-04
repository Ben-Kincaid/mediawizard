export const setUserFiles = (files) => (
    {
        type: 'GET_USER_FILES',
        files
    }
)

export const removeUserFile = (fileId) => (
    {
        type: 'REMOVE_USER_FILE',
        fileId
    }
)

export const removeUploadedFile = (localId) => (
    {
        type: 'REMOVE_UPLOADED_FILE',
        localId
    }
)

export const setUploadedFiles = (files) => (
    {
        type: 'SET_UPLOADED_FILES',
        files
    }   
)

export const updateUploadedFileQuality = (localId, quality) => (
    {
        type: 'UPDATE_UPLOADED_FILE_QUALITY',
        quality,
        localId
    }
)

