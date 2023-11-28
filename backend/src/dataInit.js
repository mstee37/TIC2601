const models = require('./models');

const bulkCreate = async (model, data, options = {}) => {
    try {
      const result = await model.bulkCreate(data, { validate: true ,...options});
    //   console.log(`Bulk creation successful for ${model.name}:`, result);
    } catch (error) {
    //   console.error(`Error in bulk creation for ${model.name}:`, error);
    }
  };

const courseData= [{ CourseID: 'CS101', CourseName: 'Bachelor of Science in Computer Science', CourseTotalMC: 120, CourseDescription: 'This program focuses on computer science fundamentals.' },
{ CourseID: 'CS102', CourseName: 'Bachelor of Science in Information Systems', CourseTotalMC: 130, CourseDescription: 'Study of information systems and technology.' },
{CourseID: 'CS103', CourseName: 'Bachelor of Engineering in Computer Engineering', CourseTotalMC: 150, CourseDescription: 'Integration of computer science and electrical engineering principles.'},
{CourseID: 'CS104', CourseName: 'Bachelor of Science in Data Science', CourseTotalMC: 140, CourseDescription: 'Analysis and interpretation of complex data sets.'},
{CourseID: 'CS105', CourseName: 'Bachelor of Science in Artificial Intelligence', CourseTotalMC: 140, CourseDescription: 'Study of algorithms and techniques for intelligent systems.'}];


