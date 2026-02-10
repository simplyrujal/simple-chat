import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

const useGlobalSubscriptions = () => {
    useTracker(() => {
        const user = Meteor.user();
        if (user) {
            Meteor.subscribe('room.list');
            Meteor.subscribe('roomMember.list');
            Meteor.subscribe('user.list');
            Meteor.subscribe('user.self');
        }
    }, []);

    return null
};

export default useGlobalSubscriptions
