import ModelCarePlanHistory from '../model';
import ModelCarePlan from '../../carePlan/model';

const resolvers = {
    Query: {
        carePlanHistories: () => ModelCarePlanHistory.CarePlanHistories(),
        carePlanHistoryById: (_, { id }) => ModelCarePlanHistory.getCarePlanHistoryById(id),
        carePlanHistoryByCarePlanId: (_, { carePlanId }) => ModelCarePlanHistory.getCarePlanHistoryByCarePlanId(carePlanId),
    },
    Mutation: {
        createCarePlanHistory: (_, args) => ModelCarePlanHistory.createCarePlanHistory(args),
    },
    CarePlanHistory: {
        carePlan: (parent) => ModelCarePlan.getCarePlanById(parent.carePlanId),
    }
};

export default resolvers;