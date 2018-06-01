import { UserProfile } from '../userProfile/model';

export function fromUserProfile(userProfile: UserProfile) {
    return [
        'userProfile/userProfile',
        { userProfile }
    ];
}
