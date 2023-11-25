const { Sequelize, DataTypes, DATEONLY } = require('sequelize');

const sequelize = new Sequelize(
    '', '', '',
    {
        dialect: 'sqlite',
        storage: './db/database.db',
        logging: false
    }
);

const UserAccount = sequelize.define('UserAccount', {
    
    UID: {
      type: DataTypes.STRING(10), 
      primaryKey: true,
      allowNull: false
    },
    URole: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    UPassword: {
      type: DataTypes.STRING(64),
    },
    UEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
}, {
    freezeTableName: true
});
  
const Course = sequelize.define('Course', {
      CourseID: {
        type: DataTypes.STRING(10),
        primaryKey: true,
      },
      CourseName: {
        type: DataTypes.STRING(200),
        unique: true,
      },
      CourseTotalMC: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      CourseDescription: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
}, {
    freezeTableName: true
});
  
const Student = sequelize.define('Student', {
      SID: {
          type: DataTypes.STRING(10),
          primaryKey: true,
      },
      SCourseID: {
        type: DataTypes.STRING(10),
        defaultValue: null,
      },
      SName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      SBatch: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      SYear: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      SStatus: {
        type: DataTypes.CHAR(1),
        defaultValue: null,
      },
}, {
    freezeTableName: true
});
    
  
const Admin = sequelize.define('Admin', {
      AID: {
          type: DataTypes.STRING(10),
          primaryKey: true,
      },
      AName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      }
}, {
    freezeTableName: true
});
  
  
  
  const Class = sequelize.define('Class', {
      CID: {
        type: DataTypes.STRING(10),
        primaryKey: true,
      },
      ModID: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      RoomNo: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      StartDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      EndDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      StartTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      EndTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
}, {
    freezeTableName: true
});
  
const Module = sequelize.define('Module', {
      MID: {
        type: DataTypes.STRING(10),
        primaryKey: true,
      },
      MName: {
        type: DataTypes.STRING(200),
        unique: true,
      },
      MCredit: {
        type: DataTypes.INTEGER,
        validate: {
          isIn: [[4, 8, 10, 12]],
        },
      },
      MTerm: {
        type: DataTypes.INTEGER,
        validate: {
          isIn: [[1, 2, 3]],
        },
      },
      MPreRequisite: {
        type: DataTypes.STRING(10),
      },
  }, {
      freezeTableName: true
  });
  
  
  const Professor = sequelize.define('Professor', {
      PID: {
        type: DataTypes.STRING(10),
        primaryKey: true,
      },
      PName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      }
}, {
    freezeTableName: true 
});
    
  
const ClassTaken = sequelize.define('ClassTaken', {
      StuID: {
        type: DataTypes.STRING(10),
        primaryKey: true,
      },
      ClsID: {
        type: DataTypes.STRING(10),
        primaryKey: true,
      },
      Feedback: {
        type: DataTypes.STRING(500),
        defaultValue: null,
      }
}, {
      freezeTableName: true
});
  
const StudentAttendance = sequelize.define('StudentAttendance', {
      StuID: {
        type: DataTypes.STRING(10),
        primaryKey: true,
      },
      ClsID: {
        type: DataTypes.STRING(10),
        primaryKey: true,
      },
      Date: {
        type: DataTypes.DATEONLY,
        primaryKey: true,
      },
      Attendance: {
        type: DataTypes.CHAR(1),
        defaultValue: null,
      }
}, {
      freezeTableName: true
});
  
const Transcript = sequelize.define('Transcript', {
      StuID: {
        type: DataTypes.STRING(10),
        primaryKey: true,
      },
      ModID: {
        type: DataTypes.STRING(10),
        primaryKey: true,
      },
      Grade: {
        type: DataTypes.CHAR(2),
      },
      TYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
}, {
      freezeTableName: true
});
  
const Notification = sequelize.define('Notification', {
      NotID: {
        type: DataTypes.STRING(20),
        primaryKey: true,
      },
      // StuID: {
      //   type: DataTypes.STRING(10),
      // },
      DateTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Message: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
}, {
      freezeTableName: true
});
  
  
  
Professor.belongsTo(UserAccount, { foreignKey: 'PID' });
Student.belongsTo(UserAccount, { foreignKey: 'SID' });
Admin.belongsTo(UserAccount, { foreignKey: 'AID' });

Transcript.belongsTo(Student, { foreignKey: 'StuID' });
  
Module.hasMany(Transcript, {foreignKey: 'ModID'})
Course.hasMany(Student, { foreignKey: 'SCourseID' });
  
Professor.hasMany(Module, { foreignKey: 'ProfID' });
Class.belongsTo(Module, { foreignKey: 'ModID' });
  
ClassTaken.belongsTo(Student, { foreignKey: 'StuID' });
ClassTaken.belongsTo(Class, { foreignKey: 'ClsID' });

Module.belongsTo(Module, { foreignKey: 'MPreRequisite' });

Student.hasMany(StudentAttendance, {foreignKey:'StuID'});
Class.hasMany(StudentAttendance, {foreignKey:'ClsID'});

Notification.belongsToMany(Student, { through: 'StudentNotification', sourceKey: 'NotID' });

Module.belongsToMany(Course, { through: 'ModuleCourse', sourceKey: 'MID' });

sequelize.sync();
module.exports = {sequelize, Module,Course,Class,ClassTaken,Student,Admin,Professor,StudentAttendance,Notification,Transcript,UserAccount}