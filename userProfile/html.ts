import { UserProfile } from '../userProfile/model';

const activeNavItem = 'userProfile';

export function fromUserProfile(userProfile: UserProfile) {
    return [
        'userProfile/userProfile',
        {
            activeNavItem,
            userProfile
        }
    ];
}