const userData = [
    { UID: "P001", URole: "professor", UPassword: "P@l1ce123", UEmail: "p001@edu.sg" },
    { UID: "P002", URole: "professor", UPassword: "B0bS@1th", UEmail: "p002@edu.sg" },
    { UID: "P003", URole: "professor", UPassword: "Cl@ire123", UEmail: "p003@edu.sg" },
    { UID: "P004", URole: "professor", UPassword: "Dav1d@456", UEmail: "p004@edu.sg" },
    { UID: "P005", URole: "professor", UPassword: "EmMaT@789", UEmail: "p005@edu.sg" },
  
    { UID: "S001", URole: "student", UPassword: "Fr@nk1234", UEmail: "s001@edu.sg" },
    { UID: "S002", URole: "student", UPassword: "Gr@ce5678", UEmail: "s002@edu.sg" },
    { UID: "S003", URole: "student", UPassword: "H3nry@901", UEmail: "s003@edu.sg" },
    { UID: "S004", URole: "student", UPassword: "IrEne!234", UEmail: "s004@edu.sg" },
    { UID: "S005", URole: "student", UPassword: "J@ck5678", UEmail: "s005@edu.sg" },
    { UID: "S006", URole: "student", UPassword: "K@ren9012", UEmail: "s006@edu.sg" },
    { UID: "S007", URole: "student", UPassword: "L!am3456", UEmail: "s007@edu.sg" },
    { UID: "S008", URole: "student", UPassword: "N@tal1e789", UEmail: "s008@edu.sg" },
    { UID: "S009", URole: "student", UPassword: "Ol!ver9012", UEmail: "s009@edu.sg" },
    { UID: "S010", URole: "student", UPassword: "P@ige3456", UEmail: "s010@edu.sg" },
    { UID: "S011", URole: "student", UPassword: "L0rT#9982", UEmail: "s011@edu.sg" },
    { UID: "S012", URole: "student", UPassword: "Bn!Clb674", UEmail: "s012@edu.sg" },
  
    { UID: "A001", URole: "admin", Name: "Admin Quentin Lewis", UPassword: "Qu3nt1n@123", UEmail: "a001@edu.sg" },
    { UID: "A002", URole: "admin", Name: "Admin Rachel Turner", UPassword: "R@chel456", UEmail: "a002@edu.sg" },
  ];

  const professorData = [
    { PID: "P001", PName: "Alice Johnson" },
    { PID: "P002", PName: "Bob Smith" },
    { PID: "P003", PName: "Claire Davis" },
    { PID: "P004", PName: "David Williams" },
    { PID: "P005", PName: "Emma Taylor" },
  ];
  
  const adminData = [
    { AID: 'A001', AName: 'Alfred David' },
    { AID: 'A002', AName: 'Chris Brown' },
  ];
  
  const studentData = [
    { SID: 'S001', SCourseID: 'CS101', SName: 'John Doe', SBatch: '2022/23', SYear: 2, SStatus:'A' },
    { SID: 'S002', SCourseID: 'CS102', SName: 'Jane Smith', SBatch: '2022/23', SYear: 2, SStatus:'A' },
    { SID: 'S003', SCourseID: 'CS103', SName: 'Michael Johnson', SBatch: '2022/23', SYear: 2, SStatus:'A' },
    { SID: 'S004', SCourseID: 'CS104', SName: 'Emily Davis', SBatch: '2022/23', SYear: 2, SStatus:'A' },
    { SID: 'S005', SCourseID: 'CS105', SName: 'Christopher Wilson', SBatch: '2022/23', SYear: 2, SStatus:'A' },
    { SID: 'S006', SCourseID: 'CS101', SName: 'Olivia Brown', SBatch: '2023/24', SYear: 1, SStatus:'A' },
    { SID: 'S007', SCourseID: 'CS102', SName: 'Daniel Turner', SBatch: '2023/24', SYear: 1, SStatus:'A' },
    { SID: 'S008', SCourseID: 'CS103', SName: 'Sophia White', SBatch: '2023/24', SYear: 1, SStatus:'A' },
    { SID: 'S009', SCourseID: 'CS105', SName: 'Liam Martinez', SBatch: null, SYear: null, SStatus: 'R'},
    { SID: 'S010', SCourseID: 'CS101', SName: 'Ava Smith', SBatch: null, SYear: null, SStatus: null },
    { SID: 'S011', SCourseID: null, SName: 'Loraine Taylor', SBatch: null, SYear: null, SStatus: null},
    { SID: 'S012', SCourseID: null, SName: 'Bruno Caleb', SBatch: null, SYear: null, SStatus: null },
  ];
  
  const moduleData = [
    { MID: 'M001', MName: 'Introduction to Programming', MCredit: 4, MTerm: 1, ProfID: 'P001', MPreRequisite: null },
    { MID: 'M002', MName: 'Database Management Systems', MCredit: 4, MTerm: 2, ProfID: 'P002', MPreRequisite: 'M001' },
    { MID: 'M003', MName: 'Introduction to Business Analytics', MCredit: 4, MTerm: 1, ProfID: 'P003', MPreRequisite: 'M002' },
    { MID: 'M004', MName: 'Predictive Analytics', MCredit: 4, MTerm: 2, ProfID: 'P004', MPreRequisite: 'M003' },
    { MID: 'M005', MName: 'Introduction to Mathematics', MCredit: 4, MTerm: 1, ProfID: 'P005', MPreRequisite: 'M004' }
  ];
  
  const moduleCourseData = [
    { CourseCourseID: 'CS101', ModuleMID: 'M001' },
    { CourseCourseID: 'CS101', ModuleMID: 'M002' },
    { CourseCourseID: 'CS102', ModuleMID: 'M001' },
    { CourseCourseID: 'CS102', ModuleMID: 'M002' },
    { CourseCourseID: 'CS103', ModuleMID: 'M003' },
    { CourseCourseID: 'CS103', ModuleMID: 'M004' },
    { CourseCourseID: 'CS103', ModuleMID: 'M005' },
    { CourseCourseID: 'CS104', ModuleMID: 'M003' },
    { CourseCourseID: 'CS104', ModuleMID: 'M004' },
    { CourseCourseID: 'CS105', ModuleMID: 'M001' },
    { CourseCourseID: 'CS105', ModuleMID: 'M004' },
    { CourseCourseID: 'CS105', ModuleMID: 'M005' }
  ];
  
  const classData = [
    { CID: 'C001', ModID: 'M001', RoomNo: 'COM1-B1-1002', StartDate: new Date('2023-08-02T18:30:00'), EndDate: new Date('2023-11-01T21:30:00') },
    { CID: 'C002', ModID: 'M002', RoomNo: 'COM1-B2-1005', StartDate: new Date('2023-01-02T18:30:00'), EndDate: new Date('2023-05-02T21:30:00')},
    // , StartTime: '18:30:00', EndTime: '21:30:00' },
    { CID: 'C003', ModID: 'M003', RoomNo: 'COM2-B2-2103', StartDate: new Date('2023-08-03T18:30:00'), EndDate: new Date('2023-11-03T21:30:00')},
    // , StartTime: '18:30:00', EndTime: '21:30:00' },
    { CID: 'C004', ModID: 'M004', RoomNo: 'COM2-B1-1023', StartDate: new Date('2023-01-03T19:00:00'), EndDate: new Date('2023-05-03T20:30:00')},
    // , StartTime: '19:00:00', EndTime: '20:30:00' },
    { CID: 'C005', ModID: 'M005', RoomNo: 'COM1-B1-2018', StartDate: new Date('2023-08-04T18:00:00'), EndDate: new Date('2023-11-04T21:00:00')},
    // , StartTime: '18:00:00', EndTime: '21:00:00' }

  ];
  
  const classTakenData = [
    { StuID: 'S001', ClsID: 'C001', Feedback: null },
    { StuID: 'S002', ClsID: 'C001', Feedback: null },
    { StuID: 'S005', ClsID: 'C001', Feedback: null },
    { StuID: 'S006', ClsID: 'C001', Feedback: null },
    { StuID: 'S001', ClsID: 'C002', Feedback: null },
    { StuID: 'S002', ClsID: 'C002', Feedback: null },
    { StuID: 'S007', ClsID: 'C002', Feedback: null },
    { StuID: 'S003', ClsID: 'C003', Feedback: null },
    { StuID: 'S004', ClsID: 'C003', Feedback: null },   
    { StuID: 'S003', ClsID: 'C004', Feedback: null },
    { StuID: 'S004', ClsID: 'C004', Feedback: null },
    { StuID: 'S005', ClsID: 'C004', Feedback: null },
    { StuID: 'S003', ClsID: 'C005', Feedback: null },
    { StuID: 'S005', ClsID: 'C005', Feedback: null },
    { StuID: 'S008', ClsID: 'C005', Feedback: null }
  ];

  const notificationData=[
    {CourseID:"CS101",DateTime:new Date(),Message:"The feedback exercise will ends on 30 November 2023 23:59"},
    {CourseID:"CS102",DateTime:new Date(),Message:"The feedback exercise will ends on 30 November 2023 23:59"},
    {CourseID:"CS103",DateTime:new Date(),Message:"The feedback exercise will ends on 30 November 2023 23:59"},
    {CourseID:"CS104",DateTime:new Date(),Message:"The feedback exercise will ends on 30 November 2023 23:59"},
    {CourseID:"CS105",DateTime:new Date(),Message:"The feedback exercise will ends on 30 November 2023 23:59"}
]


  
// models.sequelize.sync().then(() => {
//   console.log('models loaded');

//   loadData().then(() => {
//       console.log('test data loaded...');
//   });
// })



models.sequelize.sync({ force: true })
  .then(async () => {
    // Ensure tables are created before loading data
    await Promise.all([
      bulkCreate(models.Course, courseData),
      bulkCreate(models.UserAccount, userData)
    ]);
    await Promise.all([     
        bulkCreate(models.Professor, professorData),
        bulkCreate(models.Admin, adminData),
        bulkCreate(models.Student, studentData)
    ])
    await Promise.all([
      bulkCreate(models.Module, moduleData)
    ]);
    await bulkCreate(models.Classes, classData);
    await bulkCreate(models.ModuleCourse, moduleCourseData);

    await bulkCreate(models.ClassTaken, classTakenData, { individualHooks: true });
    await bulkCreate(models.Notification, notificationData);


        console.log('Data Loaded.');


    // await models.sequelize.close();



  })
  .catch(error => {
    console.error('Unable to create tables:', error);
  });
