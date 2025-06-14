import ModelCarePlan from '../model';
import ModelEvent from '../../event/model';
import ModelUser from '../../user/model';
import ModelCarePlanHistory from '../../carePlanHistory/model';

const resolvers = {
    Query: {
        carePlans: () => ModelCarePlan.getCarePlans(),
    },
    Mutation: {
        createCarePlan: (_: any, args: any) => ModelCarePlan.createCarePlan(args),
        updateCarePlan: (_: any, args: any) => ModelCarePlan.updateCarePlan(args),
    },
    CarePlan: {
        events: (parent: any) => ModelEvent.getEventsByCarePlanId(parent.id),
        carePlanHistory: (parent: any) => ModelCarePlanHistory.getCarePlanHistoryByCarePlanId(parent.id),
        member: (parent: any) => ModelUser.getUserById(parent.memberId),
        nurse: (parent: any) => ModelUser.getUserById(parent.nurseId),
    }
};

export default resolvers;