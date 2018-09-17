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

export const removeUploadedFile = (fileKey) => (
    {
        type: 'REMOVE_UPLOADED_FILE',
        fileKey
    }
)

export const setUploadedFiles = (files) => (
    {
        type: 'SET_UPLOADED_FILES',
        files
    }   
)

export const updateUploadedFileQuality = (quality, key) => (
    {
        type: 'UPDATE_UPLOADED_FILE_QUALITY',
        quality,
        key
    }
)

export const setUserCredentials = (name, email, auth) => (
    {
        type: 'SET_USER_CREDENTIALS',
        name,
        email,
        auth,
    }
)

export const updateUploadedFileLocation = (location, size, key) => (
    {
        type: 'UPDATE_UPLOADED_FILE_LOCATION',
        location,
        size,
        key,
    }
)
