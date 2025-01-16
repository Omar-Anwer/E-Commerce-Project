import { DataTypes, QueryInterface } from 'sequelize';

import User from './user/user.model';
import UserCredentials from './user/userCredentials.model';
import UserRoles from './user/userRoles.model';
import UserActivity from './user/userActivity.model';
//import UserProfile from './userProfile.model';

// export default function associateModels() {
//   // Users ↔ UserCredentials (1:1)
//   User.hasOne(UserCredentials, { foreignKey: 'userId', as: 'credentials' });
//   UserCredentials.belongsTo(User, { foreignKey: 'userId' });

//   // Users ↔ UserRoles (1:N)
//   User.hasMany(UserRoles, { foreignKey: 'userId', as: 'roles' });
//   UserRoles.belongsTo(User, { foreignKey: 'userId' });

//   // Users ↔ UserActivityLogs (1:N)
//   User.hasMany(UserActivity, { foreignKey: 'userId', as: 'activityLogs' });
//   UserActivity.belongsTo(User, { foreignKey: 'userId' });

// Users ↔ UserPreferences (1:1)
// User.hasOne(UserPreferences, { foreignKey: 'userId', as: 'preferences' });
// UserPreferences.belongsTo(User, { foreignKey: 'userId' });
//}
