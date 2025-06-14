import ModelEvent from '../model'
import ModelCarePlan from '../../carePlan/model';

const resolvers = {
    Query: {
        events: () => ModelEvent.getEvents(),
        eventById: (_, { id }) => ModelEvent.getEventById(id),
        eventsByCarePlanId: (_, { carePlanId }) => ModelEvent.getEventsByCarePlanId(carePlanId),
    },
    Mutation: {
        createEvent: (_, args) => ModelEvent.createEvent(args),
        updateEvent: (_, args) => ModelEvent.updateEvent(args),
    },
    Event: {
        carePlan: (parent) => ModelCarePlan.getCarePlanById(parent.carePlanId),
    }
};

export default resolvers;