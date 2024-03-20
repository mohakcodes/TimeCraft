import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface UserIdType {
    userId: string;
    setUserId: (id: string) => void;
}

export const useUserIdStore = create<UserIdType>()(
    persist(
        (set) => ({
            userId: '',
            setUserId: (id: string) => set({userId: id})
        }),
        {name: 'userId-store'} // Unique name
    )
)