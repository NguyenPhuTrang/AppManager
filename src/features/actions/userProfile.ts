import { UserProfile } from '../../types';
export const SET_USER_PROFILE = 'SET_USER_PROFILE' as const;

export const setUserProfile = (profileData: UserProfile) => ({
    type: SET_USER_PROFILE,
    payload: profileData
});
