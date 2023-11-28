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
      validate: {
        isIn: [['professor', 'student', 'admin']],
      },
    },
    UPassword: {
      type: DataTypes.STRING(64),
      validate: {
        len: [8, Infinity],
      },
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
        defaultValue: null,
      },
      SYear: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      SStatus: {
        type: DataTypes.CHAR(1),
        defaultValue: null,
        validate: {
          isIn: [['A', 'R']],
        },
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
  
  
  
  const Classes = sequelize.define('Classes', {
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
        type: DataTypes.DATE,
        allowNull: false,
      },
      EndDate: {
        type: DataTypes.DATE,
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
        type: DataTypes.STRING(10),allowNull:true
      },
      ProfID: {
        type: DataTypes.STRING,
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
        defaultValue: null
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
        type: DataTypes.STRING,
        defaultValue: null,
        validate: {
          isIn: [[null,'Y', 'N']],
        },
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
        validate: {
          isIn: [['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D+', 'D', 'F']],
        },
      },
      TYear: {
        type: DataTypes.INTEGER,
      },
}, {
      freezeTableName: true
});
  
const Notification = sequelize.define('Notification', {
      NotID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      // push notification to each course 
      CourseID: {
        type: DataTypes.STRING(10),
      },
      // DateTime: {
      //   type: DataTypes.DATEONLY,
      //   allowNull: false,
      // },
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
Classes.belongsTo(Module, { foreignKey: 'ModID' });
  
ClassTaken.belongsTo(Student, { foreignKey: 'StuID' });
ClassTaken.belongsTo(Classes, { foreignKey: 'ClsID' });

Module.belongsTo(Module, { foreignKey: 'MPreRequisite', as:'preMod' });

Student.hasMany(StudentAttendance, {foreignKey:'StuID'});
Classes.hasMany(StudentAttendance, {foreignKey:'ClsID'});


StudentAttendance.belongsTo(Classes,{foreignKey:'ClsID'})
StudentAttendance.belongsTo(Student,{foreignKey:'StuID'})

Notification.belongsTo(Course, { foreignKey: 'CourseID' });

const ModuleCourse = sequelize.define('ModuleCourse', {}, {
  freezeTableName: true
});

Module.belongsToMany(Course, { through: ModuleCourse, sourceKey: 'MID' });

ClassTaken.afterCreate(async (classTakenInstance) => {
  try {
    const { StuID, ClsID } = classTakenInstance;
    const classInstance = await Classes.findByPk(ClsID);

    if (!classInstance) {
      console.error(`Class with ID ${ClsID} not found.`);
      return;
    }

    const startDate = new Date(classInstance.StartDate);
    const endDate = new Date(classInstance.EndDate);
    const totalWeeks = Math.ceil((endDate - startDate) / (7 * 24 * 60 * 60 * 1000));

    for (let week = 0; week < totalWeeks; week++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + (week * 7));
        await StudentAttendance.create({
          StuID,
          ClsID,
          Date: currentDate.toISOString().split('T')[0],
          Attendance: null,
        });
    }
    if (endDate<= new Date()) {
      await Transcript.create({
          StuID,
          ModID: classInstance.ModID,
          Grade: null,
          TYear: endDate.getFullYear(),
        });

      }
    }
   catch (error) {
    console.error(`Error in afterCreate hook: ${error.message}`);
  }
    

});

sequelize.sync();
module.exports = {sequelize, Module,Course,Classes,ClassTaken,Student,Admin,Professor,StudentAttendance,Notification,Transcript,UserAccount,ModuleCourse}
