import ModelConflict from '../model';
import ModelEvent from '../../event/model';

const resolvers = {
    Query: {
        eventsConflicts: () => ModelConflict.getConflicts(),
        eventsConflictsByEventId: (_, { id }) => ModelConflict.getConflictsByEventId(id),
    },
    Mutation: {
        createEventConflict: (_, args) => ModelConflict.createConflict(args),
        resolveEventConflict: (_, args) => ModelConflict.updateConflict(args),
    },
    HasConflicts: {
        firstEvent: (parent) => ModelEvent.getEventById(parent.firstEventId),
        secondEvent: (parent) => ModelEvent.getEventById(parent.secondEventId),
    }
};

export default resolvers;