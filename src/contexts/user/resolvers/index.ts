import ModelUser from '../model';
import ModelCarePlan from '../../carePlan/model';


const resolver = {
    Query: {
        users: () => ModelUser.getUsers(),
        userById: (_, { id }) => ModelUser.getUserById(id),
    },
    Mutation: {
        createUser: (_, args) => ModelUser.createUser(args),
        updateUser: (_, args) => ModelUser.updateUser(args),
    },
    User: {
        memberCarePlans: (parent) => ModelCarePlan.getCarePlanByMemberId(parent.id),
        nurseCarePlans: (parent) => ModelCarePlan.getCarePlanByNurseId(parent.id),
    }
};

export default resolver;